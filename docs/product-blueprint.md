# Sagility ESG Report Website — Product Blueprint

**Version 1.0 — July 2026 · Single Source of Truth for Development**
**Companion documents:** `content-model.md` (all content & data, verified against source reports) · `design-system.md` (tokens, components, motion)
**Scope guardrail:** Frontend prototype for internal founder approval. No auth, CMS, backend, or user management. Built to production quality so it can graduate to the official site with minimal rework.

---

## 1. Final Website Sitemap

```
sagility-esg/
├── /                        Home
├── /about                   About Sagility
├── /approach                Sustainability Strategy & ESG Approach
│   └── /approach/materiality    Materiality & SDG Alignment
├── /esg-overview            ESG Scorecard (all KPIs, FY24 vs FY25)
├── /environment             Environment pillar
├── /social                  Social pillar
│   └── /social/community        CSR & Community Impact
├── /governance              Governance pillar
├── /clients                 Client Partnerships & Excellence
├── /leadership              Leadership Messages
├── /highlights              ESG Highlights (fast executive view)
├── /timeline                Sustainability Timeline (2022 → 2034)
├── /downloads               Reports & Downloads
├── /contact                 Contact & Feedback
└── /404                     Not Found (branded)
```

15 routes. Primary nav exposes 7 items; everything else is reachable within one click via mega-panel groups, footer, or contextual cross-links. Rationale for consolidating the original 13-page request is documented in content-model §13 and was approved with the content model.

**Primary navigation (desktop):**
Home (logo) · About · Our Approach ▾ · Environment · Social · Governance · More ▾ (Highlights, Leadership, Timeline, Clients, Downloads, Contact) · **[Download Report]** persistent CTA

---

## 2. Page-by-Page Information Architecture

