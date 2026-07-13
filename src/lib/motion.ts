import type { Variants } from "framer-motion";

/**
 * Motion grammar — design-system.md §7 / blueprint §8.
 * Character: calm, precise, executive. Nothing bounces.
 * All scroll reveals fire once (viewport: { once: true } at usage site).
 */

export const EASE_SETTLE = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  micro: 0.2,
  section: 0.5,
  page: 0.25,
} as const;

/** 24px rise + fade — the standard section reveal. */
export const fadeRise: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.section, ease: EASE_SETTLE },
  },
};

/** Container that staggers `fadeRise` children by 80ms. */
export const staggerGroup: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

/** Page transition — 250ms crossfade + 12px rise (blueprint §8). */
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 12 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.page, ease: EASE_SETTLE },
  },
  exit: { opacity: 0, transition: { duration: 0.15, ease: "easeIn" } },
};

/** Mega-panel — 180ms fade + scale from 98%, no slide. */
export const panelPop: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.18, ease: EASE_SETTLE } },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.12, ease: "easeIn" } },
};
