import type { ReactNode } from "react";
import { Container } from "@/components/primitives/Container";
import { Button } from "@/components/primitives/Button";
import { WaveLines } from "@/components/sections/home/WaveLines";
import { cn } from "@/lib/cn";

/**
 * CTABand — full-width pre-footer call to action (design-system §5.3).
 * Dark teal surface; photographic background arrives with page content phases.
 */
interface CTABandProps {
  title: ReactNode;
  lead?: string;
  action: { label: string; to: string };
  secondaryAction?: { label: string; to: string };
  className?: string;
}

export function CTABand({ title, lead, action, secondaryAction, className }: CTABandProps) {
  return (
    <section className={cn("relative overflow-hidden bg-brand-teal py-16 md:py-24", className)}>
      <WaveLines className="absolute inset-0 opacity-40" />
      <Container className="relative flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2 className="font-display text-h2 text-white">{title}</h2>
          {lead && <p className="mt-3 text-body-l text-white/80">{lead}</p>}
        </div>
        <div className="flex shrink-0 flex-wrap gap-4">
          <Button variant="primaryOnDark" to={action.to}>
            {action.label}
          </Button>
          {secondaryAction && (
            <Button
              variant="secondary"
              to={secondaryAction.to}
              className="border-white/60 text-white hover:bg-white/10"
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}
