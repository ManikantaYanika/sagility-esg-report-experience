/**
 * Chat orchestration — the single entry point the UI/hook calls.
 * Assembles the request (system prompt + trimmed history) and delegates
 * streaming to the transport. No UI concerns, no secrets.
 */
import { isConfigured, streamAnthropic } from "./anthropic";
import { ESG_SYSTEM_PROMPT } from "./prompts";
import type { ChatMessage, ChatRequestBody, StreamHandlers } from "./types";

export { isConfigured };

/** Cap history sent upstream to keep requests bounded (performance + cost). */
const MAX_TURNS = 10;

export async function streamChat(
  history: ChatMessage[],
  handlers: StreamHandlers,
): Promise<void> {
  const trimmed = history.filter((m) => m.content.trim().length > 0).slice(-MAX_TURNS);
  const messages = trimmed.map((m) => ({ role: m.role, content: m.content }));

  // Retrieve only the relevant report context (code-split: the knowledge layer
  // and the data it reads ship in the lazy Copilot chunk, not the initial bundle).
  const { buildGroundedContext } = await import("@/lib/knowledge");
  const { context } = buildGroundedContext(trimmed);
  const system = context ? `${ESG_SYSTEM_PROMPT}\n\n${context}` : ESG_SYSTEM_PROMPT;

  const body: ChatRequestBody = { system, messages };
  await streamAnthropic(body, handlers);
}
