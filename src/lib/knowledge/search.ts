/**
 * Search — intent detection + section ranking over the registry.
 * Pure functions; no side effects, no network.
 */
import { getSections } from "./loader";
import { rankSections, tokenize } from "./ranking";
import { dedupeCitations } from "./citations";
import type { Retrieval } from "./types";

const DEFAULT_LIMIT = 4;

export function retrieve(query: string, limit: number = DEFAULT_LIMIT): Retrieval {
  const raw = query.toLowerCase();
  const tokens = tokenize(query);
  const ranked = rankSections(getSections(), tokens, raw, limit);
  const sections = ranked.map((r) => r.section);
  return {
    sections,
    citations: dedupeCitations(sections.map((s) => s.citation)),
    hasContext: sections.length > 0,
  };
}
