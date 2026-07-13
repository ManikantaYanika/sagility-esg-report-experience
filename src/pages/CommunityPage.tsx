import { motion } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Card } from "@/components/primitives/Card";
import { Chip } from "@/components/primitives/Chip";
import { Stat } from "@/components/primitives/Stat";
import { CTABand } from "@/components/sections/CTABand";
import { CSR_STRATEGY, CSR_PROGRAMS, CSR_FORWARD } from "@/data/community";
import { COMMUNITY_STATS } from "@/data/social";
import { fadeRise, staggerGroup } from "@/lib/motion";

/** CSR & Community — blueprint §2.8: the human-impact deep dive. */
export default function CommunityPage() {
  return (
    <>
      <section className="border-b border-neutral-100 bg-surface">
        <Container className="py-14 md:py-20">
          <Breadcrumbs />
          <SectionHeader
            as="h1"
            overline="CSR & community impact"
            title="Meaningful change begins locally."
            lead="Anchored in a structured CSR policy and governed by a CFO-chaired Global Forum, our programs empower communities with knowledge, access, and opportunity — Section 135 compliant, SDG aligned."
            className="mb-0 max-w-3xl"
          />
        </Container>
      </section>

      {/* Volunteering stats */}
      <section aria-label="Volunteering statistics" className="py-section">
        <Container>
          <motion.div
            className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4"
            variants={staggerGroup}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {COMMUNITY_STATS.map((s) => (
              <motion.div key={s.id} variants={fadeRise}>
                <Stat
                  value={s.value}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  decimals={s.decimals}
                  label={s.label}
                  pillar="social"
                  size="m"
                />
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Strategy */}
      <section aria-label="CSR strategy" className="bg-surface py-section md:py-section-lg">
        <Container>
          <SectionHeader
            overline="CSR strategy"
            title="Three priorities. Six focus areas."
            lead={CSR_STRATEGY.governance}
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <motion.div variants={fadeRise} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
              <Card className="h-full">
                <h3 className="text-overline uppercase text-pillar-socialDeep">Thematic priorities</h3>
                <ul className="mt-4 space-y-3">
                  {CSR_STRATEGY.priorities.map((p, i) => (
                    <li key={p} className="flex items-center gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pillar-social/10 font-display text-h4 font-semibold text-pillar-socialDeep">
                        {i + 1}
                      </span>
                      <span className="text-body-l font-medium text-ink-strong">{p}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
            <motion.div variants={fadeRise} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
              <Card className="h-full">
                <h3 className="text-overline uppercase text-pillar-socialDeep">Key focus areas</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {CSR_STRATEGY.focusAreas.map((f) => (
                    <li key={f}>
                      <Chip variant="topic" pillar="social">{f}</Chip>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-body-s text-neutral-500">Source: {CSR_STRATEGY.source}</p>
              </Card>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Flagship programs */}
      {CSR_PROGRAMS.map((program, i) => (
        <section
          key={program.id}
          aria-label={program.title}
          className={i % 2 === 0 ? "py-section md:py-section-lg" : "bg-surface py-section md:py-section-lg"}
        >
          <Container>
            <div className="grid gap-10 lg:grid-cols-12">
              <motion.div
                variants={fadeRise}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="lg:col-span-5"
              >
                <p className="text-overline uppercase text-pillar-socialDeep">
                  with {program.partner} · {program.sdgs}
                </p>
                <h2 className="mt-3 font-display text-h2 text-ink-strong">{program.title}</h2>
                <p className="mt-2 text-body font-medium text-neutral-500">
                  CSR investment: {program.investment}
                </p>
                <dl className="mt-8 grid grid-cols-3 gap-4">
                  {program.outcomes.map((o) => (
                    <div key={o.label}>
                      <dt className="sr-only">{o.label}</dt>
                      <dd>
                        <p className="font-display text-stat-s text-pillar-socialDeep">{o.value}</p>
                        <p className="mt-1 text-body-s text-neutral-500">{o.label}</p>
                      </dd>
                    </div>
                  ))}
                </dl>
              </motion.div>
              <motion.div
                className="grid gap-5 sm:grid-cols-2 lg:col-span-7"
                variants={staggerGroup}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {program.stories.map((story) => (
                  <motion.figure key={story.name} variants={fadeRise}>
                    <Card className="h-full bg-white">
                      <figcaption className="text-body font-semibold text-ink-strong">
                        {story.name}'s story
                      </figcaption>
                      <blockquote className="mt-3 border-l-2 border-pillar-social pl-4">
                        <p className="text-body text-ink">{story.text}</p>
                      </blockquote>
                    </Card>
                  </motion.figure>
                ))}
              </motion.div>
            </div>
          </Container>
        </section>
      ))}

      {/* Path forward */}
      <section aria-label="Path forward" className="bg-brand-teal py-section">
        <Container width="measure" className="max-w-3xl">
          <motion.div variants={fadeRise} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }}>
            <p className="text-overline uppercase text-brand-mint">A path forward</p>
            <p className="mt-4 font-display text-h3 font-light leading-relaxed text-white">
              {CSR_FORWARD.text}
            </p>
            <p className="mt-4 text-body-s text-white/50">Source: {CSR_FORWARD.source}</p>
          </motion.div>
        </Container>
      </section>

      <CTABand
        title={
          <>
            Impact is a people story. <span className="text-brand-mint">Meet the culture behind it.</span>
          </>
        }
        lead="The volunteering culture powering these programs lives on the Social page."
        action={{ label: "Back to Social", to: "/social" }}
        secondaryAction={{ label: "ESG Highlights", to: "/highlights" }}
      />
    </>
  );
}
