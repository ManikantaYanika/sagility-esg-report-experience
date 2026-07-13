import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { SBTI } from "@/data/metrics";
import { fadeRise, staggerGroup } from "@/lib/motion";

/**
 * CommitmentStrip — validated SBTi targets (homepage §5).
 * Dark surface, mint numerals: the report's highest-authority claim.
 */
export function CommitmentStrip() {
  return (
    <section aria-label="Sustainability commitments" className="bg-brand-teal py-section">
      <Container>
        <motion.div
          variants={staggerGroup}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={fadeRise} className="max-w-2xl">
            <p className="flex items-center gap-2 text-overline uppercase text-brand-mint">
              <BadgeCheck aria-hidden size={16} strokeWidth={1.5} />
              Validated by the Science Based Targets initiative
            </p>
            <h2 className="mt-4 font-display text-h2 text-white">
              Science-based. Validated.{" "}
              <span className="text-brand-mint">Already underway.</span>
            </h2>
            <p className="mt-4 text-body-l text-white/75">
              Our near-term emissions targets — {SBTI.baselineYear} baseline, delivered by{" "}
              {SBTI.targetYear} — were approved in FY2024–25. First-year performance is
              beyond target on both scopes.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {SBTI.targets.map((t) => (
              <motion.div
                key={t.id}
                variants={fadeRise}
                className="rounded-card-lg border border-white/15 bg-white/5 p-8"
              >
                <p className="font-display text-stat-m text-brand-mint">
                  −{t.reduction}
                  <span className="text-stat-s">%</span>
                </p>
                <p className="mt-2 text-body-l font-medium text-white">{t.label}</p>
                <p className="mt-1 text-body-s text-white/60">
                  by {SBTI.targetYear} · vs {SBTI.baselineYear} baseline
                </p>
                <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-mint/15 px-3 py-1 text-body-s font-medium text-brand-mint">
                  FY25: {t.fy25.beyondTargetPct}% beyond target
                  <span className="text-white/50">
                    ({t.fy25.actual.toLocaleString()} vs {t.fy25.target.toLocaleString()}{" "}
                    {t.fy25.unit})
                  </span>
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p variants={fadeRise} className="mt-6 text-body-s text-white/50">
            Source: {SBTI.source}
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
