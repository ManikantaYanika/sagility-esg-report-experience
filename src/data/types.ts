/**
 * Data contracts — every record that renders a fact carries `source`
 * (report + page) so the UI can surface provenance (blueprint §9, R5).
 */

export type PillarId = "environment" | "social" | "governance";

export interface Metric {
  id: string;
  label: string;
  value: number | string;
  prefix?: string;
  suffix?: string;
  /** Decimal places when animated. */
  decimals?: number;
  pillar?: PillarId;
  /** Signed YoY % change and which direction is an improvement. */
  delta?: number;
  deltaGoodWhen?: "up" | "down";
  /** Provenance, e.g. "SR FY2024–25, p.11". */
  source: string;
  /** Mandatory framing for sensitive metrics (content-model §15). */
  contextNote?: string;
}

export interface Milestone {
  id: string;
  /** Display date, e.g. "Jan 2022". */
  when: string;
  /** Sort key. */
  order: number;
  title: string;
  description: string;
  era: "Foundation" | "Baselining" | "Validation" | "Ambition";
  /** Featured milestones appear in the homepage teaser. */
  featured?: boolean;
  source: string;
}

export interface Highlight {
  id: string;
  title: string;
  description: string;
  /** Lucide icon name mapped at the component. */
  icon: "listing" | "assured" | "target" | "rating" | "safety" | "volunteering";
  source: string;
}

export interface Leader {
  id: string;
  name: string;
  role: string;
  quote: string;
  /** Route the quote links to. */
  href: string;
  source: string;
}

export interface PillarSummary {
  id: PillarId;
  title: string;
  href: string;
  headline: Metric;
  topics: string[];
  commitment: string;
}
