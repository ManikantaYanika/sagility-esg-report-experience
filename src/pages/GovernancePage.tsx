import { ChapterHero } from "@/components/sections/ChapterHero";
import { StatBand } from "@/components/sections/StatBand";
import { FrameworkSection } from "@/components/sections/governance/FrameworkSection";
import { BoardSection } from "@/components/sections/governance/BoardSection";
import { EthicsSection } from "@/components/sections/governance/EthicsSection";
import { RiskSection } from "@/components/sections/governance/RiskSection";
import { CyberSection } from "@/components/sections/governance/CyberSection";
import { ProcurementSection } from "@/components/sections/governance/ProcurementSection";
import { GovKpiDashboard } from "@/components/sections/governance/GovKpiDashboard";
import { PoliciesSection } from "@/components/sections/governance/PoliciesSection";
import { CTABand } from "@/components/sections/CTABand";
import { GOV_KEY_METRICS } from "@/data/governance";

/**
 * Governance — blueprint §2.9. Chapter Pattern with pillar blue.
 * Narrative: how we're structured → who oversees it → how we behave →
 * what could go wrong (and the plan) → digital trust → the supply chain
 * → the proof (KPIs, policies, certifications).
 */
export default function GovernancePage() {
  return (
    <>
      <ChapterHero
        pillar="governance"
        overline="Responsible business"
        title="Trust, structurally enforced."
        lead="Transparency, ethical conduct, and accountability — through robust governance structures, active Board oversight, and a policy framework built for healthcare's strictest regulatory environment."
        quote={{
          text: "Our governance framework is designed not only to ensure compliance but to anticipate emerging risks, strengthen accountability, and embed sustainability considerations into decision-making.",
          name: "Board of Directors",
          role: "Responsible Business, SR FY2024–25",
        }}
        sdgs={["SDG 8 · Decent Work", "SDG 16 · Strong Institutions", "SDG 17 · Partnerships"]}
        topics={["Corporate governance", "Cybersecurity & data privacy", "Compliance", "Ethics & integrity", "Risk management", "Responsible procurement", "Grievance redressal"]}
      />
      <StatBand metrics={GOV_KEY_METRICS} ariaLabel="Governance key highlights" />
      <FrameworkSection />
      <BoardSection />
      <EthicsSection />
      <RiskSection />
      <CyberSection />
      <ProcurementSection />
      <GovKpiDashboard />
      <PoliciesSection />
      <CTABand
        title={
          <>
            Three pillars, one record. <span className="text-brand-mint">See it whole.</span>
          </>
        }
        lead="The complete cross-pillar scorecard — every KPI, FY24 vs FY25, independently assured."
        action={{ label: "View the ESG Scorecard", to: "/esg-overview" }}
        secondaryAction={{ label: "Download the Report", to: "/downloads" }}
      />
    </>
  );
}
