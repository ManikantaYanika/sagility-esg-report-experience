import { motion } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Chip } from "@/components/primitives/Chip";
import { PROCUREMENT } from "@/data/governance";
import { fadeRise, staggerGroup } from "@/lib/motion";

/** ProcurementSection — responsible supply chain (blueprint §2.9.10). */
export function ProcurementSection() {
  return (
    <section aria-label="Responsible business and procurement" className="py-section md:py-section-lg" id="procurement">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              overline="Responsible business"
              title="A supply chain held to our standard."
              lead="Anchored in the UN Global Compact, the SDGs, and the Universal Declaration of Human Rights — our Supplier Code of Conduct extends Sagility's ethics to every vendor and sub-contractor."
              className="mb-8"
            />
            <motion.dl
              className="grid grid-cols-2 gap-x-6 gap-y-8"
              variants={staggerGroup}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {PROCUREMENT.stats.map((s) => (
                <motion.div key={s.id} variants={fadeRise}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <p className="font-display text-stat-s text-pillar-governanceDeep">{s.value}</p>
                    <p className="mt-1 text-body-s text-neutral-500">{s.label}</p>
                  </dd>
                </motion.div>
              ))}
            </motion.dl>
          </div>

          <motion.div
            variants={fadeRise}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-7"
          >
            <div className="rounded-card-lg border border-neutral-100 bg-white p-8">
              <h3 className="font-display text-h4 font-medium text-ink-strong">
                Supplier Code of Conduct — nine commitments
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Supplier code areas">
                {PROCUREMENT.codeAreas.map((a) => (
                  <li key={a}>
                    <Chip variant="topic" pillar="governance">{a}</Chip>
                  </li>
                ))}
              </ul>
              <blockquote className="mt-8 border-l-2 border-pillar-governance pl-5">
                <p className="text-body-l font-light leading-relaxed text-ink">
                  “{PROCUREMENT.quote.text}”
                </p>
                <footer className="mt-3">
                  <p className="text-body font-semibold text-ink-strong">{PROCUREMENT.quote.name}</p>
                  <p className="text-body-s text-neutral-500">{PROCUREMENT.quote.role}</p>
                </footer>
              </blockquote>
              <p className="mt-6 text-body-s text-neutral-500">
                Periodic audits and supplier self-evaluations verify compliance; a supplier ESG
                learning channel (launched FY24) drives capability across the chain. Source:{" "}
                {PROCUREMENT.source}.
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
