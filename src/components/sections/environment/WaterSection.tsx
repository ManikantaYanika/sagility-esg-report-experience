import { motion } from "framer-motion";
import { Droplets, Gauge, CloudRain, Wrench } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { ChartFigure } from "@/components/features/charts/ChartFigure";
import { StackedBars } from "@/components/features/charts/StackedBars";
import { WATER_STRESS } from "@/data/emissions";
import { fadeRise, staggerGroup } from "@/lib/motion";

/** WaterSection — stewardship with the restatement context (caution §15.2). */
const MEASURES = [
  { icon: Droplets, title: "Sensor-based fixtures", text: "Touchless taps rolled out across India and U.S. facilities." },
  { icon: Gauge, title: "Low-flow infrastructure", text: "Low-flow faucets and efficient toilets installed with landlords." },
  { icon: CloudRain, title: "Rainwater harvesting", text: "Harvesting and weather-responsive irrigation where feasible." },
  { icon: Wrench, title: "Leak prevention", text: "Continuous engagement with property teams for timely repairs." },
];

export function WaterSection() {
  return (
    <section aria-label="Water stewardship" className="bg-surface py-section md:py-section-lg" id="water">
      <Container>
        <SectionHeader
          overline="Water stewardship"
          title="Precise about a shared resource."
          lead={`Our water use is domestic and sanitary, drawn entirely from municipal and landlord-managed supply across ${WATER_STRESS.facilities} facilities. What makes it strategic: 53% of consumption sits in extremely high water-stress regions.`}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <ChartFigure
            title="Water use by stress zone, YoY"
            summary="More than half of FY2024–25 water use is in extremely high-stress regions (WRI Water Risk Atlas)."
            source={WATER_STRESS.source}
            table={{
              caption: "Water use by stress zone (kL)",
              headers: ["Zone", "FY2023–24", "FY2024–25"],
              rows: WATER_STRESS.zones.map((z) => [
                z.zone,
                `${z.fy24.toLocaleString()} (${z.fy24Pct}%)`,
                z.fy25 ? `${z.fy25.toLocaleString()} (${z.fy25Pct}%)` : "—",
              ]),
            }}
          >
            <StackedBars
              rows={[
                {
                  label: "FY2023–24 — 46,755 kL",
                  segments: WATER_STRESS.zones.map((z) => ({
                    name: z.zone,
                    value: z.fy24,
                    pctLabel: `${z.fy24Pct}%`,
                  })),
                },
                {
                  label: "FY2024–25 — 94,486 kL",
                  segments: WATER_STRESS.zones.map((z) => ({
                    name: z.zone,
                    value: z.fy25,
                    pctLabel: z.fy25 ? `${z.fy25Pct}%` : undefined,
                  })),
                },
              ]}
              colors={["#074954", "#00707E", "#7BB52A", "#BFF1E6"]}
              format={(v) => `${v.toLocaleString()} kL`}
            />
            {/* Restatement context ships with the data — non-negotiable (content-model §15). */}
            <p className="mt-4 rounded-card bg-brand-mintTint/40 p-3 text-body-s text-brand-tealMid">
              {WATER_STRESS.contextNote}
            </p>
          </ChartFigure>

          <motion.ul
            className="grid content-center gap-8 sm:grid-cols-2"
            variants={staggerGroup}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            aria-label="Water conservation measures"
          >
            {MEASURES.map((m) => (
              <motion.li key={m.title} variants={fadeRise} className="flex gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-card bg-pillar-environment/10 text-pillar-environmentDeep">
                  <m.icon aria-hidden size={22} strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="text-body font-semibold text-ink-strong">{m.title}</h3>
                  <p className="mt-1 text-body-s text-neutral-500">{m.text}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </Container>
    </section>
  );
}
