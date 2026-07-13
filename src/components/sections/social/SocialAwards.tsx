import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { SOCIAL_AWARDS } from "@/data/social";
import { EASE_SETTLE } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * SocialAwards — filterable recognition grid (blueprint §2.12.4 pattern).
 * Filter state is simple local UI state; cards FLIP-animate on refilter.
 */
const CATEGORIES = ["All", ...new Set(SOCIAL_AWARDS.map((a) => a.category))];

export function SocialAwards() {
  const [filter, setFilter] = useState("All");
  const visible = SOCIAL_AWARDS.filter((a) => filter === "All" || a.category === filter);

  return (
    <section aria-label="Awards and recognition" className="bg-surface py-section md:py-section-lg" id="awards">
      <Container>
        <SectionHeader
          overline="Awards & recognition"
          title="Recognized where it counts: our people."
          lead="Workplace culture, women's advancement, wellbeing, and CSR — recognition earned across FY2024 and FY2025."
        />

        <div role="group" aria-label="Filter awards by category" className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
              className={cn(
                "rounded-full border px-4 py-2 text-body-s font-medium transition-colors",
                filter === c
                  ? "border-pillar-social bg-pillar-social text-white"
                  : "border-neutral-100 bg-white text-ink hover:border-pillar-social",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <motion.ul layout className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
          <AnimatePresence mode="popLayout">
            {visible.map((a) => (
              <motion.li
                key={a.title + a.year}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease: EASE_SETTLE }}
                className="flex gap-4 rounded-card-lg border border-neutral-100 bg-white p-6"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-card bg-pillar-social/10 text-pillar-socialDeep">
                  <Award aria-hidden size={22} strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="text-body font-semibold text-ink-strong">{a.title}</h3>
                  <p className="mt-1 text-body-s text-neutral-500">
                    {a.by} · {a.year}
                  </p>
                  <p className="mt-2 text-body-s font-medium text-pillar-socialDeep">{a.category}</p>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </Container>
    </section>
  );
}
