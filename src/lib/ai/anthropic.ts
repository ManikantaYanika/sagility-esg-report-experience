/**
 * Copilot transport (frontend compatibility shim).
 * This layer NEVER holds a provider API key. It streams from a server proxy
 * (a Supabase Edge Function) whose URL is a non-secret env value
 * (VITE_COPILOT_ENDPOINT). The proxy owns GEMINI_API_KEY and calls
 * Gemini server-side.
 *
 * The streamAnthropic export name is retained so the existing chat flow and
 * frontend imports do not need to change.
 */
import { copilotError, type ChatRequestBody, type StreamHandlers } from "./types";

const ENDPOINT = import.meta.env.VITE_COPILOT_ENDPOINT as string | undefined;
// Public anon key — safe in the frontend. Sent so the call passes Supabase
// JWT verification when the function is deployed with verify_jwt enabled.
const ANON = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
const REQUEST_TIMEOUT_MS = 45_000;

/** True when a proxy endpoint is configured. */
export function isConfigured(): boolean {
  const configured = typeof ENDPOINT === "string" && ENDPOINT.trim().length > 0;
  console.log("[DEBUG] isConfigured()", { configured, endpoint: ENDPOINT ?? null });
  return configured;
}

function mapStatus(status: number) {
  if (status === 401 || status === 403) return copilotError("auth");
  if (status === 429) return copilotError("rate_limit");
  if (status >= 500) return copilotError("server");
  return copilotError("unknown");
}

/**
 * POST the conversation to the proxy and stream the assistant's reply as plain
 * text chunks via `onToken`. Throws a `CopilotError` (safe messages only).
 */
export async function streamAnthropic(
  body: ChatRequestBody,
  { onToken, signal }: StreamHandlers,
): Promise<void> {
  console.log("[DEBUG] copilot transport()", {
    configured: Boolean(ENDPOINT),
    endpoint: ENDPOINT ?? null,
    hasAnonKey: Boolean(ANON),
  });
  if (!ENDPOINT) {
    console.log("[DEBUG] copilot transport stopped: missing endpoint");
    throw copilotError("unconfigured");
  }

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  const onExternalAbort = () => controller.abort();
  signal?.addEventListener("abort", onExternalAbort);

  const userAborted = () => signal?.aborted === true;

  let response: Response;
  try {
    const headers = {
      "content-type": "application/json",
      ...(ANON ? { authorization: "Bearer [redacted]", apikey: "[redacted]" } : {}),
    };
    console.log("[DEBUG] before fetch()", {
      url: ENDPOINT,
      method: "POST",
      headers,
      body,
    });
    response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(ANON ? { authorization: `Bearer ${ANON}`, apikey: ANON } : {}),
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    console.log("[DEBUG] after fetch()", response.status, {
      ok: response.ok,
      statusText: response.statusText,
      contentType: response.headers.get("content-type"),
    });
  } catch (e) {
    console.log("[DEBUG] fetch() threw", {
      name: (e as Error).name,
      message: (e as Error).message,
      userAborted: userAborted(),
    });
    window.clearTimeout(timeout);
    signal?.removeEventListener("abort", onExternalAbort);
    throw copilotError(userAborted() ? "aborted" : "network");
  }

  if (!response.ok) {
    const responseText = await response.clone().text().catch(() => "");
    console.log("[DEBUG] fetch() non-ok response", {
      status: response.status,
      statusText: response.statusText,
      body: responseText,
    });
    window.clearTimeout(timeout);
    signal?.removeEventListener("abort", onExternalAbort);
    throw mapStatus(response.status);
  }
  if (!response.body) {
    window.clearTimeout(timeout);
    signal?.removeEventListener("abort", onExternalAbort);
    throw copilotError("empty");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let received = 0;

  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      if (chunk) {
        received += chunk.length;
        console.log("[DEBUG] copilot transport token", { chunkLength: chunk.length, received });
        onToken(chunk);
      }
    }
  } catch (e) {
    console.log("[DEBUG] copilot transport read threw", {
      name: (e as Error).name,
      message: (e as Error).message,
      userAborted: userAborted(),
    });
    throw copilotError(userAborted() ? "aborted" : "network");
  } finally {
    window.clearTimeout(timeout);
    signal?.removeEventListener("abort", onExternalAbort);
  }

  console.log("[DEBUG] copilot transport completed", { received, userAborted: userAborted() });
  if (received === 0 && !userAborted()) throw copilotError("empty");
}
