import { motion } from "framer-motion";
import { Scale } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Card } from "@/components/primitives/Card";
import { Chip } from "@/components/primitives/Chip";
import { ETHICS } from "@/data/governance";
import { fadeRise, staggerGroup } from "@/lib/motion";

/** EthicsSection — conduct, whistleblowing, and assurance (blueprint §2.9.8). */
export function EthicsSection() {
  return (
    <section aria-label="Ethics and compliance" className="py-section md:py-section-lg" id="ethics">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader
              overline="Ethics & compliance"
              title="Integrity, operationalized."
              lead="A rigorous legal and compliance framework across every geography we operate in — built for healthcare's strictest standards."
              className="mb-8"
            />
            <motion.blockquote
              variants={fadeRise}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="border-l-2 border-pillar-governance pl-5"
            >
              <p className="font-display text-h4 font-light leading-relaxed text-ink">
                “{ETHICS.quote.text}”
              </p>
              <footer className="mt-3">
                <p className="text-body font-semibold text-ink-strong">{ETHICS.quote.name}</p>
                <p className="text-body-s text-neutral-500">{ETHICS.quote.role}</p>
              </footer>
            </motion.blockquote>
          </div>

          <motion.div
            className="grid gap-5 sm:grid-cols-2 lg:col-span-8"
            variants={staggerGroup}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {ETHICS.pillars.map((p) => (
              <motion.div key={p.title} variants={fadeRise}>
                <Card className="h-full">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-card bg-pillar-governance/10 text-pillar-governanceDeep">
                    <Scale aria-hidden size={22} strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-4 text-body-l font-semibold text-ink-strong">{p.title}</h3>
                  <p className="mt-2 text-body-s text-neutral-500">{p.text}</p>
                </Card>
              </motion.div>
            ))}
            <motion.div variants={fadeRise} className="sm:col-span-2">
              <p className="text-overline uppercase text-pillar-governanceDeep">Key compliance areas</p>
              <ul className="mt-3 flex flex-wrap gap-2" aria-label="Compliance areas">
                {ETHICS.complianceAreas.map((a) => (
                  <li key={a}>
                    <Chip variant="tag">{a}</Chip>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
