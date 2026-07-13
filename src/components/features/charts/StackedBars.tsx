import { motion } from "framer-motion";
import { EASE_SETTLE } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * StackedBars — horizontal 100%-width stacked rows (one per period),
 * for composition-over-time (energy mix, water stress zones).
 */
export interface StackedRow {
  label: string;
  segments: { name: string; value: number; pctLabel?: string }[];
}

interface StackedBarsProps {
  rows: StackedRow[];
  /** Segment colors by index — defaults to environment palette. */
  colors?: string[];
  format?: (v: number) => string;
}

const DEFAULT_COLORS = ["#7BB52A", "#074954", "#8DC63F", "#B9B9B9"];

export function StackedBars({ rows, colors = DEFAULT_COLORS, format }: StackedBarsProps) {
  const fmt = format ?? ((v: number) => v.toLocaleString("en-US"));
  const segmentNames = rows[0]?.segments.map((s) => s.name) ?? [];

  return (
    <div>
      <div aria-hidden className="flex flex-wrap gap-x-5 gap-y-2 text-body-s text-neutral-500">
        {segmentNames.map((name, i) => (
          <span key={name} className="inline-flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-sm"
              style={{ backgroundColor: colors[i % colors.length] }}
            />
            {name}
          </span>
        ))}
      </div>

      <div aria-hidden className="mt-5 space-y-7">
        {rows.map((row) => {
          const total = row.segments.reduce((sum, s) => sum + s.value, 0);
          return (
            <div key={row.label}>
              <p className="text-body font-medium text-ink-strong">{row.label}</p>
              <div className="mt-2 flex h-6 w-full overflow-hidden rounded-sm">
                {row.segments.map((seg, i) => (
                  <motion.div
                    key={seg.name}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.6, ease: EASE_SETTLE, delay: i * 0.08 }}
                    style={{
                      width: `${(seg.value / total) * 100}%`,
                      backgroundColor: colors[i % colors.length],
                    }}
                    className={cn("origin-left", seg.value === 0 && "hidden")}
                  />
                ))}
              </div>
              <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-body-s tabular-nums text-neutral-500">
                {row.segments.map(
                  (seg) =>
                    seg.value > 0 && (
                      <span key={seg.name}>
                        {seg.name}: {fmt(seg.value)}
                        {seg.pctLabel ? ` (${seg.pctLabel})` : ""}
                      </span>
                    ),
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
