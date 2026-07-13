import { motion } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { FiveDWheel } from "@/components/features/FiveDWheel";
import { CLIMATE_RISK } from "@/data/emissions";
import { fadeRise } from "@/lib/motion";

/**
 * ClimateStrategy — the narrative frame: SBTi-aligned decarbonization
 * guided by the 5D model, with climate risk visibility (blueprint §2.6.4–5).
 */
export function ClimateStrategy() {
  return (
    <section aria-label="Climate strategy" className="py-section md:py-section-lg" id="climate-strategy">
      <Container>
        <SectionHeader
          overline="Climate strategy"
          title={
            <>
              Decarbonization by design,{" "}
              <span className="font-normal text-pillar-environmentDeep">not by offset.</span>
            </>
          }
          lead="Our journey began in 2022 with a pledge to embed sustainability at the core of operations. Today it runs on a science-aligned roadmap: validated SBTi targets, delivered through the 5D model across operations and the value chain."
        />

        <motion.div variants={fadeRise} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <FiveDWheel />
        </motion.div>

        <motion.aside
          variants={fadeRise}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-14 rounded-card-lg border border-neutral-100 bg-surface p-8"
          aria-label="Climate risk and resilience"
        >
          <h3 className="font-display text-h4 font-medium text-ink-strong">
            Climate risk &amp; resilience
          </h3>
          <p className="mt-3 max-w-3xl text-body text-ink">{CLIMATE_RISK.summary}</p>
          <p className="mt-2 max-w-3xl text-body-s text-neutral-500">{CLIMATE_RISK.forward}</p>
          <p className="mt-4 text-body-s text-neutral-500">
            Annual disclosures: {CLIMATE_RISK.disclosures.join(" · ")}
          </p>
        </motion.aside>
      </Container>
    </section>
  );
}
