# Phase 2 — ESG AI Copilot (Anthropic Claude Integration)

**Date:** 14 July 2026
**Scope:** Make the approved Phase 1 Copilot a functional AI assistant powered by Anthropic Claude. UI design, layout, animations, routing, and every existing page are unchanged — only AI behaviour was integrated, and all business logic was moved out of the components into a service layer + hook.

---

## 1. Files created

**AI service layer** (`src/lib/ai/`)
- `types.ts` — conversation + wire types and the enterprise error model (safe, user-facing messages; raw API errors never surfaced).
- `prompts.ts` — the executive ESG system prompt (concise, bullet/table-first; explicitly no fabricated Sagility figures; states when report-specific data isn't available — pre-RAG).
- `anthropic.ts` — frontend transport. Streams from the server proxy; handles timeout, abort, and status→error mapping. **Never holds the API key.**
- `chat.ts` — orchestration entry point (assembles system prompt + trimmed history, delegates streaming).

**Hook**
- `src/hooks/useCopilot.ts` — owns all conversation state, streaming lifecycle, retry, stop, and clear. Components contain no business logic.

**UI helper**
- `src/components/copilot/Markdown.tsx` — Markdown renderer (react-markdown + remark-gfm) styled with the site's tokens. Tables, bullet lists, bold, and links supported; raw HTML disabled; links constrained to http(s) and opened safely.

**Secure backend proxy**
- `supabase/functions/esg-copilot/index.ts` — Deno Edge Function. The **only** place `ANTHROPIC_API_KEY` lives. Calls the Anthropic Messages API with streaming and relays plain-text deltas to the browser.

**Config**
- `.env.example` — documents `ANTHROPIC_API_KEY` (server secret) and `VITE_COPILOT_ENDPOINT` (public proxy URL).

## 2. Files modified

- `src/components/copilot/Copilot.tsx` — consumes `useCopilot`; **code-splits** the panel (lazy) so react-markdown never ships in the initial bundle.
- `src/components/copilot/CopilotPanel.tsx` — added streaming, typing indicator, loading/stop, retry, and elegant error states; markdown output. Layout/styling unchanged.
- `src/components/copilot/CopilotMessage.tsx` — assistant bubbles render Markdown + a streaming caret; copy appears once complete.
- `src/data/copilot.ts` — trimmed to UI copy (types moved to `lib/ai/types.ts`; Phase 1 placeholder removed).
- `package.json` / `package-lock.json` — added `react-markdown@9`, `remark-gfm@4`.
- `.gitignore` — ignore `.env`.

## 3. Architecture summary

Clean separation across four layers:

1. **Presentation** (`components/copilot/*`) — launcher, panel, bubbles, markdown. Pure UI; no fetch, no keys, no logic.
2. **State** (`hooks/useCopilot.ts`) — conversation history, streaming assembly, status (`idle | streaming | error`), retry/stop/clear.
3. **Domain/service** (`lib/ai/*`) — prompt, request shaping, transport, typed errors. Swappable and testable.
4. **Secure backend** (`supabase/functions/esg-copilot`) — holds the secret, talks to Anthropic, streams back.

Security posture: the API key is a server-only Supabase secret — never `VITE_`-prefixed, never in the bundle, never logged. The browser only knows the public proxy URL. The proxy relays sanitized status codes; raw upstream bodies are never forwarded.

Performance: the markdown dependency is lazy-loaded with the panel (initial shared bundle stays at ~102 KB gzip; the panel/markdown chunk ~52 KB gzip loads only on first open). History is capped to the last 20 turns per request. Streaming renders tokens incrementally.

Pre-RAG (this phase): the assistant answers general ESG questions and is instructed to clearly state when Sagility report-specific figures aren't available, and never to invent them. The grounded knowledge layer is Phase 3.

## 4. API flow

```
User types / clicks a suggested prompt
        │
        ▼
CopilotPanel (UI)  ──onSend──►  useCopilot (state)
        ▲                              │  append user msg + empty assistant msg
        │  tokens (setState)           ▼
        │                       chat.streamChat(history)
        │                              │  system prompt + trimmed history
        │                              ▼
        │                       anthropic.streamAnthropic()
        │                              │  fetch POST  (NO key)
        │                              ▼
        │              ┌───────────────────────────────────┐
        │              │  Supabase Edge Function            │
        │              │  esg-copilot  (holds ANTHROPIC_API_KEY)
        │              │      │  x-api-key + anthropic-version
        │              │      ▼                              │
        │              │  Anthropic Messages API (stream)   │
        │              │      │  SSE content_block_delta     │
        │              │      ▼  → plain-text token stream   │
        │              └───────────────┬───────────────────┘
        │                              │ ReadableStream (text/plain)
        └──────────────────────────────┘
   onToken() appends each chunk → bubble grows live → status: complete
   (errors → typed CopilotError → elegant message + Try again)
```

## 5. Verification results

| Gate | Command | Result |
|---|---|---|
| TypeScript | `tsc --noEmit` | **0 errors** (also re-run from the host tree) |
| Lint | `eslint src --max-warnings 0` | **0 errors / 0 warnings** |
| Production build | `vite build` | **Success** — shared bundle 316 KB (102.75 KB gzip); `CopilotPanel` lazy chunk 172 KB (52 KB gzip) |
| Secret check | grep `src` for `sk-ant` / key literals | **None** (only a doc comment names the env var) |

## Setup to go live (your steps — nothing is deployed automatically)

1. `npm install` (pulls the two new markdown packages).
2. Deploy the proxy: `supabase functions deploy esg-copilot`.
3. Set the secret: `supabase secrets set ANTHROPIC_API_KEY=sk-ant-…` (optionally `ANTHROPIC_MODEL`).
4. Put the deployed function URL in `.env` as `VITE_COPILOT_ENDPOINT=…`, then rebuild.

Until `VITE_COPILOT_ENDPOINT` is set, the Copilot degrades gracefully: it shows a clear "not connected to an AI service yet" message instead of erroring — the UI stays fully functional.

**Awaiting your approval before Phase 3 (Sagility ESG Knowledge Layer / RAG).**
