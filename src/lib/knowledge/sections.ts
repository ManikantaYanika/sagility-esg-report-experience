/**
 * Knowledge sections — grounded content assembled from the EXISTING data layer
 * (src/data/*). No content is duplicated: each section serializes the relevant
 * dataset(s) the site already ships, plus a citation path. Built once at module
 * load (this module lives in the lazily-loaded Copilot chunk).
 */
import { COMPANY, COMPANY_MINI_STATS } from "@/data/company";
import { MISSION_VISION, SERVICES, GLOBAL_FOOTPRINT, ABOUT_STATS, FINANCIALS } from "@/data/about";
import { COMMITMENTS, STAKEHOLDERS, JOURNEY, SDG_FOCUS, MATERIALITY_MATRIX, MATERIALITY_META } from "@/data/approach";
import {
  ENV_KEY_METRICS, ENV_KPI_TABLE, EMISSIONS_BY_SCOPE, EMISSIONS_INTENSITY,
  ENERGY_MIX, ENERGY_BY_REGION, WATER_STRESS, WASTE_CATEGORIES, FIVE_D_MODEL, CLIMATE_RISK,
} from "@/data/emissions";
import { SBTI, PILLAR_SUMMARIES } from "@/data/metrics";
import {
  SOCIAL_KEY_METRICS, SOCIAL_KPI_TABLE, WORKFORCE_BY_GEO, WORKFORCE_GENDER,
  DEI_METRICS, DEI_PROGRAMS, LEARNING, WELLBEING, WELLBEING_STATS, COMMUNITY_STATS, SOCIAL_AWARDS,
} from "@/data/social";
import {
  GOV_KEY_METRICS, GOV_KPI_TABLE, BOARD, GOVERNANCE_TIERS, RISK_PROCESS, RISK_REGISTER,
  ETHICS, CYBER, PROCUREMENT, POLICIES, CERTIFICATIONS,
} from "@/data/governance";
import { AWARDS } from "@/data/awards";
import { HIGHLIGHTS } from "@/data/highlights";
import { MILESTONES } from "@/data/timeline";
import { CLIENT_STATS, MILESTONE_PARTNERSHIPS, TESTIMONIALS } from "@/data/clients";
import { FEATURED_LEADERS, SECTION_LEADERS } from "@/data/leaders";
import { CSR_STRATEGY, CSR_PROGRAMS, CSR_FORWARD } from "@/data/community";
import { DOWNLOADS, RELATED_DISCLOSURES } from "@/data/downloads";
import type { KnowledgeSection } from "./types";

const REPORT = "FY2025 Sustainability Report";

/** Serialize labelled datasets into a compact, model-readable block. */
function body(...parts: Array<[string, unknown]>): string {
  return parts.map(([label, data]) => `${label} = ${JSON.stringify(data)}`).join("\n");
}

