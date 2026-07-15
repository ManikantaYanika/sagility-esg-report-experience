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
  console.log("[DEBUG] streamChat()", { historyLength: history.length });
  const trimmed = history.filter((m) => m.content.trim().length > 0).slice(-MAX_TURNS);
  const messages = trimmed.map((m) => ({ role: m.role, content: m.content }));
  console.log("[DEBUG] streamChat() trimmed", { trimmedLength: trimmed.length });

  // Retrieve only the relevant report context (code-split: the knowledge layer
  // and the data it reads ship in the lazy Copilot chunk, not the initial bundle).
  console.log("[DEBUG] streamChat() before knowledge import");
  const { buildGroundedContext } = await import("@/lib/knowledge");
  const { context } = buildGroundedContext(trimmed);
  const system = context ? `${ESG_SYSTEM_PROMPT}\n\n${context}` : ESG_SYSTEM_PROMPT;
  console.log("[DEBUG] streamChat() built body", {
    messageCount: messages.length,
    hasContext: context.length > 0,
    systemLength: system.length,
  });

  const body: ChatRequestBody = { system, messages };
  console.log("[DEBUG] streamChat() before copilot transport");
  await streamAnthropic(body, handlers);
  console.log("[DEBUG] streamChat() after copilot transport");
}
