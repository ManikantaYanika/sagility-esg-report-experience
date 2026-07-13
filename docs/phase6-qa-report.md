# Phase 6 — Public Pages QA & Polish Report

**Date:** 14 July 2026
**Scope:** Final quality-assurance pass over the 11 non-hero public-facing pages. No page rebuilds — the four chapter pages (Home, Environment, Social, Governance) were out of scope and untouched.
**Method:** Audited each page against the approved `design-system.md` quality bar on four axes — accessibility (heading order, landmarks, ARIA, focus, form semantics), responsiveness, motion consistency, and data accuracy versus the FY2024–25 / FY2024 reports.

---

## Headline finding

All 15 routes were already implemented to final quality before this pass — not just the four named chapter pages. There were **no unbuilt "remaining pages."** The work below is therefore a QA-and-polish pass, not new page construction. The blueprint's own Phase 6 ("Founder review & handover") remains open as a separate track (see *Deferred items*).

---

## Defects fixed

### 1. Missing `<h1>` on both nested-route pages — WCAG 1.3.1 / 2.4.6 (real defect)

`MaterialityPage` and `CommunityPage` use the breadcrumb + `SectionHeader` pattern instead of a teal hero. Because `SectionHeader` hard-coded an `<h2>`, these two pages had **no `<h1>` at all** — the document lost its top-level heading, which screen-reader users rely on for page identity.

**Root cause:** `SectionHeader` was a fixed-`<h2>` primitive; the hero-less pages had nowhere to place an `<h1>`.

**Fix:** Added an optional `as?: "h1" | "h2"` prop to `SectionHeader` (defaults to `"h2"`, so every existing call is unchanged), then set the primary header on both pages to `as="h1"`. Visual size is intentionally unchanged — this is a semantics-only fix, preserving the approved compact sub-page look.

- `src/components/primitives/SectionHeader.tsx` — new `as` prop, dynamic title tag.
- `src/pages/MaterialityPage.tsx` — `as="h1"` on primary header.
- `src/pages/CommunityPage.tsx` — `as="h1"` on primary header.

### 2. Invalid `<dl>` nesting in stat bands — HTML validity / 1.3.1 (minor defect)

Four stat bands wrapped `<Stat>` components (which render `<p>` elements) directly inside `<motion.dl>`. A `<dl>` may only contain `<dt>`/`<dd>` groups, so this was invalid markup that conveyed a false "description list" semantic to assistive tech.

**Fix:** Converted these `<dl>` wrappers to `<div>` (the honest container for the current markup). The genuine `<dl><dt><dd>` usage in `CommunityPage`'s program-outcomes block was correct and left intact.

- `src/pages/AboutPage.tsx` (financials), `src/pages/CommunityPage.tsx` (volunteering), `src/pages/ClientsPage.tsx` (client stats), `src/pages/HighlightsPage.tsx` (KPI wall).

### 3. Ambiguous "Download" link names — WCAG 2.4.4 (minor defect)

The two report-download links had identical accessible names ("Download (14.9 MB)" / "(24.9 MB)"), indistinguishable out of context in a screen-reader link list.

**Fix:** Added `aria-label={`Download ${title} (${meta})`}` to each link.

- `src/pages/DownloadsPage.tsx`.

### 4. Pre-existing typecheck errors (blockers)

Two unused imports failed `tsc` (they predate this pass):

- `src/pages/ContactPage.tsx` — removed unused `SectionHeader` import.
- `src/components/features/MaterialityMatrix/MaterialityMatrix.tsx` — removed unused `cn` import (and stripped trailing NUL bytes that were corrupting the file).

---

## Pages audited clean (no changes needed)

`ApproachPage`, `EsgOverviewPage`, `LeadershipPage`, `TimelinePage`, and `ContactPage`'s form. Notable strengths already in place: bound `<label htmlFor>` + `required` + `role="status"` on the contact form; `role="group"` / `aria-pressed` filter buttons and `aria-live` results list on Highlights; `caption` + `scope` on the Approach stakeholder table; correct `figure`/`blockquote`/`figcaption` on testimonials; safe `rel="noopener noreferrer"` + "(opens in a new tab)" external links; global `:focus-visible` ring, skip link, and `MotionConfig reducedMotion="user"` covering `prefers-reduced-motion` site-wide.

---

## Data accuracy (spot-checks vs reports / data files)

| Claim (page) | Verified |
|---|---|
| Timeline "thirteen milestones" | 13 entries (3 Foundation · 5 Baselining · 4 Validation · 1 Ambition) ✓ |
| Materiality "Ten goals in focus" | 10 SDG focus entries ✓ |
| Highlights "Nineteen awards" | 19 award records ✓ |
| Highlights "Twelve numbers" (pillar wall) | 3 pillars × 4 metrics = 12 ✓ |
| Downloads file sizes & paths | FY25 ≈14.9 MB, FY24 ≈24.9 MB; paths match `/public/reports/*` ✓ |

---

## Recommendations / deferred items (not fixed — need a decision or are out of page scope)

1. **Focus-ring contrast (global).** The site-wide `:focus-visible` ring uses `brand-mint` (#00CBA1), ~2.2:1 against white — likely below the WCAG 1.4.11 3:1 bar for non-text focus indicators. Fixing means changing a global token that also affects the four approved chapter pages, so it's a design decision, not a page-level edit. Suggested: use `brand-tealMid` for the ring on light surfaces (keep mint on dark).
2. **Highlights empty-state.** The "No awards match" message sits just outside the `aria-live` region; moving it inside would announce filter-empty states. Low priority.
3. **Blueprint Phase 6 proper (handover).** Still open and page-independent: `robots.txt` + `sitemap.xml`, `noindex` on staging, print styles, README/handover docs, staging deploy.

---

## Environment notes (not code issues)

- **Sandbox mount truncates freshly host-edited files**, so an in-sandbox `tsc`/`vite build` on the edited files is unreliable here (it reports phantom "unclosed tag" errors on the exact 8 files that were edited, while every unedited file parses clean). The host files are complete and valid — confirmed by direct reads. **Please run `npm run typecheck` locally to confirm green.** Pre-edit typecheck was clean except the two unused-import errors now removed, and every change is a minimal, balanced edit.
- **`vite build`** fails in this Linux sandbox only because `node_modules` was installed on Windows (missing `@rollup/rollup-linux-x64-gnu`). Re-run `npm install` on the deploy OS; not a code problem.
