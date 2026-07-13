/** Leadership voices — verified from report messages. */

export interface LeaderMessage {
  id: string;
  name: string;
  role: string;
  quote: string;
  message?: string[];
  source: string;
}

export const FEATURED_LEADERS: LeaderMessage[] = [
  {
    id: "ceo",
    name: "Ramesh Gopalan",
    role: "Managing Director & Group CEO",
    quote:
      "Our commitment to ESG principles transforms sustainability into a powerful force for innovation, community support, and responsible growth — ensuring a thriving future for all.",
    message: [
      "We recognize the importance of sustainability in driving long-term value and building a more resilient future for all. We are committed to transparency — by integrating sustainability into our core operations, we can not only achieve our business goals but also contribute to a healthier planet and a more equitable society.",
      "This report provides a comprehensive overview of our progress and insights into our future aspirations across environmental impact, social responsibility, and governance. We are grateful to our clients, employees, shareholders and other stakeholders for their continued trust and support.",
    ],
    source: "SR FY2024, p.2",
  },
  {
    id: "chair",
    name: "Dr. Shalini Sarin",
    role: "Chairperson, CSR & Sustainability Committee",
    quote:
      "Today, more than ever, the world calls for bold and purpose-led leadership in healthcare.",
    message: [
      "The materiality assessment conducted last year provided a clear roadmap of 17 impact areas critical to our sustainability journey. Over the past year, we have strengthened our actions against these priorities, integrating them more holistically into strategic and operational decisions.",
      "Climate action remains a central pillar of our strategy. We have set ambitious targets to reduce absolute Scope 1 and 2 emissions by 54.6% and Scope 3 emissions by 32.5% by FY2034, using FY2024 as our base year. Together, we are shaping a sustainable future — one that enhances healthcare outcomes while creating meaningful, positive impact across the world.",
    ],
    source: "SR FY2024–25, p.6",
  },
  {
    id: "cfo",
    name: "Sarvabhouman D. Srinivasan",
    role: "EVP, Group CFO & Sustainability Head",
    quote:
      "Our sustainability journey is guided by the belief that the choices we make today can create a more resilient and equitable future.",
    message: [
      "Guided by our materiality priorities and the UN SDGs, we are advancing meaningful action across our operations — from ambitious commitments to responsible stewardship. Along with progressing on our SBTi targets, our focus on people and communities is equally important.",
      "Our people remain at the heart of this progress, driving community impact through their passion and volunteerism. We remain steadfast in our ambition to lead with responsibility, innovate with purpose, and create long-term value for all stakeholders.",
    ],
    source: "SR FY2024–25, p.18",
  },
];

export const SECTION_LEADERS: LeaderMessage[] = [
  {
    id: "chro",
    name: "Tina Vas",
    role: "Chief Human Resources Officer",
    quote:
      "With a diverse and empowered workforce, we continue to nurture an environment where every individual can thrive, contribute, and shape the future of our organization.",
    source: "SR FY2024–25, p.23",
  },
  {
    id: "csr",
    name: "Aparna Rao Basu",
    role: "Global Head, DEI & CSR",
    quote:
      "CSR for us is more than a mandate — it is a reflection of who we are and the future we aspire to build.",
    source: "SR FY2024–25, p.44",
  },
  {
    id: "sustainability",
    name: "Ganesh Pandit",
    role: "SVP — Global Internal Audit & Sustainability",
    quote:
      "Our environmental commitments are grounded in the belief that responsible operations are essential to shaping a more sustainable and resilient future.",
    source: "SR FY2024–25, p.51",
  },
  {
    id: "counsel",
    name: "Daniel B. Bailey",
    role: "EVP, Global General Counsel",
    quote:
      "Our commitment to ethics and compliance is not merely about meeting requirements — it is about shaping a culture where integrity defines how we operate and innovate.",
    source: "SR FY2024–25, p.82",
  },
  {
    id: "ciso",
    name: "Shwetank Verma",
    role: "Global Head Technology Infrastructure & CISO",
    quote:
      "Safeguarding our systems, intellectual property, and sensitive information is fundamental to sustaining the trust of our clients and their members.",
    source: "SR FY2024–25, p.88",
  },
  {
    id: "procurement",
    name: "Prasad Mathakari",
    role: "Head of Global Procurement",
    quote:
      "We are cultivating a network of suppliers united by our commitment to sustainable progress.",
    source: "SR FY2024–25, p.90",
  },
];
