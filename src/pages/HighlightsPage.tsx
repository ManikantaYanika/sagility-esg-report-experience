import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Stat } from "@/components/primitives/Stat";
import { CTABand } from "@/components/sections/CTABand";
import { WaveLines } from "@/components/sections/home/WaveLines";
import { HIGHLIGHTS } from "@/data/highlights";
import { AWARDS } from "@/data/awards";
import { ENV_KEY_METRICS } from "@/data/emissions";
import { SOCIAL_KEY_METRICS } from "@/data/social";
import { GOV_KEY_METRICS } from "@/data/governance";
import { fadeRise, staggerGroup, EASE_SETTLE } from "@/lib/motion";
import { cn } from "@/lib/cn";

/** ESG Highlights — blueprint §2.12: the fast executive view. */
const YEAR_FILTERS = ["All years", "2025", "2024", "2023"] as const;
const CATEGORY_FILTERS = ["All", ...new Set(AWARDS.map((a) => a.category))];

const PILLAR_WALL = [
  { title: "Environment", metrics: ENV_KEY_METRICS.slice(0, 4) },
  { title: "Social", metrics: SOCIAL_KEY_METRICS.slice(0, 4) },
  { title: "Governance", metrics: GOV_KEY_METRICS.slice(0, 4) },
];

export default function HighlightsPage() {
  const [year, setYear] = useState<string>("All years");
  const [category, setCategory] = useState<string>("All");
  const visible = AWARDS.filter(
    (a) =>
      (year === "All years" || String(a.year) === year) &&
      (category === "All" || a.category === category),
  );

  return (
    <>
      <section className="relative overflow-hidden bg-brand-teal">
        <WaveLines className="absolute inset-0 opacity-60" />
        <Container className="relative py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_SETTLE }}
            className="max-w-3xl"
          >
            <p className="text-overline uppercase text-brand-mint">ESG highlights</p>
            <h1 className="mt-4 font-display text-h1 font-light text-white md:text-display-l">
              FY2024–25 at a glance.
            </h1>
            <p className="mt-6 text-body-l text-white/75">
              The year sustainability moved from commitment to proof: listing, assurance,
              validated targets — and the numbers behind each.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Achievements */}
      <section aria-label="Key achievements" className="py-section md:py-section-lg">
        <Container>
          <SectionHeader overline="Key achievements" title="A year of validation." />
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerGroup}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {HIGHLIGHTS.map((h) => (
              <motion.div
                key={h.id}
                variants={fadeRise}
                className="rounded-card-lg border border-neutral-100 bg-white p-6"
              >
                <h3 className="font-display text-h4 font-medium text-ink-strong">{h.title}</h3>
                <p className="mt-2 text-body-s text-neutral-500">{h.description}</p>
                <p className="mt-3 text-body-s text-neutral-300">{h.source}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* KPI wall */}
      <section aria-label="ESG performance wall" className="bg-surface py-section md:py-section-lg">
        <Container>
          <SectionHeader
            overline="ESG performance"
            title="Twelve numbers that tell the story."
            lead="Headline indicators from each pillar — full detail on the chapter pages and scorecard."
          />
          <div className="space-y-12">
            {PILLAR_WALL.map((group) => (
              <div key={group.title}>
                <h3 className="text-overline uppercase text-brand-tealMid">{group.title}</h3>
                <motion.div
                  className="mt-5 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4"
                  variants={staggerGroup}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {group.metrics.map((m) => (
                    <motion.div key={m.id} variants={fadeRise}>
                      <Stat
                        value={m.value}
                        prefix={m.prefix}
                        suffix={m.suffix}
                        decimals={m.decimals}
                        label={m.label}
                        pillar={m.pillar}
                        size="s"
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Awards */}
      <section aria-label="Awards and recognition" className="py-section md:py-section-lg" id="awards">
        <Container>
          <SectionHeader
            overline="Awards & recognition"
            title="Nineteen awards. Three years."
            lead="Filter by year or category — every award verified against the reports' recognition pages."
          />
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <div role="group" aria-label="Filter by year" className="flex flex-wrap gap-2">
              {YEAR_FILTERS.map((y) => (
                <button
                  key={y}
                  type="button"
                  aria-pressed={year === y}
                  onClick={() => setYear(y)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-body-s font-medium transition-colors",
                    year === y
                      ? "border-brand-teal bg-brand-teal text-white"
                      : "border-neutral-100 bg-white text-ink hover:border-brand-teal",
                  )}
                >
                  {y}
                </button>
              ))}
            </div>
            <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
              {CATEGORY_FILTERS.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-pressed={category === c}
                  onClick={() => setCategory(c)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-body-s font-medium transition-colors",
                    category === c
                      ? "border-brand-tealMid bg-brand-tealMid text-white"
                      : "border-neutral-100 bg-white text-ink hover:border-brand-tealMid",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
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
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-card bg-brand-mintTint/60 text-brand-tealMid">
                    <Award aria-hidden size={22} strokeWidth={1.5} />
                  </span>
                  <div>
                    <h3 className="text-body font-semibold text-ink-strong">{a.title}</h3>
                    <p className="mt-1 text-body-s text-neutral-500">
                      {a.by} · {a.year}
                    </p>
                    <p className="mt-2 text-body-s font-medium text-brand-tealMid">{a.category}</p>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
          {visible.length === 0 && (
            <p className="mt-10 text-body text-neutral-500">No awards match this filter combination.</p>
          )}
        </Container>
      </section>

      <CTABand
        title={
          <>
            Milestones on record. <span className="text-brand-mint">See the journey.</span>
          </>
        }
        lead="Every achievement has a place on the timeline — from 2022 foundation to 2034 targets."
        action={{ label: "Sustainability Timeline", to: "/timeline" }}
        secondaryAction={{ label: "Download the Report", to: "/downloads" }}
      />
    </>
  );
}
