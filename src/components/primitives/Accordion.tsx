import { useId, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * Accordion — disclosure list (risk matrix, mobile nav groups, FAQs).
 * Native button semantics, aria-expanded/controls wired, animated height.
 */
export interface AccordionItem {
  title: ReactNode;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  /** Allow multiple panels open simultaneously. */
  multiple?: boolean;
  className?: string;
}

export function Accordion({ items, multiple = false, className }: AccordionProps) {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const baseId = useId();

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(multiple ? prev : ([] as number[]));
      if (prev.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className={cn("divide-y divide-neutral-100 border-y border-neutral-100", className)}>
      {items.map((item, i) => {
        const isOpen = open.has(i);
        const headerId = `${baseId}-h-${i}`;
        const panelId = `${baseId}-p-${i}`;
        return (
          <div key={i}>
            <h3>
              <button
                id={headerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between gap-4 py-4 text-left text-h4 font-medium text-ink-strong transition-colors hover:text-brand-tealMid"
              >
                {item.title}
                <ChevronDown
                  aria-hidden
                  size={20}
                  strokeWidth={1.5}
                  className={cn(
                    "shrink-0 transition-transform duration-200 ease-settle",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-5 text-body text-ink">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