Every pillar page follows the **Chapter Pattern** (mirrors the report's own chapter anatomy — a deliberate brand-consistency device):
`Hero → Key Highlights stat band → SDG + Material Topic chips → Content sections → Impact story / case study → Cross-link footer`

### 2.1 Home `/`
1. **Hero** — full-bleed dark-teal surface, animated thin-line wave motif, theme statement: "Empowering Progress: People, Partnerships, Purpose." Sub-line + two CTAs (Explore Our Approach / Download Report FY2025)
2. **Key numbers band** — 4 animated counters: 38,754 employees · 61% women · 30% renewable energy · 0 data breaches
3. **ESG pillar cards** — 3-up (Environment / Social / Governance), pillar-colored, headline stat each, links to pillar pages
4. **Commitment strip** — SBTi validated targets (−54.6% / −32.5% by FY2034) with progress visual
5. **CEO quote block** — stripe glyph, portrait, link to /leadership
6. **Highlights carousel** — 5–6 achievement cards (NSE/BSE listing, DNV assurance, CDP D→B, ISO 45001, 63,170 volunteer hours)
7. **Timeline teaser** — horizontal preview of 4 milestones, link to /timeline
8. **Awards strip** — logo/name marquee, link to /highlights#awards
9. **Pre-footer CTA band** — photographic, "Read the full FY2024–25 Report"

### 2.2 About `/about`
1. Hero — "A healthcare-focused company with care in its DNA"
2. At a glance — vision, mission, values (5 value chips)
3. Sagility in numbers — 8-stat grid (25 yrs, 5 geographies, 23 centres, 119M+ claims, 78M+ interactions, USD 5B+ recoveries, 38 new clients, ₹55,699mn revenue)
4. Services grid — 6 service pillar cards
5. Global footprint — interactive map, employee counts per geography
6. Listing milestone callout — NSE/BSE FY25
7. Cross-links → Our Approach, Leadership

### 2.3 Our Approach `/approach`
1. Hero — CFO/Sustainability Head pull-quote
2. Journey origin narrative (2022 divestiture → Big 4 diagnostic → phased roadmap)
3. Three commitments — E/S/G commitment cards with Key Actions accordions
4. Sustainability governance — interactive 3-tier org diagram (Committee → Core Group → Working Groups)
5. Stakeholder engagement — 5-group table/cards
6. ESG budgeting note + OGSM framework mention
7. Deep-link card → Materiality & SDGs

### 2.4 Materiality & SDGs `/approach/materiality`
1. Hero — "17 material topics that steer our strategy"
2. **Interactive materiality matrix** (signature component) — scatter, quadrant labels, hover/tap topic cards with risk/opportunity classification and mitigation summary
3. Topic list fallback — accessible table grouped by pillar
4. **SDG alignment grid** — official UN tiles; selecting an SDG filters linked topics & programs
5. Methodology note — 3-year cycle, FY27–28 refresh, GRI alignment

### 2.5 ESG Overview `/esg-overview`
1. Hero — "Our performance, transparently"
2. **KPI scorecard** — the centerpiece: three pillar-grouped tables, FY23–24 vs FY24–25 with delta chips, source footnotes, context notes on sensitive metrics (attrition, water restatement, Scope 2 location-based)
3. Assurance statement callout — DNV ISAE 3000 (Revised)
4. Reporting frameworks strip — GRI, BRSR, UNGC, SDGs, GHG Protocol, CDP, EcoVadis logos
5. Download CTA

### 2.6 Environment `/environment`
1. Chapter hero — pillar green, Ganesh Pandit pull-quote
2. Key highlights band — 18,072 tCO₂e Scope 1&2 · −42% Scope 1 · +23.4% renewables · −10.3% Scope 3 · 93,189 GJ energy
3. SDG + material topic chips (Climate Change, Energy, Water & Waste)
4. **SBTi commitment section** — validated targets, bullet-chart progress vs target (both beyond target FY25)
5. **5D Decarbonization Model** — interactive wheel (Decrease, Drive, Deepen, Deploy, Design)
6. Emissions deep-dive — grouped bar (scopes YoY), donut (Scope 3 categories), donut (Scope 1&2 sources), intensity trend
7. Energy — regional split visual, renewable mix stacked bar, key initiatives list
8. Water stewardship — stress-zone stacked bar with restatement footnote, conservation initiatives
9. Waste — categories YoY bar, 41.7% diversion stat, e-waste circularity narrative
10. Climate risk & resilience — physical/transition risk summary, CDP D→B, SR26 forward note
11. Cross-link → Social

### 2.7 Social `/social`
1. Chapter hero — pillar orange, Tina Vas pull-quote
2. Key highlights band — 38,754 · 61% women · 115 training hrs/employee · 254 PwD · eNPS 51 · 96.7% local senior hires
3. SDG + material topic chips
4. Talent & learning — lifecycle visual, 4.4M training hours, STRIDE/PACE/STEP, S.H.E. Leads
5. DEI — stats trio (61% / 19% leadership / 1.46 ratio), DEI Council, ERGs, LGBTQ+ inclusion, PwD
6. Wellbeing & engagement — program cards (HUMM Care, EAP, Refyne, VoE/ESAT "You Spoke, We Heard"), engagement scale stats
7. Health & safety — ISO 45001 100%, zero fatalities, LTIFR 0.067
8. Human rights — 100% assessment/training stats, wage ratios, grievance 470/460
9. Deep-link card → CSR & Community Impact
10. Cross-link → Governance

### 2.8 CSR & Community `/social/community`
1. Hero — Aparna Rao Basu pull-quote, "CSR is who we are"
2. Volunteering stat band — 18,645 volunteers · 63,170 hours · 56% participation · ₹7.91mn spend
3. CSR strategy — 3 priorities diagram + 6 focus areas
4. **Three flagship program sections** — each: program stats + human impact story cards (Kariyamma/Swapna · Anjali/Ramesh · Jeevitha/Harish) + SDG chips
5. Governance of CSR — CFO-chaired Global CSR Forum, Section 135 compliance
6. Path forward — FY26 planned initiatives
7. CSR awards strip

### 2.9 Governance `/governance`
1. Chapter hero — pillar blue, General Counsel pull-quote
2. Key highlights band — 9 directors · 5 independent · 2 women · 0 breaches · 98.6% ethics training · 43,659 privacy training hrs
3. SDG + material topic chips
4. Board of Directors — profile grid + **interactive competency matrix**
5. Committees — 4 committee cards (all independent-chaired)
6. Sustainability oversight — 3-tier structure recap (links /approach)
7. Risk management — 4-phase process visual + 17-topic risk/mitigation accordion
8. Ethics & policy framework — 11-policy icon grid, values triad, whistleblower mechanism
9. Data privacy & cybersecurity — CISO quote, zero-breach stats, HIPAA/Minimal Data Usage narrative
10. Responsible procurement — supplier stats (1,491 / 1,327 trained / 95% SCoC acceptance), 9-area code grid
11. Cross-link → ESG Overview

### 2.10 Clients `/clients`
1. Hero — "Partnerships measured in decades"
2. Stats — CSAT 53 · 38 new clients · 25-year & 10-year milestone cards
3. Customer Summit narrative — ~100 leaders, GenAI agenda
4. **Testimonial carousel** — 9 quotes in 3 themed groups, role-only attribution
5. Cross-link → About / Downloads

### 2.11 Leadership `/leadership`
1. Hero — "Voices leading our journey"
2. Featured messages — CEO, Committee Chairperson (Dr. Shalini Sarin), CFO/Sustainability Head: portrait, full message (expandable), signature
3. Section-lead quote grid — 6 leaders with role + pillar link (CHRO, DEI/CSR Head, Sustainability SVP, General Counsel, CISO, Procurement Head)

### 2.12 Highlights `/highlights`
1. Hero — "FY2024–25 at a glance"
2. Commitments recap — 3 pillar commitment cards
3. Key numbers — full E/S/G stat wall (the report's "Key Numbers" page as an interactive dashboard)
4. **Awards & recognition grid** — filterable by category (Workplace & Culture / Women & DEI / CSR & Sustainability / L&D) and year (2023–2025)

### 2.13 Timeline `/timeline`
1. Hero — "From foundation to 2034"
2. **Scroll-driven horizontal timeline** — 19 milestones (2022 divestiture → FY2034 SBTi targets), era-grouped (Foundation ’22 / Baselining ’23 / Validation ’24–25 / Ambition ’34), mint nodes, detail cards
3. Accessible fallback — chronological list view toggle

### 2.14 Downloads `/downloads`
1. Hero — "Reports & disclosures"
2. Report cards — FY2024–25 (assured) + FY2024 (inaugural) with cover thumbnails, file meta, download buttons
3. Related disclosures — GRI Content Index, Independent Assurance Statement (anchor-linked PDF sections)
4. Reporting suite note — frameworks list, contact for feedback

### 2.15 Contact `/contact`
1. Hero — "We welcome your feedback"
2. Stakeholder routes — feedback mechanism copy from report, HQ address card, corporate site + careers links
3. Simple mailto/link-based contact (no form backend in scope; see Risks §20)

---

## 3. User Journeys

### Persona A — The Founder / Executive Reviewer (primary; approval gatekeeper)
Journey: Home hero (10s brand impression) → scrolls key numbers → clicks Environment (deepest chapter) → skims SBTi + 5D wheel → /highlights for the full picture → /downloads to confirm report fidelity.
**Design implications:** first 10 seconds must be flawless; Home + Environment set the quality bar; every stat must match the report exactly (they will check).

### Persona B — Client Stakeholder (US payer/provider exec)
Journey: lands via shared link on /esg-overview or /governance → scans zero-breach & compliance stats → /clients testimonials → /downloads for procurement due-diligence pack.
**Design implications:** Governance page must feel bulletproof; scorecard needs print-friendly styling; downloads must be one click.

### Persona C — Investor / ESG Analyst
Journey: /esg-overview scorecard → materiality matrix → SBTi targets → assurance statement → GRI index download.
**Design implications:** data density is a feature, not a bug, on /esg-overview; footnotes and framework references visible, not hidden.

### Persona D — Employee / Candidate
Journey: Home → /social (culture, benefits, DEI) → /social/community stories → /highlights awards.
**Design implications:** human photography and impact stories carry this journey; awards grid is a trust anchor.

### Persona E — Regulator / NGO / Community Partner
Journey: search or direct link → pillar page → policy framework → contact.
**Design implications:** policies and grievance mechanisms must be findable from Governance in ≤2 clicks.

**Cross-journey rule:** every page ends with a contextual next step (cross-link footer) — no dead ends.

---

## 4. Navigation Flow

```
                    ┌────────────────────── Header (persistent) ──────────────────────┐
                    │ Logo → /        Primary items        [Download Report] CTA      │
                    └──────────────────────────────────────────────────────────────────┘
Home ──► pillar cards ──► Environment ◄──► Social ◄──► Governance   (linear chapter flow
  │                            │              │             │         via cross-link footers,
  │                            └──────────────┴─────────────┘         mirroring report order)
  ├──► Approach ──► Materiality ──► (SDG tile) ──► filtered programs on pillar pages
  ├──► Highlights ──► (award category) ──► anchor sections
  ├──► Timeline ──► (milestone) ──► related page deep links
  └──► Downloads ◄── every page's CTA band
```

- **Mega-panel** (Our Approach ▾ / More ▾): grouped links with one-line descriptions; keyboard navigable; closes on Esc/blur.
- **Breadcrumbs** on nested routes (/approach/materiality, /social/community).
- **Scroll-progress bar** in pillar color under header on chapter pages.
- **In-page sub-nav** (sticky, right rail on desktop / dropdown on mobile) for long chapters (Environment, Social, Governance) — section anchors with scroll-spy.
- **Footer** replicates full sitemap in 4 groups; Back-to-top control.
- **404** offers sitemap links + search-free recovery (no site search in v1 — see Critical Review).

---

## 5. Component Hierarchy

```
App
├── Providers (Router, MotionConfig, Theme/PrefersReducedMotion context)
├── Layout
│   ├── Header
│   │   ├── Logo · NavItem[] · MegaPanel (NavGroup[] → NavLink[])
│   │   ├── DownloadCTA · MobileMenuToggle
│   │   └── MobileNavOverlay (AccordionGroup[])
│   ├── ScrollProgressBar (pillar-aware)
│   ├── PageShell (route outlet + PageTransition)
│   └── Footer (FooterColumn[] · SocialRow · LegalBar · BackToTop)
├── Page templates
│   ├── ChapterPage (Environment/Social/Governance/Community)
│   │   ├── ChapterHero (PillarOverline · PullQuote · HeroMedia)
│   │   ├── StatBand (StatTile[] w/ CountUp)
│   │   ├── ChipRow (SDGChip[] · TopicChip[])
│   │   ├── ContentSection[] (SectionHeader · Prose · MediaBlock | ChartBlock)
│   │   ├── StoryCard[] / CaseStudy
│   │   └── CrossLinkFooter
│   ├── StandardPage (About/Approach/Clients/Leadership/…)
│   └── UtilityPage (Downloads/Contact/404)
└── Feature components (composed within sections)
    ├── Charts: GroupedBar · Donut · StackedBar · BulletChart · IntensityTrend
    ├── MaterialityMatrix (Scatter · TopicCard · QuadrantLabels · TableFallback)
    ├── TimelineRail (EraGroup · MilestoneNode · MilestoneCard · ListFallback)
    ├── FiveDWheel (Segment[] · DetailPanel)
    ├── FootprintMap (GeoPin[] · RegionTooltip)
    ├── CompetencyMatrix (interactive grid)
    ├── SDGGrid (SDGTile[] → program filter)
    ├── TestimonialCarousel (QuoteCard[] · StripeGlyph · Controls)
    ├── AwardsGrid (AwardCard[] · CategoryFilter · YearFilter)
    ├── KPIScorecard (PillarTable[] · DeltaChip · SourceFootnote · ContextNote)
    ├── LeaderCard / MessageAccordion
    ├── ProgramCard · ServiceCard · PolicyIconGrid · CommitteeCard
    └── DownloadCard · ContactCard
```

Primitives beneath everything (design-system §6): Button (5 variants), Card, Chip, Stat, SectionHeader, Prose, Icon, Accordion, Media, Skeleton.

---

## 6. Layout Strategy

- **Canvas:** white/`surface` alternating section bands; dark `brand-deep-teal` reserved for Home hero, chapter heroes (with pillar accent), pre-footer CTA bands, and footer — dark surfaces bookend, never dominate.
- **Grid:** 12-col / 1280 content / 1440 bleed (design-system §5.2). Editorial 7/5–5/7 alternation for narrative sections; full-width only for heroes, stat bands, timeline, CTA bands.
- **Chapter Pattern** enforced across all four chapter pages — users learn the page grammar once.
- **Density zones:** marketing-light (Home, About, Clients) vs data-dense (ESG Overview, Materiality) — both use the same primitives, different section rhythm (96–128px vs 64px vertical).
- **Print consideration:** /esg-overview and /highlights get print stylesheets (analyst persona prints scorecards).

## 7. Responsive Strategy

- **Breakpoints:** 640 / 768 / 1024 / 1280 / 1536 (design-system). Mobile-first build.
- **Navigation:** ≥1024 full header + mega-panels; <1024 overlay menu with accordions, Download CTA pinned bottom.
- **Stat bands:** 4→2→1; counters preserved.
- **Charts:** ≥768 full interactive; <768 simplified — donuts keep hover-free labeled legends, grouped bars become horizontal, materiality matrix defaults to table view with "explore matrix" opt-in (pinch/pan scatter is hostile on small screens).
- **Timeline:** horizontal scroll-driven on desktop; vertical stacked timeline on mobile (not a shrunken horizontal rail).
- **FiveDWheel:** radial on desktop; vertical accordion on mobile.
- **Tables (scorecard):** sticky first column + horizontal scroll with edge-fade affordance; never squashed.
- **Media:** heroes crop art-directed (3 aspect variants); portraits stay 1:1.
- **Touch:** all interactive targets ≥44px; hover-revealed info always has tap equivalent.

## 8. Animation & Interaction Strategy

Motion grammar from design-system §7 (calm, precise; 0.22/1/0.36/1 ease; nothing bounces). Applied:

| Moment | Treatment |
|---|---|
| Page transition | 250ms crossfade + 12px rise; scroll restored to top; pillar progress bar swaps color |
| Hero entrance | Line-motif slow drift (12s loop, parallax ±16px); headline words stagger-fade 80ms |
| Stat counters | Count-up 1.2s once at 50% visibility; delta chips pop 150ms after |
| Section reveal | 24px rise + fade, 80ms stagger within groups; opacity-only under reduced-motion |
| Charts | Draw-in on first view: bars grow 600ms, donuts sweep, bullet fills; tooltips 120ms |
| Materiality matrix | Points scale-in staggered by pillar; hover: point enlarges, topic card slides in; selection persists on click for keyboard parity |
| Timeline | Scroll-linked horizontal translate (Framer Motion useScroll); node pulse when era enters; reduced-motion → static list |
| 5D wheel | Segment hover expands 4%, detail panel crossfades |
| Cards | 4px lift + shadow 200ms; link arrows translate 4px |
| Mega-panel | 180ms fade+scale from 98%; no slide |
| Award filter | FLIP layout animation on re-sort (Framer Motion layout) |

**Rules:** every scroll-triggered animation fires once (no re-trigger nausea); `prefers-reduced-motion` collapses all transforms to opacity; no animation on data critical to comprehension (footnotes, context notes render static); total motion JS budget ≤ Framer Motion core (no GSAP/Lottie additions in v1).

---

## 9. Content Mapping (page ← content-model section)

| Route | content-model.md source | Data files consumed |
|---|---|---|
| `/` | §1 theme, §2 scale, §4 commitments, §11 timeline (teaser), §9 awards (strip) | metrics, timeline, awards, leadership |
| `/about` | §2 complete | metrics, services (new file: from §2), board (listing callout) |
| `/approach` | §4 strategy, journey, governance 3-tier, stakeholders | programs, materialTopics (teaser) |
| `/approach/materiality` | §4 materiality + §10 SDGs | materialTopics, sdgs |
| `/esg-overview` | §5–7 KPI tables, §15 cautions (context notes) | metrics (all pillars), emissions |
| `/environment` | §5 complete + §15 cautions 2–3 | emissions, metrics(env), programs(5D) |
| `/social` | §6 (excl. CSR) + §15 cautions 1, 4 | metrics(social), programs |
| `/social/community` | §6 CSR block, stories, forward plans | programs, metrics(csr), awards(csr) |
| `/governance` | §7 complete + §15 cautions 8 | board, policies, metrics(gov), materialTopics(risk matrix) |
| `/clients` | §8 complete + §15 caution 7 | testimonials, metrics(client) |
| `/leadership` | §3 complete | leadership |
| `/highlights` | §2 key numbers, §4 commitments, §9 awards | metrics, awards |
| `/timeline` | §11 complete | timeline |
| `/downloads` | §1 report facts, PDFs | downloads (new file) |
| `/contact` | §2 HQ, report feedback mechanism | — |

**Copy governance:** all narrative copy is drafted from report language (paraphrased for web tone, never inventing claims); every number renders from data files with `source` field (report + page) surfaced as footnote tooltips. §15 content cautions are implemented as `contextNote` fields on the relevant metric records — they ship with the data, so no page can display a sensitive stat without its context.

---

## 10. Technical Architecture

| Layer | Decision | Rationale |
|---|---|---|
| Build | **Vite 5 + React 18 + TypeScript (strict)** | Approved stack; fast HMR; strict TS enforces data-file contracts |
| Styling | **Tailwind CSS** with full design-token config (colors, type scale, spacing from design-system) | Tokens live in one file; no arbitrary values allowed in components (lint-enforced) |
| Motion | **Framer Motion** (MotionConfig at root for reduced-motion) | Approved; covers scroll-linked, layout, and variants needs — no second motion lib |
| Routing | **React Router v6** with lazy route elements | Route-level code splitting for free |
| Charts | **Recharts** for standard charts (bars/donuts/bullet); **custom SVG + Framer Motion** for signature pieces (materiality matrix, timeline, 5D wheel, map) | Recharts = speed + a11y hooks for commodity charts; signatures need bespoke craft |
| Icons | **lucide-react** + small custom SVG set | Matches site's outline language (design-system §4) |
| Data | Typed static modules in `src/data/` (content-model §14 schema) | Single-source content; FY26 update = data-only PR |
| SEO/meta | react-helmet-async + **prerendering at build** (vite-prerender-plugin or vite-ssg) | SPA alone can't serve crawlers/link-unfurls; prerendering keeps the static-host simplicity (see §17) |
| Quality | ESLint + Prettier + TypeScript strict; Vitest + Testing Library (data contracts, primitives); axe-core in CI; Lighthouse CI budgets | Enterprise hygiene without over-engineering a prototype |
| Hosting (when needed) | Static output → any origin. Recommended path: S3 + CloudFront (or the existing Ubuntu/Nginx box) — gzip/brotli, long-cache hashed assets, SPA fallback to index.html for non-prerendered deep links | Matches your AWS/Nginx environment; zero server runtime |

**Explicit non-goals (v1):** no Supabase/backend, no CMS, no i18n, no site search, no analytics (add consent banner only if/when analytics land).

## 11. Folder Structure

```
sagility-esg/
├── docs/                      ← this blueprint, content model, design system
├── public/
│   ├── fonts/                 (Poppins + Inter subsets, woff2, self-hosted)
│   ├── reports/               (FY24 + FY25 PDFs, compressed)
│   └── favicons, og-image
├── src/
│   ├── app/                   App.tsx, router.tsx, providers.tsx
│   ├── styles/                tailwind.css, tokens documented via config
│   ├── data/                  metrics.ts · emissions.ts · timeline.ts · awards.ts
│   │                          leadership.ts · programs.ts · materialTopics.ts
│   │                          testimonials.ts · sdgs.ts · board.ts · policies.ts
│   │                          services.ts · downloads.ts · nav.ts · types.ts
│   ├── components/
│   │   ├── primitives/        Button · Card · Chip · Stat · SectionHeader · Prose
│   │   │                      Icon · Accordion · Media · Skeleton · DeltaChip
│   │   ├── layout/            Header · MegaPanel · MobileNav · Footer
│   │   │                      PageShell · ScrollProgressBar · Breadcrumbs · SubNav
│   │   ├── sections/          ChapterHero · StatBand · ChipRow · ContentSection
│   │   │                      CrossLinkFooter · CTABand · QuoteBlock
│   │   └── features/          charts/ · MaterialityMatrix/ · TimelineRail/
│   │                          FiveDWheel/ · FootprintMap/ · KPIScorecard/
│   │                          TestimonialCarousel/ · AwardsGrid/ · SDGGrid/
│   │                          CompetencyMatrix/ · StoryCard/ · LeaderCard/
│   ├── pages/                 one file per route (compose sections + features)
│   ├── hooks/                 useCountUp · useScrollSpy · useInViewOnce · useMediaQuery
│   ├── lib/                   formatters (₹/%, tCO₂e), constants, seo helpers
│   └── assets/                svg motifs, custom icons, processed imagery
├── tests/                     data-contract tests, primitive tests, a11y smoke
└── config: vite, tailwind, tsconfig, eslint, lighthouse budgets
```

Import rule (enforced by lint): `pages → sections/features → primitives`; features never import pages; data imported only by pages and features. This keeps the dependency graph acyclic and components portable.

## 12. Reusable Component Library

**Primitives (11):** Button (primary / primary-on-dark / secondary / tertiary / download) · Card (surface, interactive, story variants) · Chip (SDG, topic, category, delta) · Stat (size s/m/l, pillar-colorable, count-up opt-in) · SectionHeader (overline + title + lead, align variants) · Prose (typographic container for narrative) · Icon (Lucide wrapper, size/stroke lock) · Accordion (single/multi) · Media (aspect-locked image w/ art-direction sources) · Skeleton · DeltaChip (▲▼ with semantic color + a11y label)

**Layout (8):** Header · MegaPanel · MobileNav · Footer · PageShell · ScrollProgressBar · Breadcrumbs · SubNav (scroll-spy)

**Sections (7):** ChapterHero · StatBand · ChipRow · ContentSection · QuoteBlock · CTABand · CrossLinkFooter

**Features (14):** chart set (GroupedBar, Donut, StackedBar, BulletChart) · MaterialityMatrix · TimelineRail · FiveDWheel · FootprintMap · KPIScorecard · TestimonialCarousel · AwardsGrid · SDGGrid · CompetencyMatrix · StoryCard · LeaderCard · ProgramCard · DownloadCard

**Contract conventions:** every feature that visualizes data accepts typed records from `src/data/` (no inline data); every interactive feature ships a non-interactive fallback (table/list) rendered for reduced-motion, small screens, or no-JS prerender; every stat-bearing component accepts optional `sourceNote` and `contextNote` and renders them accessibly.

≈40 components total — deliberately compact. New pages must compose existing pieces before proposing new ones (component-first governance).

## 13. State Management Strategy

State is deliberately thin — this is a content site, not an app:

| State | Mechanism |
|---|---|
| Route/page | React Router (URL is the source of truth) |
| Filters (awards category/year, SDG selection) | **URL search params** — shareable, back-button-safe |
| Mega-panel / mobile nav open | Local component state |
| Reduced-motion, viewport class | Context (single MotionPrefs provider) + matchMedia |
| Scroll spy / in-view | Per-component hooks (IntersectionObserver) |
| Matrix/timeline selection | Local state; selection reflected to URL hash for deep-linking |

**No Redux/Zustand/react-query — nothing to fetch, nothing global.** If a CMS lands later (see §20), introduce a data-fetch layer then, not preemptively. This is a scalability decision, not an omission: the cheapest state to maintain is the state you never create.

## 14. Asset Management Strategy

- **Fonts:** Poppins (200/300/400/700) + Inter (400/500/700), subset to Latin, self-hosted woff2, `font-display: swap`, preload the two above-the-fold faces. ~90KB total budget.
- **Report photography:** extract via `pdfimages` from both PDFs → quality screen (≥1200px usable) → curate shortlist mapped to pages → process to AVIF/WebP + JPEG fallback at 3 responsive widths → store in `src/assets/img/{page}/`. Licensing: Sagility-owned (their reports) — confirm with founder before external use (§20).
- **Line motifs:** recreate the corporate wavy-line backgrounds as original SVGs in teal/mint (design-system §8) — never rip the site's files.
- **SDG tiles:** official UN icon pack (usage permitted for non-commercial informational alignment; keep unmodified).
- **Award logos:** names + issuer text in v1 (logo licensing unverified); logo upgrades later.
- **PDFs:** compress FY24 (24.8MB) and FY25 (14.9MB) with Ghostscript targeting <8MB each without visible quality loss; hashed filenames, `Content-Disposition` friendly names.
- **OG images:** one branded 1200×630 per top-level route, generated from a template at build.
- **Naming:** `{context}-{subject}-{variant}.{ext}`, all lowercase, no spaces — enforced by a lint script.

## 15. Performance Strategy

**Budgets (Lighthouse CI, enforced per PR):** Performance ≥ 90 mobile / ≥ 95 desktop · LCP ≤ 2.0s (4G) · CLS ≤ 0.05 · TBT ≤ 200ms · initial JS ≤ 180KB gz · per-route chunk ≤ 80KB gz.

Tactics: route-level lazy loading (React Router lazy) · below-fold feature components lazy via dynamic import + IntersectionObserver (charts, matrix, map never in initial bundle) · Recharts imported per-chart, tree-shaken · hero images preloaded + fetchpriority=high, everything else lazy + explicit dimensions (CLS) · AVIF/WebP with srcset · font preload + swap · prerendered HTML gives instant first paint · CountUp/observer hooks share a single IntersectionObserver instance · no third-party scripts in v1 (the single biggest performance gift) · CI bundle-size report on every PR.

## 16. Accessibility Strategy

**Target: WCAG 2.2 AA.** This is a public ESG artifact — accessibility failures are a reputational contradiction (the Social pillar literally covers PwD inclusion; the corporate site publishes an Accessibility Statement).

- **Structure:** landmark regions, one h1/page, logical heading cascade (chapter pattern guarantees it), skip-to-content link, breadcrumbs with aria-current.
- **Color:** contrast rules from design-system §2.6 — mint never carries body text on light; pillar text uses darkened variants; delta chips pair color with ▲▼ glyphs + sr-only text (never color-alone semantics).
- **Motion:** `prefers-reduced-motion` collapses transforms (MotionConfig), timeline/matrix render static fallbacks; no autoplaying video; carousel is user-paced with pause-free design (no auto-rotate).
- **Data viz:** every chart has an accessible table alternative (toggle or visually-hidden), text summary of the takeaway, and aria-labelled series; the materiality matrix table fallback is the *canonical* accessible representation.
- **Keyboard:** full traversal — mega-panel (arrow keys + Esc), carousel (buttons, not swipe-only), matrix points focusable with visible focus ring (2px mint, 2px offset), filter chips are real buttons with aria-pressed.
- **Forms/links:** download links announce file type + size; external links announce new-tab behavior.
- **Testing:** axe-core automated in CI + manual screen-reader pass (NVDA + VoiceOver) on Home, one chapter, scorecard, and both signature interactives — logged in QA checklist per milestone.

## 17. SEO Strategy

- **Prerendering (decisive):** all 15 routes prerendered to static HTML at build — crawlers and link-unfurlers (LinkedIn especially, given persona B/C sharing) see full content without JS. This single decision resolves the SPA SEO problem.
- **Meta:** unique title (`{Page} | Sagility ESG Report FY2024–25`) + description per route from a central seo config; canonical URLs; OG + Twitter cards with branded images.
- **Structured data:** `Organization` (site-wide), `BreadcrumbList` (nested routes), `Article`-like `WebPage` metadata; awards as `Award` markup on /highlights (low-effort credibility signal).
- **Semantics:** prose in real HTML (no text-in-canvas/SVG for indexable claims); stat values in HTML with units.
- **Infrastructure:** sitemap.xml + robots.txt generated at build; PDFs allowed in robots (analysts search for them); descriptive URL slugs already set; 404 with proper status via hosting config.
- **Constraint noted:** if the prototype deploys under a staging domain, ship `noindex` until the founder approves public launch — flip is a one-line config.

## 18. Development Roadmap

**Phase 0 — Foundation (gate: tokens render correctly)**
Scaffold Vite/React/TS/Tailwind/ESLint/Vitest · Tailwind token config from design-system · fonts subset + self-host · data types + all data files populated from content-model (with source fields) · CI (lint, test, build, Lighthouse).

**Phase 1 — Shell & primitives (gate: navigable empty site)**
11 primitives with tests · Header/MegaPanel/MobileNav/Footer/PageShell · routing for all 15 routes with placeholder pages · page transitions · prerendering pipeline proven.

**Phase 2 — Skeleton-first pass, all pages (gate: full-site walkthrough)**
Per approved "full site skeleton first" decision: every route gets real structure — sections, headings, real copy from data files, unstyled-chart placeholders. The founder can click the entire IA end-to-end. Review checkpoint #1.

**Phase 3 — Home + Environment to final quality (gate: quality bar set)**
Full visual/motion treatment: hero motif, stat bands, SBTi bullet, 5D wheel, emissions charts. These two pages define "done" for everything else. Review checkpoint #2.

**Phase 4 — Remaining chapters & features**
Social + Community (stories) · Governance (board, risk accordion, competency matrix) · ESG Overview scorecard · Materiality matrix · Timeline · Clients/Leadership/Highlights/About completion.

**Phase 5 — Utility pages, polish & hardening**
Downloads (compressed PDFs) · Contact · 404 · print styles · a11y manual pass + fixes · performance tuning to budgets · cross-browser QA (Chrome/Safari/Firefox/Edge, iOS/Android) · SEO artifacts · final content proofread against reports.

**Phase 6 — Founder review & handover**
Staging deploy (noindex) · walkthrough deck mapping site to report · feedback round · README + docs handover.

## 19. Milestones

| # | Milestone | Acceptance criteria |
|---|---|---|
| M0 | Foundation complete | CI green; tokens visually verified against design-system; 100% of content-model data encoded & type-checked; every metric has `source` |
| M1 | Shell live | All routes navigable desktop+mobile; keyboard-complete nav; prerender output verified; Lighthouse ≥ budgets on empty pages |
| M2 | Full skeleton | Founder can walk every page with real copy & structure; IA sign-off; no visual polish expected |
| M3 | Quality bar | Home + Environment final; motion grammar approved; axe clean; budgets held with charts loaded |
| M4 | Content complete | All 15 pages final; all 14 feature components shipped with fallbacks; scorecard matches reports 100% (verification script) |
| M5 | Launch-ready | WCAG AA manual pass logged; all budgets green; cross-browser QA done; staging URL delivered; docs handed over |

Sequencing follows dependencies, not dates: M2 is the cheapest point to change IA; M3 is the cheapest point to change visual direction. Both are explicit founder checkpoints.

## 20. Risks & Assumptions

| # | Risk / Assumption | Impact | Mitigation |
|---|---|---|---|
| R1 | **Brand direction ambiguity** — 2026 corporate rebrand (blue/purple) vs report identity (teal/mint) chosen for this site | Founder may expect corporate look; visual rework | Flagged at design-system stage; confirm at M2 checkpoint *before* Phase 3 polish; palette isolated in one token file to cap rework cost |
| R2 | Official Brand Guide PDF not yet reviewed (fetch blocked) | Minor token drift (radii, logo variants) | Manual download before Phase 0 ends; only affects primitive-level tokens |
| R3 | Report photography quality/rights for web use | Weak imagery undermines premium feel | Extract & screen early (Phase 0); founder confirms usage rights; licensed-stock fallback list prepared |
| R4 | Large PDFs (25MB) hurt downloads page UX | Abandoned downloads, bad mobile experience | Ghostscript compression to <8MB; show file sizes; host on same CDN |
| R5 | Data transcription errors from reports | Credibility damage with the exact audience that checks | Data files carry source refs; M4 verification script cross-checks every rendered figure against a checked manifest; §15 cautions encoded as contextNotes |
| R6 | Contact form expectation (no backend in scope) | Founder may expect a working form | v1 ships mailto + address per report's own feedback mechanism; Supabase edge-function form is a documented fast-follow (stack already in your toolkit) |
| R7 | Scroll-driven timeline complexity on low-end devices | Jank on the signature component | Transform-only animation, will-change discipline, static fallback below performance/motion thresholds |
| R8 | Scope creep toward CMS/multi-year reports | Prototype timeline slips | Data-file architecture already supports FY-keyed records; CMS explicitly deferred and documented as Phase 2 of the *product*, not this build |
| A1 | Assumption: single language (English), single report year focus (FY25 primary, FY24 comparative) | — | Confirmed by content model approval |
| A2 | Assumption: no analytics/tracking in v1 → no cookie banner needed | — | If analytics requested, add consent UI + privacy note (corporate site pattern exists) |
| A3 | Assumption: deployment target is staging-for-approval; production infra (domain, SSL, CDN) decided post-approval | — | Static output keeps all hosting options open |

---

## 21. Critical Review (pre-implementation audit)

An honest pass over our own plan — what's missing, weak, or worth challenging before code:

**Gaps identified and now resolved in this blueprint:**
1. **Testing strategy was absent** from the original 20-section request — added (Vitest, axe CI, Lighthouse budgets, M4 data-verification script). For a stats-heavy site, the *data contract test* is the single highest-value test class: it catches the errors that embarrass you in front of a founder.
2. **SEO was structurally broken by default** — a Vite SPA serves empty HTML to crawlers and LinkedIn unfurlers. Prerendering (§17) is now a hard requirement, not an optimization.
3. **Print styling** for the scorecard — analysts print; the original scope never mentioned it. Cheap to add at M4, jarring to discover missing later.
4. **404/error surface** wasn't specified anywhere — now a branded route.
5. **OG/social share images** — persona B/C journeys begin with a shared link; the unfurl *is* the first impression for them.

**Weak decisions challenged:**
6. **"Full skeleton first" (your Milestone-1 choice) carries a real risk:** founders judge skeletons as if they were products. Mitigated by explicitly labelling M2 as an IA checkpoint (not a design review) and fast-following with the M3 quality bar on the two most impressive pages. Recommend framing M2 to the founder as "clickable architecture," never "draft site."
7. **13 pages → 15 routes is still a lot of surface for a prototype.** If timeline pressure appears, the defensible cut list (in order): /contact (fold into footer), /clients (fold into /about), /highlights (fold into /esg-overview). The IA supports these merges without nav redesign.
8. **Mint (#00CBA1) is seductive and dangerous** — it fails text contrast on white. The design system already constrains it; the blueprint adds lint-level enforcement (no arbitrary Tailwind values) so the constraint survives contact with implementation.

**Scalability concerns (deliberate positions):**
9. **No CMS is correct for v1** — but the FY-keyed data schema is the migration path. When FY26 report lands, the update is a data PR; when a comms team needs self-service, the same schema maps to any headless CMS. Decision documented so it isn't re-litigated.
10. **State minimalism (§13) is a feature.** The temptation to add a store will arrive with the first filter bug; URL-as-state is the discipline that keeps this site trivially debuggable and shareable.
11. **Component count is capped (~40)** with composition-first governance — the enterprise failure mode for design systems is 200 half-duplicated components by month three.

**UX improvements adopted beyond the source material:**
12. In-page sub-nav with scroll-spy on long chapters (report chapters run 10 sections; users need positional awareness).
13. Context notes shipped *inside* the data layer (§9) — sensitive stats physically cannot render without their explanation. This is governance-by-architecture, not by review checklist.
14. Every interactive signature component has a static, accessible sibling — which doubles as the prerendered/SEO representation. One decision serves three requirements (a11y, SEO, low-end devices).

**Enterprise best practices confirmed present:** typed data contracts · CI quality gates · budget-enforced performance · WCAG AA with manual verification · dependency-direction lint rule · docs-as-source-of-truth (this file) · explicit non-goals · founder checkpoints at the two cheapest-to-change moments.

**Final verdict:** the plan is coherent and buildable as specified. The two decisions that most need founder eyes before Phase 3 are **R1 (brand direction)** and the **M2 skeleton framing** — both are scheduled checkpoints. Proceed to Phase 0 on approval of this blueprint.