export const SECTIONS: KnowledgeSection[] = [
  {
    id: "overview",
    area: "overview",
    title: "Company Overview & ESG Summary",
    keywords: ["overview", "company", "about", "summary", "executive summary", "who", "profile", "mission", "vision", "services", "footprint", "financials", "revenue", "esg summary", "pillars"],
    citation: { report: REPORT, path: "ESG Overview → Company" },
    content: body(["COMPANY", COMPANY], ["MINI_STATS", COMPANY_MINI_STATS], ["MISSION_VISION", MISSION_VISION], ["SERVICES", SERVICES], ["GLOBAL_FOOTPRINT", GLOBAL_FOOTPRINT], ["ABOUT_STATS", ABOUT_STATS], ["FINANCIALS", FINANCIALS], ["PILLAR_SUMMARIES", PILLAR_SUMMARIES]),
  },
  {
    id: "esg-strategy",
    area: "overview",
    title: "ESG Strategy, Commitments & Journey",
    keywords: ["strategy", "esg strategy", "commitments", "approach", "journey", "roadmap", "priorities", "sustainability strategy", "governed"],
    citation: { report: REPORT, path: "Approach → Sustainability Strategy" },
    content: body(["COMMITMENTS", COMMITMENTS], ["JOURNEY", JOURNEY]),
  },
  {
    id: "materiality",
    area: "materiality",
    title: "Materiality Assessment & Stakeholders",
    keywords: ["materiality", "material topics", "material", "stakeholder", "stakeholders", "assessment", "matrix", "priorities", "engagement"],
    citation: { report: REPORT, path: "Materiality → Assessment" },
    content: body(["MATERIALITY_META", MATERIALITY_META], ["MATERIAL_TOPICS", MATERIALITY_MATRIX], ["STAKEHOLDERS", STAKEHOLDERS]),
  },
  {
    id: "sdgs",
    area: "sdgs",
    title: "UN Sustainable Development Goals",
    keywords: ["sdg", "sdgs", "sustainable development goals", "un goals", "goals", "united nations"],
    citation: { report: REPORT, path: "Materiality → UN SDGs" },
    content: body(["SDG_FOCUS", SDG_FOCUS]),
  },
  {
    id: "env-emissions",
    area: "environment",
    title: "Emissions, Carbon & SBTi Targets",
    keywords: ["emissions", "carbon", "ghg", "greenhouse", "co2", "scope 1", "scope 2", "scope 3", "net zero", "net-zero", "sbti", "science based targets", "science-based", "decarbonization", "footprint", "intensity", "climate"],
    citation: { report: REPORT, path: "Environment → Emissions & Climate" },
    content: body(["KEY_METRICS", ENV_KEY_METRICS], ["EMISSIONS_BY_SCOPE", EMISSIONS_BY_SCOPE], ["EMISSIONS_INTENSITY", EMISSIONS_INTENSITY], ["SBTI_TARGETS", SBTI]),
  },
  {
    id: "env-energy",
    area: "environment",
    title: "Energy & Renewables",
    keywords: ["energy", "renewable", "renewables", "electricity", "power", "solar", "grid", "energy mix", "consumption"],
    citation: { report: REPORT, path: "Environment → Energy" },
    content: body(["ENERGY_MIX", ENERGY_MIX], ["ENERGY_BY_REGION", ENERGY_BY_REGION]),
  },
  {
    id: "env-water-waste",
    area: "environment",
    title: "Water & Waste",
    keywords: ["water", "waste", "recycling", "recycled", "e-waste", "landfill", "water stress", "effluent"],
    citation: { report: REPORT, path: "Environment → Water & Waste" },
    content: body(["WATER_STRESS", WATER_STRESS], ["WASTE_CATEGORIES", WASTE_CATEGORIES]),
  },
  {
    id: "env-climate-strategy",
    area: "environment",
    title: "Climate Strategy & 5D Decarbonization",
    keywords: ["climate strategy", "climate", "decarbonization", "5d", "five d", "climate risk", "tcfd", "adaptation", "mitigation", "transition"],
    citation: { report: REPORT, path: "Environment → Climate Strategy" },
    content: body(["FIVE_D_MODEL", FIVE_D_MODEL], ["CLIMATE_RISK", CLIMATE_RISK]),
  },
  {
    id: "env-kpis",
    area: "environment",
    title: "Environmental KPIs",
    keywords: ["environmental kpi", "environmental kpis", "environment metrics", "environmental performance", "environment numbers", "kpi", "kpis"],
    citation: { report: REPORT, path: "ESG Overview → Environment KPIs" },
    content: body(["ENV_KPI_TABLE", ENV_KPI_TABLE]),
  },
  {
    id: "social-people",
    area: "social",
    title: "People & Workforce",
    keywords: ["employees", "people", "workforce", "headcount", "staff", "attrition", "retention", "gender", "geography", "hiring", "talent"],
    citation: { report: REPORT, path: "Social → People" },
    content: body(["KEY_METRICS", SOCIAL_KEY_METRICS], ["WORKFORCE_BY_GEO", WORKFORCE_BY_GEO], ["WORKFORCE_GENDER", WORKFORCE_GENDER]),
  },
  {
    id: "social-dei",
    area: "social",
    title: "Diversity, Equity & Inclusion",
    keywords: ["dei", "diversity", "inclusion", "equity", "women", "gender", "belonging", "representation", "equal"],
    citation: { report: REPORT, path: "Social → Diversity, Equity & Inclusion" },
    content: body(["DEI_METRICS", DEI_METRICS], ["DEI_PROGRAMS", DEI_PROGRAMS]),
  },
  {
    id: "social-learning-wellbeing",
    area: "social",
    title: "Learning, Development, Health & Safety",
    keywords: ["learning", "training", "development", "upskilling", "wellbeing", "well-being", "health", "safety", "health and safety", "hours", "l&d"],
    citation: { report: REPORT, path: "Social → Learning & Wellbeing" },
    content: body(["LEARNING", LEARNING], ["WELLBEING_STATS", WELLBEING_STATS], ["WELLBEING", WELLBEING]),
  },
  {
    id: "social-community-csr",
    area: "community",
    title: "Community & CSR",
    keywords: ["community", "csr", "volunteering", "volunteer", "social impact", "outreach", "philanthropy", "donations", "section 135", "programs"],
    citation: { report: REPORT, path: "Social → CSR & Community" },
    content: body(["COMMUNITY_STATS", COMMUNITY_STATS], ["CSR_STRATEGY", CSR_STRATEGY], ["CSR_PROGRAMS", CSR_PROGRAMS], ["CSR_FORWARD", CSR_FORWARD]),
  },
  {
    id: "social-kpis",
    area: "social",
    title: "Social KPIs",
    keywords: ["social kpi", "social kpis", "social metrics", "social performance", "social numbers"],
    citation: { report: REPORT, path: "ESG Overview → Social KPIs" },
    content: body(["SOCIAL_KPI_TABLE", SOCIAL_KPI_TABLE]),
  },
  {
    id: "gov-board",
    area: "governance",
    title: "Board & Governance Oversight",
    keywords: ["board", "directors", "board of directors", "oversight", "governance structure", "committee", "council", "independence", "chair", "tiers"],
    citation: { report: REPORT, path: "Governance → Board & Oversight" },
    content: body(["KEY_METRICS", GOV_KEY_METRICS], ["BOARD", BOARD], ["GOVERNANCE_TIERS", GOVERNANCE_TIERS]),
  },
  {
    id: "gov-ethics",
    area: "governance",
    title: "Ethics, Compliance & Policies",
    keywords: ["ethics", "compliance", "code of conduct", "policies", "policy", "anti-corruption", "whistleblower", "posh", "human rights", "certifications", "iso"],
    citation: { report: REPORT, path: "Governance → Ethics & Policies" },
    content: body(["ETHICS", ETHICS], ["POLICIES", POLICIES], ["CERTIFICATIONS", CERTIFICATIONS]),
  },
  {
    id: "gov-risk",
    area: "governance",
    title: "Risk Management",
    keywords: ["risk", "risks", "risk management", "enterprise risk", "mitigation", "risk register", "erm", "resilience"],
    citation: { report: REPORT, path: "Governance → Risk Management" },
    content: body(["RISK_PROCESS", RISK_PROCESS], ["RISK_REGISTER", RISK_REGISTER]),
  },
  {
    id: "gov-cyber-procurement",
    area: "governance",
    title: "Data Security & Responsible Procurement",
    keywords: ["cyber", "cybersecurity", "data security", "data breach", "breaches", "privacy", "information security", "procurement", "supply chain", "suppliers", "vendors"],
    citation: { report: REPORT, path: "Governance → Data Security & Procurement" },
    content: body(["CYBER", CYBER], ["PROCUREMENT", PROCUREMENT]),
  },
  {
    id: "gov-kpis",
    area: "governance",
    title: "Governance KPIs",
    keywords: ["governance kpi", "governance kpis", "governance metrics", "governance performance", "governance numbers"],
    citation: { report: REPORT, path: "ESG Overview → Governance KPIs" },
    content: body(["GOV_KPI_TABLE", GOV_KPI_TABLE]),
  },
  {
    id: "awards",
    area: "awards",
    title: "Awards & Recognition",
    keywords: ["awards", "award", "recognition", "recognitions", "accolades", "won", "honors", "certifications"],
    citation: { report: REPORT, path: "Highlights → Awards & Recognition" },
    content: body(["AWARDS", AWARDS], ["SOCIAL_AWARDS", SOCIAL_AWARDS], ["HIGHLIGHTS", HIGHLIGHTS]),
  },
  {
    id: "leadership",
    area: "leadership",
    title: "Leadership Messages",
    keywords: ["leadership", "leaders", "ceo", "message", "cfo", "chro", "executive", "management", "quotes"],
    citation: { report: REPORT, path: "Leadership" },
    content: body(["FEATURED_LEADERS", FEATURED_LEADERS], ["SECTION_LEADERS", SECTION_LEADERS]),
  },
  {
    id: "timeline",
    area: "timeline",
    title: "Sustainability Timeline",
    keywords: ["timeline", "milestones", "history", "journey", "2022", "2023", "2024", "2034", "chronology", "progress"],
    citation: { report: REPORT, path: "Timeline" },
    content: body(["MILESTONES", MILESTONES]),
  },
  {
    id: "clients",
    area: "clients",
    title: "Clients & Partnerships",
    keywords: ["clients", "client", "partnerships", "partners", "customers", "testimonials", "retention", "tenure"],
    citation: { report: REPORT, path: "Clients" },
    content: body(["CLIENT_STATS", CLIENT_STATS], ["MILESTONE_PARTNERSHIPS", MILESTONE_PARTNERSHIPS], ["TESTIMONIALS", TESTIMONIALS]),
  },
  {
    id: "downloads",
    area: "downloads",
    title: "Downloads & Disclosures",
    keywords: ["download", "downloads", "pdf", "report download", "disclosures", "gri", "assurance", "annexure", "cdp", "ecovadis"],
    citation: { report: REPORT, path: "Downloads & Disclosures" },
    content: body(["DOWNLOADS", DOWNLOADS], ["RELATED_DISCLOSURES", RELATED_DISCLOSURES]),
  },
];
