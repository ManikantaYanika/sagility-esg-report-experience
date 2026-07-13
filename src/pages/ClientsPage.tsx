import { motion } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Card } from "@/components/primitives/Card";
import { Stat } from "@/components/primitives/Stat";
import { CTABand } from "@/components/sections/CTABand";
import { WaveLines } from "@/components/sections/home/WaveLines";
import { CLIENT_STATS, MILESTONE_PARTNERSHIPS, TESTIMONIALS } from "@/data/clients";
import { fadeRise, staggerGroup, EASE_SETTLE } from "@/lib/motion";

/** Client Partnerships — blueprint §2.10. */
function StripeGlyph() {
  return (
    <svg aria-hidden viewBox="0 0 48 40" className="h-7 w-9 fill-brand-mint">
      <path d="M8 40 L22 0 h10 L18 40 Z" />
      <path d="M26 40 L40 0 h8 L34 40 Z" />
    </svg>
  );
}

const THEMES = ["Client Centricity", "Excellence in Delivery", "Tech-Enabled Transformation"] as const;

export default function ClientsPage() {
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
            <p className="text-overline uppercase text-brand-mint">Client partnerships & excellence</p>
            <h1 className="mt-4 font-display text-h1 font-light text-white md:text-display-l">
              Partnerships measured in decades.
            </h1>
            <p className="mt-6 text-body-l text-white/75">
              Deep healthcare expertise, agile delivery, and co-innovation — earning trust that
              lasts 10 and 25 years at a time.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Stats */}
      <section aria-label="Client statistics" className="border-b border-neutral-100 bg-surface">
        <Container>
          <motion.div
            className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 md:py-16 lg:grid-cols-4"
            variants={staggerGroup}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {CLIENT_STATS.map((m) => (
              <motion.div key={m.id} variants={fadeRise}>
                <Stat
                  value={m.value}
                  prefix={m.prefix}
                  label={m.label}
                  delta={m.delta}
                  deltaGoodWhen={m.deltaGoodWhen}
                  size="s"
                />
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Milestone partnerships */}
      <section aria-label="Milestone partnerships" className="py-section md:py-section-lg">
        <Container>
          <SectionHeader
            overline="Milestone anniversaries"
            title="Trust, compounding."
            lead="FY25 marked milestone anniversaries in two of our longest-standing relationships."
          />
          <motion.div
            className="grid gap-6 md:grid-cols-2"
            variants={staggerGroup}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {MILESTONE_PARTNERSHIPS.map((p) => (
              <motion.div key={p.years} variants={fadeRise}>
                <Card variant="interactive" className="h-full">
                  <p className="font-display text-stat-m text-brand-teal">{p.years}</p>
                  <p className="mt-2 text-body-l font-semibold text-ink-strong">{p.who}</p>
                  <p className="mt-3 text-body text-neutral-500">{p.text}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.aside
            variants={fadeRise}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mt-10 rounded-card-lg bg-brand-teal p-8"
            aria-label="U.S. Customer Summit"
          >
            <p className="text-overline uppercase text-brand-mint">Flagship summit</p>
            <p className="mt-3 max-w-3xl text-body-l text-white">
              Nearly 100 client leaders convened at our U.S. Customer Summit — from the
              responsible adoption of generative AI to member-centric care models, shaping the
              future of healthcare delivery together.
            </p>
            <p className="mt-3 text-body-s text-white/60">Source: SR FY2024–25, p.66</p>
          </motion.aside>
        </Container>
      </section>

      {/* Testimonials by theme */}
      <section aria-label="Client testimonials" className="bg-surface py-section md:py-section-lg">
        <Container>
          <SectionHeader
            overline="Client voices"
            title="In their words."
            lead="Verbatim from the FY2024–25 report — attributed by role, as our clients' confidentiality deserves."
          />
          <div className="space-y-12">
            {THEMES.map((theme) => (
              <div key={theme}>
                <h3 className="text-overline uppercase text-brand-tealMid">{theme}</h3>
                <motion.div
                  className="mt-5 grid gap-6 md:grid-cols-2"
                  variants={staggerGroup}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                >
                  {TESTIMONIALS.filter((t) => t.theme === theme).map((t) => (
                    <motion.figure key={t.attribution + t.quote.slice(0, 16)} variants={fadeRise}>
                      <Card className="h-full">
                        <StripeGlyph />
                        <blockquote className="mt-4">
                          <p className="text-body-l font-light leading-relaxed text-ink">“{t.quote}”</p>
                        </blockquote>
                        <figcaption className="mt-5 text-body-s font-semibold text-ink-strong">
                          {t.attribution}
                        </figcaption>
                      </Card>
                    </motion.figure>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTABand
        title={
          <>
            Excellence, sustained. <span className="text-brand-mint">Responsibly.</span>
          </>
        }
        lead="See the governance and data protection standards behind every client engagement."
        action={{ label: "Governance", to: "/governance" }}
        secondaryAction={{ label: "About Sagility", to: "/about" }}
      />
    </>
  );
}
