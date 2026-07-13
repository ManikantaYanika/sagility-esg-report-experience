import { motion, useScroll, useSpring } from "framer-motion";
import { useLocation } from "react-router-dom";
import { pillarForPath } from "@/data/nav";
import { cn } from "@/lib/cn";

/**
 * ScrollProgressBar — thin reading-progress bar under the header,
 * colored by the active pillar (design-system §6.3 signature).
 */
const pillarBg = {
  environment: "bg-pillar-environment",
  social: "bg-pillar-social",
  governance: "bg-pillar-governance",
  brand: "bg-brand-mint",
} as const;

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const pillar = pillarForPath(useLocation().pathname);

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className={cn("fixed inset-x-0 top-0 z-[55] h-0.5 origin-left", pillarBg[pillar])}
    />
  );
}
