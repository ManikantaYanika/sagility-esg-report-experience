import { motion } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Chip } from "@/components/primitives/Chip";
import { WaveLines } from "@/components/sections/home/WaveLines";
import { EASE_SETTLE } from "@/lib/motion";
import type { PillarId } from "@/data/types";
import { cn } from "@/lib/cn";

/**
 * ChapterHero — shared chapter opener (blueprint Chapter Pattern).
 * Deep-teal surface with the pillar accent; leadership pull-quote;
 * SDG + material-topic chips mirror the report's chapter headers.
 */
interface ChapterHeroProps {
  pillar: PillarId;
  overline: string;
  title: string;
  lead: string;
  quote?: { text: string; name: string; role: string };
  sdgs: string[];
  topics: string[];
}

const accentText = {
  environment: "text-pillar-environmentAlt",
  social: "text-pillar-socialAlt",
  governance: "text-pillar-governance",
} as const;

const accentRule = {
  environment: "bg-pillar-environment",
  social: "bg-pillar-social",
  governance: "bg-pillar-governance",
} as const;

export function ChapterHero({ pillar, overline, title, lead, quote, sdgs, topics }: ChapterHeroProps) {
  return (
    <section className="relative overflow-hidden bg-brand-teal">
      <WaveLines pillar={pillar} className="absolute inset-0 opacity-60" />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(110%_90%_at_15%_0%,rgba(7,73,84,0)_0%,rgba(3,36,42,0.6)_100%)]"
      />

      <Container className="relative pb-16 pt-12 md:pb-20 md:pt-16">
        <div className="[&_a]:text-white/60 [&_span[aria-current]]:text-white [&_a:hover]:text-brand-mint [&_ol]:text-white/40">
          <Breadcrumbs />
        </div>

        <div className="grid gap-12 lg:grid-cols-12">
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_SETTLE }}
          >
            <span aria-hidden className={cn("block h-1 w-14 rounded-full", accentRule[pillar])} />
            <p className={cn("mt-5 text-overline uppercase", accentText[pillar])}>{overline}</p>
            <h1 className="mt-4 font-display text-h1 font-light text-white md:text-display-l">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-body-l text-white/75">{lead}</p>

            <div className="mt-8 flex flex-wrap gap-2" aria-label="UN SDGs in focus">
              {sdgs.map((sdg) => (
                <Chip key={sdg} variant="topic" className="border-white/25 bg-white/10 text-white">
                  {sdg}
                </Chip>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-2" aria-label="Material topics">
              {topics.map((topic) => (
                <Chip key={topic} variant="tag" className="border-white/15 bg-transparent text-white/70">
                  {topic}
                </Chip>
              ))}
            </div>
          </motion.div>

          {quote && (
            <motion.figure
              className="self-end lg:col-span-5"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: EASE_SETTLE }}
            >
              <blockquote className="border-l-2 border-brand-mint pl-6">
                <p className="font-display text-h4 font-light leading-relaxed text-white/90">
                  “{quote.text}”
                </p>
              </blockquote>
              <figcaption className="mt-4 pl-6">
                <p className="text-body font-semibold text-white">{quote.name}</p>
                <p className="text-body-s text-white/60">{quote.role}</p>
              </figcaption>
            </motion.figure>
          )}
        </div>
      </Container>
    </section>
  );
}
