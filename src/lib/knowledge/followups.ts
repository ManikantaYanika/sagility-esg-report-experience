/**
 * Follow-up intelligence — context-aware next questions after each answer.
 * Data-free by design (imports only the tokenizer + types), so it can be used
 * anywhere without pulling the report data into a bundle.
 */
import { tokenize } from "./ranking";
import type { KnowledgeArea } from "./types";

const AREA_KEYWORDS: Record<KnowledgeArea, string[]> = {
  environment: ["environment", "environmental", "emissions", "carbon", "climate", "energy", "renewable", "water", "waste", "scope", "net", "zero", "sbti", "decarbonization"],
  social: ["social", "employees", "people", "workforce", "dei", "diversity", "inclusion", "women", "learning", "training", "wellbeing", "health", "safety"],
  governance: ["governance", "board", "directors", "ethics", "compliance", "risk", "policies", "policy", "cyber", "security", "breach", "procurement"],
  materiality: ["materiality", "material", "topics", "stakeholder", "stakeholders", "matrix", "assessment"],
  sdgs: ["sdg", "sdgs", "goals", "development"],
  awards: ["awards", "award", "recognition", "accolades"],
  leadership: ["leadership", "leaders", "ceo", "cfo", "chro", "message", "executive"],
  timeline: ["timeline", "milestones", "history", "journey", "roadmap"],
  clients: ["clients", "client", "partnerships", "partners", "customers", "testimonials"],
  community: ["community", "csr", "volunteering", "outreach", "philanthropy"],
  downloads: ["download", "downloads", "pdf", "disclosures", "gri", "assurance"],
  overview: ["overview", "company", "summary", "executive", "esg", "report", "investor", "board"],
};

const FOLLOWUPS: Record<KnowledgeArea, string[]> = {
  environment: ["Show emissions data", "Explain renewable energy", "Compare FY24 vs FY25"],
  social: ["Explain DEI initiatives", "Show learning & development", "Summarize wellbeing programs"],
  governance: ["Explain Board structure", "Show ethics & policies", "Explain risk management"],
  materiality: ["Show top material topics", "Explain stakeholder engagement", "Which SDGs are in focus?"],
  sdgs: ["How do SDGs map to material topics?", "Show environmental goals", "Explain social initiatives"],
  awards: ["Which awards were won in 2025?", "Show workplace & culture awards", "Show sustainability awards"],
  leadership: ["What does the CEO message say?", "Show ESG leadership messages", "Explain the ESG strategy"],
  timeline: ["What happened in 2022?", "Show the FY2034 targets", "Explain the ESG journey"],
  clients: ["Show client retention", "Explain milestone partnerships", "Summarize the ESG strategy"],
  community: ["Show flagship CSR programs", "Explain volunteering impact", "What is the CSR strategy?"],
  downloads: ["What disclosures are available?", "Explain the external assurance", "Show the GRI content index"],
  overview: ["Summarize the FY2025 Sustainability Report", "Explain Sagility's ESG strategy", "Show ESG KPIs"],
};

const AREAS = Object.keys(AREA_KEYWORDS) as KnowledgeArea[];

/** Detect the most relevant area for a query and return its follow-up prompts. */
export function suggestFollowups(query: string, limit = 3): string[] {
  const tokens = new Set(tokenize(query));
  let best: KnowledgeArea = "overview";
  let bestScore = 0;
  for (const area of AREAS) {
    let score = 0;
    for (const kw of AREA_KEYWORDS[area]) if (tokens.has(kw)) score += 1;
    if (score > bestScore) {
      bestScore = score;
      best = area;
    }
  }
  return FOLLOWUPS[best].slice(0, limit);
}
