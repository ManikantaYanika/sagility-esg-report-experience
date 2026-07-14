# Phase 3 — Sagility ESG Knowledge Layer

**Date:** 14 July 2026
**Scope:** Ground the Copilot in the Sagility Sustainability Report using the project's **existing** data layer. No UI, routing, layout, colours, typography, animations, or existing components changed. Only the retrieval/grounding pipeline and the system prompt were added/updated.

---

## Files created (`src/lib/knowledge/`)

- `types.ts` — `KnowledgeArea`, `Citation`, `KnowledgeSection`, `Retrieval`.
- `sections.ts` — the **section registry**: 24 grounded sections assembled from `src/data/*` (company, about, approach, emissions, metrics, social, governance, awards, highlights, timeline, clients, leaders, community, downloads). No content is duplicated — each section serializes the datasets the site already ships, plus a citation path.
- `loader.ts` — exposes the registry (built once at import; no repeated parsing).
- `ranking.ts` — tokenizer (stopword-filtered) + keyword/title/area scoring, with phrase-match boosts (e.g. "scope 3", "net zero").
- `search.ts` — `retrieve(query, limit=4)`: intent detection → ranked top sections + deduped citations.
- `citations.ts` — citation dedupe + "AVAILABLE SOURCES" rendering.
- `index.ts` — `buildGroundedContext(history)`: builds the bounded context block + citations from recent turns.

## Files modified

- `src/lib/ai/prompts.ts` — Phase 3 grounded system prompt (answer only from provided report context; exact "couldn't find" fallback; executive style ≤500 words; mandatory `Source:` block).
- `src/lib/ai/chat.ts` — retrieves context via **dynamic import** of the knowledge layer, prepends it to the system prompt, and caps history to the **last 10 turns**.
- `src/data/copilot.ts` — suggested questions updated to the report-intelligence set.

## Knowledge architecture

Four small, modular units over the existing data — no new copy of the report:

1. **Registry** (`sections.ts`) — the report expressed as ~24 retrievable sections across all pillars and topics (Environment/Climate/Energy/Water/Waste/Emissions, Social/People/DEI/Learning/Wellbeing/Community/CSR, Governance/Board/Ethics/Risk/Cyber/Procurement, Materiality, SDGs, Awards, Leadership, Timeline, Clients, Downloads, Overview). Each carries `keywords`, grounded `content` (from `src/data`), and a `citation`.
2. **Ranking** (`ranking.ts`) — deterministic keyword scoring; no model call, no network.
3. **Search** (`search.ts`) — turns a query into the top‑N sections + citations.
4. **Context builder** (`index.ts`) — assembles only the top sections into a `SAGILITY REPORT CONTEXT` block plus an `AVAILABLE SOURCES` list.

## Retrieval flow

```
User question
   │  (last 2 user turns → query; last 10 turns → Claude for context)
   ▼
tokenize + intent detection          (ranking.ts)
   ▼
rank 24 sections, take top 4         (search.ts)
   ▼
buildGroundedContext()               (index.ts)
   │  SAGILITY REPORT CONTEXT (only the top sections' data)
   │  + AVAILABLE SOURCES (citation paths)
   ▼
system = ESG_SYSTEM_PROMPT + context (chat.ts)
   ▼
Supabase Edge proxy → Claude (stream)
   ▼
Grounded, executive, cited response
```

Only the relevant sections are sent — never the whole report — which bounds token usage per request.

## Citation strategy

- Each section owns a citation path (e.g. `Environment → Climate Strategy`). The context lists the exact `AVAILABLE SOURCES` for the retrieved sections.
- The model is instructed to end every substantive answer with a `Source:` block using **only** those provided paths (so citations can't be hallucinated), and to include page numbers only when they appear in the data's own `source` fields (which many KPI records carry, e.g. "SR FY2024–25, p.11").
- The "couldn't find" fallback carries no source block.

## Grounding guarantees

- The prompt forbids inventing metrics, statistics, awards, carbon numbers, employee counts, targets, or policies — Sagility-specific figures must come from the injected context.
- If nothing matches, the context says so and the model returns exactly: *"I couldn't find that information in the available Sagility Sustainability Report."*

## Performance improvements

- **Reuses the existing JSON/data layer** — zero duplicate content, zero duplicate parsing (registry built once at import).
- **Code-split:** the knowledge layer + the data it reads are pulled in via `import()` inside the stream path, so they ship in the lazy Copilot chunk — the **initial page bundle is unchanged at 316 KB / 102.74 KB gzip**.
- **Bounded context:** top-4 sections only; history capped to 10 turns → minimal tokens per request.

## Security

- API key remains a server-only secret (unchanged from Phase 2).
- The knowledge content is the report data already shipped publicly on the site — no new internal files are exposed. The system prompt is passed to the server proxy, not rendered in the UI or logged.

## Verification results

| Gate | Result |
|---|---|
| `tsc --noEmit` | **0 errors** (also from the host tree) |
| `eslint --max-warnings 0` | **0 errors / 0 warnings** |
| `vite build` | **Success**; knowledge confirmed **out** of the initial bundle |

**Awaiting your approval before Phase 4 (Executive ESG Intelligence).**
