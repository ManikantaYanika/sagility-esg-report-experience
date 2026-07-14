// Supabase Edge Function (Deno) — production Anthropic proxy for the ESG AI Copilot.
//
// The Anthropic key lives ONLY here, read from a Supabase secret; it is never
// sent to the browser. The browser POSTs { system, messages } and receives a
// plain-text stream of the assistant's reply (assembled from Anthropic SSE).
//
//   supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
//   supabase functions deploy esg-copilot
//
const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";
// Model fallback priority: explicit secret first, then broadly-available models.
const MODELS = [...new Set(
  [Deno.env.get("ANTHROPIC_MODEL"), "claude-3-5-sonnet-latest", "claude-3-haiku-20240307"]
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

function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, "content-type": "application/json" },
  });
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

interface UpstreamResult { res: Response | null; model: string; status: number; detail: string }

async function callAnthropic(apiKey: string, system: string, messages: WireMessage[]): Promise<UpstreamResult> {
  let last: UpstreamResult = { res: null, model: "", status: 0, detail: "" };
  for (const model of MODELS) {
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);
      try {
        const res = await fetch(ANTHROPIC_URL, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01",
          },
          body: JSON.stringify({ model, max_tokens: MAX_TOKENS, system, messages, stream: true }),
          signal: controller.signal,
        });
        clearTimeout(timer);
        if (res.ok) return { res, model, status: 200, detail: "" };
        const detail = (await res.text().catch(() => "")).slice(0, 600);
        last = { res: null, model, status: res.status, detail };
        console.warn(`[esg-copilot] model ${model} -> ${res.status} ${detail}`);
        if (res.status === 401) return last;                                   // invalid key: stop
        if (res.status === 429 || res.status >= 500) { await sleep(400 * (attempt + 1)); continue; } // transient: retry
        break;                                                                 // 400/403/404: try next model
      } catch (e) {
        clearTimeout(timer);
        last = { res: null, model, status: 0, detail: (e as Error).name };
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

  const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
  if (!apiKey) {
    console.error("[esg-copilot] ANTHROPIC_API_KEY secret is not set");
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
  if (messages.length === 0) return json(400, { error: "invalid_request" });
  console.log(`[esg-copilot] request: ${messages.length} msgs, models [${MODELS.join(", ")}]`);

  const upstream = await callAnthropic(apiKey, system, messages);
  if (!upstream.res || !upstream.res.body) {
    const status = upstream.status === 401 || upstream.status === 403 ? 401
      : upstream.status === 429 ? 429
      : 502;
    console.error(`[esg-copilot] all models failed: ${upstream.status} ${upstream.detail} (${Date.now() - started}ms)`);
    return json(status, { error: "upstream_error", upstreamStatus: upstream.status, detail: upstream.detail, triedModels: MODELS });
  }
  console.log(`[esg-copilot] using model ${upstream.model} (${Date.now() - started}ms to first byte)`);

  // Transform Anthropic SSE -> plain-text token stream.
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = upstream.res!.body!.getReader();
      const decoder = new TextDecoder();
      const encoder = new TextEncoder();
      let buffer = "";
      let emitted = 0;
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            const t = line.trim();
            if (!t.startsWith("data:")) continue;
            const payload = t.slice(5).trim();
            if (!payload || payload === "[DONE]") continue;
            try {
              const evt = JSON.parse(payload);
              if (evt.type === "content_block_delta" && evt.delta?.type === "text_delta") {
                emitted += evt.delta.text.length;
                controller.enqueue(encoder.encode(evt.delta.text));
              }
            } catch { /* ignore keep-alives / non-JSON */ }
          }
        }
        console.log(`[esg-copilot] streamed ${emitted} chars in ${Date.now() - started}ms`);
      } catch (e) {
        console.error("[esg-copilot] stream error", (e as Error).name);
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { ...CORS, "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" },
  });
});
