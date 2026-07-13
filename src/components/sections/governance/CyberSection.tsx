import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { CYBER } from "@/data/governance";
import { fadeRise, staggerGroup } from "@/lib/motion";

/**
 * CyberSection — digital trust on a dark surface (blueprint §2.9.9).
 * The zero-breach record is the page's strongest claim; it gets the
 * chapter's authority treatment.
 */
export function CyberSection() {
  return (
    <section aria-label="Cybersecurity and data privacy" className="bg-brand-teal py-section md:py-section-lg" id="cyber">
      <Container>
        <motion.div
          variants={staggerGroup}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={fadeRise} className="max-w-2xl">
            <p className="flex items-center gap-2 text-overline uppercase text-brand-mint">
              <Lock aria-hidden size={16} strokeWidth={1.5} />
              Cybersecurity & data privacy
            </p>
            <h2 className="mt-4 font-display text-h2 text-white">
              In healthcare, trust is the product.
            </h2>
            <p className="mt-4 text-body-l text-white/75">
              We protect member data, protected health information (PHI/ePHI), and client
              systems under HIPAA and global privacy regulations — with a security posture
              built on structured controls, not promises.
            </p>
          </motion.div>

          <motion.dl variants={fadeRise} className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {CYBER.stats.map((s) => (
              <div key={s.id}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <p className="font-display text-stat-s text-brand-mint">{s.value}</p>
                  <p className="mt-1 text-body-s text-white/75">{s.label}</p>
                </dd>
              </div>
            ))}
          </motion.dl>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CYBER.practices.map((p) => (
              <motion.div
                key={p.title}
                variants={fadeRise}
                className="rounded-card-lg border border-white/15 bg-white/5 p-6"
              >
                <h3 className="text-body font-semibold text-white">{p.title}</h3>
                <p className="mt-2 text-body-s text-white/65">{p.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.figure variants={fadeRise} className="mt-12 max-w-3xl">
            <blockquote className="border-l-2 border-brand-mint pl-6">
              <p className="font-display text-h4 font-light leading-relaxed text-white/90">
                “{CYBER.quote.text}”
              </p>
            </blockquote>
            <figcaption className="mt-3 pl-6">
              <p className="text-body font-semibold text-white">{CYBER.quote.name}</p>
              <p className="text-body-s text-white/60">{CYBER.quote.role}</p>
            </figcaption>
          </motion.figure>

          <motion.p variants={fadeRise} className="mt-8 text-body-s text-white/50">
            Source: {CYBER.source}. The FY24 customer-privacy figure was restated in the FY25
            report; corrected values shown.
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
