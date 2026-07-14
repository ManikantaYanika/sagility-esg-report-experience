import { forwardRef } from "react";
import { motion } from "framer-motion";
import { EASE_SETTLE } from "@/lib/motion";
import { cn } from "@/lib/cn";

interface CopilotLauncherProps {
  open: boolean;
  onOpen: () => void;
}

/** Floating launcher fixed bottom-right; hides itself while the panel is open. */
export const CopilotLauncher = forwardRef<HTMLButtonElement, CopilotLauncherProps>(
  function CopilotLauncher({ open, onOpen }, ref) {
    return (
      <motion.button
        ref={ref}
        type="button"
        onClick={onOpen}
        aria-label="Open ESG AI Copilot"
        aria-expanded={open}
        aria-controls="esg-copilot-panel"
        /* Render at the visible resting state immediately (no dependency on a
           JS entrance animation) so the launcher is always visible on first
           paint; only the open/close state animates. */
        initial={false}
        animate={{
          opacity: open ? 0 : 1,
          scale: open ? 0.85 : 1,
          pointerEvents: open ? "none" : "auto",
        }}
        transition={{ duration: 0.3, ease: EASE_SETTLE }}
        whileHover={{ y: -2 }}
        className={cn(
          "group fixed bottom-6 right-6 z-50 inline-flex items-center gap-2.5",
          "rounded-full bg-brand-teal py-2.5 pl-2.5 pr-5 text-white shadow-liftLg",
          "transition-colors hover:bg-brand-tealMid",
        )}
      >
        <span className="inline-flex h-9 items-center justify-center rounded-full bg-white px-2.5">
          <img src="/assets/logo/sagility-logo.svg" alt="" className="h-3.5 w-auto" />
        </span>
        <span className="text-body font-medium">ESG AI Copilot</span>
      </motion.button>
    );
  },
);
