import { useState } from "react";
import { motion } from "framer-motion";
import { FIVE_D_MODEL } from "@/data/emissions";
import { EASE_SETTLE } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * FiveDWheel — Sagility's 5D Decarbonization Model (report p.55).
 * Desktop: interactive radial wheel + detail panel.
 * Mobile / keyboard: the same buttons flow as a stacked list — the wheel
 * is progressive enhancement, never the only path (blueprint §7, §16).
 */
export function FiveDWheel() {
  const [active, setActive] = useState(0);
  const segment = FIVE_D_MODEL[active];

  return (
    <div className="grid items-center gap-10 lg:grid-cols-2">
      {/* Radial wheel (decorative geometry; buttons carry semantics) */}
      <div className="relative mx-auto hidden aspect-square w-full max-w-sm lg:block" aria-hidden>
        <div className="absolute inset-[30%] flex items-center justify-center rounded-full border border-neutral-100 bg-surface text-center">
          <p className="px-4 font-display text-h4 font-medium text-ink-strong">
            5D<span className="block text-body-s font-sans text-neutral-500">Model</span>
          </p>
        </div>
        {FIVE_D_MODEL.map((d, i) => {
          const angle = (i / FIVE_D_MODEL.length) * Math.PI * 2 - Math.PI / 2;
          const x = 50 + 42 * Math.cos(angle);
          const y = 50 + 42 * Math.sin(angle);
          return (
            <motion.button
              key={d.id}
              type="button"
              tabIndex={-1}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: EASE_SETTLE }}
              style={{ left: `${x}%`, top: `${y}%` }}
              className={cn(
                "absolute flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 font-display text-body font-medium transition-all duration-200 ease-settle",
                active === i
                  ? "scale-110 border-pillar-environment bg-pillar-environment text-white shadow-lift"
                  : "border-neutral-100 bg-white text-ink hover:border-pillar-environment",
              )}
            >
              {d.title}
            </motion.button>
          );
        })}
      </div>

      {/* Semantic controls + detail (the accessible core of the component) */}
      <div>
        <div role="tablist" aria-label="5D decarbonization pillars" className="flex flex-wrap gap-2">
          {FIVE_D_MODEL.map((d, i) => (
            <button
              key={d.id}
              role="tab"
              id={`fived-tab-${d.id}`}
              aria-selected={active === i}
              aria-controls={`fived-panel-${d.id}`}
              onClick={() => setActive(i)}
              className={cn(
                "rounded-full border px-4 py-2 text-body-s font-medium transition-colors",
                active === i
                  ? "border-pillar-environment bg-pillar-environment text-white"
                  : "border-neutral-100 bg-white text-ink hover:border-pillar-environment",
              )}
            >
              {d.title}
            </button>
          ))}
        </div>

        <motion.div
          key={segment.id}
          role="tabpanel"
          id={`fived-panel-${segment.id}`}
          aria-labelledby={`fived-tab-${segment.id}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: EASE_SETTLE }}
          className="mt-6 rounded-card-lg border border-neutral-100 bg-white p-6"
        >
          <p className="text-overline uppercase text-pillar-environmentDeep">{segment.title}</p>
          <p className="mt-2 text-body-l font-medium text-ink-strong">{segment.summary}</p>
          <p className="mt-3 text-body text-neutral-500">{segment.detail}</p>
        </motion.div>
      </div>
    </div>
  );
}
