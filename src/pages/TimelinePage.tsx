import { motion } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { CTABand } from "@/components/sections/CTABand";
import { WaveLines } from "@/components/sections/home/WaveLines";
import { MILESTONES } from "@/data/timeline";
import { fadeRise, staggerGroup, EASE_SETTLE } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * Sustainability Timeline — blueprint §2.13.
 * Era-grouped vertical rail with animated nodes. Chose vertical over
 * horizontal scroll-jacking: reliable on every device, naturally
 * accessible, and the chronology reads as a story.
 */
const ERAS = [
  { id: "Foundation", label: "2022 · Foundation", blurb: "Divestiture, diagnostic, and the councils that made ESG operational." },
  { id: "Baselining", label: "2023 · Baselining", blurb: "Measuring everything: emissions, materiality, safety, disclosure." },
  { id: "Validation", label: "2024–25 · Validation", blurb: "Listing, external assurance, and science-based targets approved." },
  { id: "Ambition", label: "2034 · Ambition", blurb: "The destination our validated targets commit us to." },
] as const;

export default function TimelinePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-brand-teal">
        <WaveLines className="absolute inset-0 opacity-60" />
        <Container className="relative py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_SETTLE }}
            className="max-w-3xl"
          >
            <p className="text-overline uppercase text-brand-mint">Sustainability timeline</p>
            <h1 className="mt-4 font-display text-h1 font-light text-white md:text-display-l">
              Four years, thirteen milestones, one direction.
            </h1>
            <p className="mt-6 text-body-l text-white/75">
              From a 2022 diagnostic study to validated science-based targets — every milestone
              verified against the reports.
            </p>
          </motion.div>
        </Container>
      </section>

      <section aria-label="ESG journey" className="py-section md:py-section-lg">
        <Container width="measure" className="max-w-3xl">
          {ERAS.map((era) => {
            const items = MILESTONES.filter((m) => m.era === era.id);
            return (
              <div key={era.id} className="mb-16 last:mb-0">
                <motion.div
                  variants={fadeRise}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                >
                  <h2 className="font-display text-h2 text-ink-strong">{era.label}</h2>
                  <p className="mt-2 text-body-l text-neutral-500">{era.blurb}</p>
                </motion.div>

                <motion.ol
                  className="relative mt-8 space-y-10 border-l-2 border-brand-mintTint pl-8"
                  variants={staggerGroup}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                >
                  {items.map((m) => (
                    <motion.li key={m.id} variants={fadeRise} className="relative">
                      <span
                        aria-hidden
                        className={cn(
                          "absolute -left-[2.45rem] top-1 h-4 w-4 rounded-full border-2 bg-white",
                          m.featured ? "border-brand-mint bg-brand-mint" : "border-brand-mint",
                        )}
                      />
                      <p className="text-overline uppercase text-brand-tealMid">{m.when}</p>
                      <h3 className="mt-1 font-display text-h4 font-medium text-ink-strong">{m.title}</h3>
                      <p className="mt-1.5 text-body text-neutral-500">{m.description}</p>
                      <p className="mt-2 text-body-s text-neutral-300">{m.source}</p>
                    </motion.li>
                  ))}
                </motion.ol>
              </div>
            );
          })}
        </Container>
      </section>

      <CTABand
        title={
          <>
            The journey continues. <span className="text-brand-mint">Follow the numbers.</span>
          </>
        }
        lead="Track progress against the FY2034 targets on the Environment page."
        action={{ label: "Environmental Targets", to: "/environment" }}
        secondaryAction={{ label: "ESG Highlights", to: "/highlights" }}
      />
    </>
  );
}
