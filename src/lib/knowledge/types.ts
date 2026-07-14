/** Knowledge layer types — retrieval over the existing src/data content. */

export type KnowledgeArea =
  | "overview"
  | "environment"
  | "social"
  | "governance"
  | "materiality"
  | "sdgs"
  | "awards"
  | "leadership"
  | "timeline"
  | "clients"
  | "community"
  | "downloads";

export interface Citation {
  /** e.g. "FY2025 Sustainability Report" */
  report: string;
  /** e.g. "Environment → Climate Strategy" */
  path: string;
  /** e.g. "p.42" — only when reliably known. */
  page?: string;
}

export interface KnowledgeSection {
  id: string;
  area: KnowledgeArea;
  title: string;
  /** Intent-matching terms (single words and short phrases). */
  keywords: string[];
  /** Grounded content, derived from src/data (no duplication of source). */
  content: string;
  citation: Citation;
}

export interface ScoredSection {
  section: KnowledgeSection;
  score: number;
}

export interface Retrieval {
  sections: KnowledgeSection[];
  citations: Citation[];
  /** True when at least one section matched the query. */
  hasContext: boolean;
}
