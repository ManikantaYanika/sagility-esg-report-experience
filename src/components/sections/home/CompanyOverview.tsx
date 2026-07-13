import { motion } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Stat } from "@/components/primitives/Stat";
import { Button } from "@/components/primitives/Button";
import { COMPANY, COMPANY_MINI_STATS } from "@/data/company";
import { fadeRise, staggerGroup } from "@/lib/motion";

/** CompanyOverview — who Sagility is, in one screen (homepage §2). */
export function CompanyOverview() {
  return (
    <section aria-label="About Sagility" className="py-section md:py-section-lg">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            className="lg:col-span-7"
            variants={fadeRise}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <SectionHeader
              overline="Who we are"
              title={
                <>
                  Healthcare in our DNA.{" "}
                  <span className="font-normal text-brand-tealMid">Care in everything.</span>
                </>
              }
              className="mb-6"
            />
            <p className="max-w-measure text-body-l text-ink">{COMPANY.overview}</p>
            <p className="mt-4 max-w-measure text-body text-neutral-500">{COMPANY.esgFraming}</p>
            <Button variant="tertiary" to="/about" className="mt-8">
              More about Sagility
            </Button>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 content-center gap-x-8 gap-y-10 lg:col-span-5"
            variants={staggerGroup}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {COMPANY_MINI_STATS.map((m) => (
              <motion.div key={m.id} variants={fadeRise}>
                <Stat
                  value={m.value}
                  prefix={m.prefix}
                  suffix={m.suffix}
                  label={m.label}
                  size="s"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
