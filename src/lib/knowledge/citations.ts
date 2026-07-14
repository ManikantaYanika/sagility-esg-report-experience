import type { Citation } from "./types";

/** Deduplicate citations by path (keeping the first page seen). */
export function dedupeCitations(citations: Citation[]): Citation[] {
  const seen = new Map<string, Citation>();
  for (const c of citations) if (!seen.has(c.path)) seen.set(c.path, c);
  return [...seen.values()];
}

/** Render the "AVAILABLE SOURCES" list injected into the model context. */
export function renderSourceList(citations: Citation[]): string {
  return dedupeCitations(citations)
    .map((c) => `- ${c.report} — ${c.path}${c.page ? ` (${c.page})` : ""}`)
    .join("\n");
}
