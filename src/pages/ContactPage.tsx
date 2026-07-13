import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Building2, Globe, MessageSquare } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { Card } from "@/components/primitives/Card";
import { Button } from "@/components/primitives/Button";
import { WaveLines } from "@/components/sections/home/WaveLines";
import { GLOBAL_FOOTPRINT } from "@/data/about";
import { fadeRise, staggerGroup, EASE_SETTLE } from "@/lib/motion";

/**
 * Contact — blueprint §2.15. No form backend is in scope (risk R6):
 * the form composes a structured email via the visitor's own mail client,
 * stated plainly. Corporate channels link to sagility.com.
 */
export default function ContactPage() {
  const [status, setStatus] = useState<string | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`ESG Report feedback — ${data.get("topic")}`);
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nOrganization: ${data.get("org") || "—"}\n\n${data.get("message")}`,
    );
    window.location.href = `mailto:sustainability@sagilityhealth.com?subject=${subject}&body=${body}`;
    setStatus("Your email client should open with the message pre-filled. If it doesn't, email sustainability@sagilityhealth.com.");
  }

  return (
    <>
      <section className="relative overflow-hidden bg-brand-teal">
        <WaveLines className="absolute inset-0 opacity-60" />
        <Container className="relative py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_SETTLE }}
            className="max-w-3xl"
          >
            <p className="text-overline uppercase text-brand-mint">Contact & feedback</p>
            <h1 className="mt-4 font-display text-h1 font-light text-white md:text-display-l">
              Your feedback shapes our reporting.
            </h1>
            <p className="mt-6 text-body-l text-white/75">
              We value stakeholder feedback as an essential driver of improvement — your
              suggestions help us refine our reporting practices.
            </p>
          </motion.div>
        </Container>
      </section>

      <section aria-label="Contact channels" className="py-section md:py-section-lg">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            {/* Feedback form */}
            <motion.div
              variants={fadeRise}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="lg:col-span-7"
            >
              <Card className="p-8">
                <h2 className="font-display text-h3 text-ink-strong">Send feedback</h2>
                <p className="mt-2 text-body-s text-neutral-500">
                  This form opens your email client with a pre-filled message — nothing is
                  submitted or stored by this site.
                </p>
                <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="c-name" className="block text-body-s font-medium text-ink-strong">
                        Name <span aria-hidden className="text-pillar-socialDeep">*</span>
                      </label>
                      <input
                        id="c-name"
                        name="name"
                        required
                        autoComplete="name"
                        className="mt-1.5 h-12 w-full rounded-btn border border-neutral-300 px-4 text-body text-ink focus-visible:border-brand-tealMid"
                      />
                    </div>
                    <div>
                      <label htmlFor="c-org" className="block text-body-s font-medium text-ink-strong">
                        Organization
                      </label>
                      <input
                        id="c-org"
                        name="org"
                        autoComplete="organization"
                        className="mt-1.5 h-12 w-full rounded-btn border border-neutral-300 px-4 text-body text-ink focus-visible:border-brand-tealMid"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="c-topic" className="block text-body-s font-medium text-ink-strong">
                      Topic <span aria-hidden className="text-pillar-socialDeep">*</span>
                    </label>
                    <select
                      id="c-topic"
                      name="topic"
                      required
                      className="mt-1.5 h-12 w-full rounded-btn border border-neutral-300 bg-white px-4 text-body text-ink focus-visible:border-brand-tealMid"
                    >
                      <option>Sustainability report feedback</option>
                      <option>ESG data inquiry</option>
                      <option>Partnership / CSR inquiry</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="c-message" className="block text-body-s font-medium text-ink-strong">
                      Message <span aria-hidden className="text-pillar-socialDeep">*</span>
                    </label>
                    <textarea
                      id="c-message"
                      name="message"
                      required
                      rows={6}
                      className="mt-1.5 w-full rounded-btn border border-neutral-300 px-4 py-3 text-body text-ink focus-visible:border-brand-tealMid"
                    />
                  </div>
                  <Button type="submit">Compose email</Button>
                  {status && (
                    <p role="status" className="rounded-card bg-brand-mintTint/40 p-4 text-body-s text-brand-tealMid">
                      {status}
                    </p>
                  )}
                </form>
              </Card>
            </motion.div>

            {/* Channels */}
            <motion.div
              className="space-y-5 lg:col-span-5"
              variants={staggerGroup}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div variants={fadeRise}>
                <Card>
                  <Building2 aria-hidden size={22} strokeWidth={1.5} className="text-brand-tealMid" />
                  <h3 className="mt-3 text-body-l font-semibold text-ink-strong">Registered office</h3>
                  <p className="mt-2 text-body-s text-neutral-500">
                    Sagility India Limited
                    <br />
                    AMR Tech Park, Bommanahalli
                    <br />
                    Bengaluru 560 068, Karnataka, India
                  </p>
                </Card>
              </motion.div>
              <motion.div variants={fadeRise}>
                <Card>
                  <MessageSquare aria-hidden size={22} strokeWidth={1.5} className="text-brand-tealMid" />
                  <h3 className="mt-3 text-body-l font-semibold text-ink-strong">Stakeholder feedback</h3>
                  <p className="mt-2 text-body-s text-neutral-500">
                    The report's official feedback channel:
                  </p>
                  <a
                    href="https://sagility.com/contact-us/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-body font-medium text-brand-tealMid underline decoration-brand-mint underline-offset-4 hover:text-brand-teal"
                  >
                    sagility.com/contact-us
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </Card>
              </motion.div>
              <motion.div variants={fadeRise}>
                <Card>
                  <Globe aria-hidden size={22} strokeWidth={1.5} className="text-brand-tealMid" />
                  <h3 className="mt-3 text-body-l font-semibold text-ink-strong">Office locations</h3>
                  <ul className="mt-2 space-y-2">
                    {GLOBAL_FOOTPRINT.map((g) => (
                      <li key={g.geo} className="text-body-s text-neutral-500">
                        <span className="font-medium text-ink-strong">{g.geo}:</span> {g.cities}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  );
}
