import type { KnowledgeSection, ScoredSection } from "./types";

const STOPWORDS = new Set([
  "the", "a", "an", "of", "and", "or", "to", "in", "on", "for", "is", "are",
  "what", "which", "how", "show", "me", "explain", "about", "our", "your",
  "sagility", "report", "please", "tell", "give", "list", "can", "you", "do",
  "does", "with", "at", "by", "from", "this", "that", "s", "fy", "fy24", "fy25",
]);

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

/** Score a section against query tokens + the raw (lowercased) query. */
export function scoreSection(
  section: KnowledgeSection,
  queryTokens: string[],
  rawQuery: string,
): number {
  const title = section.title.toLowerCase();
  const kw = section.keywords.map((k) => k.toLowerCase());
  const kwText = kw.join(" ");
  let score = 0;

  // Multi-word keyword phrases present verbatim in the query (strong signal).
  for (const k of kw) {
    if (k.includes(" ") && rawQuery.includes(k)) score += 6;
  }

  for (const token of queryTokens) {
    if (kw.includes(token)) score += 4;
    else if (kwText.includes(token)) score += 2;
    if (title.includes(token)) score += 2;
    if (section.area.includes(token)) score += 2;
  }
  return score;
}

export function rankSections(
  sections: KnowledgeSection[],
  queryTokens: string[],
  rawQuery: string,
  limit: number,
): ScoredSection[] {
  return sections
    .map((section) => ({ section, score: scoreSection(section, queryTokens, rawQuery) }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
