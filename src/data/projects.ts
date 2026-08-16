export type Project = {
  number: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  tags: string[];
  year: string;
  /** Omitted for self-initiated and portfolio pieces — the detail page
   * hides the Client field rather than showing a placeholder. */
  client?: string;
  role: string;
  /** Software used, straight from the project's own tool list. */
  tools: string[];
  /** Cover artwork. The duotone gradient below stays as the backdrop and
   * as the fallback if the image ever fails to load. */
  image: string;
  gradient: [string, string];
  link?: string;
};

export const projects: Project[] = [
  {
    number: "01",
    slug: "ahs-city-brochure",
    title: "AHS City",
    description: "The sales brochure for a high-end mixed-use development in Dubai.",
    longDescription:
      "AHS City is a high-end mixed-use development by AHS Properties on Sheikh Zayed Road, overlooking the Jumeirah Water Canal — two towers joined by three bridges over a shared podium. The brochure carries that through a serif-led typographic system and a restrained gold-on-stone palette: cover artwork, an about-the-project opener, and interior spreads pairing architectural renders with the copy for each element of the scheme, down to the Nexus Workspace office tower. Laid out in InDesign, with supporting graphics in Illustrator and every render retouched in Photoshop.",
    category: "Print & Editorial",
    tags: ["Brochure", "Print", "Real Estate"],
    year: "2026",
    client: "AHS Properties",
    role: "Brochure Design, Layout & Retouching",
    tools: ["Adobe InDesign", "Adobe Illustrator", "Adobe Photoshop"],
    image: "/images/work/ahs-city.jpg",
    gradient: ["#0d1b33", "#d4b483"],
    link: "https://www.behance.net/gallery/247145623/Real-Estate-Brochure-AHS-CITY",
  },
  {
    number: "02",
    slug: "optique-bannour-identity",
    title: "Optique Bannour",
    description: "Logo, visual guidelines, and product campaigns for an eyewear retailer.",
    longDescription:
      "An identity for Optique Bannour built around a single gold cat-eye frame that doubles as the mark — drawn on a construction grid in Illustrator and documented with clearance, proportion, and colour rules so it holds at every size. The system then runs out across product campaigns for the brands the store carries, Tom Ford and Dolce & Gabbana among them, each post pairing a cut-out frame with oversized typography and the strapline that anchors the whole thing: the right shape of you.",
    category: "Brand & Identity",
    tags: ["Brand Identity", "Logo Design", "Guidelines"],
    year: "2023",
    client: "Optique Bannour",
    role: "Logo Design, Brand Guidelines & Campaign Design",
    tools: ["Adobe Illustrator", "Adobe Photoshop"],
    image: "/images/work/optic-identity.png",
    gradient: ["#3d2a05", "#f6c518"],
    link: "https://www.behance.net/gallery/181028759/Optic-Brand-Identity-Logo-Design-Visual-Guidelines",
  },
  {
    number: "03",
    slug: "ai-video-generator",
    title: "AI Video Generator",
    description: "A commercial film generated with AI and finished like a shoot.",
    longDescription:
      "A monochrome commercial piece made without a camera: shots generated in Higgsfield.ai, then cut, graded, and finished in After Effects. The film leans on a single staged idea — one figure in white against a formation in black — to prove the point that generation can replace the shoot while the direction and the edit still carry the story.",
    category: "AI & Video",
    tags: ["AI Video", "Advertising", "Video Editing"],
    year: "2026",
    role: "Direction, AI Generation & Edit",
    tools: ["Adobe After Effects", "Higgsfield.ai"],
    image: "/images/work/ai-video-generator.png",
    gradient: ["#2d5c58", "#f7e3d8"],
    link: "https://www.behance.net/gallery/247571711/AI-Video-Generator-Future-of-Content-Creation",
  },
  {
    number: "04",
    slug: "allure-cosmoderma-social",
    title: "Allure Cosmoderma",
    description: "Social campaign design for an aesthetic medical clinic.",
    longDescription:
      "A run of social posts for Allure Cosmoderma covering product launches, treatment protocols, and seasonal campaigns — bilingual Arabic and English layouts, packaging and vial retouching, and a warm gold palette held consistent across the whole feed so individual launches still read as one clinic.",
    category: "Social Media",
    tags: ["Social Media", "Beauty", "Campaign"],
    year: "2024",
    client: "Allure Cosmoderma",
    role: "Social Design & Product Retouching",
    tools: ["Adobe Photoshop", "Adobe Illustrator"],
    image: "/images/work/beauty-care.jpg",
    gradient: ["#5c4218", "#f3dcae"],
    link: "https://www.behance.net/gallery/202360337/Beauty-cosmetic-personal-care-Social-media-posts",
  },
  {
    number: "05",
    slug: "motion-graphics-2d",
    title: "Motion Graphics",
    description: "A collected reel of 2D animation and motion design work.",
    longDescription:
      "A set of 2D motion pieces built in After Effects — animated social posts, ad cutdowns, and graphics packages, collected as one reel to show how the same motion language adapts across formats and durations. Video only; the reel plays in full on Behance.",
    category: "Motion & Animation",
    tags: ["Motion Graphics", "2D Animation", "Video"],
    year: "2024",
    role: "Motion Graphics & 2D Animation",
    tools: ["Adobe After Effects"],
    image: "/images/work/motion-graphics.png",
    gradient: ["#22303c", "#c3d6e2"],
    link: "https://www.behance.net/gallery/189457259/Motion-Graphics-Projects-Animation-2D",
  },
  {
    number: "06",
    slug: "adermage-instagram",
    title: "Adermage",
    description: "An Instagram feed system for a skincare brand.",
    longDescription:
      "A full Instagram grid for Adermage Paris — product-led posts for each launch, built as a feed rather than a set of one-offs so the tiles read as a single composition when the profile is viewed as a whole. Designed in Photoshop, in collaboration with Bouhouli.",
    category: "Social Media",
    tags: ["Social Media", "Skincare", "Visual Identity"],
    year: "2024",
    client: "Adermage Paris",
    role: "Social Design & Feed Art Direction",
    tools: ["Adobe Photoshop"],
    image: "/images/work/adermage.jpg",
    gradient: ["#7a5f1c", "#e9c96a"],
    link: "https://www.behance.net/gallery/214580153/Adermage-Social-Media-Instagram-Feed",
  },
  {
    number: "07",
    slug: "ai-portrait-series",
    title: "AI Portrait Series",
    description: "A personal series blending portrait photography with AI generation.",
    longDescription:
      "A self-initiated series using my own face as the test subject, dropped into a different world in every frame — a neon arcade, a wall of CRTs, a Victorian street, a battlefield, a film poster. The aim, in my own words on the project: to make portraiture a more dynamic, accessible, and inspiring form by blending traditional technique with AI-driven creativity. Generated with Nano Banana Pro and Midjourney, then composited, colour-matched, and finished by hand in Photoshop and Illustrator.",
    category: "AI & Art Direction",
    tags: ["AI Art", "Portrait", "Art Direction"],
    year: "2026",
    role: "Concept, AI Art Direction & Compositing",
    tools: ["Nano Banana Pro", "Midjourney", "Adobe Photoshop", "Adobe Illustrator"],
    image: "/images/work/ai-portraits.jpg",
    gradient: ["#1b1030", "#e0603a"],
    link: "https://www.behance.net/gallery/246682205/AI-Portrait-Series-Nano-Banana",
  },
  {
    number: "08",
    slug: "skys-social-design",
    title: "SKYS",
    description: "Booking campaign and social content for a Tunisian skydiving school.",
    longDescription:
      "Advertising banners and social content for SKYS, a tandem skydiving school in Tunisia — big open skies, bold type, and enough contrast to survive a feed. Bilingual French and Arabic copy throughout, including a booking push built around device mockups of the skys.tn site. Layouts in Illustrator and Photoshop with animated cutdowns in After Effects, in collaboration with Bouhouli.",
    category: "Social Media",
    tags: ["Social Media", "Advertising", "Adventure"],
    year: "2023",
    client: "SKYS",
    role: "Campaign & Social Design",
    tools: ["Adobe Illustrator", "Adobe Photoshop", "Adobe After Effects"],
    image: "/images/work/adventure-brand.jpg",
    gradient: ["#123049", "#f3b25f"],
    link: "https://www.behance.net/gallery/166426191/Adventure-Brand-Social-Media-Content-Design",
  },
  {
    number: "09",
    slug: "photography-showcase",
    title: "Photography",
    description: "Restaurant, food, and portrait shoots, plus photo restoration.",
    longDescription:
      "A showcase of photography work — restaurant interiors, food and lifestyle shoots with talent in-frame, portraits, and photo restoration. Shot on a Sony Alpha 6400, developed in Lightroom, finished in Photoshop. The groundwork underneath everything else here: knowing how an image gets made before deciding how it gets designed.",
    category: "Photography",
    tags: ["Photography", "Retouching", "Restoration"],
    year: "2021",
    role: "Photography, Lighting & Retouching",
    tools: ["Sony Alpha 6400", "Adobe Lightroom", "Adobe Photoshop"],
    image: "/images/work/photography.png",
    gradient: ["#3a0d0c", "#c07a2c"],
    link: "https://www.behance.net/gallery/131148695/Professional-Photography-Portfolio-Showcase",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
