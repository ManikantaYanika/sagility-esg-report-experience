import { Link } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { FOOTER_GROUPS, SOCIAL_LINKS } from "@/data/nav";
import { Container } from "@/components/primitives/Container";
import logoUrl from "@/assets/sagility-logo.svg";

/**
 * Footer — design-system §6.4. Dark deep-teal surface (the ESG site's
 * differentiator vs the light corporate footer), 4 sitemap groups,
 * social row, legal line, back-to-top.
 */
export function Footer() {
  const isExternal = (href: string) => href.startsWith("http");

  return (
    <footer className="bg-brand-teal text-white">
      <Container className="py-16 md:py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="max-w-sm">
            <p className="flex items-center gap-2.5 font-display">
              <img src={logoUrl} alt="Sagility" className="h-8 w-auto" />
              <span className="text-body-s font-sans font-medium uppercase tracking-[0.12em] text-brand-mint">
                ESG Report
              </span>
            </p>
            <p className="mt-4 text-body text-white/70">
              Empowering Progress: People, Partnerships, Purpose. Our FY2024–25
              sustainability performance, transparently reported.
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 md:grid-cols-4">
            {FOOTER_GROUPS.map((group) => (
              <div key={group.title}>
                <h2 className="text-overline uppercase text-brand-mint">{group.title}</h2>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      {isExternal(link.href) ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-body-s text-white/80 transition-colors hover:text-brand-mint"
                        >
                          {link.label}
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          className="text-body-s text-white/80 transition-colors hover:text-brand-mint"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/15 pt-8 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-5" aria-label="Social media">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body-s font-medium text-white/70 transition-colors hover:text-brand-mint"
                >
                  {social.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-6">
            <p className="text-body-s text-white/60">
              © {new Date().getFullYear()} Sagility Limited. All rights reserved.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white/80 transition-colors hover:border-brand-mint hover:text-brand-mint"
              aria-label="Back to top"
            >
              <ArrowUp aria-hidden size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
}
