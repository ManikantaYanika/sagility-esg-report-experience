import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Button } from "@/components/primitives/Button";
import { WaveLines } from "@/components/sections/home/WaveLines";
import { fadeRise } from "@/lib/motion";

/**
 * ReportDownload — FY2025 report feature (homepage §9).
 * Original stylized cover card (no report imagery ripped from the PDF);
 * actual compressed PDFs are wired on /downloads in Phase 5.
 */
export function ReportDownload() {
  return (
    <section aria-label="Download the report" className="bg-surface py-section md:py-section-lg">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Stylized cover */}
          <motion.div
            variants={fadeRise}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto aspect-[3/4] max-w-sm overflow-hidden rounded-card-lg bg-brand-teal shadow-lift">
              <WaveLines className="absolute inset-0 opacity-70" />
              <div className="relative flex h-full flex-col justify-between p-8">
                <p className="font-display text-h4 font-semibold text-white">
                  Sagility{" "}
                  <span className="block text-body-s font-sans font-medium uppercase tracking-[0.12em] text-brand-mint">
                    Sustainability Report
                  </span>
                </p>
                <div>
                  <p className="font-display text-stat-m text-brand-mint">FY2025</p>
                  <p className="mt-2 text-body-s text-white/70">
                    Empowering Progress: People, Partnerships, Purpose
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeRise}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-7"
          >
            <SectionHeader
              overline="The full report"
              title="Every number. Every note. Independently assured."
              lead="104 pages of audited ESG performance — GRI-referenced, BRSR-informed, and assured by DNV under ISAE 3000 (Revised)."
              className="mb-8"
            />
            <ul className="space-y-3 text-body text-ink">
              {[
                "Complete GRI content index and assurance statement",
                "Full emissions inventory across Scopes 1, 2 and 3",
                "17 material topics with risk and opportunity analysis",
              ].map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <FileText
                    aria-hidden
                    size={20}
                    strokeWidth={1.5}
                    className="mt-0.5 shrink-0 text-brand-tealMid"
                  />
                  {line}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button to="/downloads">Download FY2025 Report</Button>
              <Button variant="tertiary" to="/downloads">
                All reports & disclosures
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
