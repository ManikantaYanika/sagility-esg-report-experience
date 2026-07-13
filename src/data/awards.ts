/** Awards & recognition — full verified list (both reports' awards pages). */

export interface AwardRecord {
  title: string;
  by: string;
  year: 2023 | 2024 | 2025;
  category: "Workplace & Culture" | "Women & DEI" | "CSR & Sustainability" | "Learning & Development" | "Wellbeing";
}

export const AWARDS: AwardRecord[] = [
  { title: "Happy Companies to Work For", by: "World HRD Congress", year: 2025, category: "Workplace & Culture" },
  { title: "Best Organisation for Women", by: "ET Now, The Times Group", year: 2025, category: "Women & DEI" },
  { title: "Onboarding Program of the Year", by: "The Empire Forums", year: 2025, category: "Workplace & Culture" },
  { title: "Most Preferred Workplace", by: "Marksmen Daily", year: 2025, category: "Workplace & Culture" },
  { title: "Global CSR and Leadership Excellence Award", by: "CSR Congress", year: 2025, category: "CSR & Sustainability" },
  { title: "Dream Companies to Work For", by: "World HRD Congress", year: 2024, category: "Workplace & Culture" },
  { title: "Best Organisation for Women", by: "ET Now, The Times Group", year: 2024, category: "Women & DEI" },
  { title: "Best HR Strategy in Line with Business", by: "World HRD Congress", year: 2024, category: "Workplace & Culture" },
  { title: "Promoting Health in the Workplace", by: "World HRD Congress", year: 2024, category: "Wellbeing" },
  { title: "Progressive Place to Work", by: "Economic Times", year: 2024, category: "Workplace & Culture" },
  { title: "Women Empowerment Summit & GIWL Awards", by: "UBS Forums", year: 2024, category: "Women & DEI" },
  { title: "Sustainable Organization of the Year", by: "UBS Forums", year: 2024, category: "CSR & Sustainability" },
  { title: "Sport for Change — Playmaker Award", by: "Sportz Village Foundation", year: 2024, category: "CSR & Sustainability" },
  { title: "Employer of the Year — Bronze", by: "Stevie Awards", year: 2024, category: "Workplace & Culture" },
  { title: "Learning & Development Program of the Year", by: "Gawad Maestro Awards", year: 2024, category: "Learning & Development" },
  { title: "Global CSR & ESG Awards", by: "Brand Honchos", year: 2024, category: "CSR & Sustainability" },
  { title: "National Awards for Excellence in CSR & Sustainability", by: "World CSR Day", year: 2024, category: "CSR & Sustainability" },
  { title: "Sustainable Initiative of the Year", by: "UBS Forums", year: 2023, category: "CSR & Sustainability" },
  { title: "Indian CSR Awards", by: "Brand Honchos", year: 2023, category: "CSR & Sustainability" },
];
