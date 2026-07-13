/** CSR & community — SR FY2024–25 pp.44–50. */

export const CSR_STRATEGY = {
  priorities: ["Inclusive Access to Health", "Empowering Local Communities", "Livelihood Enhancement"],
  focusAreas: ["Education", "Community Development", "Youth Skilling", "Sustainable Development", "Water", "Philanthropic & Humanitarian Efforts"],
  governance:
    "The global CSR program is governed by the CFO through a Global CSR Forum of cross-functional leaders across all geographies, meeting quarterly. Compliant with Section 135 of the Companies Act, 2013.",
  source: "SR FY2024–25, p.46",
} as const;

export interface CsrProgram {
  id: string;
  title: string;
  partner: string;
  investment: string;
  sdgs: string;
  outcomes: { value: string; label: string }[];
  stories: { name: string; text: string }[];
}

export const CSR_PROGRAMS: CsrProgram[] = [
  {
    id: "health",
    title: "Inclusive access to health",
    partner: "Solidarity Foundation",
    investment: "₹15.01 lakh (~$17,659)",
    sdgs: "SDGs 1, 3, 10",
    outcomes: [
      { value: "650", label: "direct beneficiaries" },
      { value: "42%", label: "reduction in mental-health stigma" },
      { value: "50%", label: "reported better preventive-health awareness" },
    ],
    stories: [
      { name: "Kariyamma", text: "Once isolated and battling emotional distress, she found a supportive space in community wellness sessions, rebuilt her confidence — and now encourages others to join. “It's not just a session — it's where I found hope.”" },
      { name: "Swapna", text: "Through Asha Kiran workshops she found the strength to explore her identity and express herself openly, rebuilding family relationships with confidence and self-awareness." },
    ],
  },
  {
    id: "skilling",
    title: "Livelihood enhancement",
    partner: "Unnati Foundation",
    investment: "₹29.01 lakh (~$34,129)",
    sdgs: "SDGs 1, 4, 5, 8, 10",
    outcomes: [
      { value: "140", label: "youth trained in job-relevant skills" },
      { value: "100%", label: "training completion" },
      { value: "85%", label: "placed — average salary ₹13,000/month" },
    ],
    stories: [
      { name: "Anjali", text: "Forced to drop out of college by financial hardship, she completed training and was placed at Allsec Technologies — today supporting her younger brother's education. “Unnati gave me the courage to dream again.”" },
      { name: "Ramesh", text: "From a daily-wage household and low confidence to a role at Quess Corp — and a promotion since. “Life changed because someone believed in me.”" },
    ],
  },
  {
    id: "sports",
    title: "Empowering local communities",
    partner: "Sportz Village Foundation",
    investment: "₹35.13 lakh (~$41,329)",
    sdgs: "SDGs 1, 4, 5, 10",
    outcomes: [
      { value: "1,784", label: "students in structured sports education" },
      { value: "175", label: "medals won in competitions" },
      { value: "+23%", label: "improvement in social-emotional learning" },
    ],
    stories: [
      { name: "Jeevitha", text: "Hesitant at first, she now dreams of representing India — and motivates other girls in her community to pursue sport seriously." },
      { name: "Harish", text: "From schoolyard kabaddi to district-level tournaments. “I never imagined I could go beyond my school walls. Now, I see a future in sports.”" },
    ],
  },
];

export const CSR_FORWARD = {
  text: "In FY2025–26: skill development and employment training for persons with disabilities, vocational and life-skills programs for youth, entrepreneurship and financial literacy for women, vision care for working adults, sports-based empowerment for children, and large-scale urban afforestation across key locations.",
  source: "SR FY2024–25, p.50",
} as const;
