import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * SectionHeader — overline + title + optional lead (design-system §6).
 * The report's typographic voice: light display type, emphasis via
 * a single bolded word inside `title` at the usage site if needed.
 * Heading level is configurable (`as`) so hero-less pages keep one h1.
 */
interface SectionHeaderProps {
  overline?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "start" | "center";
  /** Render on dark surfaces (teal heroes, CTA bands). */
  onDark?: boolean;
  /**
   * Heading level for the title. Defaults to h2 (section titles).
   * Set to "h1" on nested-route pages whose primary page heading lives here
   * (no teal hero) so the document keeps exactly one h1.
   */
  as?: "h1" | "h2";
  className?: string;
}

export function SectionHeader({
  overline,
  title,
  lead,
  align = "start",
  onDark = false,
  as: TitleTag = "h2",
  className,
}: SectionHeaderProps) {
  return (
    <header
      className={cn(
        "mb-10 md:mb-14",
        align === "center" && "mx-auto max-w-measure text-center",
        className,
      )}
    >
      {overline && (
        <p
          className={cn(
            "mb-3 text-overline uppercase",
            onDark ? "text-brand-mint" : "text-brand-tealMid",
          )}
        >
          {overline}
        </p>
      )}
      <TitleTag
        className={cn(
          "font-display text-h2 md:text-[2.5rem] md:leading-[1.2]",
          onDark ? "text-white" : "text-ink-strong",
        )}
      >
        {title}
      </TitleTag>
      {lead && (
        <p className={cn("mt-4 text-body-l", onDark ? "text-white/80" : "text-neutral-500")}>
          {lead}
        </p>
      )}
    </header>
  );
}
