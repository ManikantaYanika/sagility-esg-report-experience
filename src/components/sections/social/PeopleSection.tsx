import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { ChartFigure } from "@/components/features/charts/ChartFigure";
import { Donut } from "@/components/features/charts/Donut";
import { StackedBars } from "@/components/features/charts/StackedBars";
import { WORKFORCE_BY_GEO, WORKFORCE_GENDER } from "@/data/social";

/** Social chart palette — pillar-first (design-system §2.5). */
const SOCIAL_COLORS = ["#D57143", "#074954", "#E46830", "#00707E", "#B9B9B9", "#BFF1E6"];

/**
 * PeopleSection — global workforce overview (blueprint §2.7.4 intro).
 */
export function PeopleSection() {
  return (
    <section aria-label="Our people" className="py-section md:py-section-lg" id="people">
      <Container>
        <SectionHeader
          overline="Our people"
          title={
            <>
              38,754 people. <span className="font-normal text-pillar-socialDeep">One culture of care.</span>
            </>
          }
          lead="Across India, the Philippines, Jamaica, the USA and Colombia, our people strategy is anchored in care, trust and empowerment — spanning the full employee lifecycle from onboarding to leadership."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <ChartFigure
            title="Workforce by geography, FY2024–25"
            summary="India and the Philippines host 85% of our global team; Colombia joined as our fifth geography this year."
            source={WORKFORCE_BY_GEO.source}
            table={{
              caption: "Employees by geography, FY2024–25",
              headers: ["Geography", "Employees", "Share"],
              rows: WORKFORCE_BY_GEO.slices.map((s) => [s.label, s.value.toLocaleString(), `${s.pct}%`]),
            }}
          >
            <Donut
              slices={[...WORKFORCE_BY_GEO.slices]}
              unit={WORKFORCE_BY_GEO.unit}
              center={{ value: "38,754", label: "employees" }}
              colors={SOCIAL_COLORS}
            />
          </ChartFigure>

          <ChartFigure
            title="Gender composition"
            summary="Women are 61% of the workforce — and 64.7% of the 24,719 people hired in FY2024–25."
            source={WORKFORCE_GENDER.source}
            table={{
              caption: "Workforce and new-hire gender composition, FY2024–25",
              headers: ["Group", "Women", "Men", "Other"],
              rows: WORKFORCE_GENDER.rows.map((r) => [
                r.label,
                ...r.segments.map((s) => `${s.value.toLocaleString()} (${s.pctLabel})`),
              ]),
            }}
          >
            <StackedBars
              rows={WORKFORCE_GENDER.rows.map((r) => ({
                label: r.label,
                segments: r.segments.map((s) => ({ ...s })),
              }))}
              colors={["#D57143", "#074954", "#B9B9B9"]}
            />
            <p className="mt-4 text-body-s text-neutral-500">
              352 senior managers — 96.7% — hired from local communities.
            </p>
          </ChartFigure>
        </div>
      </Container>
    </section>
  );
}
