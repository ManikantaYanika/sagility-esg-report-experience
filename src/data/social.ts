import type { Metric } from "@/data/types";

/**
 * Social data — SR FY2024–25 (assured), People & Culture pp.23–43,
 * Social Responsibility & Impact pp.44–50. FY24 comparatives noted.
 */

/** Chapter hero stat band (p.24 "Key Highlights"). */
export const SOCIAL_KEY_METRICS: Metric[] = [
  { id: "employees", label: "Employees worldwide", value: 38754, pillar: "social", source: "SR FY2024–25, p.24" },
  { id: "women", label: "Women in the workforce", value: 61, suffix: "%", pillar: "social", source: "SR FY2024–25, p.24" },
  { id: "training", label: "Average training hours per employee", value: 115, pillar: "social", source: "SR FY2024–25, p.24" },
  { id: "pwd", label: "Persons with disabilities", value: 254, pillar: "social", source: "SR FY2024–25, p.24" },
  { id: "enps", label: "Employee Net Promoter Score", value: 51, pillar: "social", source: "SR FY2024–25, p.24" },
];

/** Workforce by geography (p.25). */
export const WORKFORCE_BY_GEO = {
  unit: "employees",
  slices: [
    { label: "India", value: 17885, pct: 46.2 },
    { label: "Philippines", value: 15062, pct: 38.9 },
    { label: "Jamaica", value: 3123, pct: 8.1 },
    { label: "USA", value: 2430, pct: 6.3 },
    { label: "Colombia", value: 254, pct: 0.7 },
  ],
  total: 38754,
  source: "SR FY2024–25, p.25",
} as const;

/** Workforce gender composition (p.25). */
export const WORKFORCE_GENDER = {
  rows: [
    {
      label: "Permanent employees — 38,326",
      segments: [
        { name: "Women", value: 23395, pctLabel: "61.0%" },
        { name: "Men", value: 14921, pctLabel: "38.9%" },
        { name: "Other", value: 10, pctLabel: "<0.1%" },
      ],
    },
    {
      label: "FY25 new hires — 24,719",
      segments: [
        { name: "Women", value: 15990, pctLabel: "64.7%" },
        { name: "Men", value: 8393, pctLabel: "34.0%" },
        { name: "Other", value: 336, pctLabel: "1.4%" },
      ],
    },
  ],
  source: "SR FY2024–25, pp.25, 32",
} as const;

/** DEI headline metrics (p.32). */
export const DEI_METRICS: Metric[] = [
  { id: "dei-women", label: "female representation across the workforce", value: 61, suffix: "%", pillar: "social", source: "SR FY2024–25, p.32" },
  { id: "dei-lead", label: "of leadership positions held by women", value: 19, suffix: "%", pillar: "social", source: "SR FY2024–25, p.32" },
  { id: "dei-ratio", label: "remuneration ratio, women to men", value: 1.46, decimals: 2, pillar: "social", source: "SR FY2024–25, p.32" },
  { id: "dei-pwd", label: "persons with disabilities — up from 99 in FY24", value: 254, pillar: "social", source: "SR FY2024–25, p.24" },
];

/** DEI programs (pp.32–34). */
export const DEI_PROGRAMS = [
  {
    id: "she-leads",
    title: "S.H.E. Leads & S.H.E. Leads Academy",
    text: "Flagship women's leadership pathway — 15 workshops, structured assessments, and mentorship. The Academy, added in FY25, extends it to junior and mid-level women.",
  },
  {
    id: "dei-council",
    title: "Global DEI Council",
    text: "Senior leaders across businesses and geographies, meeting quarterly to track representation, remove roadblocks, and publish progress against DEI objectives.",
  },
  {
    id: "ergs",
    title: "Employee Resource Groups",
    text: "Voluntary, employee-led communities advancing inclusion for women, LGBTQ+ colleagues, persons with disabilities, and allies.",
  },
  {
    id: "lgbtq",
    title: "LGBTQ+ inclusion",
    text: "Non-discrimination policy, gender-neutral job descriptions, allyship workshops — and a PRIDE Virtual Parade supporting the Rainbow Youth Project.",
  },
  {
    id: "pwd",
    title: "Disability inclusion",
    text: "Reasonable accommodations through recruitment and employment, accessible workplaces and digital tools, under India's RPwD Act and the U.S. ADA.",
  },
  {
    id: "returnships",
    title: "Returnships & inclusive hiring",
    text: "Unconscious-bias training for hiring managers, re-entry programs for returning professionals, and flexible arrangements for caregivers.",
  },
] as const;

