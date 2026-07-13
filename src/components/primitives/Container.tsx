import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Container — layout widths from design-system §5.2.
 * `content` (1280) is the default grid; `bleed` (1440) for full-bleed sections;
 * `measure` (720) for centered section intros.
 */
interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  width?: "content" | "bleed" | "measure";
  children: ReactNode;
}

const widths = {
  content: "max-w-content",
  bleed: "max-w-bleed",
  measure: "max-w-measure",
} as const;

export function Container({ width = "content", className, children, ...rest }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-4 md:px-6", widths[width], className)} {...rest}>
      {children}
    </div>
  );
}
