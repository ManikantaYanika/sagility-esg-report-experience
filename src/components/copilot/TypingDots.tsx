import { motion } from "framer-motion";

/** Three-dot "assistant is typing" indicator. Visual only; the panel carries
 *  the screen-reader announcement. Motion pauses under prefers-reduced-motion
 *  via the global MotionConfig. */
export function TypingDots() {
  return (
    <span aria-hidden className="inline-flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-brand-tealMid"
          animate={{ opacity: [0.25, 1, 0.25], y: [0, -2, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
        />
      ))}
    </span>
  );
}
