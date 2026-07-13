import type { Metric } from "@/data/types";

/** Company overview — homepage §2 (content-model §2). */
export const COMPANY = {
  vision: "To become the most caring company.",
  overview:
    "Sagility is a technology-enabled, pure-play healthcare solutions provider partnering with U.S. payers and providers. With 25 years of specialized expertise, we combine deep domain knowledge with automation, analytics and AI to improve health outcomes — for members, patients, and the communities we serve.",
  esgFraming:
    "Sustainability at Sagility began with our foundation in 2022 and now spans a validated science-based climate roadmap, a people-first culture across five geographies, and governance built on integrity and transparency.",
  source: "SR FY2024–25, pp.14–17",
} as const;

export const COMPANY_MINI_STATS: Metric[] = [
  { id: "years", label: "Years in healthcare", value: 25, source: "SR FY2024–25, p.17" },
  { id: "centres", label: "Delivery centres", value: 23, source: "SR FY2024–25, p.17" },
  {
    id: "claims",
    label: "Claims processed annually",
    value: 119,
    suffix: "M+",
    source: "SR FY2024–25, p.17",
  },
  {
    id: "recoveries",
    label: "Provider recoveries enabled",
    value: 5,
    prefix: "$",
    suffix: "B+",
    source: "SR FY2024–25, p.14",
  },
];
