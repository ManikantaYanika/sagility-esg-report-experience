import { useEffect, useRef, useState } from "react";
import { Link, NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu } from "lucide-react";
import { PRIMARY_NAV, type NavItem } from "@/data/nav";
import { Button } from "@/components/primitives/Button";
import { Container } from "@/components/primitives/Container";
import { MobileNav } from "@/components/layout/MobileNav";
import { useScrolled } from "@/hooks/useScrolled";
import { panelPop } from "@/lib/motion";
import { cn } from "@/lib/cn";
import logoUrl from "@/assets/sagility-logo.svg";

/**
 * Header — blueprint §4 / design-system §6.3.
 * Sticky; transparent with white text over the Home hero, then solid white
 * with hairline shadow once scrolled (or on any other route).
 * Mega-panels: hover + click + full keyboard support (Esc closes, blur closes).
 */
export function Header() {
  const scrolled = useScrolled();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  /** Dark treatment while resting on the Home hero's teal surface. */
  const onDark = location.pathname === "/" && !scrolled;

  // Close overlays on navigation.
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-200",
        onDark ? "bg-transparent" : "bg-white/95 shadow-none backdrop-blur",
        scrolled && "shadow-hairline",
      )}
    >
      <Container width="bleed">
        <div
          className={cn(
            "flex items-center justify-between gap-6 transition-[height] duration-200 ease-settle",
            scrolled ? "h-16" : "h-16 lg:h-[5.5rem]",
          )}
        >
          {/* Official Sagility logo (SVG) + ESG Report descriptor. */}
          <Link
            to="/"
            className="flex items-center gap-2 transition-colors"
            aria-label="Sagility ESG Report — home"
          >
            <img
              src={logoUrl}
              alt="Sagility"
              className="h-8 w-auto"
            />
            <span
              className={cn(
                "text-body-s font-sans font-medium uppercase tracking-[0.12em]",
                onDark ? "text-brand-mint" : "text-brand-tealMid",
              )}
            >
              ESG Report
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {PRIMARY_NAV.map((item) =>
              item.links ? (
                <MegaPanelItem key={item.label} item={item} onDark={onDark} />
              ) : (
                <RouterNavLink
                  key={item.label}
                  to={item.href!}
                  className={({ isActive }) =>
                    cn(
                      "rounded-btn px-3 py-2 text-body font-medium transition-colors",
                      isActive &&
                        "underline decoration-brand-mint decoration-2 underline-offset-8",
                      onDark
                        ? "text-white hover:text-brand-mint"
                        : isActive
                          ? "text-brand-teal"
                          : "text-ink hover:text-brand-tealMid",
                    )
                  }
                >
                  {item.label}
                </RouterNavLink>
              ),
            )}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              to="/downloads"
              variant={onDark ? "primaryOnDark" : "primary"}
              className="hidden lg:inline-flex"
            >
              Download Report
            </Button>
            <button
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-btn lg:hidden",
                onDark ? "text-white hover:text-brand-mint" : "text-ink hover:text-brand-tealMid",
              )}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label="Open navigation menu"
              onClick={() => setMobileOpen(true)}
            >
              <Menu aria-hidden size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </Container>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}

/** Desktop dropdown group with hover, click, and keyboard interaction. */
function MegaPanelItem({ item, onDark }: { item: NavItem; onDark: boolean }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number>();

  const openNow = () => {
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  /** Grace period prevents flicker crossing the hover gap. */
  const closeSoon = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onFocusOut = (e: FocusEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.relatedTarget as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const node = rootRef.current;
    node?.addEventListener("focusout", onFocusOut);
    return () => {
      document.removeEventListener("keydown", onKey);
      node?.removeEventListener("focusout", onFocusOut);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative" onMouseEnter={openNow} onMouseLeave={closeSoon}>
      <button
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex items-center gap-1 rounded-btn px-3 py-2 text-body font-medium transition-colors",
          onDark
            ? "text-white hover:text-brand-mint"
            : open
              ? "text-brand-teal"
              : "text-ink hover:text-brand-tealMid",
        )}
      >
        {item.label}
        <ChevronDown
          aria-hidden
          size={16}
          strokeWidth={1.5}
          className={cn("transition-transform duration-200 ease-settle", open && "rotate-180")}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            variants={panelPop}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute left-1/2 top-full w-[26rem] -translate-x-1/2 pt-3"
          >
            <div className="rounded-card-lg border border-neutral-100 bg-white p-3 shadow-lift">
              <ul>
                {item.links!.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-card px-4 py-3 transition-colors hover:bg-surface"
                    >
                      <span className="block text-body font-medium text-ink-strong">
                        {link.label}
                      </span>
                      {link.description && (
                        <span className="mt-0.5 block text-body-s text-neutral-500">
                          {link.description}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
