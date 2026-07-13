import type { Metric } from "@/data/types";

/**
 * Environment data — SR FY2024–25 (assured), Environment chapter pp.51–63.
 * FY24 comparatives from the same report's YoY disclosures.
 * Every series is chart-ready and carries provenance.
 */

/** Chapter hero stat band (report p.52 "Key Highlights"). */
export const ENV_KEY_METRICS: Metric[] = [
  {
    id: "s12-location",
    label: "Scope 1 & 2 GHG emissions (location-based)",
    value: 18072,
    suffix: " tCO₂e",
    pillar: "environment",
    source: "SR FY2024–25, p.52",
  },
  {
    id: "s1-cut",
    label: "Reduction in Scope 1 emissions",
    value: 42,
    suffix: "%",
    pillar: "environment",
    source: "SR FY2024–25, p.52",
  },
  {
    id: "s3-cut",
    label: "Reduction in Scope 3 emissions",
    value: 10.3,
    suffix: "%",
    decimals: 1,
    pillar: "environment",
    source: "SR FY2024–25, p.52",
  },
  {
    id: "renewables-up",
    label: "Increase in renewable energy",
    value: 23.4,
    suffix: "%",
    decimals: 1,
    pillar: "environment",
    source: "SR FY2024–25, p.52",
  },
  {
    id: "energy",
    label: "Total energy consumption",
    value: 93189,
    suffix: " GJ",
    pillar: "environment",
    source: "SR FY2024–25, p.52",
  },
];

/** GHG emissions by scope, FY24 vs FY25 (p.53). Values in tCO₂e. */
export const EMISSIONS_BY_SCOPE = {
  locationBased: [
    { scope: "Scope 1", fy24: 1830, fy25: 1048, deltaPct: -42.73 },
    { scope: "Scope 2", fy24: 16334, fy25: 17024, deltaPct: 4.23 },
    { scope: "Scope 3", fy24: 36968, fy25: 33165, deltaPct: -10.29 },
  ],
  marketBased: [
    { scope: "Scope 1", fy24: 1830, fy25: 1048, deltaPct: -42.73 },
    { scope: "Scope 2", fy24: 12893, fy25: 12629, deltaPct: -2.05 },
    { scope: "Scope 3", fy24: 36968, fy25: 33165, deltaPct: -10.29 },
  ],
  contextNote:
    "The marginal increase in location-based Scope 2 aligns with business growth and remains below the rate of expansion; market-based figures reflect renewable procurement.",
  source: "SR FY2024–25, p.53",
} as const;

/** Scope 3 by category, FY25 (p.54). */
export const SCOPE3_CATEGORIES = {
  unit: "tCO₂e",
  slices: [
    { label: "Purchased goods & services", value: 15949.9, pct: 48.09 },
    { label: "Employee commuting", value: 8028.8, pct: 24.21 },
    { label: "Fuel & energy-related activities", value: 6187.2, pct: 18.65 },
    { label: "Capital goods", value: 1744.3, pct: 5.26 },
    { label: "Business travel", value: 1129.5, pct: 3.41 },
    { label: "Waste generated in operations", value: 125.3, pct: 0.38 },
  ],
  source: "SR FY2024–25, p.54",
} as const;

/** Scope 1 & 2 source contribution, FY25 (p.54). */
export const S12_SOURCES = {
  unit: "% of Scope 1 & 2",
  slices: [
    { label: "Electricity consumption", value: 94.2, pct: 94.2 },
    { label: "Refrigerants", value: 5.1, pct: 5.1 },
    { label: "Diesel (fleet/genset)", value: 0.6, pct: 0.6 },
    { label: "Natural gas", value: 0.11, pct: 0.11 },
  ],
  source: "SR FY2024–25, p.54",
} as const;

/** Emissions intensity, tCO₂e per '000 USD revenue (p.53). */
export const EMISSIONS_INTENSITY = [
  { scope: "Scope 1", fy24: 0.0032, fy25: 0.0016 },
  { scope: "Scope 2", fy24: 0.0285, fy25: 0.0259 },
  { scope: "Scope 3", fy24: 0.0645, fy25: 0.0504 },
] as const;

/** Energy mix, GJ (p.59). */
export const ENERGY_MIX = {
  years: [
    {
      year: "FY2023–24",
      renewable: 22273.2,
      nonRenewable: 68752.5,
      total: 91025.7,
    },
    {
      year: "FY2024–25",
      renewable: 27491.0,
      nonRenewable: 65697.8,
      total: 93188.8,
    },
  ],
  renewableShareFy25: 30,
  intensity: { fy24: 0.158, fy25: 0.142, unit: "GJ/mn INR revenue", deltaPct: -10.9 },
  source: "SR FY2024–25, p.59",
} as const;

/** Energy consumption by region, FY25, GJ (p.59). */
export const ENERGY_BY_REGION = [
  { region: "India", value: 39941.7 },
  { region: "Philippines", value: 36099.9 },
  { region: "Jamaica", value: 13676.3 },
  { region: "Colombia", value: 1024.1 },
  { region: "USA", value: 218.9 },
] as const;

