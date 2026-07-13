/**
 * Navigation model — single source for Header, MobileNav, Footer, and Breadcrumbs.
 * Structure approved in product-blueprint.md §1 & §4.
 */

export interface NavLink {
  label: string;
  href: string;
  /** One-line description shown in mega-panels. */
  description?: string;
}

export interface NavItem {
  label: string;
  /** Direct link item... */
  href?: string;
  /** ...or a mega-panel group of links. Exactly one of href/links is set. */
  links?: NavLink[];
}

export const PRIMARY_NAV: NavItem[] = [
  { label: "About", href: "/about" },
  {
    label: "Our Approach",
    links: [
      {
        label: "Sustainability Strategy",
        href: "/approach",
        description: "Commitments, governance, and stakeholder engagement",
      },
      {
        label: "Materiality & SDGs",
        href: "/approach/materiality",
        description: "17 material topics and UN SDG alignment",
      },
      {
        label: "ESG Scorecard",
        href: "/esg-overview",
        description: "All KPIs, FY2023–24 vs FY2024–25, assured",
      },
    ],
  },
  { label: "Environment", href: "/environment" },
  { label: "Social", href: "/social" },
  { label: "Governance", href: "/governance" },
  {
    label: "More",
    links: [
      {
        label: "ESG Highlights",
        href: "/highlights",
        description: "FY2024–25 at a glance, awards & recognition",
      },
      {
        label: "Leadership Messages",
        href: "/leadership",
        description: "Voices leading our sustainability journey",
      },
      {
        label: "Sustainability Timeline",
        href: "/timeline",
        description: "From 2022 foundation to 2034 targets",
      },
      {
        label: "Client Partnerships",
        href: "/clients",
        description: "Decade-long partnerships and client voices",
      },
      {
        label: "CSR & Community",
        href: "/social/community",
        description: "Programs, impact stories, and volunteering",
      },
      { label: "Downloads", href: "/downloads", description: "Reports and disclosures" },
      { label: "Contact", href: "/contact", description: "Feedback and stakeholder contact" },
    ],
  },
];

/** Footer sitemap — blueprint §4 / design-system §6.4. */
export const FOOTER_GROUPS: { title: string; links: NavLink[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "Environment", href: "/environment" },
      { label: "Social", href: "/social" },
      { label: "Governance", href: "/governance" },
      { label: "CSR & Community", href: "/social/community" },
      { label: "Client Partnerships", href: "/clients" },
    ],
  },
  {
    title: "Report",
    links: [
      { label: "ESG Scorecard", href: "/esg-overview" },
      { label: "ESG Highlights", href: "/highlights" },
      { label: "Materiality & SDGs", href: "/approach/materiality" },
      { label: "Sustainability Timeline", href: "/timeline" },
      { label: "Downloads", href: "/downloads" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Sagility", href: "/about" },
      { label: "Our Approach", href: "/approach" },
      { label: "Leadership", href: "/leadership" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Trust & Policies",
    links: [
      // External policy surfaces live on the corporate site (blueprint scope).
      { label: "Global Privacy Policy", href: "https://sagility.com/privacy-policy/" },
      { label: "Accessibility Statement", href: "https://sagility.com/accessibility/" },
      { label: "Terms of Use", href: "https://sagility.com/terms-of-use/" },
    ],
  },
];

export const SOCIAL_LINKS: { label: string; href: string }[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/sagilityhealth/" },
  { label: "YouTube", href: "https://www.youtube.com/@sagilityhealth" },
  { label: "Instagram", href: "https://www.instagram.com/sagilityhealth/" },
  { label: "Facebook", href: "https://www.facebook.com/SagilityHealth" },
  { label: "X", href: "https://x.com/SagilityHealth" },
];

/** Route → human title map (document titles, breadcrumbs, 404 recovery). */
export const ROUTE_TITLES: Record<string, string> = {
  "/": "Home",
  "/about": "About Sagility",
  "/approach": "Sustainability Strategy",
  "/approach/materiality": "Materiality & SDGs",
  "/esg-overview": "ESG Scorecard",
  "/environment": "Environment",
  "/social": "Social",
  "/social/community": "CSR & Community",
  "/governance": "Governance",
  "/clients": "Client Partnerships",
  "/leadership": "Leadership Messages",
  "/highlights": "ESG Highlights",
  "/timeline": "Sustainability Timeline",
  "/downloads": "Downloads",
  "/contact": "Contact",
};

/** Pillar accent per route prefix — drives ScrollProgressBar + chapter theming. */
export type Pillar = "environment" | "social" | "governance" | "brand";

export function pillarForPath(pathname: string): Pillar {
  if (pathname.startsWith("/environment")) return "environment";
  if (pathname.startsWith("/social")) return "social";
  if (pathname.startsWith("/governance")) return "governance";
  return "brand";
}
