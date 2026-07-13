/** Sustainability strategy — SR FY2024–25 pp.9–22; FY24 pp.7–10. */

export const COMMITMENTS = [
  {
    pillar: "environment" as const,
    title: "Environment",
    commitment: "Drive operations in a manner that cares for the planet — reduce carbon emissions and optimize use of environmental resources.",
    actions: [
      "Reduce GHG emissions by committing to SBTi",
      "Track Scope 1 & 2 and implement clean renewable energy sources",
      "Track Scope 3 and educate the value chain to reduce emissions",
      "Minimize fossil fuels; maximise renewable sources",
      "Recycle and reuse water",
      "Divert waste from landfill",
    ],
  },
  {
    pillar: "social" as const,
    title: "Social",
    commitment: "Promote employee and community welfare. Act as a responsible employer and promote stakeholder welfare.",
    actions: [
      "Promote workplace wellbeing",
      "Foster a diverse, inclusive, hybrid work culture",
      "Invest in human capital through personalized training",
      "Resolve employee concerns equitably and transparently",
      "Drive CSR in education, sustainability, and community development",
    ],
  },
  {
    pillar: "governance" as const,
    title: "Governance",
    commitment: "Embed good governance, integrity and ethics into daily practice, with mechanisms conducive to sustainability.",
    actions: [
      "Ensure transparent, fair and ethical practices",
      "Establish adequate data security measures",
      "Mandatory training on data privacy and protection",
      "Align suppliers with long-term sustainability goals",
    ],
  },
] as const;

export const STAKEHOLDERS = [
  { group: "Employees", channels: "Portals, townhalls, surveys, HR connects", frequency: "Regularly", topics: "Business direction, policies, wellbeing, skills, engagement" },
  { group: "Clients", channels: "Business and service review meetings", frequency: "Regularly", topics: "Needs, performance, delivery improvement, compliance" },
  { group: "Investors", channels: "Calls, reports, regulatory disclosures", frequency: "Quarterly / as needed", topics: "Results, strategy, ESG disclosures" },
  { group: "Community", channels: "CSR collaborations, NGO partnerships, volunteering", frequency: "Periodically", topics: "Inclusion, education, health, livelihoods" },
  { group: "Regulators", channels: "Online portals, statutory filings", frequency: "Statutory timelines", topics: "Compliance, timely disclosure" },
] as const;

export const JOURNEY = {
  origin:
    "Sagility's ESG journey began in earnest after the January 2022 divestiture from Hinduja Global Solutions. A Big 4 diagnostic study assessed ESG readiness; since then a structured, phased roadmap has embedded sustainability into strategy — informed by stakeholder expectations, regulatory developments, and investor insights.",
  source: "SR FY2024–25, p.19",
} as const;

/** SDG focus goals (Committee Chairperson message, SR FY2024–25 p.6). */
export const SDG_FOCUS = [
  { n: 1, name: "No Poverty" },
  { n: 2, name: "Zero Hunger" },
  { n: 3, name: "Good Health & Well-being" },
  { n: 4, name: "Quality Education" },
  { n: 5, name: "Gender Equality" },
  { n: 8, name: "Decent Work & Economic Growth" },
  { n: 10, name: "Reduced Inequalities" },
  { n: 13, name: "Climate Action" },
  { n: 14, name: "Life Below Water" },
  { n: 15, name: "Life on Land" },
] as const;

/**
 * Materiality matrix — 17 topics (SR FY2024–25, p.21).
 * x = potential business impact, y = stakeholder influence (0–1).
 * Coordinates are approximated from the report's published figure;
 * classification and mitigation live in RISK_REGISTER (governance data).
 */
export interface MaterialTopic {
  topic: string;
  pillar: "E" | "S" | "G";
  x: number;
  y: number;
}

export const MATERIALITY_MATRIX: MaterialTopic[] = [
  { topic: "Ethics & integrity", pillar: "G", x: 0.9, y: 0.95 },
  { topic: "Compliance", pillar: "G", x: 0.88, y: 0.92 },
  { topic: "Cybersecurity & data privacy", pillar: "G", x: 0.95, y: 0.88 },
  { topic: "Climate change", pillar: "E", x: 0.55, y: 0.9 },
  { topic: "Health, safety & wellbeing", pillar: "S", x: 0.78, y: 0.86 },
  { topic: "DEI environment", pillar: "S", x: 0.7, y: 0.82 },
  { topic: "Client satisfaction & innovation", pillar: "S", x: 0.87, y: 0.79 },
  { topic: "Responsible procurement", pillar: "G", x: 0.5, y: 0.78 },
  { topic: "Risk & opportunities management", pillar: "G", x: 0.72, y: 0.73 },
  { topic: "Water & waste management", pillar: "E", x: 0.42, y: 0.68 },
  { topic: "Human rights", pillar: "S", x: 0.6, y: 0.63 },
  { topic: "Stakeholder grievance redressal", pillar: "G", x: 0.68, y: 0.58 },
  { topic: "Corporate governance", pillar: "G", x: 0.8, y: 0.6 },
  { topic: "Employee engagement", pillar: "S", x: 0.82, y: 0.55 },
  { topic: "Energy management", pillar: "E", x: 0.5, y: 0.52 },
  { topic: "Human capital management", pillar: "S", x: 0.78, y: 0.45 },
  { topic: "CSR", pillar: "S", x: 0.55, y: 0.42 },
];

export const MATERIALITY_META = {
  conducted: "FY2023–24",
  nextUpdate: "FY2027–28 (three-year cycle, interim reviews as needed)",
  method:
    "Structured stakeholder engagement, peer benchmarking, regulatory scanning, and industry trends — reviewed and endorsed by senior leadership and integrated into the OGSM framework.",
  source: "SR FY2024–25, p.21",
} as const;
