import type { Metric, PillarSummary } from "@/data/types";

/** Homepage key-numbers band — the four strongest verified stats. */
export const HOME_KEY_METRICS: Metric[] = [
  {
    id: "employees",
    label: "Employees across 5 geographies",
    value: 38754,
    source: "SR FY2024–25, p.17",
  },
  {
    id: "women",
    label: "Women in our global workforce",
    value: 61,
    suffix: "%",
    source: "SR FY2024–25, p.24",
  },
  {
    id: "renewables",
    label: "Electricity from renewable sources",
    value: 30,
    suffix: "%",
    delta: 23.4,
    deltaGoodWhen: "up",
    source: "SR FY2024–25, p.52",
  },
  {
    id: "breaches",
    label: "Data breaches — two years running",
    value: 0,
    source: "SR FY2024–25, p.70",
  },
];

/** ESG pillar cards — homepage overview section. */
export const PILLAR_SUMMARIES: PillarSummary[] = [
  {
    id: "environment",
    title: "Environment",
    href: "/environment",
    headline: {
      id: "scope1-reduction",
      label: "reduction in Scope 1 emissions",
      value: 42,
      suffix: "%",
      pillar: "environment",
      source: "SR FY2024–25, p.52",
    },
    topics: ["Climate change & decarbonization", "Energy management", "Water & waste stewardship"],
    commitment: "Caring for the planet: cutting carbon, optimizing every resource we use.",
  },
  {
    id: "social",
    title: "Social",
    href: "/social",
    headline: {
      id: "training-hours",
      label: "average training hours per employee",
      value: 115,
      pillar: "social",
      source: "SR FY2024–25, p.24",
    },
    topics: ["Talent, DEI & wellbeing", "Health & safety", "CSR & community impact"],
    commitment: "Caring for people: a responsible employer advancing employee and community welfare.",
  },
  {
    id: "governance",
    title: "Governance",
    href: "/governance",
    headline: {
      id: "ethics-training",
      label: "employees trained on ethics & compliance",
      value: 98.6,
      suffix: "%",
      decimals: 1,
      pillar: "governance",
      source: "SR FY2024–25, p.11",
    },
    topics: ["Board oversight & risk", "Ethics & data privacy", "Responsible procurement"],
    commitment: "Caring how we operate: integrity, transparency and ethics in daily practice.",
  },
];

/** SBTi commitment strip — validated near-term targets + FY25 performance. */
export const SBTI = {
  baselineYear: "FY2024",
  targetYear: "FY2034",
  validated: true,
  targets: [
    {
      id: "s12",
      label: "Scope 1 & 2 emissions",
      reduction: 54.6,
      fy25: { target: 13919, actual: 13677, unit: "tCO₂e", beyondTargetPct: 1.7 },
    },
    {
      id: "s3",
      label: "Scope 3 emissions",
      reduction: 32.5,
      fy25: { target: 36067, actual: 33165, unit: "tCO₂e", beyondTargetPct: 8.2 },
    },
  ],
  source: "SR FY2024–25, p.55",
} as const;
