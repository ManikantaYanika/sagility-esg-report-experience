/** Downloads — report artifacts served from /public/reports. */

export interface DownloadItem {
  id: string;
  title: string;
  subtitle: string;
  meta: string;
  path: string;
  primary?: boolean;
  notes: string[];
}

export const DOWNLOADS: DownloadItem[] = [
  {
    id: "fy25",
    title: "Sustainability Report FY2024–25",
    subtitle: "Empowering Progress: People, Partnerships, Purpose",
    meta: "PDF · 104 pages · 14.9 MB",
    path: "/reports/sagility-sustainability-report-fy2025.pdf",
    primary: true,
    notes: [
      "Externally assured by DNV (ISAE 3000 Revised, limited assurance)",
      "GRI-referenced · BRSR-informed · UNGC & SDG aligned",
      "Includes GRI Content Index and Independent Assurance Statement",
    ],
  },
  {
    id: "fy24",
    title: "Sustainability Report FY2024",
    subtitle: "Our inaugural year of sustainability reporting",
    meta: "PDF · 67 pages · 24.9 MB",
    path: "/reports/sagility-sustainability-report-fy2024.pdf",
    notes: [
      "Baseline year for SBTi targets",
      "First full Scope 1, 2 and 3 emissions inventory",
      "GRI-referenced with independent internal review",
    ],
  },
];

export const RELATED_DISCLOSURES = [
  { label: "GRI Content Index", note: "Annexure A of the FY2024–25 report" },
  { label: "Independent Assurance Statement", note: "Annexure B of the FY2024–25 report" },
  { label: "CDP Climate Disclosure", note: "Score improved D → B; disclosed annually since 2022" },
  { label: "EcoVadis Assessment", note: "Annual sustainability rating participation" },
] as const;
