import { motion } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Card } from "@/components/primitives/Card";
import { Stat } from "@/components/primitives/Stat";
import { Button } from "@/components/primitives/Button";
import { COMMUNITY, COMMUNITY_STATS } from "@/data/social";
import { fadeRise, staggerGroup } from "@/lib/motion";

/**
 * CommunitySection — CSR impact with human stories (blueprint §2.7.9).
 * Story-first cards; the full program detail lives at /social/community.
 */
export function CommunitySection() {
  return (
    <section aria-label="Community impact" className="py-section md:py-section-lg" id="community">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            overline="Community impact"
            title="Change that has names."
            lead="Three flagship programs across health, skilling, and community sport — powered by 18,645 volunteering employees."
            className="mb-0 max-w-xl"
          />
          <Button variant="tertiary" to="/social/community" className="mb-2">
            Explore CSR & Community
          </Button>
        </div>

        <motion.div
          className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4"
          variants={staggerGroup}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {COMMUNITY_STATS.map((s) => (
            <motion.div key={s.id} variants={fadeRise}>
              <Stat
                value={s.value}
                prefix={s.prefix}
                suffix={s.suffix}
                decimals={s.decimals}
                label={s.label}
                pillar="social"
                size="s"
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 grid gap-6 lg:grid-cols-3"
          variants={staggerGroup}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {COMMUNITY.programs.map((p) => (
            <motion.div key={p.id} variants={fadeRise}>
              <Card variant="interactive" pillar="social" className="flex h-full flex-col">
                <p className="text-overline uppercase text-pillar-socialDeep">{p.title}</p>
                <p className="mt-2 text-body-s font-medium text-neutral-500">
                  with {p.partner} · {p.impact}
                </p>
                <blockquote className="mt-5 flex-1 border-l-2 border-pillar-social pl-4 text-body text-ink">
                  {p.story}
                </blockquote>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