/** Water use by stress zone, kL (p.61, WRI Water Risk Atlas overlay). */
export const WATER_STRESS = {
  zones: [
    { zone: "Extremely high", fy24: 9174, fy25: 49912, fy24Pct: 19, fy25Pct: 53 },
    { zone: "High", fy24: 28805, fy25: 34831, fy24Pct: 62, fy25Pct: 37 },
    { zone: "Low–medium", fy24: 7756, fy25: 9742, fy24Pct: 17, fy25Pct: 10 },
    { zone: "Low", fy24: 1020, fy25: 0, fy24Pct: 2, fy25Pct: 0 },
  ],
  withdrawalsFy25: 99463,
  facilities: 24,
  leasedAreaSqFt: 1177335,
  contextNote:
    "The year-over-year increase reflects expanded reporting coverage (24 facilities in FY2024–25), not increased consumption. All withdrawals are from third-party municipal or landlord-managed supply.",
  source: "SR FY2024–25, pp.60–61",
} as const;

/** Waste by category, tonnes (p.63 chart — verified: FY25 sums to 336.6). */
export const WASTE_CATEGORIES = {
  unit: "tonnes",
  rows: [
    { category: "Organic waste", fy24: 134.95, fy25: 165.99 },
    { category: "Municipal solid waste", fy24: 20.53, fy25: 66.63 },
    { category: "Paper", fy24: 37.68, fy25: 34.28 },
    { category: "Plastics", fy24: 10.27, fy25: 31.08 },
    { category: "E-waste (electronics)", fy24: 12.8, fy25: 15.86 },
    { category: "Cardboard", fy24: 2.21, fy25: 11.37 },
    { category: "Battery waste", fy24: 7.88, fy25: 11.13 },
    { category: "Glass", fy24: 0.89, fy25: 0.13 },
    { category: "Cans / metals", fy24: 0.53, fy25: 0.16 },
  ],
  totalFy25: 336.6,
  diversionPct: 41.7,
  disposition: { recycledPct: 25.3, compostedPct: 16.3, landfillPct: 58.3 },
  plasticsEliminatedT: 23.1,
  source: "SR FY2024–25, pp.62–63",
} as const;

/** 5D Decarbonization Model (p.55). */
export const FIVE_D_MODEL = [
  {
    id: "decrease",
    title: "Decrease",
    summary: "Cut operational emissions through energy efficiency.",
    detail:
      "LED retrofits with occupancy sensors, high-efficiency HVAC, IT energy-saving measures, and design-level interventions in new facilities — with LEED/IGBC-certified buildings prioritized when scouting office space.",
  },
  {
    id: "drive",
    title: "Drive",
    summary: "Increase adoption of renewable energy.",
    detail:
      "On-site solar with landlords, off-site power purchase agreements (PPA/VPPA), and a growing share of Renewable Energy Certificates — 30% of global electricity in FY2024–25.",
  },
  {
    id: "deepen",
    title: "Deepen",
    summary: "Engage stakeholders across the value chain.",
    detail:
      "Capacity-building with key suppliers on emissions measurement and reporting, plus a green procurement policy favoring carbon-disclosing suppliers.",
  },
  {
    id: "deploy",
    title: "Deploy",
    summary: "Expand e-mobility for clean commuting.",
    detail:
      "Building on 30 electric vehicles for employee commuting, expanding the EV program to cut Scope 3 commuting emissions.",
  },
  {
    id: "design",
    title: "Design",
    summary: "Reimagine operations to be flexible and low-carbon.",
    detail:
      "Cloud migration, workplace asset consolidation, device-as-a-service models, and green IT practices that shrink the physical footprint.",
  },
] as const;

/** Environment KPI table (chapter scorecard preview). */
export const ENV_KPI_TABLE: Metric[] = [
  { id: "k-s1", label: "Scope 1 emissions (tCO₂e)", value: "1,048", delta: -42.7, deltaGoodWhen: "down", source: "p.11" },
  { id: "k-s2", label: "Scope 2 emissions (tCO₂e, market-based)", value: "12,629", delta: -2.05, deltaGoodWhen: "down", source: "p.11" },
  { id: "k-s3", label: "Scope 3 emissions (tCO₂e)", value: "33,165", delta: -10.3, deltaGoodWhen: "down", source: "p.11" },
  { id: "k-ghg", label: "Overall GHG reduction, YoY", value: "7.07%", source: "p.11" },
  { id: "k-re", label: "Renewable energy sourcing", value: "30%", delta: 18.8, deltaGoodWhen: "up", source: "p.11", contextNote: "Up from 25.25% in FY2023–24" },
  { id: "k-water", label: "Water consumption (kL)", value: "99,463", source: "p.11", contextNote: "First full year at expanded 24-facility coverage" },
  { id: "k-waste", label: "Waste diverted from landfill", value: "41.7%", source: "p.11" },
  { id: "k-ev", label: "Electric vehicles deployed", value: "30", source: "p.11" },
];

/** Climate risk summary (p.58). */
export const CLIMATE_RISK = {
  summary:
    "An independent third-party climate risk assessment in FY2024–25 evaluated acute and chronic physical risks alongside transition risks. Current physical exposure is manageable; higher-emission scenarios raise potential exposure to extreme heat, intense rainfall, and drought in certain regions.",
  forward:
    "Findings feed mitigation and resilience planning, with a fuller summary planned for the FY2025–26 report.",
  disclosures: ["CDP (score improved D → B)", "EcoVadis"],
  source: "SR FY2024–25, p.58",
} as const;
