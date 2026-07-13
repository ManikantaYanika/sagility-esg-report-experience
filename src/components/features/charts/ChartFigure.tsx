import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * ChartFigure — accessibility contract for every chart (blueprint §16):
 * a real heading, a plain-language takeaway, the visual, and a
 * <details> data table that doubles as the canonical accessible view.
 */
interface ChartFigureProps {
  title: string;
  /** One-sentence takeaway, rendered visibly under the title. */
  summary: string;
  source: string;
  table: { caption: string; headers: string[]; rows: (string | number)[][] };
  onDark?: boolean;
  children: ReactNode;
  className?: string;
}

export function ChartFigure({
  title,
  summary,
  source,
  table,
  onDark = false,
  children,
  className,
}: ChartFigureProps) {
  return (
    <figure
      className={cn(
        "rounded-card-lg border p-6 md:p-8",
        onDark ? "border-white/15 bg-white/5" : "border-neutral-100 bg-white",
        className,
      )}
    >
      <figcaption>
        <h3 className={cn("font-display text-h4 font-medium", onDark ? "text-white" : "text-ink-strong")}>
          {title}
        </h3>
        <p className={cn("mt-1 text-body-s", onDark ? "text-white/70" : "text-neutral-500")}>
          {summary}
        </p>
      </figcaption>

      <div className="mt-6">{children}</div>

      <details className="mt-5 group">
        <summary
          className={cn(
            "cursor-pointer list-none text-body-s font-medium underline-offset-4 hover:underline",
            onDark ? "text-brand-mint" : "text-brand-tealMid",
          )}
        >
          <span className="group-open:hidden">View data table</span>
          <span className="hidden group-open:inline">Hide data table</span>
        </summary>
        <table className={cn("mt-3 w-full text-body-s", onDark ? "text-white/80" : "text-ink")}>
          <caption className="sr-only">{table.caption}</caption>
          <thead>
            <tr className={cn("border-b text-left", onDark ? "border-white/20" : "border-neutral-100")}>
              {table.headers.map((h) => (
                <th key={h} scope="col" className="py-2 pr-4 font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, i) => (
              <tr key={i} className={cn("border-b", onDark ? "border-white/10" : "border-neutral-100")}>
                {row.map((cell, j) =>
                  j === 0 ? (
                    <th key={j} scope="row" className="py-2 pr-4 text-left font-medium">
                      {cell}
                    </th>
                  ) : (
                    <td key={j} className="py-2 pr-4 tabular-nums">
                      {cell}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </details>

      <p className={cn("mt-4 text-body-s", onDark ? "text-white/40" : "text-neutral-300")}>
        Source: {source}
      </p>
    </figure>
  );
}
