import { motion } from "framer-motion";
import { FileCheck, BadgeCheck } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { POLICIES, CERTIFICATIONS } from "@/data/governance";
import { fadeRise, staggerGroup } from "@/lib/motion";

/** PoliciesSection — policy framework + certifications (blueprint §2.9.8). */
export function PoliciesSection() {
  return (
    <section aria-label="Policies and certifications" className="bg-surface py-section md:py-section-lg" id="policies">
      <Container>
        <SectionHeader
          overline="Policies & certifications"
          title="Written down. Audited. Public."
          lead="Centrally governed policies reviewed against evolving regulation, and certifications that put independent auditors behind our claims."
        />

        <div className="grid gap-10 lg:grid-cols-12">
          <motion.ul
            className="grid gap-3 sm:grid-cols-2 lg:col-span-7"
            variants={staggerGroup}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            aria-label="Corporate policies"
          >
            {POLICIES.map((p) => (
              <motion.li
                key={p}
                variants={fadeRise}
                className="flex items-center gap-3 rounded-card border border-neutral-100 bg-white px-5 py-4"
              >
                <FileCheck aria-hidden size={20} strokeWidth={1.5} className="shrink-0 text-pillar-governanceDeep" />
                <span className="text-body font-medium text-ink-strong">{p}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            variants={fadeRise}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-5"
          >
            <div className="rounded-card-lg bg-brand-teal p-8">
              <p className="flex items-center gap-2 text-overline uppercase text-brand-mint">
                <BadgeCheck aria-hidden size={16} strokeWidth={1.5} />
                Certifications & standards
              </p>
              <ul className="mt-6 space-y-5">
                {CERTIFICATIONS.map((c) => (
                  <li key={c.name} className="border-l-2 border-brand-mint pl-4">
                    <p className="font-display text-h4 font-semibold text-white">{c.name}</p>
                    <p className="text-body-s text-white/70">{c.scope}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-8 border-t border-white/15 pt-5 text-body-s text-white/60">
                Reporting aligned to GRI, BRSR (SEBI), UN SDGs, UNGC, and the GHG Protocol —
                externally assured by DNV under ISAE 3000 (Revised).
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
