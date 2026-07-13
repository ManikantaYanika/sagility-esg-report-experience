import { motion } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Card } from "@/components/primitives/Card";
import { Stat } from "@/components/primitives/Stat";
import { DEI_METRICS, DEI_PROGRAMS } from "@/data/social";
import { fadeRise, staggerGroup } from "@/lib/motion";

/**
 * DeiSection — representation metrics + the programs behind them
 * (blueprint §2.7.5). Interactive stat cards animate once in view.
 */
export function DeiSection() {
  return (
    <section
      aria-label="Diversity, equity and inclusion"
      className="bg-surface py-section md:py-section-lg"
      id="dei"
    >
      <Container>
        <SectionHeader
          overline="Diversity, equity & inclusion"
          title="Inclusion is a core value, not a program."
          lead="Grounded in our Global DEI Policy and an executive DEI Council, we track representation in real time and build the pipelines that change it."
        />

        <motion.div
          className="grid grid-cols-2 gap-6 lg:grid-cols-4"
          variants={staggerGroup}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {DEI_METRICS.map((m) => (
            <motion.div key={m.id} variants={fadeRise}>
              <Card variant="interactive" pillar="social" className="h-full">
                <Stat
                  value={m.value}
                  suffix={m.suffix}
                  decimals={m.decimals}
                  label={m.label}
                  pillar="social"
                  size="s"
                  sourceNote={m.source}
                />
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.ul
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerGroup}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          aria-label="Inclusion programs"
        >
          {DEI_PROGRAMS.map((p) => (
            <motion.li key={p.id} variants={fadeRise}>
              <Card className="h-full">
                <span aria-hidden className="block h-1 w-10 rounded-full bg-pillar-social" />
                <h3 className="mt-4 font-display text-h4 font-medium text-ink-strong">{p.title}</h3>
                <p className="mt-2 text-body-s text-neutral-500">{p.text}</p>
              </Card>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
