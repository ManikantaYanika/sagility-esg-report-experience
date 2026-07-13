import type { Metric } from "@/data/types";

/** About Sagility — SR FY2024–25 pp.14–17; FY24 pp.5–6. */

export const MISSION_VISION = {
  vision:
    "To become the most caring company. Caring is embedded in our DNA — through transformative healthcare support that improves lives, and through our unwavering commitment to the well-being of our employees, communities, and the planet.",
  mission:
    "To collaborate with all stakeholders to build a resilient, responsible, and sustainable organization — co-creating a harmonious coexistence that empowers both the planet and the community to thrive.",
  values: ["Accountability", "Collaboration", "Compassion", "Excellence", "Integrity"],
  source: "SR FY2024–25, p.14",
} as const;

export const SERVICES = [
  { title: "Claims Management", text: "End-to-end adjudication of medical, pharmacy, vision, and dental claims using intelligent automation and AI-based prioritization." },
  { title: "Payment Integrity", text: "Pre- and post-pay overpayment detection through proprietary platforms, data mining, machine learning, and predictive analytics." },
  { title: "Clinical Management", text: "Licensed clinicians delivering utilization management, complex case management, and population health with AI-enabled decision engines." },
  { title: "Revenue Cycle Management", text: "Scheduling to collections — with predictive tools that optimize reimbursement and reduce bad debt." },
  { title: "Member & Provider Engagement", text: "GenAI-assisted engagement with real-time speech analytics and NLP for experience and compliance." },
  { title: "Administrative Support", text: "Credentialing, enrolment, benefits configuration, and premium billing on workflow platforms and self-service portals." },
] as const;

export const GLOBAL_FOOTPRINT = [
  { geo: "India", employees: 17885, cities: "Bangalore · Hyderabad · Coimbatore · Chennai · Navi Mumbai" },
  { geo: "Philippines", employees: 15062, cities: "Metro Manila · Alabang · Iloilo" },
  { geo: "Jamaica", employees: 3123, cities: "Kingston" },
  { geo: "USA", employees: 2430, cities: "Denver · El Paso · Atlanta · Cranbury · Jacksonville" },
  { geo: "Colombia", employees: 254, cities: "Barranquilla" },
] as const;

export const ABOUT_STATS: Metric[] = [
  { id: "a-years", label: "Years of healthcare experience", value: 25, source: "SR FY2024–25, p.17" },
  { id: "a-geos", label: "Geographies", value: 5, source: "SR FY2024–25, p.17" },
  { id: "a-centres", label: "Delivery centres", value: 23, source: "SR FY2024–25, p.17" },
  { id: "a-claims", label: "Claims processed annually", value: 119, suffix: "M+", source: "SR FY2024–25, p.17" },
  { id: "a-interactions", label: "Customer interactions", value: 78, suffix: "M+", source: "SR FY2024–25, p.17" },
  { id: "a-clients", label: "New clients in FY25", value: 38, source: "SR FY2024–25, p.17" },
];

export const FINANCIALS: Metric[] = [
  { id: "f-rev", label: "Total revenue (INR millions)", value: 55699, prefix: "₹", source: "SR FY2024–25, p.16" },
  { id: "f-growth", label: "Revenue growth vs FY2023–24", value: 17.2, suffix: "%", decimals: 1, source: "SR FY2024–25, p.16" },
  { id: "f-ebitda", label: "Adjusted EBITDA margin", value: 26.4, suffix: "%", decimals: 1, source: "SR FY2024–25, p.16" },
  { id: "f-pat", label: "Adjusted PAT margin", value: 14.6, suffix: "%", decimals: 1, source: "SR FY2024–25, p.16" },
];
