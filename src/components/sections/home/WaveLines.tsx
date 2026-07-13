import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * WaveLines — ambient background motif (design-system §8).
 * Two layers, both decorative and aria-hidden:
 *   1. Slow drifting mesh glows — soft pillar-tinted radial gradients that
 *      give the dark surfaces depth (Apple/Deloitte-style ambient light).
 *   2. The signature thin wave lines, echoing Sagility's brand pattern.
 * All motion is transform/opacity only (GPU) and pauses under
 * prefers-reduced-motion via the global MotionConfig.
 */
type WavePillar = "environment" | "social" | "governance" | "brand";

const GLOW: Record<WavePillar, [string, string]> = {
  environment: ["#7BB52A", "#00CBA1"],
  social: ["#E46830", "#00CBA1"],
  governance: ["#228AC2", "#00CBA1"],
  brand: ["#00CBA1", "#00707E"],
};

interface WaveLinesProps {
  className?: string;
  /** Tints the ambient glow to the host chapter's pillar. */
  pillar?: WavePillar;
  /** Hide the soft glow layer (e.g. very small surfaces). */
  glow?: boolean;
}

export function WaveLines({ className, pillar = "brand", glow = true }: WaveLinesProps) {
  const [c1, c2] = GLOW[pillar];
  const paths = [
    "M-100 380 C 240 300, 520 470, 860 380 S 1480 290, 1640 400",
    "M-100 430 C 260 350, 540 520, 880 430 S 1500 340, 1660 450",
    "M-100 490 C 280 410, 560 570, 900 480 S 1520 400, 1680 500",
    "M-100 250 C 300 190, 620 330, 960 250 S 1540 170, 1700 270",
  ];

  return (
    <div aria-hidden className={cn("overflow-hidden", className)}>
      {glow && (
        <>
          <motion.div
            className="absolute -left-[12%] -top-[25%] h-[70%] w-[55%] rounded-full blur-2xl"
            style={{ background: `radial-gradient(circle, ${c1}30 0%, transparent 68%)`, willChange: "transform" }}
            animate={{ x: [0, 42, 0], y: [0, 26, 0] }}
            transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-[30%] -right-[10%] h-[75%] w-[60%] rounded-full blur-2xl"
            style={{ background: `radial-gradient(circle, ${c2}28 0%, transparent 68%)`, willChange: "transform" }}
            animate={{ x: [0, -34, 0], y: [0, -22, 0] }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}
      <motion.svg
        viewBox="0 0 1440 700"
        preserveAspectRatio="xMidYMid slice"
        className="relative h-full w-full"
        initial={{ y: 0 }}
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      >
        {paths.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke={i % 2 === 0 ? "#00CBA1" : "#FFFFFF"}
            strokeOpacity={i % 2 === 0 ? 0.14 : 0.08}
            strokeWidth={1.25}
          />
        ))}
      </motion.svg>
    </div>
  );
}
