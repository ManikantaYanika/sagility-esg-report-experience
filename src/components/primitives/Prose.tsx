import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Prose — typographic container for narrative content.
 * Keeps body copy on the approved scale without per-element classes.
 */
export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "max-w-measure text-body text-ink",
        "[&_a]:font-medium [&_a]:text-brand-tealMid [&_a]:underline [&_a]:decoration-brand-mint [&_a]:underline-offset-4 hover:[&_a]:text-brand-teal",
        "[&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-h3 [&_h3]:text-ink-strong",
        "[&_p+p]:mt-4",
        "[&_strong]:font-semibold [&_strong]:text-ink-strong",
        "[&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5",
        className,
      )}
    >
      {children}
    </div>
  );
}
