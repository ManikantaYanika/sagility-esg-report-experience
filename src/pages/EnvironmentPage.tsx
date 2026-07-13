import { ChapterHero } from "@/components/sections/ChapterHero";
import { StatBand } from "@/components/sections/StatBand";
import { ClimateStrategy } from "@/components/sections/environment/ClimateStrategy";
import { EmissionsSection } from "@/components/sections/environment/EmissionsSection";
import { EnergySection } from "@/components/sections/environment/EnergySection";
import { WaterSection } from "@/components/sections/environment/WaterSection";
import { WasteSection } from "@/components/sections/environment/WasteSection";
import { TargetsSection } from "@/components/sections/environment/TargetsSection";
import { EnvKpiTable } from "@/components/sections/environment/EnvKpiTable";
import { CTABand } from "@/components/sections/CTABand";
import { ENV_KEY_METRICS } from "@/data/emissions";

/**
 * Environment — the quality-bar chapter (blueprint §2.6, M3).
 * Chapter Pattern: hero → stat band → strategy → deep-dives → targets →
 * KPIs → cross-link. Pillar green is semantic throughout.
 */
export default function EnvironmentPage() {
  return (
    <>
      <ChapterHero
        pillar="environment"
        overline="Our environmental footprint"
        title="Caring for the planet, by the numbers."
        lead="Guided by science-based decarbonization, we're cutting emissions, shifting to renewables, and managing water and waste with the same operational discipline we bring to healthcare."
        quote={{
          text: "Our environmental commitments are grounded in the belief that responsible operations are essential to shaping a more sustainable and resilient future for our stakeholders.",
          name: "Ganesh Pandit",
          role: "Senior Vice President — Global Internal Audit & Sustainability",
        }}
        sdgs={["SDG 6 · Clean Water", "SDG 7 · Clean Energy", "SDG 12 · Responsible Consumption", "SDG 13 · Climate Action"]}
        topics={["Climate change", "Energy management", "Water & waste management"]}
      />
      <StatBand metrics={ENV_KEY_METRICS} ariaLabel="Environment key highlights" />
      <ClimateStrategy />
      <EmissionsSection />
      <EnergySection />
      <WaterSection />
      <WasteSection />
      <TargetsSection />
      <EnvKpiTable />
      <CTABand
        title={
          <>
            The planet is one pillar. <span className="text-brand-mint">Meet our people.</span>
          </>
        }
        lead="Continue to the Social chapter — 38,754 people, five geographies, one culture of care."
        action={{ label: "Continue to Social", to: "/social" }}
        secondaryAction={{ label: "Download the Report", to: "/downloads" }}
      />
    </>
  );
}
