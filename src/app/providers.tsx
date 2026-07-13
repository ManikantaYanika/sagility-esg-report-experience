import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";

/**
 * Global providers.
 * MotionConfig `reducedMotion="user"` makes every Framer Motion animation
 * respect prefers-reduced-motion automatically (a11y strategy, blueprint §16).
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
