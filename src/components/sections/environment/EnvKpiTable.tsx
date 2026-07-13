import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Button } from "@/components/primitives/Button";
import { KpiTable } from "@/components/features/KpiTable";
import { ENV_KPI_TABLE } from "@/data/emissions";

/** EnvKpiTable — chapter scorecard on the shared KpiTable feature. */
export function EnvKpiTable() {
  return (
    <section aria-label="Environmental KPIs" className="bg-surface py-section md:py-section-lg" id="kpis">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            overline="Environmental KPIs"
            title="The numbers, in one place."
            lead="FY2024–25 headline indicators. The full cross-pillar scorecard lives on the ESG Scorecard page."
            className="mb-0 max-w-xl"
          />
          <Button variant="tertiary" to="/esg-overview" className="mb-2">
            Full ESG Scorecard
          </Button>
        </div>
        <div className="mt-10">
          <KpiTable
            metrics={ENV_KPI_TABLE}
            pillar="environment"
            caption="Environmental key performance indicators, FY2024–25 with year-over-year change"
          />
        </div>
      </Container>
    </section>
  );
}
