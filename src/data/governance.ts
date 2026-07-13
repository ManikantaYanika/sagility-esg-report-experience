import type { Metric } from "@/data/types";

/**
 * Governance data — SR FY2024–25 (assured), Responsible Business pp.69–92.
 * Board roster verified against p.71; composition against p.72.
 */

/** Chapter hero stat band (p.70 "Key Highlights" + p.11). */
export const GOV_KEY_METRICS: Metric[] = [
  { id: "board", label: "Board members, 5 independent", value: 9, pillar: "governance", source: "SR FY2024–25, p.72" },
  { id: "women-dir", label: "Women directors", value: 2, pillar: "governance", source: "SR FY2024–25, p.72" },
  { id: "breaches", label: "Data breaches, fines & non-compliances", value: 0, pillar: "governance", source: "SR FY2024–25, p.70" },
  { id: "ethics", label: "Ethics & compliance training completion", value: 98.6, suffix: "%", decimals: 1, pillar: "governance", source: "SR FY2024–25, p.11" },
  { id: "sec-training", label: "Data protection training hours", value: 43659, pillar: "governance", source: "SR FY2024–25, p.11" },
];

/** Board of Directors (p.71 — roster verified). */
export const BOARD = {
  directors: [
    { name: "Martin I. Cole", role: "Chairman · Non-Executive Director", group: "Non-Executive" },
    { name: "Ramesh Gopalan", role: "Managing Director & Group CEO", group: "Executive" },
    { name: "Hari Gopalakrishnan", role: "Non-Executive Director", group: "Non-Executive" },
    { name: "Jimmy Mahtani", role: "Non-Executive Director", group: "Non-Executive" },
    { name: "Anil Chanana", role: "Independent Director", group: "Independent" },
    { name: "Dr. William Winkenwerder", role: "Independent Director", group: "Independent" },
    { name: "Ginger Dusek", role: "Independent Director", group: "Independent" },
    { name: "Venkat Krishnaswamy", role: "Independent Director", group: "Independent" },
    { name: "Dr. Shalini Sarin", role: "Independent Director · Chair, CSR & Sustainability Committee", group: "Independent" },
  ],
  composition: [
    { label: "Executive director", value: 1 },
    { label: "Non-executive, non-independent", value: 3 },
    { label: "Independent directors", value: 5 },
  ],
  competencies: [
    "BPM services",
    "US healthcare payer/provider",
    "Global operations",
    "Global professional services",
    "Global delivery networks",
    "Finance & accounting",
    "Human capital management",
    "Technology & innovation",
    "Risk management",
    "Strategic transactions (M&A)",
    "Corporate social responsibility",
    "Cybersecurity",
  ],
  committees: [
    { name: "Audit Committee", note: "Independent oversight of financial reporting and controls" },
    { name: "Finance & Risk Committee", note: "Capital, liquidity, and enterprise risk supervision" },
    { name: "Nomination & Remuneration Committee", note: "Merit-based appointments and Board evaluation under Section 178" },
    { name: "CSR & Sustainability Committee", note: "ESG strategy, targets, and disclosures — chaired by Dr. Shalini Sarin" },
  ],
  source: "SR FY2024–25, pp.71–77",
} as const;

/** Three-tier sustainability governance (p.74). */
export const GOVERNANCE_TIERS = [
  {
    tier: "1",
    name: "CSR & Sustainability Committee",
    who: "Board level — ≥3 directors, at least one independent",
    does: "Guides sustainability vision and goals, approves budgets and all material disclosures, reports to the Board. The Group CFO serves as Sustainability Head.",
  },
  {
    tier: "2",
    name: "Sustainability Council / Core Group",
    who: "Executive level — presided over by the CEO",
    does: "Co-develops strategy, reviews progress at least quarterly, and presents business-level updates to the Committee.",
  },
  {
    tier: "3",
    name: "Sustainability Working Groups",
    who: "Cross-functional — Environment, Social, Governance",
    does: "Break goals into function-level initiatives, gather ESG data for GRI/CDP disclosures, and incubate improvements on the ground.",
  },
] as const;

/** Enterprise risk process (p.78). */
export const RISK_PROCESS = [
  { step: "Identify", text: "Industry and organization-level risks surfaced through internal research and ERM inputs, validated by senior leadership and domain experts." },
  { step: "Evaluate", text: "Risks prioritized by likelihood and potential impact on operational and strategic objectives." },
  { step: "Mitigate", text: "Tailored mitigation plans built to strengthen business continuity and resilience." },
  { step: "Monitor", text: "Plans reviewed quarterly under the Chief Risk Officer, with Risk Management Committee oversight." },
] as const;

