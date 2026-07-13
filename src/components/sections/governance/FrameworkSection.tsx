import { motion } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { GOVERNANCE_TIERS } from "@/data/governance";
import { fadeRise, staggerGroup } from "@/lib/motion";

/**
 * FrameworkSection — the three-tier sustainability governance structure
 * (blueprint §2.9.6) rendered as a connected cascade.
 */
export function FrameworkSection() {
  return (
    <section aria-label="Governance framework" className="py-section md:py-section-lg" id="framework">
      <Container>
        <SectionHeader
          overline="Governance framework"
          title={
            <>
              Accountability with{" "}
              <span className="font-normal text-pillar-governanceDeep">an org chart.</span>
            </>
          }
          lead="Sustainability isn't a side committee at Sagility. A three-tier structure connects Board oversight to executive execution to cross-functional delivery — with the Group CFO as designated Sustainability Head."
        />

        <motion.ol
          className="relative mx-auto max-w-3xl space-y-6"
          variants={staggerGroup}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {GOVERNANCE_TIERS.map((tier, i) => (
            <motion.li key={tier.tier} variants={fadeRise} className="relative">
              {i < GOVERNANCE_TIERS.length - 1 && (
                <span
                  aria-hidden
                  className="absolute left-7 top-full h-6 w-px bg-pillar-governance/40"
                />
              )}
              <div className="flex gap-6 rounded-card-lg border border-neutral-100 bg-white p-6 md:p-8">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-pillar-governance/10 font-display text-h3 font-semibold text-pillar-governanceDeep">
                  {tier.tier}
                </span>
                <div>
                  <h3 className="font-display text-h4 font-medium text-ink-strong">{tier.name}</h3>
                  <p className="mt-0.5 text-body-s font-medium text-pillar-governanceDeep">{tier.who}</p>
                  <p className="mt-2 text-body-s text-neutral-500">{tier.does}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ol>

        <motion.p
          variants={fadeRise}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mt-8 max-w-3xl text-center text-body-s text-neutral-500"
        >
          Stakeholder feedback flows into the Objectives, Goals, Strategies, and Measures (OGSM)
          framework, informing materiality, risk identification, and program development.
        </motion.p>
      </Container>
    </section>
  );
}
