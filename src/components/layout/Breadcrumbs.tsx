import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { ROUTE_TITLES } from "@/data/nav";
import { Fragment } from "react";

/**
 * Breadcrumbs — nested routes only (/approach/materiality, /social/community).
 * aria-current marks the leaf (blueprint §4).
 */
export function Breadcrumbs() {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length < 2) return null;

  const crumbs = segments.map((_, i) => {
    const path = "/" + segments.slice(0, i + 1).join("/");
    return { path, label: ROUTE_TITLES[path] ?? segments[i] };
  });

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-body-s text-neutral-500">
        <li>
          <Link to="/" className="transition-colors hover:text-brand-tealMid">
            Home
          </Link>
        </li>
        {crumbs.map((crumb, i) => (
          <Fragment key={crumb.path}>
            <li aria-hidden>
              <ChevronRight size={14} strokeWidth={1.5} />
            </li>
            <li>
              {i === crumbs.length - 1 ? (
                <span aria-current="page" className="font-medium text-ink">
                  {crumb.label}
                </span>
              ) : (
                <Link to={crumb.path} className="transition-colors hover:text-brand-tealMid">
                  {crumb.label}
                </Link>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
