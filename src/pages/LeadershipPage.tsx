import { motion } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Card } from "@/components/primitives/Card";
import { Accordion } from "@/components/primitives/Accordion";
import { Button } from "@/components/primitives/Button";
import { CTABand } from "@/components/sections/CTABand";
import { WaveLines } from "@/components/sections/home/WaveLines";
import { FEATURED_LEADERS, SECTION_LEADERS } from "@/data/leaders";
import { fadeRise, staggerGroup, EASE_SETTLE } from "@/lib/motion";

/** Leadership Messages — blueprint §2.11. */
function StripeGlyph() {
  return (
    <svg aria-hidden viewBox="0 0 48 40" className="h-8 w-10 fill-brand-mint">
      <path d="M8 40 L22 0 h10 L18 40 Z" />
      <path d="M26 40 L40 0 h8 L34 40 Z" />
    </svg>
  );
}

export default function LeadershipPage() {
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
            <p className="text-overline uppercase text-brand-mint">Leadership messages</p>
            <h1 className="mt-4 font-display text-h1 font-light text-white md:text-display-l">
              The voices leading the journey.
            </h1>
            <p className="mt-6 text-body-l text-white/75">
              From the CEO to the leaders of every ESG discipline — in their own words, from the
              official sustainability reports.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Featured messages */}
      <section aria-label="Featured leadership messages" className="py-section md:py-section-lg">
        <Container>
          <motion.div
            className="space-y-8"
            variants={staggerGroup}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {FEATURED_LEADERS.map((leader) => (
              <motion.article key={leader.id} variants={fadeRise}>
                <Card className="p-8 md:p-10">
                  <div className="grid gap-8 lg:grid-cols-12">
                    <div className="lg:col-span-4">
                      <StripeGlyph />
                      <h2 className="mt-4 font-display text-h3 text-ink-strong">{leader.name}</h2>
                      <p className="mt-1 text-body font-medium text-brand-tealMid">{leader.role}</p>
                      <p className="mt-3 text-body-s text-neutral-500">Source: {leader.source}</p>
                    </div>
                    <div className="lg:col-span-8">
                      <blockquote>
                        <p className="font-display text-h4 font-light leading-relaxed text-ink">
                          “{leader.quote}”
                        </p>
                      </blockquote>
                      {leader.message && (
                        <Accordion
                          className="mt-6 border-b-0"
                          items={[
                            {
                              title: <span className="text-body font-medium">Read the message</span>,
                              content: (
                                <div className="max-w-measure space-y-4 text-body text-ink">
                                  {leader.message.map((p, i) => (
                                    <p key={i}>{p}</p>
                                  ))}
                                </div>
                              ),
                            },
                          ]}
                        />
                      )}
                    </div>
                  </div>
                </Card>
              </motion.article>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Section leads */}
      <section aria-label="ESG leadership voices" className="bg-surface py-section md:py-section-lg">
        <Container>
          <SectionHeader
            overline="ESG leadership"
            title="Every discipline, accountable."
            lead="The leaders whose chapters these are — people, community, environment, legal, security, and supply chain."
          />
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerGroup}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {SECTION_LEADERS.map((leader) => (
              <motion.div key={leader.id} variants={fadeRise}>
                <Card variant="interactive" className="flex h-full flex-col">
                  <blockquote className="flex-1">
                    <p className="text-body font-light leading-relaxed text-ink">“{leader.quote}”</p>
                  </blockquote>
                  <footer className="mt-5 border-t border-neutral-100 pt-4">
                    <p className="text-body font-semibold text-ink-strong">{leader.name}</p>
                    <p className="text-body-s text-neutral-500">{leader.role}</p>
                  </footer>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          <div className="mt-10">
            <Button variant="tertiary" to="/governance#board">
              Meet the Board of Directors
            </Button>
          </div>
        </Container>
      </section>

      <CTABand
        title={
          <>
            Words, backed by numbers. <span className="text-brand-mint">See the record.</span>
          </>
        }
        lead="The commitments in these messages are measured on the ESG Scorecard."
        action={{ label: "ESG Scorecard", to: "/esg-overview" }}
        secondaryAction={{ label: "ESG Highlights", to: "/highlights" }}
      />
    </>
  );
}
