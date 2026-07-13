import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgressBar } from "@/components/layout/ScrollProgressBar";
import { ROUTE_TITLES } from "@/data/nav";
import { SITE_NAME } from "@/lib/constants";
import { pageTransition } from "@/lib/motion";

/**
 * PageShell — global layout: skip link, header, animated route outlet, footer.
 * Scroll restores to top on navigation; document title tracks the route
 * (react-helmet + prerendering arrive in Phase 5, blueprint §17).
 */
export function PageShell() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    const page = ROUTE_TITLES[location.pathname];
    document.title = page && page !== "Home" ? `${page} | ${SITE_NAME}` : `${SITE_NAME} FY2024–25`;
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollProgressBar />
      <Header />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          id="main"
          key={location.pathname}
          variants={pageTransition}
          initial="initial"
          animate="enter"
          exit="exit"
          className="flex-1 pt-16 lg:pt-[5.5rem]"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
