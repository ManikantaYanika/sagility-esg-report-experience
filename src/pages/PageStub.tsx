import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Chip } from "@/components/primitives/Chip";

/**
 * PageStub — Phase 1 placeholder. Replaced page-by-page from Phase 2 onward.
 * Intentionally structural (no placeholder-quality visuals): route identity,
 * breadcrumb, and phase marker only.
 */
interface PageStubProps {
  overline: string;
  title: string;
  lead: string;
  phase: string;
}

export function PageStub({ overline, title, lead, phase }: PageStubProps) {
  return (
    <Container className="py-section">
      <Breadcrumbs />
      <SectionHeader overline={overline} title={title} lead={lead} />
      <Chip variant="tag">Content arrives in {phase}</Chip>
    </Container>
  );
}
