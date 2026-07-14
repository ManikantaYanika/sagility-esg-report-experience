import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { PRIMARY_NAV } from "@/data/nav";
import { Accordion } from "@/components/primitives/Accordion";
import { Button } from "@/components/primitives/Button";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { EASE_SETTLE } from "@/lib/motion";
import logoUrl from "@/assets/sagility-logo.svg";

/**
 * MobileNav — full-screen overlay (<1024), accordion groups,
 * Download CTA pinned to the bottom (blueprint §7).
 * Modal semantics: body scroll locked while open; Esc and close button
 * dismiss; focus moves to the close button on open, is trapped within the
 * dialog while open (Tab/Shift+Tab cycle), and returns to the trigger on close.
 */
interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  useLockBodyScroll(open);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  // Keep the latest onClose without re-running the effect (avoids focus churn
  // if the parent re-renders — e.g. on scroll — while the menu is open).
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previouslyFocused.current?.focus?.();
    };
  }, [open]);

  // Render in a portal on <body> so the fixed drawer is positioned against
  // the viewport, not the header (the header's backdrop-filter would otherwise
  // make it the containing block for this fixed element).
  if (typeof document === "undefined") return null;
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          ref={dialogRef}
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: EASE_SETTLE }}
          className="fixed inset-0 z-[60] flex flex-col bg-white lg:hidden"
        >
          <div className="flex h-16 items-center justify-between px-4">
            <span className="flex items-center gap-2">
              <img src={logoUrl} alt="Sagility" className="h-8 w-auto" />
              <span className="text-body-s font-sans uppercase tracking-[0.12em] text-brand-tealMid">ESG Report</span>
            </span>
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close navigation menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-btn text-ink hover:text-brand-tealMid"
            >
              <X aria-hidden size={24} strokeWidth={1.5} />
            </button>
          </div>

          <nav aria-label="Primary" className="flex-1 overflow-y-auto px-4 pb-6">
            <ul className="space-y-1">
              {PRIMARY_NAV.map((item) =>
                item.href ? (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      onClick={onClose}
                      className="block border-b border-neutral-100 py-4 text-h4 font-medium text-ink-strong"
                    >
                      {item.label}
                    </Link>
                  </li>
                ) : (
                  <li key={item.label}>
                    <Accordion
                      items={[
                        {
                          title: item.label,
                          content: (
                            <ul className="space-y-1">
                              {item.links!.map((link) => (
                                <li key={link.href}>
                                  <Link
                                    to={link.href}
                                    onClick={onClose}
                                    className="block rounded-card px-3 py-2.5 text-body font-medium text-ink hover:bg-surface"
                                  >
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          ),
                        },
                      ]}
                    />
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="border-t border-neutral-100 p-4">
            <Button to="/downloads" className="w-full">
              Download Report
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
