import { motion } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Card } from "@/components/primitives/Card";
import { Accordion } from "@/components/primitives/Accordion";
import { Button } from "@/components/primitives/Button";
import { CTABand } from "@/components/sections/CTABand";
import { WaveLines } from "@/components/sections/home/WaveLines";
import { COMMITMENTS, STAKEHOLDERS, JOURNEY } from "@/data/approach";
import { GOVERNANCE_TIERS } from "@/data/governance";
import { fadeRise, staggerGroup, EASE_SETTLE } from "@/lib/motion";
import { cn } from "@/lib/cn";

/** Sustainability Strategy — blueprint §2.3. */
const pillarRule = {
  environment: "bg-pillar-environment",
  social: "bg-pillar-social",
  governance: "bg-pillar-governance",
} as const;

const pillarText = {
  environment: "text-pillar-environmentDeep",
  social: "text-pillar-socialDeep",
  governance: "text-pillar-governanceDeep",
} as const;

export default function ApproachPage() {
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
            <p className="text-overline uppercase text-brand-mint">Our sustainability strategy</p>
            <h1 className="mt-4 font-display text-h1 font-light text-white md:text-display-l">
              Strategy you can audit.
            </h1>
            <p className="mt-6 text-body-l text-white/75">
              ESG at Sagility is a governed operating system: three pillar commitments, a
              three-tier governance structure, structured stakeholder engagement, and a
              materiality assessment that decides where effort goes.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Journey */}
      <section aria-label="Our ESG journey" className="py-section md:py-section-lg">
        <Container width="measure">
          <motion.div variants={fadeRise} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }}>
            <p className="text-overline uppercase text-brand-tealMid">Where it began</p>
            <p className="mt-4 font-display text-h3 font-light leading-relaxed text-ink-strong">
              {JOURNEY.origin}
            </p>
            <p className="mt-4 text-body-s text-neutral-500">Source: {JOURNEY.source}</p>
          </motion.div>
        </Container>
      </section>

      {/* Three commitments */}
      <section aria-label="Pillar commitments" className="bg-surface py-section md:py-section-lg">
        <Container>
          <SectionHeader
            align="center"
            overline="Strategic priorities"
            title="Three commitments, with receipts."
            lead="Each pillar pairs its commitment with the concrete actions the report discloses."
          />
          <motion.div
            className="grid gap-6 lg:grid-cols-3"
            variants={staggerGroup}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {COMMITMENTS.map((c) => (
              <motion.div key={c.title} variants={fadeRise}>
                <Card className="h-full">
                  <span aria-hidden className={cn("block h-1 w-12 rounded-full", pillarRule[c.pillar])} />
                  <h3 className={cn("mt-4 text-overline uppercase", pillarText[c.pillar])}>{c.title}</h3>
                  <p className="mt-3 text-body-l font-medium text-ink-strong">{c.commitment}</p>
                  <Accordion
                    className="mt-5 border-b-0"
                    items={[
                      {
                        title: <span className="text-body font-medium">Key actions</span>,
                        content: (
                          <ul className="list-disc space-y-2 pl-5 text-body-s text-neutral-500">
                            {c.actions.map((a) => (
                              <li key={a}>{a}</li>
                            ))}
                          </ul>
                        ),
                      },
                    ]}
                  />
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Governance of sustainability */}
      <section aria-label="Sustainability governance" className="py-section md:py-section-lg">
        <Container>
          <SectionHeader
            overline="Sustainability framework"
            title="Governed from the Board down."
            lead="The same three-tier structure detailed on the Governance page steers strategy: Committee → Council → Working Groups."
          />
          <motion.div
            className="grid gap-5 lg:grid-cols-3"
            variants={staggerGroup}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {GOVERNANCE_TIERS.map((t) => (
              <motion.div key={t.tier} variants={fadeRise}>
                <Card className="h-full">
                  <p className="font-display text-stat-s text-brand-tealMid">{t.tier}</p>
                  <h3 className="mt-2 text-body-l font-semibold text-ink-strong">{t.name}</h3>
                  <p className="mt-1 text-body-s font-medium text-brand-tealMid">{t.who}</p>
                  <p className="mt-2 text-body-s text-neutral-500">{t.does}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          <div className="mt-8">
            <Button variant="tertiary" to="/governance">
              Full governance framework
            </Button>
          </div>
        </Container>
      </section>

      {/* Stakeholder engagement */}
      <section aria-label="Stakeholder engagement" className="bg-surface py-section md:py-section-lg">
        <Container>
          <SectionHeader
            overline="Stakeholder engagement"
            title="Whose expectations shape the roadmap."
            lead="A dual inside-out / outside-in approach across five stakeholder groups, feeding the OGSM framework."
          />
          <motion.div
            variants={fadeRise}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="overflow-x-auto rounded-card-lg border border-neutral-100 bg-white"
          >
            <table className="w-full min-w-[44rem] text-left">
              <caption className="sr-only">Stakeholder engagement channels, frequency, and topics</caption>
              <thead>
                <tr className="border-b border-neutral-100 text-body-s uppercase tracking-wide text-neutral-500">
                  <th scope="col" className="px-6 py-4 font-medium">Stakeholder</th>
                  <th scope="col" className="px-6 py-4 font-medium">Channels</th>
                  <th scope="col" className="px-6 py-4 font-medium">Frequency</th>
                  <th scope="col" className="px-6 py-4 font-medium">Topics</th>
                </tr>
              </thead>
              <tbody>
                {STAKEHOLDERS.map((s) => (
                  <tr key={s.group} className="border-b border-neutral-100 last:border-0">
                    <th scope="row" className="px-6 py-4 text-body font-semibold text-ink-strong">{s.group}</th>
                    <td className="px-6 py-4 text-body-s text-neutral-500">{s.channels}</td>
                    <td className="px-6 py-4 text-body-s text-neutral-500">{s.frequency}</td>
                    <td className="px-6 py-4 text-body-s text-neutral-500">{s.topics}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </Container>
      </section>

      <CTABand
        title={
          <>
            Seventeen topics decide the agenda. <span className="text-brand-mint">See the matrix.</span>
          </>
        }
        lead="The materiality assessment behind every priority on this page — interactive, with SDG alignment."
        action={{ label: "Materiality & SDGs", to: "/approach/materiality" }}
        secondaryAction={{ label: "ESG Scorecard", to: "/esg-overview" }}
      />
    </>
  );
}
