import { motion } from "framer-motion";
import { FileText, Download as DownloadIcon } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Card } from "@/components/primitives/Card";
import { CTABand } from "@/components/sections/CTABand";
import { WaveLines } from "@/components/sections/home/WaveLines";
import { DOWNLOADS, RELATED_DISCLOSURES } from "@/data/downloads";
import { fadeRise, staggerGroup, EASE_SETTLE } from "@/lib/motion";
import { cn } from "@/lib/cn";

/** Downloads — blueprint §2.14. Real PDFs, honest file sizes. */
export default function DownloadsPage() {
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
            <p className="text-overline uppercase text-brand-mint">Downloads & disclosures</p>
            <h1 className="mt-4 font-display text-h1 font-light text-white md:text-display-l">
              Take the evidence with you.
            </h1>
            <p className="mt-6 text-body-l text-white/75">
              The complete sustainability reports — assured, GRI-referenced, and exactly as
              filed.
            </p>
          </motion.div>
        </Container>
      </section>

      <section aria-label="Report downloads" className="py-section md:py-section-lg">
        <Container>
          <motion.div
            className="grid gap-6 lg:grid-cols-2"
            variants={staggerGroup}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {DOWNLOADS.map((d) => (
              <motion.div key={d.id} variants={fadeRise}>
                <Card
                  variant="interactive"
                  className={cn("flex h-full flex-col p-8", d.primary && "border-brand-mint")}
                >
                  {/* Stylized cover preview */}
                  <div className="relative mb-6 overflow-hidden rounded-card bg-brand-teal p-6">
                    <WaveLines className="absolute inset-0 opacity-60" />
                    <div className="relative">
                      <p className="font-display text-h4 font-semibold text-white">
                        Sagility{" "}
                        <span className="block text-body-s font-sans font-medium uppercase tracking-[0.12em] text-brand-mint">
                          Sustainability Report
                        </span>
                      </p>
                      <p className="mt-4 font-display text-stat-s text-brand-mint">
                        {d.id === "fy25" ? "FY2025" : "FY2024"}
                      </p>
                    </div>
                  </div>

                  <h2 className="font-display text-h3 text-ink-strong">{d.title}</h2>
                  <p className="mt-1 text-body text-neutral-500">{d.subtitle}</p>
                  <ul className="mt-5 flex-1 space-y-2">
                    {d.notes.map((n) => (
                      <li key={n} className="flex items-start gap-2.5 text-body-s text-neutral-500">
                        <FileText aria-hidden size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-brand-tealMid" />
                        {n}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={d.path}
                    download
                    aria-label={`Download ${d.title} (${d.meta})`}
                    className={cn(
                      "mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-btn px-6 font-sans text-body font-medium transition-colors duration-200 ease-settle",
                      d.primary
                        ? "bg-brand-teal text-white hover:bg-brand-tealMid"
                        : "border-[1.5px] border-brand-teal text-brand-teal hover:bg-brand-teal/5",
                    )}
                  >
                    <DownloadIcon aria-hidden size={20} strokeWidth={1.5} />
                    Download
                    <span className="text-body-s opacity-70">({d.meta})</span>
                  </a>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      <section aria-label="Related disclosures" className="bg-surface py-section">
        <Container>
          <SectionHeader
            overline="Supporting ESG resources"
            title="Also on the record."
            lead="Contained within the reports or disclosed to rating platforms annually."
          />
          <motion.ul
            className="grid gap-4 sm:grid-cols-2"
            variants={staggerGroup}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {RELATED_DISCLOSURES.map((r) => (
              <motion.li
                key={r.label}
                variants={fadeRise}
                className="flex items-start gap-4 rounded-card-lg border border-neutral-100 bg-white p-6"
              >
                <FileText aria-hidden size={22} strokeWidth={1.5} className="mt-0.5 shrink-0 text-brand-tealMid" />
                <div>
                  <h3 className="text-body font-semibold text-ink-strong">{r.label}</h3>
                  <p className="mt-1 text-body-s text-neutral-500">{r.note}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </Container>
      </section>

      <CTABand
        title={
          <>
            Questions on the reports? <span className="text-brand-mint">We welcome them.</span>
          </>
        }
        lead="Stakeholder feedback directly shapes future reporting."
        action={{ label: "Contact & Feedback", to: "/contact" }}
      />
    </>
  );
}
