import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Card } from "@/components/primitives/Card";
import { Stat } from "@/components/primitives/Stat";
import { PILLAR_SUMMARIES } from "@/data/metrics";
import { fadeRise, staggerGroup } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * PillarOverview — E/S/G entry cards (homepage §4).
 * Pillar colors used semantically: label, headline stat, hover border.
 */
const pillarLabel = {
  environment: "text-pillar-environmentDeep",
  social: "text-pillar-socialDeep",
  governance: "text-pillar-governanceDeep",
} as const;

const pillarRule = {
  environment: "bg-pillar-environment",
  social: "bg-pillar-social",
  governance: "bg-pillar-governance",
} as const;

export function PillarOverview() {
  return (
    <section aria-label="ESG overview" className="py-section md:py-section-lg">
      <Container>
        <SectionHeader
          align="center"
          overline="Our ESG pillars"
          title="Three pillars. One purpose."
          lead="Environmental stewardship, a people-first culture, and governance built on integrity — explored in depth across the report."
        />
        <motion.div
          className="grid gap-6 md:grid-cols-3"
          variants={staggerGroup}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {PILLAR_SUMMARIES.map((pillar) => (
            <motion.div key={pillar.id} variants={fadeRise}>
              <Link to={pillar.href} className="group block h-full rounded-card focus-visible:outline-none">
                <Card variant="interactive" pillar={pillar.id} className="flex h-full flex-col p-8">
                  <span aria-hidden className={cn("h-1 w-12 rounded-full", pillarRule[pillar.id])} />
                  <p className={cn("mt-5 text-overline uppercase", pillarLabel[pillar.id])}>
                    {pillar.title}
                  </p>
                  <div className="mt-4">
                    <Stat
                      value={pillar.headline.value}
                      suffix={pillar.headline.suffix}
                      decimals={pillar.headline.decimals}
                      label={pillar.headline.label}
                      pillar={pillar.id}
                      size="s"
                    />
                  </div>
                  <ul className="mt-6 space-y-2 text-body-s text-neutral-500">
                    {pillar.topics.map((topic) => (
                      <li key={topic}>{topic}</li>
                    ))}
                  </ul>
                  <p className="mt-6 flex-1 text-body text-ink">{pillar.commitment}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-body font-medium text-brand-tealMid">
                    Explore {pillar.title}
                    <ArrowRight
                      aria-hidden
                      size={18}
                      strokeWidth={1.5}
                      className="transition-transform duration-200 ease-settle group-hover:translate-x-1"
                    />
                  </span>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
