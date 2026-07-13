import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Stat } from "@/components/primitives/Stat";
import { WELLBEING, WELLBEING_STATS } from "@/data/social";
import { fadeRise, staggerGroup } from "@/lib/motion";

/**
 * WellbeingSection — wellness culture + safety record + fair work
 * (blueprint §2.7.6–8). A healthcare company held to its own standard.
 */
export function WellbeingSection() {
  return (
    <section aria-label="Employee wellbeing and safety" className="bg-surface py-section md:py-section-lg" id="wellbeing">
      <Container>
        <SectionHeader
          overline="Wellbeing, health & safety"
          title="A healthcare company, practicing what it supports."
          lead="Five dimensions of wellness, free confidential counselling that extends to family, and an ISO 45001-certified safety system across every delivery centre."
        />

        {/* Wellness engagement stats */}
        <motion.dl
          className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4"
          variants={staggerGroup}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {WELLBEING_STATS.map((s) => (
            <motion.div key={s.id} variants={fadeRise}>
              <Stat
                value={s.value}
                prefix={s.prefix}
                suffix={s.suffix}
                label={s.label}
                pillar="social"
                size="s"
              />
            </motion.div>
          ))}
        </motion.dl>

        {/* Five wellness dimensions */}
        <motion.ul
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
          variants={staggerGroup}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          aria-label="Wellness dimensions"
        >
          {WELLBEING.dimensions.map((d) => (
            <motion.li
              key={d.title}
              variants={fadeRise}
              className="rounded-card-lg border border-neutral-100 bg-white p-5"
            >
              <h3 className="text-overline uppercase text-pillar-socialDeep">{d.title}</h3>
              <p className="mt-2 text-body-s text-neutral-500">{d.text}</p>
            </motion.li>
          ))}
        </motion.ul>

        {/* Safety record — dark inset */}
        <motion.div
          variants={fadeRise}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-14 rounded-card-lg bg-brand-teal p-8 md:p-10"
        >
          <p className="flex items-center gap-2 text-overline uppercase text-brand-mint">
            <ShieldCheck aria-hidden size={16} strokeWidth={1.5} />
            Safety record — ISO 45001:2018
          </p>
          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
            {WELLBEING.safety.map((s) => (
              <div key={s.id}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <p className="font-display text-stat-s text-brand-mint">{s.value}</p>
                  <p className="mt-1 text-body-s text-white/75">{s.label}</p>
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 border-t border-white/15 pt-6 text-body-s text-white/60">
            Fair work, verified: 100% of the workforce trained on human rights ·{" "}
            {WELLBEING.humanRights.aboveMinWagePct}% earn above minimum statutory wage ·{" "}
            {WELLBEING.humanRights.grievances.resolved} of {WELLBEING.humanRights.grievances.received}{" "}
            grievances resolved in FY2024–25. ({WELLBEING.humanRights.source})
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
