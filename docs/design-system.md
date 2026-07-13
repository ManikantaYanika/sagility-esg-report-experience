# Sagility ESG Website — Design System

**Version 1.0 — July 2026**
**Sources analyzed:**
1. sagility.com (live site — structure, navigation, footer, iconography, design language)
2. Sagility Sustainability Report FY2024–25 (assured) — color sampling + embedded font analysis
3. Sagility Sustainability Report FY2024 — brand baseline verification

**Method note:** Colors were sampled programmatically from the official report PDFs (the authoritative ESG brand artifacts); typography verified from embedded fonts (`pdffonts`). The live site's structure, nav, footer, icon style, and design language were audited from fetched markup. Exact CSS values of the 2026 sagility.com rebrand (button radii, web font files) could not be computed-style-sampled in this session — those items are marked *(inferred — verify)*. The official **Sagility Brand Guide** (linked in the site footer: `sagility.com/wp-content/uploads/2026/04/sagility-brand-guidelines-april-2026.pdf`) should be downloaded manually as the final arbiter.

---

## 1. Brand Overview & Visual Identity

Sagility's identity balances two registers, and the ESG site must speak both:

- **Corporate register (sagility.com, 2026):** clean, tech-forward, white-dominant, blue logo, thin wavy-line motifs, outline icons, restrained color. Tagline energy: "Built for Healthcare. Powered by Tech. Driven by Results."
- **Sustainability register (the reports):** deep teal + vibrant mint signature, with a disciplined three-color ESG pillar system (green / orange / blue) used to code every chapter.

**Design position for the ESG site:** corporate cleanliness as the canvas (white space, precise grid, thin-line motifs), the sustainability teal/mint as the brand voice, and the pillar triad strictly reserved for E/S/G content coding. This gives the site an unmistakable Sagility feel while remaining visually distinct from both the corporate site and any competitor's report site.

---

## 2. Color System

### 2.1 Primary brand colors (sampled from official report artifacts)

| Token | Hex | Source | Usage |
|---|---|---|---|
| `brand-deep-teal` | **#074954** | FY24 cover (dominant) | Primary brand color: headers, hero backgrounds, footer, nav text, dark sections |
| `brand-mint` | **#00CBA1** | Both reports, accent throughout | Signature accent: highlights, active states, progress indicators, data emphasis |
| `brand-teal-mid` | **#00707E** / #017284 | FY25 content headings | Secondary headings, links, hover states |
| `brand-mint-tint` | **#BFF1E6** | FY25 stat backgrounds | Light backgrounds, stat tiles, callout fills |

### 2.2 ESG pillar colors (chapter-coding system from FY25 report)

| Token | Hex | Secondary | Usage |
|---|---|---|---|
| `pillar-environment` | **#7BB52A** | #8DC63F | All Environment content: section labels, charts, icons, borders |
| `pillar-social` | **#D57143** | #E46830 | All Social content |
| `pillar-governance` | **#228AC2** | — | All Governance content |

**Rule:** pillar colors are semantic, never decorative. A green button outside Environment content is a system violation. This discipline is what makes the color coding legible to executive readers.

### 2.3 Neutrals

| Token | Hex | Usage |
|---|---|---|
| `ink` | #3B3B3B | Body text (sampled from FY25 text pages) |
| `ink-strong` | #1A2E2C | Display headlines on light (near-black with teal cast, from FY25 cover tones) |
| `gray-500` | #575757 | Secondary text, captions |
| `gray-300` | #B9B9B9 | Disabled, dividers |
| `gray-100` | #EAEAEA | Hairlines, card borders |
| `surface` | #FBFBFB | Off-white section backgrounds |
| `white` | #FFFFFF | Primary canvas |

### 2.4 Gradients & dark surfaces
- **Dark hero surface:** deep-teal #074954 → #1A2E2C (forest-dark), used with photography overlays; mirrors the FY25 cover treatment.
- **Mint-on-teal:** #00CBA1 text/graphics on #074954 — the reports' highest-contrast brand pairing; reserve for hero stats and key CTAs on dark.
- The corporate site's purple-gradient tech imagery is **excluded** from the ESG palette — it belongs to the product/tech register.

