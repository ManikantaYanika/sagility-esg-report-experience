import type { Metric } from "@/data/types";

/** Client partnerships — SR FY2024–25 pp.64–68. */

export const CLIENT_STATS: Metric[] = [
  { id: "csat", label: "Client Satisfaction Score (CSAT)", value: 53, delta: 1.9, deltaGoodWhen: "up", source: "SR FY2024–25, p.65" },
  { id: "new", label: "New clients in FY25 — 30 via the BroadPath acquisition", value: 38, source: "SR FY2024–25, p.66" },
  { id: "tenure", label: "Years with our longest-standing U.S. payer", value: 25, source: "SR FY2024–25, p.66" },
  { id: "summit", label: "Client leaders at our U.S. Customer Summit", value: 100, prefix: "~", source: "SR FY2024–25, p.66" },
];

export const MILESTONE_PARTNERSHIPS = [
  {
    years: "25 years",
    who: "Top U.S. payer",
    text: "From operational excellence to a collaborative, innovation-led engagement spanning compliance, analytics integration, and digital transformation.",
  },
  {
    years: "10 years",
    who: "Technology & services provider to workers' compensation insurers",
    text: "Transactional support grown into a multi-faceted partnership rooted in trust, innovation, and digital operations.",
  },
] as const;

export interface Testimonial {
  quote: string;
  attribution: string;
  theme: "Client Centricity" | "Excellence in Delivery" | "Tech-Enabled Transformation";
}

/** Verbatim from SR FY2024–25 pp.67–68 (role-only attribution, per report). */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "I love working with the Sagility team. They are wonderful, caring, friendly, and willing to help wherever needed. They perform high-quality work in a timely fashion and consistently exceed expectations.",
    attribution: "Senior Payment Integrity Professional, Top U.S. Payer",
    theme: "Client Centricity",
  },
  {
    quote:
      "They have done a great job of being the main point of contact for us and delivering more than expected. They significantly help champion our requests and help us hold other folks accountable, including themselves.",
    attribution: "Director, Partner Operations, U.S.-based Provider Company",
    theme: "Client Centricity",
  },
  {
    quote:
      "Their strength is their consistent flexibility and adaptability to help out in any situation and respond to issues or errors. The India location in Bangalore is a strength of the overall Sagility organization.",
    attribution: "Vice President, Operations Technology and Services Provider to Workers' Compensation Insurers",
    theme: "Excellence in Delivery",
  },
  {
    quote:
      "Sagility has deep knowledge of operations, process and is able to pivot quickly on emerging asks. The teams are incredibly reactive, responsive, and professional.",
    attribution: "Associate Director, Payment Integrity, Top U.S. Payer",
    theme: "Excellence in Delivery",
  },
  {
    quote:
      "They are technology-enabled but put business/partner needs and outcomes first. Sagility leverages a vast array of capabilities to create solutions that drive success.",
    attribution: "Executive Director, Business Operations, Provider of Consumer Directed Benefits and Payment Solutions",
    theme: "Tech-Enabled Transformation",
  },
  {
    quote:
      "Sagility makes an effort to understand the business and create innovative solutions that otherwise would not be possible without the business knowledge they have.",
    attribution: "Payment Integrity Lead, Top U.S. Payer",
    theme: "Tech-Enabled Transformation",
  },
];
