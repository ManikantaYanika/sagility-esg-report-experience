# Phase 4 — Executive ESG Intelligence

**Date:** 14 July 2026
**Scope:** Turn the grounded Copilot into an executive ESG advisor — one-click executive actions, follow-up intelligence, and an executive response structure. Purely additive: no UI redesign, no routing/layout/colour/typography/animation/spacing changes, and the Phase 3 retrieval engine is reused unchanged (no data duplication, no knowledge-layer rebuild).

---

## Files created

- `src/data/executive.ts` — `ExecutiveAction` type + `EXECUTIVE_ACTIONS` (12 board-grade actions with an icon key and a concise grounded prompt each). No report data here.
- `src/lib/knowledge/followups.ts` — the follow-up engine: a compact area-keyword map + curated follow-up questions per area + `suggestFollowups(query)`. **Data-free** (imports only the tokenizer + types), so it adds nothing heavy to the initial bundle.

## Files modified

- `src/lib/knowledge/index.ts` — re-exports `suggestFollowups`.
- `src/lib/ai/prompts.ts` — added the executive response structure (Executive Summary → Key Insights → Business Impact → ESG Impact → Source) for summary/analysis requests.
- `src/hooks/useCopilot.ts` — computes and exposes context-aware `followups` after each completed answer (imports the data-free module directly to keep report data out of the main bundle).
- `src/components/copilot/CopilotPanel.tsx` — renders the executive action cards in the empty state and follow-up chips after answers (existing tokens, no visual redesign).
- `src/components/copilot/Copilot.tsx` — passes `followups` through from the hook.
- `src/data/copilot.ts` — removed the superseded plain suggested-prompts list.

## Executive action architecture

```
EXECUTIVE_ACTIONS (data/executive.ts)          suggestFollowups (knowledge/followups.ts)
        │  card: icon + label + prompt                  │  area-keyword match → curated Qs
        ▼                                               ▼
CopilotPanel empty-state grid  ──onSend(prompt)──►  useCopilot.send()
        ▲                                               │  (Phase 3 retrieval + streaming, unchanged)
        │  follow-up chips ◄── followups ◄──────────────┘  computed from the last user turn on completion
```

- Cards are presentational; clicking one sends a concise, human-readable request (e.g. *"Summarize Sagility's climate strategy, emissions, and science-based targets."*).
- The response **structure** is enforced by the system prompt, so the sent prompt stays clean while every executive answer comes back structured.
- The 12 actions: Executive Summary, Investor View, Board View, Climate Strategy, Environment, Social, Governance, Materiality, ESG KPIs, Awards, CSR & Community, Report Downloads — mapped to Lucide icons via a small `EXEC_ICONS` table in the panel.

## Prompt templates

- **Executive actions** — each `prompt` is a single-sentence grounded request; retrieval selects the relevant sections, and the system prompt applies the executive template.
- **System-prompt template (summary/analysis):**
  - **Executive Summary** — one or two lines
  - **Key Insights** — 3–5 grounded bullets
  - **Business Impact** — commercial/operational significance
  - **ESG Impact** — environmental/social/governance significance
  - **Source:** — report + section path(s), pages when present in the data
  - Narrow factual lookups answer directly + Source (headings aren't forced).
- Grounding is unchanged: figures only from the injected report context; the exact "couldn't find" fallback otherwise; last-10-turn conversation memory for follow-ups like "How has it improved?".

## Follow-up question strategy

- After each completed answer, the hook detects the dominant ESG **area** of the user's last turn (keyword scoring over the tokenizer) and surfaces up to 3 curated, relevant next questions as chips.
- Examples: after a Climate answer → *Show emissions data · Explain renewable energy · Compare FY24 vs FY25*; after Governance → *Explain Board structure · Show ethics & policies · Explain risk management*.
- Chips send as normal grounded questions, so they flow through the same retrieval + citation pipeline.

## Performance impact

- **Retrieval engine reused as-is** — no data duplication, knowledge layer untouched.
- Follow-up engine is **data-free** → the initial bundle is unchanged at **316 KB / 102.84 KB gzip**.
- Executive cards + icons live in the already-lazy Copilot panel chunk (53 KB gzip, loads on first open). Report data remains code-split out of the initial bundle (verified).

## Accessibility

- Executive cards and follow-up chips are native `<button>`s inside the existing focus-trapped dialog; they join the tab order, keep visible focus, and are labelled (`aria-label="Suggested follow-up questions"`). The `aria-live` conversation log, Esc-to-minimize, and focus-return behaviours from Phase 1 are intact.

## Security

- No prompts rendered in the UI or logged; API key remains a server-only secret; the knowledge content is the already-public report data (no internal files exposed).

## Verification results

| Gate | Result |
|---|---|
| `tsc --noEmit` | **0 errors** (also from the host tree) |
| `eslint --max-warnings 0` | **0 errors / 0 warnings** |
| `vite build` | **Success**; initial bundle unchanged; report data confirmed out of it |

**Awaiting your approval before Phase 5 (ESG Analytics).**
