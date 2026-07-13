import { useState } from "react";
import { motion } from "framer-motion";
import { EASE_SETTLE } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * Donut — proportional composition chart with interactive legend.
 * Slices stagger in; hovering/focusing a legend row highlights its slice.
 * All values remain visible in the legend (no hover-only information).
 */
export interface DonutSlice {
  label: string;
  value: number;
  pct: number;
}

interface DonutProps {
  slices: DonutSlice[];
  unit: string;
  /** Center label, e.g. a total. */
  center?: { value: string; label: string };
  format?: (v: number) => string;
  /** Slice palette override (defaults to the environment-first palette). */
  colors?: string[];
}

/** Default chart palette — environment-first (design-system §2.5). */
const DEFAULT_COLORS = ["#7BB52A", "#00707E", "#8DC63F", "#074954", "#00CBA1", "#B9B9B9"];

function arcPath(cx: number, cy: number, rOuter: number, rInner: number, a0: number, a1: number) {
  const p = (r: number, a: number) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  const [x0, y0] = p(rOuter, a0);
  const [x1, y1] = p(rOuter, a1);
  const [x2, y2] = p(rInner, a1);
  const [x3, y3] = p(rInner, a0);
  const large = a1 - a0 > Math.PI ? 1 : 0;
  return `M${x0} ${y0} A${rOuter} ${rOuter} 0 ${large} 1 ${x1} ${y1} L${x2} ${y2} A${rInner} ${rInner} 0 ${large} 0 ${x3} ${y3} Z`;
}

export function Donut({ slices, unit, center, format, colors }: DonutProps) {
  const COLORS = colors ?? DEFAULT_COLORS;
  const [active, setActive] = useState<number | null>(null);
  const total = slices.reduce((sum, s) => sum + s.value, 0);
  const fmt = format ?? ((v: number) => v.toLocaleString("en-US"));

  let angle = -Math.PI / 2;
  const gap = 0.02;
  const arcs = slices.map((s, i) => {
    const sweep = (s.value / total) * Math.PI * 2 - gap;
    const d = arcPath(100, 100, 88, 56, angle, angle + Math.max(sweep, 0.01));
    angle += sweep + gap;
    return { d, i };
  });

  return (
    <div className="grid items-center gap-8 sm:grid-cols-2">
      <svg viewBox="0 0 200 200" className="mx-auto w-full max-w-[240px]" aria-hidden>
        {arcs.map(({ d, i }) => (
          <motion.path
            key={i}
            d={d}
            fill={COLORS[i % COLORS.length]}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.45, ease: EASE_SETTLE, delay: i * 0.07 }}
            style={{ transformOrigin: "100px 100px" }}
            className={cn(
              "transition-opacity duration-150",
              active !== null && active !== i && "opacity-30",
            )}
          />
        ))}
        {center && (
          <>
            <text x="100" y="96" textAnchor="middle" className="fill-ink-strong font-display" fontSize="22" fontWeight="700">
              {center.value}
            </text>
            <text x="100" y="114" textAnchor="middle" className="fill-neutral-500" fontSize="9">
              {center.label}
            </text>
          </>
        )}
      </svg>

      <ul className="space-y-2" aria-label={`Breakdown (${unit})`}>
        {slices.map((s, i) => (
          <li key={s.label}>
            <button
              type="button"
              className={cn(
                "flex w-full items-center gap-3 rounded-card px-2 py-1.5 text-left transition-colors",
                active === i ? "bg-surface" : "hover:bg-surface",
              )}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
            >
              <span
                aria-hidden
                className="h-3 w-3 shrink-0 rounded-sm"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
              />
              <span className="flex-1 text-body-s text-ink">{s.label}</span>
              <span className="text-body-s font-semibold tabular-nums text-ink-strong">
                {s.pct}%
              </span>
              <span className="w-20 text-right text-body-s tabular-nums text-neutral-500">
                {fmt(s.value)}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