/** Learning & development (pp.27, 24). */
export const LEARNING = {
  totalHours: 4435043,
  avgHours: 115,
  reviewsCoverage: 100,
  programs: [
    {
      id: "stride",
      title: "STRIDE · PACE · STEP",
      text: "Tiered leadership development for emerging and established leaders across all geographies.",
    },
    {
      id: "hall",
      title: "HALL — Healthcare Anytime Learning Library",
      text: "Always-on digital library for continuous healthcare upskilling.",
    },
    {
      id: "academy",
      title: "Healthcare Academy",
      text: "Specialized clinical training — medical coding, clinical documentation, and payer operations.",
    },
    {
      id: "everest",
      title: "Everest Cup",
      text: "Knowledge-based competition building teamwork and domain pride.",
    },
    {
      id: "compliance",
      title: "Annual compliance training",
      text: "HIPAA privacy, fraud-waste-abuse prevention, and information security — completed by all applicable employees by March 31, 2025.",
    },
    {
      id: "ijp",
      title: "Internal mobility",
      text: "Internal job postings and redeployment programs that keep careers — and institutional knowledge — inside Sagility.",
    },
  ],
  source: "SR FY2024–25, pp.24, 27",
} as const;

/** Wellbeing & safety (pp.35–43). */
export const WELLBEING_STATS: Metric[] = [
  { id: "eap", label: "employees engaging monthly with the Employee Assistance Program", value: 1100, prefix: "~", pillar: "social", source: "SR FY2024–25, p.42" },
  { id: "zumba", label: "employees in group fitness sessions", value: 10000, prefix: "~", pillar: "social", source: "SR FY2024–25, p.42" },
  { id: "stress", label: "employees equipped through stress-management workshops", value: 5000, suffix: "+", pillar: "social", source: "SR FY2024–25, p.42" },
  { id: "refyne", label: "employees with on-demand salary access via Refyne", value: 4200, suffix: "+", pillar: "social", source: "SR FY2024–25, p.38" },
];

export const WELLBEING = {
  safety: [
    { id: "iso", label: "delivery centres ISO 45001:2018 certified", value: "100%" },
    { id: "fatalities", label: "work-related fatalities, two years running", value: "0" },
    { id: "ltifr", label: "Lost Time Injury Frequency Rate", value: "0.067" },
    { id: "risk", label: "centres with health & safety risk assessments", value: "100%" },
  ],
  dimensions: [
    { title: "Occupational", text: "Hybrid work model, appreciation weeks, cross-team knowledge transfer." },
    { title: "Intellectual", text: "S.H.E. Leads Academy, Healthcare Academy, Everest Cup." },
    { title: "Financial", text: "Investment masterclasses, tax literacy, Refyne earned-wage access, retirement planning." },
    { title: "Social", text: "Hobby and biking clubs, multi-faith celebrations, The Forum storytelling sessions." },
    { title: "Emotional", text: "EAP counselling (family-inclusive in India), mindfulness programs, suicide-prevention awareness — 100+ sessions." },
  ],
  humanRights: {
    trainingPct: 100,
    aboveMinWagePct: 96.4,
    grievances: { received: 470, resolved: 460 },
    source: "SR FY2024–25, pp.29–30",
  },
  source: "SR FY2024–25, pp.35–43",
} as const;

/** Community impact summary (pp.44–50). Full stories on /social/community. */
export const COMMUNITY_STATS: Metric[] = [
  { id: "volunteers", label: "employees volunteered", value: 18645, pillar: "social", source: "SR FY2024–25, p.45" },
  { id: "hours", label: "volunteering hours worldwide", value: 63170, pillar: "social", source: "SR FY2024–25, p.45" },
  { id: "participation", label: "employee volunteering participation", value: 56, suffix: "%", pillar: "social", source: "SR FY2024–25, p.45" },
  { id: "spend", label: "CSR spend (INR millions)", value: 7.91, decimals: 2, prefix: "₹", suffix: "mn", pillar: "social", source: "SR FY2024–25, p.45" },
];

