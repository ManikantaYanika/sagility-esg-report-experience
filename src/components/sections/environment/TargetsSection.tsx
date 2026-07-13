import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { Bullet } from "@/components/features/charts/Bullet";
import { SBTI } from "@/data/metrics";
import { fadeRise, staggerGroup } from "@/lib/motion";

/**
 * TargetsSection — SBTi targets vs first-year actuals (blueprint §2.6.4).
 * Dark surface: this is the chapter's authority moment.
 */
export function TargetsSection() {
  const maxAll = Math.max(...SBTI.targets.map((t) => t.fy25.target)) * 1.15;

  return (
    <section aria-label="Environmental targets" className="bg-brand-teal py-section md:py-section-lg" id="targets">
      <Container>
        <motion.div
          variants={staggerGroup}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid gap-12 lg:grid-cols-12"
        >
          <motion.div variants={fadeRise} className="lg:col-span-5">
            <p className="flex items-center gap-2 text-overline uppercase text-brand-mint">
              <BadgeCheck aria-hidden size={16} strokeWidth={1.5} />
              SBTi-validated targets
            </p>
            <h2 className="mt-4 font-display text-h2 text-white">
              {SBTI.targetYear}: the destination is fixed.
            </h2>
            <p className="mt-4 text-body-l text-white/75">
              Near-term targets validated in FY2024–25 against a {SBTI.baselineYear} baseline —
              cutting Scope 1 &amp; 2 emissions by {SBTI.targets[0].reduction}% and Scope 3 by{" "}
              {SBTI.targets[1].reduction}%. Year one closed beyond target on both.
            </p>
            <p className="mt-6 text-body-s text-white/50">Source: {SBTI.source}</p>
          </motion.div>

          <motion.div variants={fadeRise} className="lg:col-span-7">
            <div className="rounded-card-lg border border-white/15 bg-white/5 p-8">
              <h3 className="sr-only">FY2024–25 performance against SBTi trajectory</h3>
              <Bullet
                onDark
                rows={SBTI.targets.map((t) => ({
                  label: `${t.label} — FY25 trajectory`,
                  actual: t.fy25.actual,
                  target: t.fy25.target,
                  max: maxAll,
                  unit: t.fy25.unit,
                  verdict: `${t.fy25.beyondTargetPct}% beyond target`,
                }))}
              />
              <p className="mt-6 text-body-s text-white/60">
                Lower is better: bars show actual emissions against the year's trajectory tick.
                A small Scope 2 shortfall was noted in the year; overall reduction validates the
                science-based pathway.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
