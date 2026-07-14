/**
 * ESG AI Copilot — shared types + error model (Phase 2).
 * The Anthropic API key never appears in this (frontend) layer; requests go to
 * a server proxy that holds the key. See src/lib/ai/anthropic.ts.
 */

export type ChatRole = "user" | "assistant";

/** A message as held in the UI conversation. */
export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  at: number;
  /** Assistant lifecycle for streaming / retry affordances. */
  status?: "streaming" | "complete" | "error";
}

/** Minimal message shape sent over the wire (no ids, no timestamps). */
export interface WireMessage {
  role: ChatRole;
  content: string;
}

/** Request body posted to the proxy. `system` is the prompt; never a secret. */
export interface ChatRequestBody {
  system: string;
  messages: WireMessage[];
}

export interface StreamHandlers {
  onToken: (text: string) => void;
  signal?: AbortSignal;
}

export type CopilotErrorKind =
  | "unconfigured"
  | "auth"
  | "rate_limit"
  | "timeout"
  | "network"
  | "empty"
  | "server"
  | "aborted"
  | "unknown";

export interface CopilotError {
  kind: CopilotErrorKind;
  /** Safe, user-facing text. Raw API errors are never surfaced. */
  message: string;
  /** Whether the UI should offer a retry. */
  retryable: boolean;
}

/** Enterprise-grade, non-technical messages. Raw provider errors never leak. */
const ERROR_MESSAGES: Record<CopilotErrorKind, { message: string; retryable: boolean }> = {
  unconfigured: {
    message:
      "The ESG AI Copilot isn't connected to an AI service yet. Once the assistant endpoint is configured, responses will appear here.",
    retryable: false,
  },
  auth: {
    message:
      "The assistant service is temporarily unavailable due to a configuration issue. Please try again shortly.",
    retryable: false,
  },
  rate_limit: {
    message:
      "The assistant is handling a high volume of requests right now. Please wait a moment and try again.",
    retryable: true,
  },
  timeout: {
    message: "The response took longer than expected. Please try again.",
    retryable: true,
  },
  network: {
    message: "We couldn't reach the assistant service. Please check your connection and try again.",
    retryable: true,
  },
  empty: {
    message: "The assistant didn't return a response. Please try rephrasing your question.",
    retryable: true,
  },
  server: {
    message: "The assistant service ran into a problem. Please try again in a moment.",
    retryable: true,
  },
  aborted: { message: "Response stopped.", retryable: false },
  unknown: {
    message: "Something went wrong while contacting the assistant. Please try again.",
    retryable: true,
  },
};

export function copilotError(kind: CopilotErrorKind): CopilotError {
  const { message, retryable } = ERROR_MESSAGES[kind];
  return { kind, message, retryable };
}
