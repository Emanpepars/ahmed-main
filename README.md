# Ahmed Boukadida — Portfolio

Personal portfolio for Ahmed Boukadida, senior multimedia designer in Dubai.

Built with Next.js 16 (App Router), Tailwind CSS v4, GSAP + ScrollTrigger, Framer Motion, and Lenis for smooth scrolling.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

## Where the content lives

All copy and project data is centralised in `src/data/` — edit these rather than the components:

| File | Contents |
| --- | --- |
| `profile.ts` | Name, title, contact, socials, stats, skills, client list, nav links |
| `projects.ts` | The nine portfolio projects and their detail-page content |
| `timeline.ts` | Career and education milestones for the Journey section |
| `services.ts` | The five service offerings, plus the three-phase `process` |
| `faq.ts` | FAQ questions and answers |

Project cover artwork lives in `public/images/work/`, and the hero portrait in `public/images/`.

## Structure

- `src/app/` — routes: `/` (single-page), `/work/[slug]` (project detail), `not-found`
- `src/sections/` — the homepage sections, in page order
- `src/components/` — layout chrome (sidebar, footer, mobile menu, cursor) and reusable UI
- `src/hooks/`, `src/animations/` — scroll, reveal, and GSAP behaviour
