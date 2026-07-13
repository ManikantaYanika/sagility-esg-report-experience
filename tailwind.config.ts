import type { Config } from "tailwindcss";

/**
 * Sagility ESG — Design tokens.
 * Single source of truth: docs/design-system.md
 *
 * Rules encoded here (do not bypass with arbitrary values):
 * - `brand.mint` NEVER carries body-size text on light surfaces (contrast).
 *   Use `brand.tealMid` for text, mint for graphics/large display on dark.
 * - Pillar colors are semantic (E/S/G content only), never decorative.
 *   `*-deep` variants are the accessible text shades on light surfaces.
 */
const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: "#074954", // primary — headers, dark sections, footer
          tealMid: "#00707E", // secondary headings, links, text-safe teal
          mint: "#00CBA1", // signature accent — graphics, dark-surface text
          mintTint: "#BFF1E6", // light fills, stat tiles
        },
        pillar: {
          environment: "#7BB52A",
          environmentAlt: "#8DC63F",
          environmentDeep: "#567F1E", // AA text-on-light variant
          social: "#D57143",
          socialAlt: "#E46830",
          socialDeep: "#A9542B",
          governance: "#228AC2",
          governanceDeep: "#1A6B99",
        },
        ink: {
          DEFAULT: "#3B3B3B", // body text
          strong: "#1A2E2C", // display headlines on light
        },
        neutral: {
          100: "#EAEAEA", // hairlines, card borders
          300: "#B9B9B9", // disabled, dividers
          500: "#575757", // secondary text, captions
        },
        surface: "#FBFBFB",
      },
      fontFamily: {
        display: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Type scale — design-system.md §3.2
        "display-xl": ["4.5rem", { lineHeight: "1.05", fontWeight: "200", letterSpacing: "-0.022em" }],
        "display-l": ["3.5rem", { lineHeight: "1.1", fontWeight: "200", letterSpacing: "-0.02em" }],
        h1: ["2.75rem", { lineHeight: "1.15", fontWeight: "300", letterSpacing: "-0.018em" }],
        h2: ["2.125rem", { lineHeight: "1.2", fontWeight: "300", letterSpacing: "-0.012em" }],
        h3: ["1.625rem", { lineHeight: "1.3", fontWeight: "400" }],
        h4: ["1.25rem", { lineHeight: "1.4", fontWeight: "500" }],
        "stat-l": ["5.5rem", { lineHeight: "1", fontWeight: "700" }],
        "stat-m": ["3.5rem", { lineHeight: "1", fontWeight: "700" }],
        "stat-s": ["2.25rem", { lineHeight: "1", fontWeight: "700" }],
        "body-l": ["1.1875rem", { lineHeight: "1.65" }],
        body: ["1rem", { lineHeight: "1.65" }],
        "body-s": ["0.875rem", { lineHeight: "1.5" }],
        overline: [
          "0.8125rem",
          { lineHeight: "1.2", letterSpacing: "0.12em", fontWeight: "500" },
        ],
      },
      maxWidth: {
        content: "80rem", // 1280 — main content grid
        bleed: "90rem", // 1440 — full-bleed sections
        measure: "45rem", // 720 — centered section intros
      },
      borderRadius: {
        btn: "0.5rem", // 8 — buttons (verify vs brand guide, R2)
        card: "0.75rem", // 12 — cards
        "card-lg": "1rem", // 16 — feature cards
      },
      boxShadow: {
        lift: "0 8px 24px rgb(0 0 0 / 0.08)", // card hover
        liftLg: "0 18px 44px rgb(0 0 0 / 0.10)", // premium card hover depth
        hairline: "0 1px 0 0 rgb(0 0 0 / 0.06)", // header on scroll
      },
      transitionTimingFunction: {
        settle: "cubic-bezier(0.22, 1, 0.36, 1)", // "confident settle"
      },
      spacing: {
        section: "6rem", // 96 — default section rhythm
        "section-lg": "8rem", // 128 — hero-adjacent rhythm
      },
    },
  },
  plugins: [],
};

export default config;