### 2.5 Data-visualization palette
Charts default to pillar color of the host page + tints (e.g., Environment charts: #7BB52A, #8DC63F, #BFF1E6, #074954 for comparison series). Cross-pillar dashboards (ESG Overview) use all three pillar hues on neutral canvas. UN SDG tiles use the official UN color set (e.g., #A21A42, #FE6927 sampled from the report's SDG page) — never remapped to brand colors.

### 2.6 Accessibility notes
- #074954 on white: ~9.4:1 — safe at all sizes.
- #00CBA1 on white: ~2.2:1 — **fails for text**; use only for large graphics, rules, and on dark surfaces (on #074954: ~4.5:1, passes AA for large text). Text-on-light alternative: #00707E (~5.5:1, AA).
- #7BB52A on white: ~2.5:1 — pillar colors are labels/graphics on light; body-size pillar text uses darkened variants (define −25% lightness shades at build).

---

## 3. Typography

### 3.1 Typefaces (verified from FY25 report embedded fonts)

| Role | Typeface | Weights in use | Notes |
|---|---|---|---|
| Display / headlines | **Poppins** | ExtraLight (200), Light (300), Regular (400), Bold (700) | The report's signature look: very light Poppins for large display, Bold for emphasis numbers |
| Body / UI | **Inter** | Regular (400), Medium (500), Bold (700) | Report body text; excellent screen legibility |
| Legacy (FY24) | Codec Pro + Montserrat | — | Superseded; do not use |

Both Poppins and Inter are Google Fonts — zero licensing friction, self-hostable for performance. *(Verify against the official brand guide whether the 2026 corporate web font differs; the report typography is authoritative for ESG materials.)*

### 3.2 Type scale (desktop, 1.25 modular ratio)

| Token | Size / line-height | Face & weight | Usage |
|---|---|---|---|
| `display-xl` | 72 / 1.05 | Poppins ExtraLight | Home hero statement |
| `display-l` | 56 / 1.1 | Poppins ExtraLight | Page heroes |
| `h1` | 44 / 1.15 | Poppins Light | Page titles |
| `h2` | 34 / 1.2 | Poppins Light | Section titles |
| `h3` | 26 / 1.3 | Poppins Regular | Sub-sections, card titles |
| `h4` | 20 / 1.4 | Poppins Medium* | Minor headings (*load Medium 500) |
| `stat` | 56–88 / 1 | Poppins Bold | KPI numbers (unit in `h4`) |
| `body-l` | 19 / 1.65 | Inter Regular | Lead paragraphs |
| `body` | 16 / 1.65 | Inter Regular | Default text |
| `body-s` | 14 / 1.5 | Inter Regular | Captions, footnotes, source attributions |
| `overline` | 13 / 1.2, +12% tracking, uppercase | Inter Medium | Section eyebrows, pillar labels |

Mobile: display sizes scale down ~35% (`display-xl` → 44); body remains 16.

### 3.3 Typographic voice
The report's signature is **ExtraLight display type at large sizes** paired with **Bold stat numerals** — elegance plus authority. Carry this exactly: hero statements feel airy and editorial; numbers land heavy. Never bold whole headlines; emphasize single words (as the reports do: "Empowering **Progress**").

---

## 4. Iconography

- **Style (from sagility.com):** thin-stroke outline icons, single-color, rounded joins, ~1.5px optical stroke, contained metaphors (chip + sparkles for AI, head + gear for automation). No fills, no duotone.
- **Implementation:** Lucide icons (stroke 1.5) match this language almost exactly — use as the base set, colored by context (pillar color within pillar pages, `brand-teal-mid` elsewhere).
- **Custom icons needed:** 5D Decarbonization pillars, ESG pillar glyphs, SDG tiles (official UN assets), award ribbon, materiality matrix glyph.
- **Signature quote mark:** the site uses two thick parallel diagonal stripes as its quotation glyph — recreate in mint/pillar color for testimonial and leadership-quote components.
- Sizes: 20 (inline), 24 (UI), 32 (card), 48 (feature). Never mix stroke weights within a view.

---

## 5. Spacing, Grid & Layout

### 5.1 Spacing scale (8pt base)
4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160
- Section vertical rhythm: 96–128 desktop, 64 mobile.
- Card internal padding: 32 (24 mobile).
- Hero top/bottom: 160/96.

### 5.2 Grid
- 12-column, max-width 1280 content / 1440 with bleed, 24px gutters (16 mobile).
- Breakpoints: 640 / 768 / 1024 / 1280 / 1536.
- Editorial layouts alternate 7/5 and 5/7 splits (text/media) — the report's own two-column rhythm.
- Stat bands: 4-up desktop → 2-up tablet → 1-up mobile.

### 5.3 Layout patterns (observed on sagility.com, adapted)
- Full-bleed hero with abstract thin-line background motif
- Centered section intros (h2 + lead paragraph, max-width ~720)
- Stat band immediately after hero ("18 / 95% / 25+ / 7 of 10" pattern)
- Card grids for services/programs (3-up)
- Icon + title + "Learn More" tiles for capabilities
- Quote blocks with stripe glyph + bold attribution role (never client names)
- Full-width photographic CTA band before footer ("See What Sagility Can Do for You" pattern)

---

## 6. Components

### 6.1 Buttons
| Variant | Style | Usage |
|---|---|---|
| Primary | Solid `brand-deep-teal`, white label, radius ~8 *(inferred — verify against brand guide)*, hover: `brand-teal-mid` | Main CTAs |
| Primary-on-dark | Solid `brand-mint`, `ink-strong` label | CTAs on teal/photo heroes |
| Secondary | 1.5px outline `brand-deep-teal`, transparent fill; hover: fill 5% teal | Secondary actions |
| Tertiary / link | Label + arrow, no container; arrow translates 4px on hover | "Learn More" patterns (dominant on sagility.com) |
| Download | Secondary + download glyph + file meta (PDF · 14 MB) | Report downloads |

Sizing: 48px height (44 mobile), Inter Medium 16, 24px horizontal padding. Focus: 2px mint outer ring, 2px offset.

### 6.2 Cards
| Card | Anatomy | Notes |
|---|---|---|
| Service/program card | Icon 32 → h3 → body-s → tertiary link | White, 1px `gray-100` border, radius 12–16, hover: lift (shadow 0/8/24 @8%) + border-color pillar tint |
| Stat tile | Stat numeral (Poppins Bold, pillar color) → label → optional delta chip | On `surface` or `mint-tint`; count-up animation on scroll |
| Impact story card | Photo (4:3) → overline (program) → h3 (person) → excerpt → quote | The Kariyamma/Anjali/Jeevitha narratives; warm photography |
| Testimonial | Stripe quote glyph → body-l quote → bold role attribution | Carousel, 1-per-view desktop with peek |
| Award card | Ribbon icon → title → issuer + year → category chip | Filterable grid |
| Leader message card | Portrait (1:1, subtle teal duotone) → name/role → pull-quote → "Read message" | |
| Download card | File icon → title → meta → download action | |

### 6.3 Navigation (header)
- **Pattern (from sagility.com):** slim top bar; logo left; 5–7 groups; grouped dropdown panels (site uses grouped link lists — elevate to a light mega-panel); persistent CTA button right ("Download Report" for ESG site); search optional.
- Behavior: transparent-over-hero → solid white with hairline shadow on scroll (height 88 → 64); active section underlined in `brand-mint`; mobile: full-screen overlay, accordion groups, CTA pinned bottom.
- Add an ESG-specific signature: a thin **scroll-progress bar in pillar color** under the header on pillar pages.

### 6.4 Footer (adapted from sagility.com's 4-column pattern)
- Structure: logo + one-line sustainability mission → 4 link columns (Explore = pillars · Report = downloads/GRI/assurance · Company = about/leadership/contact · Trust & Policies = privacy/accessibility/terms) → social row (LinkedIn, YouTube, Instagram, Facebook, X) → legal line "© 2026 Sagility Limited. All rights reserved."
- Surface: `brand-deep-teal`, white/mint text — the ESG site's footer is dark (differentiator vs the corporate site's light footer), bookending pages in brand teal.
- Include "Back to top" control (present on corporate site).

