import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Button } from "@/components/primitives/Button";
import { KpiTable } from "@/components/features/KpiTable";
import { GOV_KPI_TABLE } from "@/data/governance";

/** GovKpiDashboard — chapter scorecard on the shared KpiTable. */
export function GovKpiDashboard() {
  return (
    <section aria-label="Governance KPIs" className="py-section md:py-section-lg" id="kpis">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            overline="Governance KPIs"
            title="Oversight, quantified."
            lead="FY2024–25 governance indicators — board, ethics, security, and supply chain."
            className="mb-0 max-w-xl"
          />
          <Button variant="tertiary" to="/esg-overview" className="mb-2">
            Full ESG Scorecard
          </Button>
        </div>
        <div className="mt-10">
          <KpiTable
            metrics={GOV_KPI_TABLE}
            pillar="governance"
            caption="Governance key performance indicators, FY2024–25 with year-over-year change"
          />
        </div>
      </Container>
    </section>
  );
}
