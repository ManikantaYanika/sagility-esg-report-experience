/**
 * Loader — provides the section registry once. The registry is a module-level
 * constant (built from src/data at import), so there is no repeated parsing;
 * this function simply exposes it (and is the single seam for future sources).
 */
import { SECTIONS } from "./sections";
import type { KnowledgeSection } from "./types";

export function getSections(): KnowledgeSection[] {
  return SECTIONS;
}
