import { motion } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Button } from "@/components/primitives/Button";
import { FEATURED_MILESTONES } from "@/data/timeline";
import { fadeRise, staggerGroup } from "@/lib/motion";

/**
 * TimelineTeaser — four featured milestones on a connecting rail
 * (homepage §8). The full scroll-driven journey lives at /timeline.
 */
export function TimelineTeaser() {
  return (
    <section aria-label="Sustainability journey preview" className="py-section md:py-section-lg">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            overline="Our journey"
            title="From foundation to 2034."
            lead="Four years from first diagnostic to validated science-based targets."
            className="mb-0 max-w-xl"
          />
          <Button variant="tertiary" to="/timeline" className="mb-2">
            Explore the full timeline
          </Button>
        </div>

        <motion.ol
          className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-6"
          variants={staggerGroup}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Rail (desktop) */}
          <div
            aria-hidden
            className="absolute left-0 top-[5px] hidden h-px w-full bg-gradient-to-r from-brand-mint via-neutral-100 to-brand-mintTint md:block"
          />
          {FEATURED_MILESTONES.map((m) => (
            <motion.li key={m.id} variants={fadeRise} className="relative md:pt-8">
              <span
                aria-hidden
                className="absolute left-0 top-0 hidden h-[11px] w-[11px] rounded-full border-2 border-brand-mint bg-white md:block"
              />
              <p className="text-overline uppercase text-brand-tealMid">{m.when}</p>
              <h3 className="mt-2 font-display text-h4 font-medium text-ink-strong">{m.title}</h3>
              <p className="mt-2 text-body-s text-neutral-500">{m.description}</p>
            </motion.li>
          ))}
        </motion.ol>
      </Container>
    </section>
  );
}
