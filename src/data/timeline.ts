export type Milestone = {
  /** Stable key — two milestones can share a year (a role and a degree in
   * the same one), so the year alone isn't unique enough to key on. */
  id: string;
  year: string;
  title: string;
  company: string;
  description: string;
  category: string;
  gradient: [string, string];
};

export const timeline: Milestone[] = [
  {
    id: "loreal",
    year: "2024",
    title: "Senior Graphic Designer & Video Editor",
    company: "L'Oréal Paris — Dubai, UAE",
    description:
      "Leading visual merchandising and POS design across UAE retail while holding global brand consistency, alongside digital campaign assets, e-commerce banners, and video content for social and in-store screens.",
    category: "Retail & Campaign",
    gradient: ["#1b2a1f", "#c8ff4d"],
  },
  {
    id: "allure",
    year: "2023",
    title: "Social Media & Creative Design Executive",
    company: "Allure Cosmoderma — Dubai, UAE",
    description:
      "Directed end-to-end video production featuring the clinic's medical team, designed brochures, banners, and animated social content, and managed the brand's digital visual identity.",
    category: "Social & Video",
    gradient: ["#2b1f1a", "#ffb27f"],
  },
  {
    id: "altmind",
    year: "2021",
    title: "Graphic Designer & Videographer",
    company: "Altmind — Sousse, Tunisia",
    description:
      "Two years of full-cycle video production — concept, scripting, cinematography, and post — plus branding and social assets that built digital presence for a mixed roster of clients.",
    category: "Design & Film",
    gradient: ["#1a1f2b", "#7fa8ff"],
  },
  {
    id: "masters",
    year: "2021",
    title: "Master's Degree in Graphic Design",
    company: "High Institute of Fine Arts of Sousse, Tunisia",
    description:
      "Formal grounding in composition, typography, and image-making — the foundation the studio work has been built on since.",
    category: "Education",
    gradient: ["#1a2b26", "#5be3b6"],
  },
];
