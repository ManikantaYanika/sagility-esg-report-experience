import { useCallback, useEffect, useRef, useState } from "react";
import { isConfigured, streamChat } from "@/lib/ai/chat";
import { copilotError, type ChatMessage, type CopilotError } from "@/lib/ai/types";
import { suggestFollowups } from "@/lib/knowledge/followups";

function makeId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export type CopilotStatus = "idle" | "streaming" | "error";

export interface UseCopilot {
  messages: ChatMessage[];
  status: CopilotStatus;
  error: CopilotError | null;
  configured: boolean;
  followups: string[];
  send: (text: string) => void;
  retry: () => void;
  stop: () => void;
  clear: () => void;
}

/**
 * useCopilot — owns all Copilot conversation state and streaming lifecycle.
 * UI components stay presentational; no business logic lives in them.
 */
export function useCopilot(): UseCopilot {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<CopilotStatus>("idle");
  const [error, setError] = useState<CopilotError | null>(null);
  const [followups, setFollowups] = useState<string[]>([]);

  const configured = isConfigured();
  console.log("[DEBUG] useCopilot()", { configured, status, messageCount: messages.length });
  const abortRef = useRef<AbortController | null>(null);
  // Latest messages, readable synchronously by send/retry without stale closures.
  const messagesRef = useRef<ChatMessage[]>([]);
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const run = useCallback((history: ChatMessage[]) => {
    console.log("[DEBUG] run()", { configured, historyLength: history.length });
    if (!configured) {
      console.log("[DEBUG] run() stopped: not configured");
      setMessages(history);
      setError(copilotError("unconfigured"));
      setStatus("error");
      return;
    }
    const assistantId = makeId();
    setMessages([
      ...history,
      { id: assistantId, role: "assistant", content: "", at: Date.now(), status: "streaming" },
    ]);
    setStatus("streaming");
    setError(null);
    setFollowups([]);

    const controller = new AbortController();
    abortRef.current = controller;

    streamChat(history, {
      signal: controller.signal,
      onToken: (t) =>
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content: m.content + t } : m)),
        ),
    })
      .then(() => {
        console.log("[DEBUG] streamChat() resolved");
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, status: "complete" } : m)),
        );
        const lastUser = [...history].reverse().find((m) => m.role === "user");
        setFollowups(lastUser ? suggestFollowups(lastUser.content) : []);
        setStatus("idle");
      })
      .catch((e: unknown) => {
        const err = (e as CopilotError)?.kind ? (e as CopilotError) : copilotError("unknown");
        console.log("[DEBUG] streamChat() rejected", err);
        if (err.kind === "aborted") {
          // user pressed stop — keep any partial text, drop empty bubble
          setMessages((prev) =>
            prev
              .filter((m) => !(m.id === assistantId && m.content.length === 0))
              .map((m) => (m.id === assistantId ? { ...m, status: "complete" } : m)),
          );
          setStatus("idle");
          return;
        }
        // failed — remove the empty streaming bubble and surface a safe error
        setMessages((prev) => prev.filter((m) => m.id !== assistantId));
        setError(err);
        setStatus("error");
      })
      .finally(() => {
        console.log("[DEBUG] run() finally");
        abortRef.current = null;
      });
  }, [configured]);

  const send = useCallback(
    (text: string) => {
      console.log("[DEBUG] send()", { rawLength: text.length, status });
      const content = text.trim();
      if (!content || status === "streaming") {
        console.log("[DEBUG] send() stopped", { hasContent: content.length > 0, status });
        return;
      }
      const history = [
        ...messagesRef.current,
        { id: makeId(), role: "user" as const, content, at: Date.now() },
      ];
      console.log("[DEBUG] send() calling run()", { historyLength: history.length });
      setMessages(history);
      run(history);
    },
    [run, status],
  );

  const retry = useCallback(() => {
    if (status === "streaming") return;
    const history = [...messagesRef.current];
    while (history.length > 0 && history[history.length - 1].role === "assistant") history.pop();
    if (history.length === 0) return;
    run(history);
  }, [run, status]);

  const stop = useCallback(() => abortRef.current?.abort(), []);

  const clear = useCallback(() => {
    abortRef.current?.abort();
    setMessages([]);
    setError(null);
    setFollowups([]);
    setStatus("idle");
  }, []);

  return { messages, status, error, configured, followups, send, retry, stop, clear };
}
