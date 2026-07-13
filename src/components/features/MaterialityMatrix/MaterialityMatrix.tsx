import { useState } from "react";
import { motion } from "framer-motion";
import { MATERIALITY_MATRIX, type MaterialTopic } from "@/data/approach";
import { RISK_REGISTER } from "@/data/governance";
import { EASE_SETTLE } from "@/lib/motion";

/**
 * MaterialityMatrix — interactive scatter of the 17 material topics
 * (blueprint §2.4.2). Every point is a real button (keyboard-first);
 * the table fallback below is the canonical accessible representation.
 * Coordinates are approximated from the report's published figure (p.21).
 */
const FILL = { E: "#7BB52A", S: "#D57143", G: "#228AC2" } as const;
const PILLAR_NAME = { E: "Environment", S: "Social", G: "Governance" } as const;

export function MaterialityMatrix() {
  const [active, setActive] = useState<MaterialTopic>(MATERIALITY_MATRIX[0]);
  const detail = RISK_REGISTER.find((r) => r.topic.toLowerCase() === active.topic.toLowerCase());

  return (
    <div>
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Scatter */}
        <div className="lg:col-span-7">
          <div aria-hidden className="mb-4 flex flex-wrap gap-4 text-body-s text-neutral-500">
            {(["E", "S", "G"] as const).map((p) => (
              <span key={p} className="inline-flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: FILL[p] }} />
                {PILLAR_NAME[p]}
              </span>
            ))}
          </div>
          <div className="relative rounded-card-lg border border-neutral-100 bg-white p-4">
            <svg viewBox="0 0 100 76" className="w-full" role="group" aria-label="Materiality matrix: 17 topics plotted by business impact and stakeholder influence">
              {/* Quadrant grid */}
              <line x1="10" y1="6" x2="10" y2="66" stroke="#EAEAEA" strokeWidth="0.4" />
              <line x1="10" y1="66" x2="96" y2="66" stroke="#EAEAEA" strokeWidth="0.4" />
              <line x1="53" y1="6" x2="53" y2="66" stroke="#EAEAEA" strokeWidth="0.3" strokeDasharray="1.5 1.5" />
              <line x1="10" y1="36" x2="96" y2="36" stroke="#EAEAEA" strokeWidth="0.3" strokeDasharray="1.5 1.5" />
              <text x="96" y="71.5" textAnchor="end" fontSize="3" className="fill-neutral-500">
                Potential impact on business performance →
              </text>
              <text x="5.5" y="66" fontSize="3" className="fill-neutral-500" transform="rotate(-90 5.5 66)" textAnchor="start">
                Influence on stakeholders →
              </text>
              {MATERIALITY_MATRIX.map((t) => {
                const cx = 10 + t.x * 84;
                const cy = 66 - t.y * 58;
                const isActive = active.topic === t.topic;
                return (
                  <motion.circle
                    key={t.topic}
                    role="button"
                    tabIndex={0}
                    aria-label={`${t.topic} (${PILLAR_NAME[t.pillar]})`}
                    aria-pressed={isActive}
                    cx={cx}
                    cy={cy}
                    r={isActive ? 3.2 : 2.2}
                    fill={FILL[t.pillar]}
                    fillOpacity={isActive ? 1 : 0.75}
                    stroke={isActive ? "#1A2E2C" : "white"}
                    strokeWidth={isActive ? 0.8 : 0.5}
                    className="cursor-pointer focus:outline-none focus-visible:stroke-brand-mint"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, ease: EASE_SETTLE }}
                    onClick={() => setActive(t)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActive(t);
                      }
                    }}
                  />
                );
              })}
            </svg>
          </div>
          <p className="mt-3 text-body-s text-neutral-500">
            Positions approximated from the report's published matrix (SR FY2024–25, p.21).
          </p>
        </div>

        {/* Detail card */}
        <div className="lg:col-span-5">
          <motion.div
            key={active.topic}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: EASE_SETTLE }}
            className="sticky top-28 rounded-card-lg border border-neutral-100 bg-white p-7"
            aria-live="polite"
          >
            <p
              className="text-overline uppercase"
              style={{ color: FILL[active.pillar] }}
            >
              {PILLAR_NAME[active.pillar]}
              {detail ? ` · ${detail.kind}` : ""}
            </p>
            <h3 className="mt-2 font-display text-h3 text-ink-strong">{active.topic}</h3>
            {detail && <p className="mt-3 text-body text-neutral-500">{detail.approach}</p>}
            <p className="mt-4 text-body-s text-neutral-300">
              Select any point on the matrix to explore its management approach.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Canonical table */}
      <details className="group mt-8">
        <summary className="cursor-pointer list-none text-body font-medium text-brand-tealMid underline-offset-4 hover:underline">
          <span className="group-open:hidden">View all 17 topics as a table</span>
          <span className="hidden group-open:inline">Hide table</span>
        </summary>
        <div className="mt-4 overflow-x-auto rounded-card-lg border border-neutral-100 bg-white">
          <table className="w-full min-w-[40rem] text-left text-body-s">
            <caption className="sr-only">All 17 material topics with pillar, classification, and approach</caption>
            <thead>
              <tr className="border-b border-neutral-100 uppercase tracking-wide text-neutral-500">
                <th scope="col" className="px-5 py-3 font-medium">Topic</th>
                <th scope="col" className="px-5 py-3 font-medium">Pillar</th>
                <th scope="col" className="px-5 py-3 font-medium">Classification</th>
                <th scope="col" className="px-5 py-3 font-medium">Management approach</th>
              </tr>
            </thead>
            <tbody>
              {MATERIALITY_MATRIX.map((t) => {
                const d = RISK_REGISTER.find((r) => r.topic.toLowerCase() === t.topic.toLowerCase());
                return (
                  <tr key={t.topic} className="border-b border-neutral-100 align-top last:border-0">
                    <th scope="row" className="px-5 py-3 font-semibold text-ink-strong">{t.topic}</th>
                    <td className="px-5 py-3 text-neutral-500">{PILLAR_NAME[t.pillar]}</td>
                    <td className="px-5 py-3 text-neutral-500">{d?.kind ?? "—"}</td>
                    <td className="px-5 py-3 text-neutral-500">{d?.approach ?? "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}
