import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Button } from "@/components/primitives/Button";
import { KpiTable } from "@/components/features/KpiTable";
import { SOCIAL_KPI_TABLE } from "@/data/social";

/** SocialKpiDashboard — chapter scorecard on the shared KpiTable. */
export function SocialKpiDashboard() {
  return (
    <section aria-label="Social KPIs" className="py-section md:py-section-lg" id="kpis">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            overline="Social KPIs"
            title="People performance, in one place."
            lead="FY2024–25 headline indicators with the context that makes them honest."
            className="mb-0 max-w-xl"
          />
          <Button variant="tertiary" to="/esg-overview" className="mb-2">
            Full ESG Scorecard
          </Button>
        </div>
        <div className="mt-10">
          <KpiTable
            metrics={SOCIAL_KPI_TABLE}
            pillar="social"
            caption="Social key performance indicators, FY2024–25 with year-over-year change"
          />
        </div>
      </Container>
    </section>
  );
}
