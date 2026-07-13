import { motion } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Card } from "@/components/primitives/Card";
import { CTABand } from "@/components/sections/CTABand";
import { MaterialityMatrix } from "@/components/features/MaterialityMatrix/MaterialityMatrix";
import { SDG_FOCUS, MATERIALITY_META } from "@/data/approach";
import { fadeRise, staggerGroup } from "@/lib/motion";

/** Materiality & SDGs — blueprint §2.4. */
export default function MaterialityPage() {
  return (
    <>
      <section className="border-b border-neutral-100 bg-surface">
        <Container className="py-14 md:py-20">
          <Breadcrumbs />
          <SectionHeader
            as="h1"
            overline="Materiality assessment"
            title="17 topics that steer the strategy."
            lead={`Conducted in ${MATERIALITY_META.conducted} and valid through the three-year cycle (next update ${MATERIALITY_META.nextUpdate}). ${MATERIALITY_META.method}`}
            className="mb-0 max-w-3xl"
          />
        </Container>
      </section>

      <section aria-label="Interactive materiality matrix" className="py-section md:py-section-lg">
        <Container>
          <MaterialityMatrix />
        </Container>
      </section>

      <section aria-label="UN SDG alignment" className="bg-surface py-section md:py-section-lg">
        <Container>
          <SectionHeader
            overline="UN SDG alignment"
            title="Ten goals in focus."
            lead="Mapping our 17 material topics to the UN Sustainable Development Goals ensures our initiatives contribute beyond organizational boundaries."
          />
          <motion.ul
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
            variants={staggerGroup}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            aria-label="Focus SDGs"
          >
            {SDG_FOCUS.map((sdg) => (
              <motion.li key={sdg.n} variants={fadeRise}>
                <Card variant="interactive" className="h-full p-5">
                  <p className="font-display text-stat-s text-brand-tealMid">{sdg.n}</p>
                  <p className="mt-1 text-body font-medium text-ink-strong">{sdg.name}</p>
                </Card>
              </motion.li>
            ))}
          </motion.ul>
          <p className="mt-6 text-body-s text-neutral-500">
            Focus goals per the CSR &amp; Sustainability Committee Chairperson (SR FY2024–25, p.6).
          </p>
        </Container>
      </section>

      <CTABand
        title={
          <>
            Priorities, plotted. <span className="text-brand-mint">Performance, proven.</span>
          </>
        }
        lead="See how each material topic performed in the assured FY2024–25 scorecard."
        action={{ label: "ESG Scorecard", to: "/esg-overview" }}
        secondaryAction={{ label: "Back to Strategy", to: "/approach" }}
      />
    </>
  );
}
