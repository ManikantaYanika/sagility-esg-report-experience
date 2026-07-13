import { motion } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { Stat } from "@/components/primitives/Stat";
import type { Metric } from "@/data/types";
import { fadeRise, staggerGroup } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * StatBand — generic key-highlights band for chapter pages
 * (the Home variant remains bespoke). 2-up mobile → n-up desktop.
 */
interface StatBandProps {
  metrics: Metric[];
  ariaLabel: string;
  className?: string;
}

export function StatBand({ metrics, ariaLabel, className }: StatBandProps) {
  const cols =
    metrics.length >= 5 ? "lg:grid-cols-5" : metrics.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";

  return (
    <section aria-label={ariaLabel} className={cn("border-b border-neutral-100 bg-surface", className)}>
      <Container>
        <motion.div
          className={cn("grid grid-cols-2 gap-x-6 gap-y-10 py-12 md:py-16", cols)}
          variants={staggerGroup}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {metrics.map((m) => (
            <motion.div key={m.id} variants={fadeRise}>
              <Stat
                value={m.value}
                prefix={m.prefix}
                suffix={m.suffix}
                decimals={m.decimals}
                label={m.label}
                pillar={m.pillar}
                delta={m.delta}
                deltaGoodWhen={m.deltaGoodWhen}
                size="s"
              />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
