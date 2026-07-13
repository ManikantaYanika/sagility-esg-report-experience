import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Card — design-system §6.2.
 * `surface`: static container. `interactive`: hover lift + border tint
 * (wrap in a Link/button at the usage site; the card itself stays semantic-free).
 */
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "surface" | "interactive";
  /** Pillar tint on hover border (interactive cards inside chapters). */
  pillar?: "environment" | "social" | "governance";
  children: ReactNode;
}

const pillarBorder = {
  environment: "hover:border-pillar-environment",
  social: "hover:border-pillar-social",
  governance: "hover:border-pillar-governance",
} as const;

export function Card({ variant = "surface", pillar, className, children, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-card border border-neutral-100 bg-white p-6 md:p-8",
        variant === "interactive" &&
          "group transition-all duration-300 ease-settle hover:-translate-y-1.5 hover:shadow-liftLg",
        variant === "interactive" && (pillar ? pillarBorder[pillar] : "hover:border-brand-mint"),
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