/** Material risk & opportunity register (pp.79–81) — all 17 topics. */
export interface RiskTopic {
  topic: string;
  kind: "Risk" | "Opportunity";
  pillar: "E" | "S" | "G";
  approach: string;
}

export const RISK_REGISTER: RiskTopic[] = [
  { topic: "Cybersecurity & data privacy", kind: "Risk", pillar: "G", approach: "Stringent governance via data security policies, training and awareness, privacy impact assessments, third-party data-sharing controls, and incident management under the Compliance and Cybersecurity teams." },
  { topic: "Compliance", kind: "Risk", pillar: "G", approach: "Legal-team oversight with regular compliance reporting to senior management, the Audit Committee, and the Board; frameworks refreshed as regulations evolve." },
  { topic: "Ethics & integrity", kind: "Risk", pillar: "G", approach: "Whistleblower mechanism open to employees and all stakeholders, promoting transparency and accountability at every level." },
  { topic: "Corporate governance", kind: "Risk", pillar: "G", approach: "Defined policies and stringent controls, plus a confidential whistle-blower channel for governance-related incidents." },
  { topic: "Risk & opportunities management", kind: "Risk", pillar: "G", approach: "Enterprise Risk Management system to systematically identify, prioritize, and mitigate the most critical risks." },
  { topic: "Stakeholder grievance redressal", kind: "Risk", pillar: "G", approach: "Stringent redressal mechanism ensuring concerns are promptly reviewed, addressed, and resolved." },
  { topic: "Responsible procurement", kind: "Risk", pillar: "G", approach: "Supplier engagement on sustainability initiatives, transitioning sourcing toward suppliers meeting defined sustainability criteria." },
  { topic: "Climate change", kind: "Risk", pillar: "E", approach: "Internal decarbonization targets, Sustainability Council oversight, SBTi commitment, and timely CDP/EcoVadis disclosure." },
  { topic: "Water & waste management", kind: "Risk", pillar: "E", approach: "Recycling initiatives at existing facilities and strict compliant-disposal procedures." },
  { topic: "Energy management", kind: "Opportunity", pillar: "E", approach: "Efficiency assessment and a defined plan for renewable infrastructure at all feasible sites." },
  { topic: "Human rights", kind: "Risk", pillar: "S", approach: "Global Human Rights Policy with training embedded in the Code of Business Ethics and Conduct program." },
  { topic: "Human capital management", kind: "Risk", pillar: "S", approach: "Continuous upskilling with periodic effectiveness assessments fostering learning and career progression." },
  { topic: "Employee engagement", kind: "Risk", pillar: "S", approach: "Voice-of-Employee and engagement surveys driving improvement in environment, morale, and retention." },
  { topic: "Health, safety & wellbeing", kind: "Opportunity", pillar: "S", approach: "Global health & safety policy, incident investigation, and proactive action planning." },
  { topic: "DEI environment", kind: "Opportunity", pillar: "S", approach: "Comprehensive global DEI policy with a council monitoring goals and driving improvement." },
  { topic: "Client satisfaction & innovation", kind: "Opportunity", pillar: "S", approach: "Early-stage service and process studies plus frequent development reviews tailoring value-driven solutions." },
  { topic: "CSR", kind: "Opportunity", pillar: "S", approach: "NGO partnerships in education, health, and clean-water access, strengthening community relationships." },
];

/** Ethics & compliance program (pp.82–87). */
export const ETHICS = {
  pillars: [
    { title: "Code of Conduct", text: "Discretion, integrity, and respect required of every employee — internally and in client engagements — with zero tolerance for harassment in any form." },
    { title: "Whistleblower protection", text: "Dedicated confidential channels in every geography, anti-retaliation guarantees, and identity protection. Open to employees, suppliers, contractors, and their families." },
    { title: "Anti-corruption & conflicts", text: "Financial disclosures, gift reporting, and approval protocols; 100% of operations assessed for governance risks with no significant incidents." },
    { title: "Three-lines assurance", text: "Management self-tests controls quarterly; Compliance and Privacy run thematic reviews; Internal Audit independently validates — reporting to the Audit Committee." },
  ],
  complianceAreas: [
    "Data protection & privacy",
    "Cybersecurity & IPR",
    "Labor laws & equal opportunity",
    "Healthcare compliance (HIPAA, FISMA)",
    "Anti-money laundering & anti-bribery",
    "Competition, taxation & environment",
  ],
  quote: {
    text: "Our commitment to ethics and compliance is not merely about meeting requirements — it is about shaping a culture where integrity defines how we operate and innovate.",
    name: "Daniel B. Bailey",
    role: "EVP, Global General Counsel",
  },
  source: "SR FY2024–25, pp.82–87",
} as const;

