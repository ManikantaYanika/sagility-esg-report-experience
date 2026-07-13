import { motion } from "framer-motion";
import { EASE_SETTLE } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * Bullet — target-vs-actual progress rows (SBTi performance).
 * Actual fill + target tick; "lower is better" semantics supported
 * (an actual below target renders as ahead-of-plan).
 */
export interface BulletRow {
  label: string;
  actual: number;
  target: number;
  max: number;
  unit: string;
  /** Human verdict, e.g. "8.2% beyond target". */
  verdict: string;
}

interface BulletProps {
  rows: BulletRow[];
  onDark?: boolean;
}

export function Bullet({ rows, onDark = false }: BulletProps) {
  return (
    <div aria-hidden className="space-y-8">
      {rows.map((row) => {
        const actualPct = (row.actual / row.max) * 100;
        const targetPct = (row.target / row.max) * 100;
        const ahead = row.actual <= row.target;
        return (
          <div key={row.label}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className={cn("text-body font-medium", onDark ? "text-white" : "text-ink-strong")}>
                {row.label}
              </p>
              <p
                className={cn(
                  "rounded-full px-3 py-0.5 text-body-s font-medium",
                  ahead
                    ? onDark
                      ? "bg-brand-mint/15 text-brand-mint"
                      : "bg-brand-mintTint text-brand-tealMid"
                    : "bg-pillar-social/10 text-pillar-socialDeep",
                )}
              >
                {row.verdict}
              </p>
            </div>
            <div
              className={cn(
                "relative mt-3 h-5 w-full overflow-hidden rounded-sm",
                onDark ? "bg-white/10" : "bg-neutral-100",
              )}
            >
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, ease: EASE_SETTLE }}
                style={{ width: `${actualPct}%` }}
                className={cn("h-full origin-left", onDark ? "bg-brand-mint" : "bg-pillar-environment")}
              />
              {/* Target tick */}
              <span
                className={cn(
                  "absolute top-0 h-full w-0.5",
                  onDark ? "bg-white" : "bg-ink-strong",
                )}
                style={{ left: `${targetPct}%` }}
              />
            </div>
            <div
              className={cn(
                "mt-1.5 flex justify-between text-body-s tabular-nums",
                onDark ? "text-white/60" : "text-neutral-500",
              )}
            >
              <span>
                Actual: {row.actual.toLocaleString()} {row.unit}
              </span>
              <span>
                Target: {row.target.toLocaleString()} {row.unit}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
