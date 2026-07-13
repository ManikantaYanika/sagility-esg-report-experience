import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * Count-up for Stat tiles — 1.2s, fires once at 50% visibility (blueprint §8).
 * Under reduced motion the final value renders immediately.
 * Returns [ref to attach, current display value].
 */
export function useCountUp(target: number, durationMs = 1200) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / durationMs, 1);
      // ease-out cubic — settles, never overshoots
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, target, durationMs]);

  return { ref, value } as const;
}