export const COMMUNITY = {
  programs: [
    {
      id: "health",
      title: "Inclusive access to health",
      partner: "Solidarity Foundation",
      impact: "650 beneficiaries · 42% reduction in mental-health stigma",
      story:
        "Kariyamma once lived in isolation. Through community mental-wellness sessions she rebuilt her confidence — “It's not just a session, it's where I found hope.”",
    },
    {
      id: "skilling",
      title: "Livelihood enhancement",
      partner: "Unnati Foundation",
      impact: "140 youth trained · 100% completion · 85% placed in jobs",
      story:
        "Anjali had dropped out of college for financial reasons. After tech-enabled skilling she now supports her brother's education — “Unnati gave me the courage to dream again.”",
    },
    {
      id: "sports",
      title: "Empowering local communities",
      partner: "Sportz Village Foundation",
      impact: "1,784 students · 175 medals · +23% social-emotional learning",
      story:
        "Harish went from schoolyard kabaddi to district-level tournaments — “I never imagined I could go beyond my school walls. Now, I see a future in sports.”",
    },
  ],
  source: "SR FY2024–25, pp.44–50",
} as const;

/** Social awards (FY24–FY25 reports, awards pages). */
export const SOCIAL_AWARDS = [
  { title: "Happy Companies to Work For", by: "World HRD Congress", year: 2025, category: "Workplace & Culture" },
  { title: "Best Organisation for Women", by: "ET Now, The Times Group", year: 2025, category: "Women & DEI" },
  { title: "Onboarding Program of the Year", by: "The Empire Forums", year: 2025, category: "Workplace & Culture" },
  { title: "Most Preferred Workplace", by: "Marksmen Daily", year: 2025, category: "Workplace & Culture" },
  { title: "Global CSR & Leadership Excellence", by: "CSR Congress", year: 2025, category: "CSR & Sustainability" },
  { title: "Dream Companies to Work For", by: "World HRD Congress", year: 2024, category: "Workplace & Culture" },
  { title: "Promoting Health in the Workplace", by: "World HRD Congress", year: 2024, category: "Wellbeing" },
  { title: "Employer of the Year — Bronze", by: "Stevie Awards", year: 2024, category: "Workplace & Culture" },
  { title: "L&D Program of the Year", by: "Gawad Maestro Awards", year: 2024, category: "Learning" },
  { title: "Sport for Change — Playmaker Award", by: "Sportz Village Foundation", year: 2024, category: "CSR & Sustainability" },
] as const;

/** Social KPI dashboard table (p.11 + chapter pages). */
export const SOCIAL_KPI_TABLE: Metric[] = [
  { id: "sk-emp", label: "Total employees", value: "38,754", source: "p.17" },
  { id: "sk-women", label: "Female employees", value: "61%", source: "p.11" },
  { id: "sk-lead", label: "Leadership positions held by women", value: "19%", source: "p.11" },
  { id: "sk-train", label: "Average training hours per employee", value: "115", source: "p.11" },
  { id: "sk-pwd", label: "Persons with disabilities", value: "254", delta: 156.6, deltaGoodWhen: "up", source: "p.11", contextNote: "Up from 99 in FY2023–24" },
  { id: "sk-enps", label: "Employee Net Promoter Score", value: "51", source: "p.11", contextNote: "52 in FY24; prior year was significantly above BPM industry benchmarks — FY25 reflects normalization" },
  { id: "sk-attr", label: "Attrition rate", value: "27.5%", source: "p.11", contextNote: "27.3% in FY24; the 0.2pt increase is attributable to the addition of Colombia. Compares favourably to industry benchmarks" },
  { id: "sk-csat", label: "Client Satisfaction Score (CSAT)", value: "53", delta: 1.9, deltaGoodWhen: "up", source: "p.11" },
  { id: "sk-reviews", label: "Eligible employees covered by performance reviews", value: "100%", source: "p.27" },
  { id: "sk-hr", label: "Workforce trained on human rights", value: "100%", source: "p.29" },
];
