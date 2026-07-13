import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Card } from "@/components/primitives/Card";
import { Chip } from "@/components/primitives/Chip";
import { Stat } from "@/components/primitives/Stat";
import { StatBand } from "@/components/sections/StatBand";
import { CTABand } from "@/components/sections/CTABand";
import { WaveLines } from "@/components/sections/home/WaveLines";
import { MISSION_VISION, SERVICES, GLOBAL_FOOTPRINT, ABOUT_STATS, FINANCIALS } from "@/data/about";
import { fadeRise, staggerGroup, EASE_SETTLE } from "@/lib/motion";

/** About Sagility — blueprint §2.2. */
export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-teal">
        <WaveLines className="absolute inset-0 opacity-60" />
        <Container className="relative py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_SETTLE }}
            className="max-w-3xl"
          >
            <p className="text-overline uppercase text-brand-mint">About Sagility</p>
            <h1 className="mt-4 font-display text-h1 font-light text-white md:text-display-l">
              Healthcare is all we do.
            </h1>
            <p className="mt-6 text-body-l text-white/75">
              A technology-enabled, pure-play healthcare solutions provider — partnering with
              U.S. payers and providers to deliver better health outcomes through 25 years of
              specialized expertise, automation, analytics, and AI.
            </p>
          </motion.div>
        </Container>
      </section>

      <StatBand metrics={ABOUT_STATS} ariaLabel="Sagility at a glance" />

      {/* Mission, vision, values */}
      <section aria-label="Mission and vision" className="py-section md:py-section-lg">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <motion.div variants={fadeRise} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
              <Card className="h-full bg-surface">
                <p className="text-overline uppercase text-brand-tealMid">Our vision</p>
                <p className="mt-4 font-display text-h3 font-light leading-relaxed text-ink-strong">
                  “{MISSION_VISION.vision}”
                </p>
              </Card>
            </motion.div>
            <motion.div variants={fadeRise} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
              <Card className="flex h-full flex-col bg-surface">
                <p className="text-overline uppercase text-brand-tealMid">Our mission</p>
                <p className="mt-4 flex-1 text-body-l text-ink">{MISSION_VISION.mission}</p>
                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Core values">
                  {MISSION_VISION.values.map((v) => (
                    <li key={v}>
                      <Chip variant="topic">{v}</Chip>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Services */}
      <section aria-label="Healthcare expertise" className="bg-surface py-section md:py-section-lg">
        <Container>
          <SectionHeader
            overline="What we do"
            title="Six services. One healthcare value chain."
            lead="Technology-enabled services for payers, providers, and PBMs — processing 119M+ claims and 78M+ member interactions a year."
          />
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerGroup}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {SERVICES.map((s) => (
              <motion.div key={s.title} variants={fadeRise}>
                <Card variant="interactive" className="h-full">
                  <span aria-hidden className="block h-1 w-10 rounded-full bg-brand-mint" />
                  <h3 className="mt-4 font-display text-h4 font-medium text-ink-strong">{s.title}</h3>
                  <p className="mt-2 text-body-s text-neutral-500">{s.text}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Global presence */}
      <section aria-label="Global presence" className="py-section md:py-section-lg">
        <Container>
          <SectionHeader
            overline="Global presence"
            title="Five geographies, 23 delivery centres."
            lead="38,754 people serving U.S. healthcare around the clock."
          />
          <motion.ul
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
            variants={staggerGroup}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {GLOBAL_FOOTPRINT.map((g) => (
              <motion.li key={g.geo} variants={fadeRise}>
                <Card className="h-full">
                  <MapPin aria-hidden size={20} strokeWidth={1.5} className="text-brand-tealMid" />
                  <h3 className="mt-3 text-body-l font-semibold text-ink-strong">{g.geo}</h3>
                  <p className="font-display text-stat-s text-brand-teal">
                    {g.employees.toLocaleString()}
                  </p>
                  <p className="text-body-s text-neutral-500">employees</p>
                  <p className="mt-3 text-body-s text-neutral-500">{g.cities}</p>
                </Card>
              </motion.li>
            ))}
          </motion.ul>
        </Container>
      </section>

      {/* Financial highlights */}
      <section aria-label="Business overview" className="bg-brand-teal py-section">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 className="font-display text-h2 text-white">FY2024–25, in numbers.</h2>
              <p className="mt-3 text-body text-white/70">
                Listed on the NSE and BSE in FY2024–25 — a milestone reinforcing transparency
                and long-term value creation.
              </p>
            </div>
            <motion.div
              className="grid grid-cols-2 gap-x-6 gap-y-10 lg:col-span-8 lg:grid-cols-4"
              variants={staggerGroup}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {FINANCIALS.map((f) => (
                <motion.div key={f.id} variants={fadeRise}>
                  <Stat
                    value={f.value}
                    prefix={f.prefix}
                    suffix={f.suffix}
                    decimals={f.decimals}
                    label={f.label}
                    size="s"
                    onDark
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Container>
      </section>

      <CTABand
        title={
          <>
            The company, understood. <span className="text-brand-mint">Now the commitment.</span>
          </>
        }
        lead="See how sustainability is structured, measured, and governed across Sagility."
        action={{ label: "Our Sustainability Strategy", to: "/approach" }}
        secondaryAction={{ label: "ESG Highlights", to: "/highlights" }}
      />
    </>
  );
}
