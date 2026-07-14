/**
 * Anthropic transport (frontend).
 * This layer NEVER holds the API key. It streams from a server proxy
 * (a Supabase Edge Function) whose URL is a non-secret env value
 * (VITE_COPILOT_ENDPOINT). The proxy owns ANTHROPIC_API_KEY and calls
 * the Anthropic Messages API server-side.
 */
import { copilotError, type ChatRequestBody, type StreamHandlers } from "./types";

const ENDPOINT = import.meta.env.VITE_COPILOT_ENDPOINT as string | undefined;
// Public anon key — safe in the frontend. Sent so the call passes Supabase
// JWT verification when the function is deployed with verify_jwt enabled.
const ANON = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
const REQUEST_TIMEOUT_MS = 45_000;

/** True when a proxy endpoint is configured. */
export function isConfigured(): boolean {
  return typeof ENDPOINT === "string" && ENDPOINT.trim().length > 0;
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
  if (!ENDPOINT) throw copilotError("unconfigured");

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  const onExternalAbort = () => controller.abort();
  signal?.addEventListener("abort", onExternalAbort);

  const userAborted = () => signal?.aborted === true;

  let response: Response;
  try {
    response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(ANON ? { authorization: `Bearer ${ANON}`, apikey: ANON } : {}),
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } catch {
    window.clearTimeout(timeout);
    signal?.removeEventListener("abort", onExternalAbort);
    throw copilotError(userAborted() ? "aborted" : "network");
  }

  if (!response.ok) {
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
        onToken(chunk);
      }
    }
  } catch {
    throw copilotError(userAborted() ? "aborted" : "network");
  } finally {
    window.clearTimeout(timeout);
    signal?.removeEventListener("abort", onExternalAbort);
  }

  if (received === 0 && !userAborted()) throw copilotError("empty");
}
