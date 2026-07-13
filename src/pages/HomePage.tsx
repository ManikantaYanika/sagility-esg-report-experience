import { HomeHero } from "@/components/sections/home/HomeHero";
import { CompanyOverview } from "@/components/sections/home/CompanyOverview";
import { KeyNumbers } from "@/components/sections/home/KeyNumbers";
import { PillarOverview } from "@/components/sections/home/PillarOverview";
import { CommitmentStrip } from "@/components/sections/home/CommitmentStrip";
import { LeadershipQuote } from "@/components/sections/home/LeadershipQuote";
import { HighlightsGrid } from "@/components/sections/home/HighlightsGrid";
import { TimelineTeaser } from "@/components/sections/home/TimelineTeaser";
import { ReportDownload } from "@/components/sections/home/ReportDownload";
import { CTABand } from "@/components/sections/CTABand";

/**
 * Home — blueprint §2.1.
 * Section order tells one story: who we are → what we achieved →
 * how it's structured (E/S/G) → what we've committed to → who leads it →
 * proof (highlights) → journey → the report itself → act.
 */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <CompanyOverview />
      <KeyNumbers />
      <PillarOverview />
      <CommitmentStrip />
      <LeadershipQuote />
      <HighlightsGrid />
      <TimelineTeaser />
      <ReportDownload />
      <CTABand
        title={
          <>
            See how progress gets <span className="text-brand-mint">empowered.</span>
          </>
        }
        lead="Explore our ESG performance in depth, or take the full assured report with you."
        action={{ label: "View the ESG Scorecard", to: "/esg-overview" }}
        secondaryAction={{ label: "Download the Report", to: "/downloads" }}
      />
    </>
  );
}
