import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Chip / Tag — design-system §6.
 * `topic`: material-topic chips on chapter heroes (pillar-toned).
 * `tag`: neutral metadata tags (award category, file type).
 * `overline`: eyebrow-style label chip.
 */
interface ChipProps {
  variant?: "topic" | "tag" | "overline";
  pillar?: "environment" | "social" | "governance";
  children: ReactNode;
  className?: string;
}

const pillarTone = {
  environment: "border-pillar-environment/40 bg-pillar-environment/10 text-pillar-environmentDeep",
  social: "border-pillar-social/40 bg-pillar-social/10 text-pillar-socialDeep",
  governance: "border-pillar-governance/40 bg-pillar-governance/10 text-pillar-governanceDeep",
} as const;

export function Chip({ variant = "tag", pillar, children, className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-body-s font-medium",
        variant === "tag" && "border-neutral-100 bg-surface text-neutral-500",
        variant === "topic" && (pillar ? pillarTone[pillar] : "border-brand-mint/40 bg-brand-mintTint/40 text-brand-tealMid"),
        variant === "overline" && "border-transparent bg-brand-teal/5 uppercase tracking-[0.12em] text-overline text-brand-tealMid",
        className,
      )}
    >
      {children}
    </span>
  );
}
