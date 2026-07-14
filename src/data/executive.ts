/**
 * Executive Actions — one-click, board-grade prompts for the Copilot.
 * Each action sends a concise grounded request; the executive response
 * structure is enforced by the system prompt. No report data lives here.
 */
export type ExecutiveIcon =
  | "summary" | "investor" | "board" | "climate" | "environment" | "social"
  | "governance" | "materiality" | "kpis" | "awards" | "community" | "downloads";

export interface ExecutiveAction {
  id: string;
  label: string;
  icon: ExecutiveIcon;
  /** Sent verbatim as the user turn; reads cleanly as a request. */
  prompt: string;
}

export const EXECUTIVE_ACTIONS: ExecutiveAction[] = [
  { id: "exec-summary", label: "Executive Summary", icon: "summary",
    prompt: "Generate a board-ready executive summary of Sagility's FY2025 sustainability performance." },
  { id: "investor", label: "Investor View", icon: "investor",
    prompt: "Give an investor-focused ESG summary of Sagility — performance, targets, assurance, and risk." },
  { id: "board", label: "Board View", icon: "board",
    prompt: "Provide a board-level governance and ESG oversight summary for Sagility FY2025." },
  { id: "climate", label: "Climate Strategy", icon: "climate",
    prompt: "Summarize Sagility's climate strategy, emissions, and science-based targets." },
  { id: "environment", label: "Environment", icon: "environment",
    prompt: "Summarize Sagility's environmental performance and key environmental KPIs." },
  { id: "social", label: "Social", icon: "social",
    prompt: "Summarize Sagility's social performance: people, DEI, learning, and wellbeing." },
  { id: "governance", label: "Governance", icon: "governance",
    prompt: "Summarize Sagility's governance: board, ethics, risk, and data security." },
  { id: "materiality", label: "Materiality", icon: "materiality",
    prompt: "Explain Sagility's materiality assessment and its most material ESG topics." },
  { id: "kpis", label: "ESG KPIs", icon: "kpis",
    prompt: "Show Sagility's key ESG KPIs across Environment, Social, and Governance." },
  { id: "awards", label: "Awards", icon: "awards",
    prompt: "Summarize Sagility's ESG awards and recognition." },
  { id: "community", label: "CSR & Community", icon: "community",
    prompt: "Summarize Sagility's CSR and community initiatives and their impact." },
  { id: "downloads", label: "Report Downloads", icon: "downloads",
    prompt: "Summarize what's available in the Sagility report downloads and disclosures." },
];
