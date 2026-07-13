import { cn } from "@/lib/cn";
import { useCountUp } from "@/hooks/useCountUp";
import { DeltaChip } from "@/components/primitives/DeltaChip";

/**
 * Stat — KPI tile (design-system §6.2).
 * Poppins Bold numeral, optional count-up (once, 50% in view), pillar color,
 * optional delta + source/context notes. Non-numeric values render static.
 */
interface StatProps {
  value: number | string;
  /** Rendered before/after the numeral, e.g. "₹" / "%", "tCO₂e". */
  prefix?: string;
  suffix?: string;
  label: string;
  size?: "s" | "m" | "l";
  pillar?: "environment" | "social" | "governance";
  /** Signed YoY percent; direction that counts as good. */
  delta?: number;
  deltaGoodWhen?: "up" | "down";
  /** Report source, rendered as a footnote line (data governance, blueprint §9). */
  sourceNote?: string;
  /** Decimal places for animated values. */
  decimals?: number;
  countUp?: boolean;
  onDark?: boolean;
  className?: string;
}

const sizeClass = { s: "text-stat-s", m: "text-stat-m", l: "text-stat-l" } as const;

const pillarText = {
  environment: "text-pillar-environmentDeep",
  social: "text-pillar-socialDeep",
  governance: "text-pillar-governanceDeep",
} as const;

export function Stat({
  value,
  prefix,
  suffix,
  label,
  size = "m",
  pillar,
  delta,
  deltaGoodWhen = "up",
  sourceNote,
  decimals = 0,
  countUp = true,
  onDark = false,
  className,
}: StatProps) {
  const numeric = typeof value === "number";
  const { ref, value: animated } = useCountUp(numeric ? value : 0);

  const display = numeric
    ? (countUp ? animated : value).toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: decimals,
      })
    : value;

  return (
    <div ref={ref as never} className={cn("flex flex-col gap-1", className)}>
      <p
        className={cn(
          "font-display",
          sizeClass[size],
          onDark ? "text-brand-mint" : pillar ? pillarText[pillar] : "text-brand-teal",
        )}
      >
        {prefix}
        {display}
        {suffix}
      </p>
      <p className={cn("text-body font-medium", onDark ? "text-white/80" : "text-ink")}>
        {label}
        {delta !== undefined && (
          <DeltaChip value={delta} goodWhen={deltaGoodWhen} className="ml-2 align-middle" />
        )}
      </p>
      {sourceNote && (
        <p className={cn("text-body-s", onDark ? "text-white/50" : "text-neutral-500")}>
          {sourceNote}
        </p>
      )}
    </div>
  );
}
