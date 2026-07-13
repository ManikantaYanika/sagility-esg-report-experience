import { motion } from "framer-motion";
import { Lightbulb, PlugZap, Recycle, Building, Car, Users } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { ChartFigure } from "@/components/features/charts/ChartFigure";
import { StackedBars } from "@/components/features/charts/StackedBars";
import { BarsCompare } from "@/components/features/charts/BarsCompare";
import { Stat } from "@/components/primitives/Stat";
import { ENERGY_MIX, ENERGY_BY_REGION } from "@/data/emissions";
import { fadeRise, staggerGroup } from "@/lib/motion";

/**
 * EnergySection — renewable transition + efficiency program
 * (blueprint §2.6.7; user sections 4 & 5 combined under one narrative).
 */
const INITIATIVES = [
  { icon: Lightbulb, title: "Lighting optimization", text: "LED retrofits with motion and occupancy sensors across all facilities." },
  { icon: PlugZap, title: "Renewable procurement", text: "On-site solar with landlords, PPAs/VPPAs, and Renewable Energy Certificates." },
  { icon: Building, title: "Certified buildings first", text: "LEED and IGBC-certified buildings prioritized when scouting new offices." },
  { icon: Recycle, title: "Green IT", text: "Cloud migration, server consolidation, and device-as-a-service models." },
  { icon: Car, title: "E-mobility", text: "30 EVs for employee commuting, with the program expanding to cut Scope 3." },
  { icon: Users, title: "Behavioural change", text: "Employee campaigns on energy conservation and green transportation." },
];

export function EnergySection() {
  return (
    <section aria-label="Renewable energy and efficiency" className="py-section md:py-section-lg" id="energy">
      <Container>
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <SectionHeader
            overline="Renewable energy & efficiency"
            title="Less energy in. Cleaner energy chosen."
            lead="Electricity is our dominant energy input — so we work both levers: shrinking consumption through efficiency, and shifting what remains toward renewables."
            className="mb-0 lg:col-span-8"
          />
          <motion.div
            variants={fadeRise}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-4"
          >
            <Stat
              value={ENERGY_MIX.renewableShareFy25}
              suffix="%"
              label="of electricity from renewable sources, FY2024–25"
              pillar="environment"
              size="m"
              sourceNote={`Source: ${ENERGY_MIX.source}`}
            />
          </motion.div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <ChartFigure
            title="Energy mix, YoY"
            summary="Renewable energy grew 23.4% while non-renewable use fell 4.4% — against 2.4% total growth."
            source={ENERGY_MIX.source}
            table={{
              caption: "Energy consumption mix (GJ)",
              headers: ["Year", "Renewable", "Non-renewable", "Total"],
              rows: ENERGY_MIX.years.map((y) => [
                y.year,
                y.renewable.toLocaleString(),
                y.nonRenewable.toLocaleString(),
                y.total.toLocaleString(),
              ]),
            }}
          >
            <StackedBars
              rows={ENERGY_MIX.years.map((y) => ({
                label: `${y.year} — ${y.total.toLocaleString()} GJ`,
                segments: [
                  { name: "Renewable", value: y.renewable },
                  { name: "Non-renewable", value: y.nonRenewable },
                ],
              }))}
              colors={["#7BB52A", "#B9B9B9"]}
              format={(v) => `${v.toLocaleString()} GJ`}
            />
            <p className="mt-4 text-body-s text-neutral-500">
              Energy intensity improved {Math.abs(ENERGY_MIX.intensity.deltaPct)}% to{" "}
              {ENERGY_MIX.intensity.fy25} {ENERGY_MIX.intensity.unit}.
            </p>
          </ChartFigure>

          <ChartFigure
            title="Energy consumption by region, FY2024–25"
            summary="India and the Philippines — our largest delivery footprints — account for ~84% of energy use."
            source="SR FY2024–25, p.59"
            table={{
              caption: "Energy consumption by region (GJ), FY2024–25",
              headers: ["Region", "GJ"],
              rows: ENERGY_BY_REGION.map((r) => [r.region, r.value.toLocaleString()]),
            }}
          >
            <BarsCompare
              rows={ENERGY_BY_REGION.map((r) => ({ label: r.region, a: 0, b: r.value }))}
              seriesLabels={["", "FY2024–25"]}
              format={(v) => (v === 0 ? "" : `${v.toLocaleString()} GJ`)}
            />
          </ChartFigure>
        </div>

        <motion.ul
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerGroup}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          aria-label="Energy efficiency initiatives"
        >
          {INITIATIVES.map((item) => (
            <motion.li key={item.title} variants={fadeRise} className="flex gap-4">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-card bg-pillar-environment/10 text-pillar-environmentDeep">
                <item.icon aria-hidden size={22} strokeWidth={1.5} />
              </span>
              <div>
                <h3 className="text-body font-semibold text-ink-strong">{item.title}</h3>
                <p className="mt-1 text-body-s text-neutral-500">{item.text}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
