import { motion } from "framer-motion";

/**
 * AmbientParticles — soft floating dots for the Home hero (healthcare-inspired
 * "motes of light"). Decorative, aria-hidden, transform/opacity only (GPU),
 * paused under prefers-reduced-motion via the global MotionConfig.
 * Positions are fixed (no per-render randomness) to avoid any layout shift.
 */
const DOTS = [
  { left: 8, top: 22, size: 5, op: 0.35, dur: 11, delay: 0 },
  { left: 18, top: 68, size: 3, op: 0.25, dur: 13, delay: 1.5 },
  { left: 27, top: 40, size: 4, op: 0.3, dur: 12, delay: 0.8 },
  { left: 38, top: 78, size: 6, op: 0.22, dur: 15, delay: 2.2 },
  { left: 46, top: 30, size: 3, op: 0.28, dur: 10, delay: 1.1 },
  { left: 57, top: 60, size: 5, op: 0.3, dur: 14, delay: 0.4 },
  { left: 66, top: 24, size: 4, op: 0.26, dur: 12, delay: 1.9 },
  { left: 74, top: 72, size: 3, op: 0.24, dur: 13, delay: 0.6 },
  { left: 82, top: 44, size: 6, op: 0.2, dur: 16, delay: 2.6 },
  { left: 90, top: 64, size: 4, op: 0.28, dur: 11, delay: 1.3 },
  { left: 33, top: 14, size: 3, op: 0.22, dur: 14, delay: 2.0 },
  { left: 62, top: 84, size: 4, op: 0.24, dur: 12, delay: 0.9 },
];

export function AmbientParticles({ className }: { className?: string }) {
  return (
    <div aria-hidden className={className}>
      {DOTS.map((d, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-brand-mint"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            willChange: "transform, opacity",
          }}
          initial={{ opacity: 0 }}
          animate={{ y: [0, -22, 0], opacity: [0, d.op, 0] }}
          transition={{ duration: d.dur, repeat: Infinity, ease: "easeInOut", delay: d.delay }}
        />
      ))}
    </div>
  );
}
