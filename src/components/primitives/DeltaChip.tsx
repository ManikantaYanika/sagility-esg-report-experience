import { cn } from "@/lib/cn";

/**
 * DeltaChip — YoY change indicator for KPI records.
 * Color is never the only carrier: glyph + sr-only text accompany it (a11y §16).
 * `goodWhen` lets metrics where "down is good" (emissions) read correctly.
 */
interface DeltaChipProps {
  /** Signed percent change, e.g. -42.7 */
  value: number;
  goodWhen?: "up" | "down";
  className?: string;
}

export function DeltaChip({ value, goodWhen = "up", className }: DeltaChipProps) {
  const up = value > 0;
  const good = (up && goodWhen === "up") || (!up && goodWhen === "down");
  const magnitude = Math.abs(value).toLocaleString("en-US", { maximumFractionDigits: 1 });

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-body-s font-medium",
        good ? "bg-brand-mintTint text-brand-tealMid" : "bg-pillar-social/10 text-pillar-socialDeep",
        className,
      )}
    >
      <span aria-hidden>{up ? "▲" : "▼"}</span>
      {magnitude}%
      <span className="sr-only">
        {up ? "increase" : "decrease"} year over year{good ? " (improvement)" : ""}
      </span>
    </span>
  );
}
