import { motion } from "framer-motion";
import { EASE_SETTLE } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * BarsCompare — horizontal grouped bars, two series (e.g. FY24 vs FY25).
 * Horizontal orientation stays legible at every breakpoint (blueprint §7).
 * Bars grow on first view; values always visible (no hover dependency).
 */
export interface BarsCompareRow {
  label: string;
  a: number;
  b: number;
  /** Optional annotation shown after the row (e.g. "−42.7%"). */
  note?: string;
  noteGood?: boolean;
}

interface BarsCompareProps {
  rows: BarsCompareRow[];
  seriesLabels: [string, string];
  /** Format for value labels. */
  format?: (v: number) => string;
  /** Pillar accent for the second series (semantic color rule). */
  accent?: "environment" | "social" | "governance";
}

const fmtDefault = (v: number) => v.toLocaleString("en-US");

const ACCENT_BAR = {
  environment: "bg-pillar-environment",
  social: "bg-pillar-social",
  governance: "bg-pillar-governance",
} as const;

const ACCENT_NOTE = {
  environment: "text-pillar-environmentDeep",
  social: "text-pillar-socialDeep",
  governance: "text-pillar-governanceDeep",
} as const;

export function BarsCompare({ rows, seriesLabels, format = fmtDefault, accent = "environment" }: BarsCompareProps) {
  const max = Math.max(...rows.flatMap((r) => [r.a, r.b]));

  return (
    <div>
      <div aria-hidden className="flex gap-5 text-body-s text-neutral-500">
        {seriesLabels[0] && (
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-sm bg-neutral-300" /> {seriesLabels[0]}
          </span>
        )}
        {seriesLabels[1] && (
          <span className="inline-flex items-center gap-2">
            <span className={cn("h-2.5 w-2.5 rounded-sm", ACCENT_BAR[accent])} /> {seriesLabels[1]}
          </span>
        )}
      </div>

      <div aria-hidden className="mt-5 space-y-6">
        {rows.map((row) => (
          <div key={row.label}>
            <div className="flex items-baseline justify-between">
              <p className="text-body font-medium text-ink-strong">{row.label}</p>
              {row.note && (
                <p
                  className={cn(
                    "text-body-s font-medium",
                    row.noteGood ? ACCENT_NOTE[accent] : "text-neutral-500",
                  )}
                >
                  {row.note}
                </p>
              )}
            </div>
            {[row.a, row.b].map((v, i) => (
              seriesLabels[i] === "" ? null : (
              <div key={i} className="mt-1.5 flex items-center gap-3">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.6, ease: EASE_SETTLE, delay: i * 0.1 }}
                  style={{ width: `${(v / max) * 100}%` }}
                  className={cn(
                    "h-4 origin-left rounded-sm",
                    i === 0 ? "bg-neutral-300" : ACCENT_BAR[accent],
                  )}
                />
                <span className="shrink-0 text-body-s tabular-nums text-neutral-500">
                  {format(v)}
                </span>
              </div>
              )
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
