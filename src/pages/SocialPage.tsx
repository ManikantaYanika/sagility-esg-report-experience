import { ChapterHero } from "@/components/sections/ChapterHero";
import { StatBand } from "@/components/sections/StatBand";
import { PeopleSection } from "@/components/sections/social/PeopleSection";
import { DeiSection } from "@/components/sections/social/DeiSection";
import { LearningSection } from "@/components/sections/social/LearningSection";
import { WellbeingSection } from "@/components/sections/social/WellbeingSection";
import { CommunitySection } from "@/components/sections/social/CommunitySection";
import { SocialAwards } from "@/components/sections/social/SocialAwards";
import { SocialKpiDashboard } from "@/components/sections/social/SocialKpiDashboard";
import { CTABand } from "@/components/sections/CTABand";
import { SOCIAL_KEY_METRICS } from "@/data/social";

/**
 * Social — blueprint §2.7. Chapter Pattern with pillar orange.
 * Narrative: who our people are → how we include them → how we grow
 * them → how we care for them → how they serve communities → proof.
 */
export default function SocialPage() {
  return (
    <>
      <ChapterHero
        pillar="social"
        overline="Strengthening people & culture"
        title="Care is our business model."
        lead="A people-first healthcare company across five geographies — where inclusion, wellbeing, and growth are operating principles, not aspirations."
        quote={{
          text: "With a diverse and empowered workforce, we continue to nurture an environment where every individual can thrive, contribute, and shape the future of our organization.",
          name: "Tina Vas",
          role: "Chief Human Resources Officer",
        }}
        sdgs={["SDG 3 · Good Health", "SDG 4 · Quality Education", "SDG 5 · Gender Equality", "SDG 8 · Decent Work", "SDG 10 · Reduced Inequalities"]}
        topics={["Human capital", "Health, safety & wellbeing", "DEI", "Employee engagement", "Human rights", "CSR"]}
      />
      <StatBand metrics={SOCIAL_KEY_METRICS} ariaLabel="Social key highlights" />
      <PeopleSection />
      <DeiSection />
      <LearningSection />
      <WellbeingSection />
      <CommunitySection />
      <SocialAwards />
      <SocialKpiDashboard />
      <CTABand
        title={
          <>
            People, empowered. <span className="text-brand-mint">Now see how we govern.</span>
          </>
        }
        lead="Continue to Governance — board oversight, ethics, and zero data breaches, two years running."
        action={{ label: "Continue to Governance", to: "/governance" }}
        secondaryAction={{ label: "Download the Report", to: "/downloads" }}
      />
    </>
  );
}
