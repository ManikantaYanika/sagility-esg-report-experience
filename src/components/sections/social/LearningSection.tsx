import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Stat } from "@/components/primitives/Stat";
import { LEARNING } from "@/data/social";
import { fadeRise, staggerGroup } from "@/lib/motion";

/**
 * LearningSection — capability-building at scale (blueprint §2.7.4).
 * Editorial split: headline stats left, program rail right.
 */
export function LearningSection() {
  return (
    <section aria-label="Learning and development" className="py-section md:py-section-lg" id="learning">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              overline="Learning & development"
              title="4.4 million hours of getting better."
              lead="Learning is an ever-present current in the employee journey — tailored by region, role, and the healthcare processes our clients run on."
              className="mb-10"
            />
            <motion.div
              className="grid grid-cols-2 gap-8"
              variants={staggerGroup}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div variants={fadeRise}>
                <Stat value={LEARNING.totalHours} label="total training hours delivered" pillar="social" size="s" />
              </motion.div>
              <motion.div variants={fadeRise}>
                <Stat value={LEARNING.avgHours} label="average hours per employee" pillar="social" size="s" />
              </motion.div>
              <motion.div variants={fadeRise} className="col-span-2">
                <Stat
                  value={LEARNING.reviewsCoverage}
                  suffix="%"
                  label="of eligible employees covered by performance and career development reviews"
                  pillar="social"
                  size="s"
                  sourceNote={`Source: ${LEARNING.source}`}
                />
              </motion.div>
            </motion.div>
          </div>

          <motion.ol
            className="relative space-y-8 border-l border-neutral-100 pl-8 lg:col-span-7"
            variants={staggerGroup}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            aria-label="Learning programs"
          >
            {LEARNING.programs.map((p) => (
              <motion.li key={p.id} variants={fadeRise} className="relative">
                <span
                  aria-hidden
                  className="absolute -left-[2.45rem] top-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-pillar-social/10 text-pillar-socialDeep"
                >
                  <GraduationCap size={15} strokeWidth={1.5} />
                </span>
                <h3 className="text-body-l font-semibold text-ink-strong">{p.title}</h3>
                <p className="mt-1 text-body-s text-neutral-500">{p.text}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </Container>
    </section>
  );
}