### 6.5 ESG-specific components (specified for build phase)
- KPI scorecard table (FY24 vs FY25 with delta chips and source footnotes)
- Interactive materiality matrix (scatter; hover reveals topic card)
- Timeline (horizontal scroll-driven, 2022 → 2034, milestone nodes in mint)
- 5D model wheel (five segments, hover-expand)
- SBTi progress bullet chart (target vs actual)
- SDG grid (official tiles; click filters related programs)
- Global footprint map (teal landmass, mint location pins with employee counts)
- Chapter hero: pillar-colored overline + SDG chips + material-topic chips (mirrors the report's per-chapter header device)

---

## 7. Motion & Interaction Language

- **Character:** calm, precise, executive. Nothing bounces. Ease: cubic-bezier(0.22, 1, 0.36, 1) ("confident settle"), 400–600ms sections, 200ms micro.
- Scroll-reveal: 24px rise + fade, staggered 80ms within groups.
- Stat counters: count-up once, 1.2s, when 50% in view.
- Charts draw in on entry (bars grow, donuts sweep 600ms).
- Wavy-line hero motifs: slow parallax drift (site's own background language, animated subtly).
- Hover: cards lift 4px; links get mint underline sweep.
- Respect `prefers-reduced-motion`: all reveals become opacity-only.

---

## 8. Photography & Imagery

- **Registers:** (1) People — warm, candid workplace and community photography (reports contain 345 + 116 embedded images; extract and quality-screen); (2) Purpose — nature/healthcare texture for Environment sections; (3) Abstract — thin-line wave motifs (recreate as SVG in teal/mint, following sagility.com's background system).
- Treatment: photography full-color; optional deep-teal duotone for leadership portraits and dark heroes. Overlay scrim: #074954 at 55–70% for text-on-photo.
- Never: stock cliché (globes in hands, seedlings in bulbs), purple tech gradients (corporate register), untreated screenshots of report charts.

---

## 9. Voice & Content Presentation

- Numbers lead: every section opens with its strongest verified stat.
- Source discipline: each KPI carries a footnote to report + page (data already structured in `content-model.md` §14).
- Attribution style follows the reports: roles, never client names.
- Sensitive metrics (attrition, POSH, water restatement) presented with the report's own context notes — see content-model §15.

---

## 10. Open Items (to resolve before/at build)

1. **Download the official Brand Guide PDF** (footer link) — confirm button radius, exact corporate blue of the 2026 logo, any web-specific font licensing. *(Fetch was blocked in-session; a manual download or connected Chrome extension resolves it in minutes.)*
2. Decide logo variant for the ESG site: current blue logo on white header vs white logo on teal footer (need the SVG assets from the brand guide or site).
3. Extract and quality-screen report photography (`pdfimages`) — build a shortlist of usable hero/story images.
4. Confirm dark-shade pillar variants for accessible text (proposed: derive −25% lightness, validate contrast at build).
