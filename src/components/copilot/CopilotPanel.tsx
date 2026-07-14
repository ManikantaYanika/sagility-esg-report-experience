import { useEffect, useRef, useState, type KeyboardEvent, type RefObject } from "react";
import { motion } from "framer-motion";
import {
  Sparkles, Minus, X, Send, Paperclip, Mic, Trash2, RotateCcw, Square, AlertCircle,
  FileText, TrendingUp, Landmark, CloudSun, Leaf, Users, ShieldCheck, Target,
  BarChart3, Award, HeartHandshake, Download, Lightbulb, type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { EASE_SETTLE } from "@/lib/motion";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { COPILOT_TAGLINE, COPILOT_TITLE, COPILOT_WELCOME } from "@/data/copilot";
import { EXECUTIVE_ACTIONS, type ExecutiveIcon } from "@/data/executive";
import type { ChatMessage, CopilotError } from "@/lib/ai/types";
import type { CopilotStatus } from "@/hooks/useCopilot";
import { CopilotMessage } from "./CopilotMessage";
import { TypingDots } from "./TypingDots";

interface CopilotPanelProps {
  messages: ChatMessage[];
  status: CopilotStatus;
  error: CopilotError | null;
  followups: string[];
  onSend: (text: string) => void;
  onRetry: () => void;
  onStop: () => void;
  onClear: () => void;
  onMinimize: () => void;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLButtonElement>;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

const EXEC_ICONS: Record<ExecutiveIcon, LucideIcon> = {
  summary: FileText, investor: TrendingUp, board: Landmark, climate: CloudSun,
  environment: Leaf, social: Users, governance: ShieldCheck, materiality: Target,
  kpis: BarChart3, awards: Award, community: HeartHandshake, downloads: Download,
};

export function CopilotPanel({
  messages,
  status,
  error,
  followups,
  onSend,
  onRetry,
  onStop,
  onClear,
  onMinimize,
  onClose,
  returnFocusRef,
}: CopilotPanelProps) {
  const isMobile = useMediaQuery("(max-width: 639px)");
  useLockBodyScroll(isMobile);

  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const [draft, setDraft] = useState("");

  const streaming = status === "streaming";
  // Hide the empty placeholder assistant bubble; show the typing indicator instead.
  const visible = messages.filter(
    (m) => !(m.role === "assistant" && m.status === "streaming" && m.content.length === 0),
  );
  const showTyping =
    streaming &&
    messages.some((m) => m.role === "assistant" && m.status === "streaming" && m.content.length === 0);
  const hasMessages = messages.length > 0;

  // Focus input on open; trap Tab; Esc minimizes; return focus to launcher on close.
  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onMinimize();
        return;
      }
      if (e.key !== "Tab") return;
      const nodes = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!nodes || nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const launcher = returnFocusRef.current;
    return () => {
      document.removeEventListener("keydown", onKey);
      launcher?.focus?.();
    };
  }, [onMinimize, returnFocusRef]);

  // Auto-scroll to newest content.
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [visible.length, showTyping, status, messages]);

  function submit() {
    const text = draft.trim();
    if (!text || streaming) return;
    onSend(text);
    setDraft("");
  }

  function onInputKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  return (
    <>
      <motion.div
        aria-hidden
        onClick={onMinimize}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: EASE_SETTLE }}
        className="fixed inset-0 z-[85] bg-ink-strong/20 backdrop-blur-[2px]"
      />

      <motion.div
        ref={panelRef}
        id="esg-copilot-panel"
        role="dialog"
        aria-modal="true"
        aria-label={COPILOT_TITLE}
        initial={{ x: isMobile ? 0 : "100%", y: isMobile ? "100%" : 0, opacity: isMobile ? 0 : 1 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        exit={{ x: isMobile ? 0 : "100%", y: isMobile ? "100%" : 0, opacity: isMobile ? 0 : 1 }}
        transition={{ duration: 0.35, ease: EASE_SETTLE }}
        className={cn(
          "fixed z-[90] flex flex-col bg-white shadow-liftLg",
          "inset-0 sm:inset-y-0 sm:left-auto sm:right-0 sm:w-[440px]",
        )}
      >
        {/* Header */}
        <header className="flex items-center gap-3 border-b border-neutral-100 bg-brand-teal px-4 py-3.5 text-white">
          <span className="inline-flex h-9 shrink-0 items-center justify-center rounded-lg bg-white px-2">
            <img src="/assets/logo/sagility-logo.svg" alt="" className="h-3.5 w-auto" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-body font-semibold leading-tight">{COPILOT_TITLE}</p>
            <p className="truncate text-body-s text-white/70">{COPILOT_TAGLINE}</p>
          </div>
          <button
            type="button"
            onClick={onMinimize}
            aria-label="Minimize Copilot"
            className="inline-flex h-9 w-9 items-center justify-center rounded-btn text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Minus aria-hidden size={20} strokeWidth={1.75} />
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Copilot"
            className="inline-flex h-9 w-9 items-center justify-center rounded-btn text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X aria-hidden size={20} strokeWidth={1.75} />
          </button>
        </header>

        {/* Body */}
        <div
          className="flex-1 overflow-y-auto px-4 py-5"
          role="log"
          aria-live="polite"
          aria-atomic="false"
          aria-label="Conversation"
        >
          {!hasMessages ? (
            <div className="flex flex-col">
              <div className="mb-6 flex flex-col items-start">
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-card-lg bg-brand-mintTint/50 text-brand-teal">
                  <Sparkles aria-hidden size={26} strokeWidth={1.5} />
                </span>
                <p className="text-body-l font-light leading-relaxed text-ink-strong">{COPILOT_WELCOME}</p>
              </div>
              <p className="mb-3 text-overline uppercase text-brand-tealMid">Executive actions</p>
              <ul className="grid grid-cols-2 gap-2">
                {EXECUTIVE_ACTIONS.map((action) => {
                  const Icon = EXEC_ICONS[action.icon];
                  return (
                    <li key={action.id}>
                      <button
                        type="button"
                        onClick={() => onSend(action.prompt)}
                        className={cn(
                          "group flex w-full items-center gap-2.5 rounded-card border border-neutral-100 bg-surface px-3 py-2.5 text-left",
                          "text-body-s font-medium text-ink transition-all duration-200 ease-settle",
                          "hover:-translate-y-0.5 hover:border-brand-mint hover:shadow-lift",
                        )}
                      >
                        <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-btn bg-brand-mintTint/50 text-brand-tealMid">
                          <Icon aria-hidden size={15} strokeWidth={1.75} />
                        </span>
                        {action.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {visible.map((m) => (
                <CopilotMessage key={m.id} message={m} />
              ))}

              {showTyping && (
                <div className="flex items-center gap-2 self-start rounded-card-lg border border-neutral-100 bg-surface px-4 py-3">
                  <TypingDots />
                  <span className="sr-only">Assistant is responding</span>
                </div>
              )}

              {status === "error" && error && (
                <div
                  role="alert"
                  className="flex items-start gap-3 rounded-card-lg border border-pillar-social/30 bg-pillar-social/5 px-4 py-3"
                >
                  <AlertCircle aria-hidden size={18} strokeWidth={1.75} className="mt-0.5 shrink-0 text-pillar-socialDeep" />
                  <div className="flex-1">
                    <p className="text-body-s text-ink">{error.message}</p>
                    {error.retryable && (
                      <button
                        type="button"
                        onClick={onRetry}
                        className="mt-2 inline-flex items-center gap-1.5 rounded-btn border border-neutral-100 bg-white px-3 py-1.5 text-body-s font-medium text-brand-tealMid transition-colors hover:border-brand-tealMid"
                      >
                        <RotateCcw aria-hidden size={14} strokeWidth={1.75} />
                        Try again
                      </button>
                    )}
                  </div>
                </div>
              )}

              {status === "idle" && !streaming && followups.length > 0 && (
                <div className="flex flex-col gap-2 pt-1">
                  <p className="flex items-center gap-1.5 text-body-s font-medium text-neutral-500">
                    <Lightbulb aria-hidden size={14} strokeWidth={1.75} />
                    Suggested follow-ups
                  </p>
                  <div className="flex flex-wrap gap-2" aria-label="Suggested follow-up questions">
                    {followups.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => onSend(q)}
                        className="rounded-full border border-neutral-100 bg-surface px-3 py-1.5 text-body-s font-medium text-brand-tealMid transition-colors hover:border-brand-mint hover:text-brand-teal"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={endRef} />
            </div>
          )}
        </div>

        {/* Clear conversation */}
        {hasMessages && (
          <div className="flex justify-end border-t border-neutral-100 px-4 py-2">
            <button
              type="button"
              onClick={onClear}
              className="inline-flex items-center gap-1.5 rounded-btn px-2 py-1 text-body-s font-medium text-neutral-500 transition-colors hover:text-brand-tealMid"
            >
              <Trash2 aria-hidden size={15} strokeWidth={1.75} />
              Clear conversation
            </button>
          </div>
        )}

        {/* Composer */}
        <div className="border-t border-neutral-100 bg-white p-3">
          <div className="flex items-end gap-2 rounded-card-lg border border-neutral-100 bg-surface p-2 focus-within:border-brand-tealMid">
            <button
              type="button"
              disabled
              aria-disabled="true"
              title="Attachments — coming soon"
              aria-label="Attach a file (coming soon)"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-btn text-neutral-300"
            >
              <Paperclip aria-hidden size={18} strokeWidth={1.75} />
            </button>
            <label htmlFor="copilot-input" className="sr-only">
              Ask the ESG AI Copilot
            </label>
            <textarea
              id="copilot-input"
              ref={inputRef}
              rows={1}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={onInputKeyDown}
              placeholder="Ask about ESG strategy, frameworks, KPIs…"
              className="max-h-32 min-h-[2.25rem] flex-1 resize-none bg-transparent py-1.5 text-body-s text-ink outline-none placeholder:text-neutral-300"
            />
            <button
              type="button"
              disabled
              aria-disabled="true"
              title="Voice input — coming soon"
              aria-label="Voice input (coming soon)"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-btn text-neutral-300"
            >
              <Mic aria-hidden size={18} strokeWidth={1.75} />
            </button>
            {streaming ? (
              <button
                type="button"
                onClick={onStop}
                aria-label="Stop response"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-btn bg-brand-teal text-white transition-colors hover:bg-brand-tealMid"
              >
                <Square aria-hidden size={16} strokeWidth={2} />
              </button>
            ) : (
              <button
                type="button"
                onClick={submit}
                disabled={draft.trim().length === 0}
                aria-label="Send message"
                className={cn(
                  "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-btn transition-colors",
                  draft.trim().length === 0
                    ? "bg-neutral-100 text-neutral-300"
                    : "bg-brand-teal text-white hover:bg-brand-tealMid",
                )}
              >
                <Send aria-hidden size={18} strokeWidth={1.75} />
              </button>
            )}
          </div>
          <p className="mt-2 px-1 text-center text-[0.6875rem] leading-tight text-neutral-300">
            Responses are AI-generated — verify key figures against the FY2025 report.
          </p>
        </div>
      </motion.div>
    </>
  );
}
