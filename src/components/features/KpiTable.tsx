import { motion } from "framer-motion";
import { DeltaChip } from "@/components/primitives/DeltaChip";
import type { Metric, PillarId } from "@/data/types";
import { fadeRise } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * KpiTable — shared chapter scorecard (blueprint §12 contract conventions).
 * Sticky first column, horizontal scroll on small screens, and contextNote
 * rendered inline with its metric — sensitive numbers never ship unframed.
 */
interface KpiTableProps {
  metrics: Metric[];
  pillar: PillarId;
  caption: string;
  /** Report label prefixed to per-row source refs. */
  sourcePrefix?: string;
}

const valueColor: Record<PillarId, string> = {
  environment: "text-pillar-environmentDeep",
  social: "text-pillar-socialDeep",
  governance: "text-pillar-governanceDeep",
};

export function KpiTable({ metrics, pillar, caption, sourcePrefix = "SR FY2024–25," }: KpiTableProps) {
  return (
    <motion.div
      variants={fadeRise}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="overflow-x-auto rounded-card-lg border border-neutral-100 bg-white"
    >
      <table className="w-full min-w-[36rem] text-left">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-neutral-100 text-body-s uppercase tracking-wide text-neutral-500">
            <th scope="col" className="sticky left-0 bg-white px-6 py-4 font-medium">
              Indicator
            </th>
            <th scope="col" className="px-6 py-4 font-medium">
              FY2024–25
            </th>
            <th scope="col" className="px-6 py-4 font-medium">
              YoY
            </th>
            <th scope="col" className="px-6 py-4 font-medium">
              Source
            </th>
          </tr>
        </thead>
        <tbody>
          {metrics.map((kpi) => (
            <tr key={kpi.id} className="border-b border-neutral-100 last:border-0">
              <th
                scope="row"
                className="sticky left-0 bg-white px-6 py-4 text-body font-medium text-ink-strong"
              >
                {kpi.label}
                {kpi.contextNote && (
                  <span className="mt-1 block text-body-s font-normal text-neutral-500">
                    {kpi.contextNote}
                  </span>
                )}
              </th>
              <td className={cn("px-6 py-4 font-display text-h4 font-semibold tabular-nums", valueColor[pillar])}>
                {kpi.value}
              </td>
              <td className="px-6 py-4">
                {kpi.delta !== undefined ? (
                  <DeltaChip value={kpi.delta} goodWhen={kpi.deltaGoodWhen} />
                ) : (
                  <span className="text-neutral-300">—</span>
                )}
              </td>
              <td className="px-6 py-4 text-body-s text-neutral-500">
                {sourcePrefix} {kpi.source}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
