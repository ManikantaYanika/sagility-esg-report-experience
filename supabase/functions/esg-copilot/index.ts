// Supabase Edge Function (Deno) - production Gemini proxy for the ESG AI Copilot.
//
// The Gemini key lives ONLY here, read from a Supabase secret; it is never
// sent to the browser. The browser POSTs { system, messages } and receives
// plain text containing the assistant's reply.
//
//   supabase secrets set GEMINI_API_KEY=...
//   supabase functions deploy esg-copilot
//
const GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta";
// Model fallback priority: explicit secret first, then broadly-available models.
const MODELS = [...new Set(
  [Deno.env.get("GEMINI_MODEL"), "gemini-3.5-flash", "gemini-2.0-flash"]
    .filter((m): m is string => !!m),
)];
const MAX_TOKENS = 1024;
const UPSTREAM_TIMEOUT_MS = 30_000;
const MAX_RETRIES = 2; // retry each model on 429/5xx before moving to the next

const CORS = {
  "Access-Control-Allow-Origin": Deno.env.get("COPILOT_ALLOW_ORIGIN") ?? "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Max-Age": "86400",
};

interface WireMessage { role: "user" | "assistant"; content: string }
interface GeminiContent { role?: "user" | "model"; parts: Array<{ text: string }> }
interface GeminiResponse {
  candidates?: Array<{
    content?: { parts?: Array<{ text?: string }> };
    finishReason?: string;
  }>;
  promptFeedback?: { blockReason?: string };
  error?: { code?: number; message?: string; status?: string };
}

function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, "content-type": "application/json" },
  });
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

interface UpstreamResult { text: string | null; model: string; status: number; detail: string }

function geminiUrl(model: string, apiKey: string): string {
  const modelPath = model.startsWith("models/") || model.startsWith("tunedModels/")
    ? model
    : `models/${model}`;
  const url = new URL(`${GEMINI_API_BASE}/${modelPath}:generateContent`);
  url.searchParams.set("key", apiKey);
  return url.toString();
}

function toGeminiContents(messages: WireMessage[]): GeminiContent[] {
  return messages
    .filter((message) =>
      (message.role === "user" || message.role === "assistant") &&
      typeof message.content === "string" &&
      message.content.trim().length > 0
    )
    .map((message) => ({
      role: message.role === "assistant" ? "model" : "user",
      parts: [{ text: message.content }],
    }));
}

function extractGeminiText(body: GeminiResponse): string {
  return body.candidates
    ?.flatMap((candidate) => candidate.content?.parts ?? [])
    .map((part) => part.text ?? "")
    .join("") ?? "";
}

function geminiResponseDetail(body: GeminiResponse): string {
  if (body.error?.message) return body.error.message;
  if (body.promptFeedback?.blockReason) return `prompt_blocked:${body.promptFeedback.blockReason}`;
  const finishReason = body.candidates?.map((candidate) => candidate.finishReason).filter(Boolean).join(",");
  return finishReason ? `finish_reason:${finishReason}` : "empty_response";
}

async function callGemini(apiKey: string, system: string, messages: WireMessage[]): Promise<UpstreamResult> {
  const contents = toGeminiContents(messages);
  let last: UpstreamResult = { text: null, model: "", status: 0, detail: "" };

  for (const model of MODELS) {
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);
      try {
        const res = await fetch(geminiUrl(model, apiKey), {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: system }] },
            contents,
            generationConfig: { maxOutputTokens: MAX_TOKENS },
          }),
          signal: controller.signal,
        });
        clearTimeout(timer);

        const raw = await res.text().catch(() => "");
        let parsed: GeminiResponse = {};
        try {
          parsed = raw ? JSON.parse(raw) : {};
        } catch {
          parsed = {};
        }

        if (res.ok) {
          const text = extractGeminiText(parsed).trim();
          if (text) return { text, model, status: 200, detail: "" };
          last = { text: null, model, status: 502, detail: geminiResponseDetail(parsed) };
          console.error(`[esg-copilot] Gemini empty response (model ${model}):`, last.detail);
          break;
        }

        const detail = geminiResponseDetail(parsed) || raw;
        last = { text: null, model, status: res.status, detail };
        console.error(`[esg-copilot] Gemini Error (model ${model}, status ${res.status}):`, detail);
        if (res.status === 401 || res.status === 403) return last; // invalid key/permission: stop
        if (res.status === 429 || res.status >= 500) { await sleep(400 * (attempt + 1)); continue; } // transient: retry
        break; // 400/404: try next model
      } catch (e) {
        clearTimeout(timer);
        last = { text: null, model, status: 0, detail: (e as Error).name };
        console.warn(`[esg-copilot] model ${model} fetch error/timeout: ${(e as Error).name}`);
        await sleep(400 * (attempt + 1));
      }
    }
  }
  return last;
}

Deno.serve(async (req: Request) => {
  const started = Date.now();
  if (req.method === "OPTIONS") return new Response(null, { headers: CORS });
  if (req.method !== "POST") return json(405, { error: "method_not_allowed" });

  const apiKey = Deno.env.get("GEMINI_API_KEY");
  if (!apiKey) {
    console.error("[esg-copilot] GEMINI_API_KEY secret is not set");
    return json(500, { error: "server_misconfigured" });
  }

  let system = "";
  let messages: WireMessage[] = [];
  try {
    const parsed = await req.json();
    system = typeof parsed.system === "string" ? parsed.system : "";
    messages = Array.isArray(parsed.messages) ? parsed.messages : [];
  } catch {
    return json(400, { error: "invalid_request" });
  }
  if (messages.length === 0 || toGeminiContents(messages).length === 0) {
    return json(400, { error: "invalid_request" });
  }
  console.log(`[esg-copilot] request: ${messages.length} msgs, models [${MODELS.join(", ")}]`);

  const upstream = await callGemini(apiKey, system, messages);
  if (upstream.text === null) {
    const status = upstream.status === 401 || upstream.status === 403 ? 401
      : upstream.status === 429 ? 429
      : 502;
    console.error(`[esg-copilot] all models failed: ${upstream.status} ${upstream.detail} (${Date.now() - started}ms)`);
    return json(status, { error: "upstream_error", upstreamStatus: upstream.status, detail: upstream.detail, triedModels: MODELS });
  }
  console.log(`[esg-copilot] using model ${upstream.model}; returned ${upstream.text.length} chars in ${Date.now() - started}ms`);

  return new Response(upstream.text, {
    headers: { ...CORS, "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" },
  });
});
