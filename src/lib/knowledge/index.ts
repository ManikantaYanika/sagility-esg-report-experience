/**
 * Knowledge layer entry point.
 * buildGroundedContext() turns recent conversation into a bounded, grounded
 * context block (top sections only) + the citations the model may use.
 * Only relevant report content is sent to Claude — never the whole report.
 */
import { retrieve } from "./search";
import { renderSourceList } from "./citations";
import type { Citation } from "./types";

export type { Citation, KnowledgeSection, Retrieval } from "./types";
export { retrieve } from "./search";
export { suggestFollowups } from "./followups";

interface HistoryMessage {
  role: "user" | "assistant";
  content: string;
}

export interface GroundedContext {
  context: string;
  citations: Citation[];
  hasContext: boolean;
}

/** Build the retrieval query from the last user turns (aids follow-ups). */
function queryFromHistory(history: HistoryMessage[]): string {
  const userTurns = history.filter((m) => m.role === "user").map((m) => m.content);
  // Latest question, plus the previous one for pronoun/topic carry-over.
  return userTurns.slice(-2).join(" \n ").trim();
}

export function buildGroundedContext(history: HistoryMessage[]): GroundedContext {
  const query = queryFromHistory(history);
  const { sections, citations, hasContext } = retrieve(query);

  if (!hasContext) {
    return {
      context:
        "# SAGILITY REPORT CONTEXT\n(No matching section of the Sagility Sustainability Report was found for this question.)",
      citations: [],
      hasContext: false,
    };
  }

  const blocks = sections
    .map((s) => `## ${s.title} — ${s.citation.path}\n${s.content}`)
    .join("\n\n");

  const context = [
    "# SAGILITY REPORT CONTEXT",
    "Use ONLY the data below to answer Sagility-specific questions. Values are the report's own figures.",
    "",
    blocks,
    "",
    "# AVAILABLE SOURCES (cite only these; include page numbers only if present in the data's `source` fields)",
    renderSourceList(citations),
  ].join("\n");

  return { context, citations, hasContext: true };
}
