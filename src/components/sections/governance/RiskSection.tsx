import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Accordion } from "@/components/primitives/Accordion";
import { Chip } from "@/components/primitives/Chip";
import { RISK_PROCESS, RISK_REGISTER } from "@/data/governance";
import { fadeRise, staggerGroup } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * RiskSection — ERM process + the full 17-topic material risk register
 * (blueprint §2.9.7). Register is filterable by pillar; accordion keeps
 * the density navigable.
 */
const FILTERS = [
  { id: "All", label: "All 17 topics" },
  { id: "E", label: "Environment" },
  { id: "S", label: "Social" },
  { id: "G", label: "Governance" },
] as const;

export function RiskSection() {
  const [filter, setFilter] = useState<string>("All");
  const visible = RISK_REGISTER.filter((r) => filter === "All" || r.pillar === filter);

  return (
    <section aria-label="Risk management" className="bg-surface py-section md:py-section-lg" id="risk">
      <Container>
        <SectionHeader
          overline="Risk management"
          title="Seventeen topics. Zero surprises."
          lead="A Board-approved Enterprise Risk Management framework runs a four-phase cycle over every material topic — each classified as risk or opportunity, each with a named mitigation approach."
        />

        {/* Four-phase process */}
        <motion.ol
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerGroup}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          aria-label="Risk management process"
        >
          {RISK_PROCESS.map((p, i) => (
            <motion.li
              key={p.step}
              variants={fadeRise}
              className="relative rounded-card-lg border border-neutral-100 bg-white p-6"
            >
              <span className="text-overline uppercase text-pillar-governanceDeep">
                Phase {i + 1}
              </span>
              <h3 className="mt-2 font-display text-h4 font-medium text-ink-strong">{p.step}</h3>
              <p className="mt-2 text-body-s text-neutral-500">{p.text}</p>
            </motion.li>
          ))}
        </motion.ol>

        {/* Material risk register */}
        <div className="mt-14">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h3 className="font-display text-h3 text-ink-strong">Material risk register</h3>
            <div role="group" aria-label="Filter register by pillar" className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={filter === f.id}
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-body-s font-medium transition-colors",
                    filter === f.id
                      ? "border-pillar-governance bg-pillar-governance text-white"
                      : "border-neutral-100 bg-white text-ink hover:border-pillar-governance",
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6" aria-live="polite">
            <Accordion
              key={filter}
              multiple
              items={visible.map((r) => ({
                title: (
                  <span className="flex flex-wrap items-center gap-3">
                    {r.topic}
                    <Chip
                      variant="topic"
                      pillar={r.pillar === "E" ? "environment" : r.pillar === "S" ? "social" : "governance"}
                    >
                      {r.kind}
                    </Chip>
                  </span>
                ),
                content: <p className="max-w-3xl">{r.approach}</p>,
              }))}
            />
          </div>
          <p className="mt-4 text-body-s text-neutral-500">Source: SR FY2024–25, pp.78–81</p>
        </div>
      </Container>
    </section>
  );
}