/** Cybersecurity & data privacy (pp.88–89). */
export const CYBER = {
  stats: [
    { id: "breaches", value: "0", label: "breaches of customer privacy — FY24 and FY25" },
    { id: "incidents", value: "100%", label: "security incidents resolved on time" },
    { id: "hours", value: "43,659", label: "data protection & security training hours (+167% YoY)" },
    { id: "hipaa", value: "HIPAA", label: "compliance across all U.S. healthcare operations" },
  ],
  practices: [
    { title: "Minimal Data Usage Principle", text: "Employees access only the data their role requires — enforced through role-based access controls." },
    { title: "Structured incident response", text: "Defined protocols for reporting, investigation, and resolution with dedicated internal teams and no-retaliation reporting." },
    { title: "IP & confidentiality", text: "NDAs for all employees, structured onboarding on confidentiality, and legal review of all public disclosures." },
    { title: "Continuous training", text: "Periodic awareness on data protection, phishing, and secure work practices for every function and geography." },
  ],
  quote: {
    text: "Safeguarding our systems, intellectual property, and sensitive information is fundamental to sustaining the trust of our clients and their members.",
    name: "Shwetank Verma",
    role: "Global Head Technology Infrastructure & CISO",
  },
  source: "SR FY2024–25, pp.88–89",
} as const;

/** Responsible procurement (pp.90–92). */
export const PROCUREMENT = {
  stats: [
    { id: "suppliers", value: "1,491", label: "total suppliers" },
    { id: "trained", value: "1,327", label: "suppliers trained on anti-corruption policies" },
    { id: "scoc", value: "95%", label: "of 641 newly onboarded suppliers accepted the Supplier Code of Conduct" },
    { id: "assessed", value: "100%", label: "offices assessed for human-rights risks in the chain" },
  ],
  codeAreas: [
    "No forced or compulsory labour",
    "Prohibition of child labour",
    "Fair wages & benefits",
    "Social focus",
    "Anti-bribery compliance",
    "Data privacy & confidentiality",
    "Drug & alcohol prohibition",
    "Green environment",
    "Equal opportunity, no harassment",
  ],
  quote: {
    text: "We actively encourage vendors to embrace greener practices and minimize their ecological footprint — a network of suppliers united by our commitment to sustainable progress.",
    name: "Prasad Mathakari",
    role: "Head of Global Procurement",
  },
  source: "SR FY2024–25, pp.90–92",
} as const;

/** Policy framework (p.85) + certifications (SR FY2024, p.10). */
export const POLICIES = [
  "Code of Conduct",
  "Sustainability Policy",
  "CSR Policy",
  "Global Privacy Policy",
  "Supplier Code of Conduct & Sustainability Guidelines",
  "Conflict of Interest & Anti-Corruption",
  "Employee Health & Safety Policy",
  "Human Rights Policy",
  "Whistleblower Policy",
  "Anti-Money Laundering Policy",
  "Environmental Policy",
] as const;

export const CERTIFICATIONS = [
  { name: "ISO 9001", scope: "Quality management" },
  { name: "ISO 27001", scope: "Information security management" },
  { name: "ISO 45001", scope: "Occupational health & safety — 100% of delivery centres" },
  { name: "PCI/DSS", scope: "Payment card data security" },
] as const;

/** Governance KPI dashboard (p.11 + chapter pages). */
export const GOV_KPI_TABLE: Metric[] = [
  { id: "gk-board", label: "Board size", value: "9", source: "p.72", contextNote: "1 executive, 3 non-executive, 5 independent directors" },
  { id: "gk-women", label: "Women on the Board", value: "2", delta: 100, deltaGoodWhen: "up", source: "p.11", contextNote: "Up from 1 in FY2023–24" },
  { id: "gk-breach", label: "Data breaches", value: "0", source: "p.11" },
  { id: "gk-incidents", label: "Security incidents resolved on time", value: "100%", source: "p.11" },
  { id: "gk-ethics", label: "Employees trained on ethics & compliance", value: "98.6%", source: "p.11" },
  { id: "gk-sectrain", label: "Data protection & security training hours", value: "43,659", delta: 167.2, deltaGoodWhen: "up", source: "p.11", contextNote: "16,338 hours in FY2023–24" },
  { id: "gk-suppliers", label: "Suppliers trained on anti-corruption", value: "1,327", source: "p.90" },
  { id: "gk-scoc", label: "New suppliers accepting the Supplier Code of Conduct", value: "95%", source: "p.30" },
  { id: "gk-grievance", label: "Grievances resolved (of 470 received)", value: "460", source: "p.30" },
  { id: "gk-assessed", label: "Operations assessed for governance risks", value: "100%", source: "p.85", contextNote: "No significant corruption or anti-competitive incidents identified" },
];
