import { lazy, Suspense, type ComponentType, type LazyExoticComponent } from "react";
import { Route, Routes } from "react-router-dom";
import { PageShell } from "@/components/layout/PageShell";
import { Skeleton } from "@/components/primitives/Skeleton";
import { Container } from "@/components/primitives/Container";

/**
 * Router — all 15 approved routes (blueprint §1) + branded 404.
 * Route-level code splitting via React.lazy (performance strategy §15).
 */
type LazyPage = LazyExoticComponent<ComponentType>;

const routes: Array<{ path: string; Page: LazyPage }> = [
  { path: "/", Page: lazy(() => import("@/pages/HomePage")) },
  { path: "/about", Page: lazy(() => import("@/pages/AboutPage")) },
  { path: "/approach", Page: lazy(() => import("@/pages/ApproachPage")) },
  { path: "/approach/materiality", Page: lazy(() => import("@/pages/MaterialityPage")) },
  { path: "/esg-overview", Page: lazy(() => import("@/pages/EsgOverviewPage")) },
  { path: "/environment", Page: lazy(() => import("@/pages/EnvironmentPage")) },
  { path: "/social", Page: lazy(() => import("@/pages/SocialPage")) },
  { path: "/social/community", Page: lazy(() => import("@/pages/CommunityPage")) },
  { path: "/governance", Page: lazy(() => import("@/pages/GovernancePage")) },
  { path: "/clients", Page: lazy(() => import("@/pages/ClientsPage")) },
  { path: "/leadership", Page: lazy(() => import("@/pages/LeadershipPage")) },
  { path: "/highlights", Page: lazy(() => import("@/pages/HighlightsPage")) },
  { path: "/timeline", Page: lazy(() => import("@/pages/TimelinePage")) },
  { path: "/downloads", Page: lazy(() => import("@/pages/DownloadsPage")) },
  { path: "/contact", Page: lazy(() => import("@/pages/ContactPage")) },
  { path: "*", Page: lazy(() => import("@/pages/NotFoundPage")) },
];

function RouteFallback() {
  return (
    <Container className="py-section">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="mt-6 h-40 w-full" />
    </Container>
  );
}

export function AppRouter() {
  return (
    <Routes>
      <Route element={<PageShell />}>
        {routes.map(({ path, Page }) => (
          <Route
            key={path}
            path={path}
            element={
              <Suspense fallback={<RouteFallback />}>
                <Page />
              </Suspense>
            }
          />
        ))}
      </Route>
    </Routes>
  );
}
