# Sagility ESG Report — Website

Premium digital experience for Sagility's FY2024–25 Sustainability Report.
Frontend prototype (React + Vite + TypeScript + Tailwind + Framer Motion).

## Source of truth
- `docs/content-model.md` — all content & data (verified against the reports)
- `docs/design-system.md` — tokens, components, motion grammar
- `docs/product-blueprint.md` — architecture, roadmap, milestones

## Getting started (Windows)
```
npm install
npm run dev
```

## Scripts
- `npm run dev` — local dev server
- `npm run build` — typecheck + production build
- `npm run lint` — ESLint (zero-warning policy)

## Architecture rules
- Import direction: pages → sections/features → primitives (never reversed)
- All data flows from `src/data/` typed modules — no inline stats in components
- No arbitrary Tailwind values — design tokens only (tailwind.config.ts)
