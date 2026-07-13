import { motion } from "framer-motion";
import {
  Building2,
  HeartHandshake,
  HeartPulse,
  ShieldCheck,
  Target,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Card } from "@/components/primitives/Card";
import { Chip } from "@/components/primitives/Chip";
import { HIGHLIGHTS, AWARD_STRIP } from "@/data/highlights";
import type { Highlight } from "@/data/types";
import { fadeRise, staggerGroup } from "@/lib/motion";

/**
 * HighlightsGrid — FY2024–25 achievements + award strip (homepage §7).
 * Icons follow the outline language (stroke 1.5, design-system §4).
 */
const ICONS: Record<Highlight["icon"], LucideIcon> = {
  listing: Building2,
  assured: ShieldCheck,
  target: Target,
  rating: TrendingUp,
  safety: HeartPulse,
  volunteering: HeartHandshake,
};

export function HighlightsGrid() {
  return (
    <section aria-label="ESG highlights" className="bg-surface py-section md:py-section-lg">
      <Container>
        <SectionHeader
          overline="FY2024–25 highlights"
          title="A year of validation."
          lead="Listing, assurance, and science-based approval — the milestones that moved our ESG program from commitment to proof."
        />
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerGroup}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {HIGHLIGHTS.map((h) => {
            const Icon = ICONS[h.icon];
            return (
              <motion.div key={h.id} variants={fadeRise}>
                <Card variant="interactive" className="flex h-full flex-col">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-card bg-brand-mintTint/60 text-brand-tealMid">
                    <Icon aria-hidden size={24} strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-5 font-display text-h4 font-medium text-ink-strong">
                    {h.title}
                  </h3>
                  <p className="mt-2 flex-1 text-body-s text-neutral-500">{h.description}</p>
                  <p className="mt-4 text-body-s text-neutral-300">{h.source}</p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Award strip — names only until logo licensing is settled (§14). */}
        <motion.div
          variants={fadeRise}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-14"
        >
          <h3 className="text-overline uppercase text-brand-tealMid">Recognized by</h3>
          <ul className="mt-4 flex flex-wrap gap-3" aria-label="Awards and recognition">
            {AWARD_STRIP.map((award) => (
              <li key={award}>
                <Chip variant="tag">{award}</Chip>
              </li>
            ))}
          </ul>
        </motion.div>
      </Container>
    </section>
  );
}
