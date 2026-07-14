import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/cn";
import type { ChatMessage } from "@/lib/ai/types";
import { Markdown } from "./Markdown";

function formatTime(at: number): string {
  return new Date(at).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

/** A chat bubble with timestamp. Assistant text renders as plain text
 *  (newlines preserved); assistant messages expose a copy action once complete. */
export function CopilotMessage({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  const streaming = message.status === "streaming";
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — no-op */
    }
  }

  return (
    <div className={cn("flex flex-col gap-1", isUser ? "items-end" : "items-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-card-lg px-4 py-3 text-body-s leading-relaxed shadow-sm",
          isUser
            ? "rounded-br-sm bg-brand-teal text-white"
            : "rounded-bl-sm border border-neutral-100 bg-surface text-ink",
        )}
      >
        {isUser ? message.content : <Markdown content={message.content} />}
        {streaming && (
          <span aria-hidden className="ml-0.5 inline-block h-3.5 w-1.5 animate-pulse bg-brand-tealMid align-middle" />
        )}
      </div>
      <div
        className={cn(
          "flex items-center gap-2 px-1 text-body-s text-neutral-500",
          isUser && "flex-row-reverse",
        )}
      >
        <time dateTime={new Date(message.at).toISOString()}>{formatTime(message.at)}</time>
        {!isUser && !streaming && message.content.length > 0 && (
          <button
            type="button"
            onClick={copy}
            aria-label={copied ? "Response copied" : "Copy response"}
            className="inline-flex items-center gap-1 rounded px-1 py-0.5 transition-colors hover:text-brand-tealMid"
          >
            {copied ? <Check aria-hidden size={13} strokeWidth={1.75} /> : <Copy aria-hidden size={13} strokeWidth={1.75} />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
        )}
      </div>
    </div>
  );
}
