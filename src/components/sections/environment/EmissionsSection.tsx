import { useState } from "react";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { ChartFigure } from "@/components/features/charts/ChartFigure";
import { BarsCompare } from "@/components/features/charts/BarsCompare";
import { Donut } from "@/components/features/charts/Donut";
import { EMISSIONS_BY_SCOPE, SCOPE3_CATEGORIES, S12_SOURCES } from "@/data/emissions";
import { cn } from "@/lib/cn";

/**
 * EmissionsSection — the carbon inventory (blueprint §2.6.6).
 * Location/market toggle mirrors the report's dual GHG Protocol method.
 */
export function EmissionsSection() {
  const [method, setMethod] = useState<"locationBased" | "marketBased">("marketBased");
  const rows = EMISSIONS_BY_SCOPE[method];

  return (
    <section aria-label="Carbon emissions" className="bg-surface py-section md:py-section-lg" id="emissions">
      <Container>
        <SectionHeader
          overline="Carbon emissions"
          title="A shrinking footprint, measured both ways."
          lead="Reported under the GHG Protocol with an operational-control boundary — location- and market-based, with Scope 3 estimated through a hybrid spend-and-activity approach."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <ChartFigure
            title="GHG emissions by scope, YoY"
            summary="Scope 1 fell 42.7% and Scope 3 fell 10.3% in FY2024–25."
            source={EMISSIONS_BY_SCOPE.source}
            table={{
              caption: "GHG emissions by scope, FY2023–24 vs FY2024–25 (tCO₂e)",
              headers: ["Scope", "FY2023–24", "FY2024–25", "Change"],
              rows: rows.map((r) => [r.scope, r.fy24.toLocaleString(), r.fy25.toLocaleString(), `${r.deltaPct}%`]),
            }}
          >
            <div
              role="group"
              aria-label="Emissions accounting method"
              className="mb-6 inline-flex rounded-btn border border-neutral-100 p-1"
            >
              {(
                [
                  ["marketBased", "Market-based"],
                  ["locationBased", "Location-based"],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  aria-pressed={method === key}
                  onClick={() => setMethod(key)}
                  className={cn(
                    "rounded-[0.375rem] px-4 py-1.5 text-body-s font-medium transition-colors",
                    method === key ? "bg-brand-teal text-white" : "text-ink hover:text-brand-tealMid",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
            <BarsCompare
              rows={rows.map((r) => ({
                label: r.scope,
                a: r.fy24,
                b: r.fy25,
                note: `${r.deltaPct > 0 ? "+" : ""}${r.deltaPct}%`,
                noteGood: r.deltaPct < 0,
              }))}
              seriesLabels={["FY2023–24", "FY2024–25"]}
            />
            <p className="mt-4 text-body-s text-neutral-500">{EMISSIONS_BY_SCOPE.contextNote}</p>
          </ChartFigure>

          <div className="flex flex-col gap-6">
            <ChartFigure
              title="Scope 3 by category, FY2024–25"
              summary="Three categories — purchased goods, commuting, and fuel & energy — account for ~91% of Scope 3."
              source={SCOPE3_CATEGORIES.source}
              table={{
                caption: "Scope 3 emissions by category, FY2024–25",
                headers: ["Category", "tCO₂e", "Share"],
                rows: SCOPE3_CATEGORIES.slices.map((s) => [s.label, s.value.toLocaleString(), `${s.pct}%`]),
              }}
            >
              <Donut
                slices={[...SCOPE3_CATEGORIES.slices]}
                unit={SCOPE3_CATEGORIES.unit}
                center={{ value: "33,165", label: "tCO₂e total" }}
              />
            </ChartFigure>

            <ChartFigure
              title="Scope 1 & 2 sources, FY2024–25"
              summary="Purchased electricity drives 94.2% of operational emissions — which is why renewables lead our roadmap."
              source={S12_SOURCES.source}
              table={{
                caption: "Scope 1 and 2 emission sources, FY2024–25",
                headers: ["Source", "Share"],
                rows: S12_SOURCES.slices.map((s) => [s.label, `${s.pct}%`]),
              }}
            >
              <Donut slices={[...S12_SOURCES.slices]} unit={S12_SOURCES.unit} />
            </ChartFigure>
          </div>
        </div>
      </Container>
    </section>
  );
}
