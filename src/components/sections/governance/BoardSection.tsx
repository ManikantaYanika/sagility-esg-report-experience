import { motion } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Card } from "@/components/primitives/Card";
import { Chip } from "@/components/primitives/Chip";
import { BOARD } from "@/data/governance";
import { fadeRise, staggerGroup } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * BoardSection — verified roster, composition, committees, and the
 * collective competency footprint (blueprint §2.9.4–5).
 */
const groupTone: Record<string, string> = {
  Executive: "bg-pillar-governance text-white",
  "Non-Executive": "bg-pillar-governance/10 text-pillar-governanceDeep",
  Independent: "bg-brand-mintTint text-brand-tealMid",
};

export function BoardSection() {
  return (
    <section aria-label="Board leadership" className="bg-surface py-section md:py-section-lg" id="board">
      <Container>
        <SectionHeader
          overline="Board leadership"
          title="Nine directors. Five independent."
          lead="Deep expertise across healthcare, operations, finance, risk, and technology — with independent directors chairing every key committee."
        />

        <motion.ul
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerGroup}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          aria-label="Board of Directors"
        >
          {BOARD.directors.map((d) => (
            <motion.li key={d.name} variants={fadeRise}>
              <Card variant="interactive" pillar="governance" className="flex h-full items-start gap-4 p-6">
                <span
                  aria-hidden
                  className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-display text-body-l font-semibold",
                    groupTone[d.group],
                  )}
                >
                  {d.name.replace("Dr. ", "").split(" ").map((w) => w[0]).slice(0, 2).join("")}
                </span>
                <div>
                  <h3 className="text-body font-semibold text-ink-strong">{d.name}</h3>
                  <p className="mt-0.5 text-body-s text-neutral-500">{d.role}</p>
                </div>
              </Card>
            </motion.li>
          ))}
        </motion.ul>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <motion.div
            variants={fadeRise}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Card className="h-full">
              <h3 className="font-display text-h4 font-medium text-ink-strong">Committees</h3>
              <ul className="mt-4 space-y-4">
                {BOARD.committees.map((c) => (
                  <li key={c.name} className="border-l-2 border-pillar-governance pl-4">
                    <p className="text-body font-semibold text-ink-strong">{c.name}</p>
                    <p className="text-body-s text-neutral-500">{c.note}</p>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>

          <motion.div
            variants={fadeRise}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Card className="h-full">
              <h3 className="font-display text-h4 font-medium text-ink-strong">
                Collective Board competencies
              </h3>
              <p className="mt-2 text-body-s text-neutral-500">
                The competency matrix disclosed in the report spans:
              </p>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Board competencies">
                {BOARD.competencies.map((c) => (
                  <li key={c}>
                    <Chip variant="topic" pillar="governance">{c}</Chip>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-body-s text-neutral-500">
                Board diversity spans gender, age, independence, residency, experience, and
                functional expertise — evaluated annually by the Nomination &amp; Remuneration
                Committee. Source: {BOARD.source}.
              </p>
            </Card>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
