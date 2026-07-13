import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Chip } from "@/components/primitives/Chip";
import { KpiTable } from "@/components/features/KpiTable";
import { CTABand } from "@/components/sections/CTABand";
import { WaveLines } from "@/components/sections/home/WaveLines";
import { ENV_KPI_TABLE } from "@/data/emissions";
import { SOCIAL_KPI_TABLE } from "@/data/social";
import { GOV_KPI_TABLE } from "@/data/governance";
import { fadeRise, EASE_SETTLE } from "@/lib/motion";

/**
 * ESG Scorecard — blueprint §2.5. The analyst page: every KPI, one place,
 * grouped by pillar, printable, with context notes intact.
 */
const FRAMEWORKS = ["GRI", "BRSR (SEBI)", "UN SDGs", "UNGC", "GHG Protocol", "CDP", "EcoVadis"];

const GROUPS = [
  { id: "environment", title: "Environment", metrics: ENV_KPI_TABLE, pillar: "environment" as const },
  { id: "social", title: "Social", metrics: SOCIAL_KPI_TABLE, pillar: "social" as const },
  { id: "governance", title: "Governance", metrics: GOV_KPI_TABLE, pillar: "governance" as const },
];

export default function EsgOverviewPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-brand-teal">
        <WaveLines className="absolute inset-0 opacity-50" />
        <Container className="relative py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_SETTLE }}
            className="max-w-3xl"
          >
            <p className="text-overline uppercase text-brand-mint">ESG Scorecard</p>
            <h1 className="mt-4 font-display text-h1 font-light text-white md:text-display-l">
              Our performance, transparently.
            </h1>
            <p className="mt-6 text-body-l text-white/75">
              Every headline indicator from the FY2024–25 report — year-over-year, sourced to
              the page, with the context notes that make the numbers honest.
            </p>
            <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-mint/15 px-4 py-2 text-body-s font-medium text-brand-mint">
              <ShieldCheck aria-hidden size={16} strokeWidth={1.5} />
              Assured by DNV under ISAE 3000 (Revised) — limited assurance
            </p>
          </motion.div>
        </Container>
      </section>

      {GROUPS.map((group, i) => (
        <section
          key={group.id}
          aria-label={`${group.title} scorecard`}
          className={i % 2 === 0 ? "py-section" : "bg-surface py-section"}
          id={group.id}
        >
          <Container>
            <SectionHeader overline={group.title} title={`${group.title} indicators`} className="mb-8" />
            <KpiTable
              metrics={group.metrics}
              pillar={group.pillar}
              caption={`${group.title} key performance indicators, FY2024–25`}
            />
          </Container>
        </section>
      ))}

      <section aria-label="Reporting frameworks" className="bg-surface py-14">
        <Container>
          <motion.div
            variants={fadeRise}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap items-center gap-3"
          >
            <span className="text-body font-medium text-ink-strong">Reported in reference to:</span>
            {FRAMEWORKS.map((f) => (
              <Chip key={f} variant="tag">
                {f}
              </Chip>
            ))}
          </motion.div>
        </Container>
      </section>

      <CTABand
        title={
          <>
            Numbers verified. <span className="text-brand-mint">Sources attached.</span>
          </>
        }
        lead="Download the assured reports behind every figure on this page."
        action={{ label: "Downloads & Disclosures", to: "/downloads" }}
      />
    </>
  );
}
