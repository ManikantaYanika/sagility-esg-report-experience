import { Link } from "react-router-dom";
import { Container } from "@/components/primitives/Container";
import { Button } from "@/components/primitives/Button";
import { ROUTE_TITLES } from "@/data/nav";

/** Branded 404 with sitemap recovery (blueprint §4 — no dead ends). */
export default function NotFoundPage() {
  return (
    <Container className="py-section-lg">
      <p className="text-overline uppercase text-brand-tealMid">404</p>
      <h1 className="mt-3 font-display text-h1 text-ink-strong">Page not found</h1>
      <p className="mt-4 max-w-measure text-body-l text-neutral-500">
        The page you're looking for doesn't exist. Here's everywhere you can go:
      </p>
      <ul className="mt-8 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-3 md:grid-cols-3">
        {Object.entries(ROUTE_TITLES).map(([path, title]) => (
          <li key={path}>
            <Link
              to={path}
              className="text-body font-medium text-brand-tealMid transition-colors hover:text-brand-teal"
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
      <Button to="/" className="mt-10">
        Back to Home
      </Button>
    </Container>
  );
}
