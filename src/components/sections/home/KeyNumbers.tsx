import { motion } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { Stat } from "@/components/primitives/Stat";
import { HOME_KEY_METRICS } from "@/data/metrics";
import { fadeRise, staggerGroup } from "@/lib/motion";

/**
 * KeyNumbers — the four strongest verified ESG stats (homepage §3).
 * Surface band with hairline separators; counters animate once in view.
 */
export function KeyNumbers() {
  return (
    <section aria-label="Key ESG statistics" className="border-y border-neutral-100 bg-surface">
      <Container>
        <motion.div
          className="grid grid-cols-1 divide-y divide-neutral-100 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x"
          variants={staggerGroup}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {HOME_KEY_METRICS.map((m) => (
            <motion.div key={m.id} variants={fadeRise} className="px-2 py-10 lg:px-8 lg:py-14">
              <Stat
                value={m.value}
                prefix={m.prefix}
                suffix={m.suffix}
                label={m.label}
                delta={m.delta}
                deltaGoodWhen={m.deltaGoodWhen}
                sourceNote={m.source}
                size="m"
              />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
