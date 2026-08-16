"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger, useGsapRegistration } from "@/animations/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";
import { useThemeSection } from "@/hooks/useThemeSection";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";

/** Fades the whole section in from low opacity as it scrolls up underneath
 * the exiting Hero — Hero's own background/content dissolve over the same
 * scroll range (see useHeroIntro's exit timeline), so this reads as one
 * drawer opening to reveal Work already sitting behind it, rather than
 * Work simply appearing once Hero is gone. Only wired at md+, matching the
 * breakpoint where Hero's pinned exit (and the negative margin that pulls
 * Work up under it) are active. */
function useWorkReveal(ref: React.RefObject<HTMLElement | null>) {
  const reducedMotion = useReducedMotion();
  useGsapRegistration();

  useLayoutEffect(() => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.set(el, { opacity: 0.15 });

      const tween = gsap.to(el, {
        opacity: 1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "top top",
          scrub: 0.6,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, [reducedMotion, ref]);
}

export function Work() {
  const themeRef = useThemeSection<HTMLElement>("dark");
  useWorkReveal(themeRef);

  return (
    <section
      ref={themeRef}
      id="work"
      className="relative z-0 py-[var(--space-section)] md:-mt-[40vh]"
    >
      <div className="container-edge mb-12 flex items-end justify-between gap-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-accent)]">
            Selected Work
          </span>
          <h2 className="font-display mt-4 max-w-xl text-4xl font-medium leading-[1.1] tracking-tight text-[var(--color-ink)] sm:text-5xl">
            Brand, print, motion, and AI — nine projects worth the scroll.
          </h2>
        </div>
        <span className="hidden font-mono text-xs uppercase tracking-[0.15em] text-[var(--color-ink-faint)] lg:block">
          Scroll to explore →
        </span>
      </div>

      <WorkDesktop />
      <WorkMobile />
    </section>
  );
}

function WorkDesktop() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const leadRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const reducedMotion = useReducedMotion();
  useGsapRegistration();

  useLayoutEffect(() => {
    if (reducedMotion) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      const lead = leadRef.current;
      const firstCard = cardRefs.current[0];
      if (!section || !track) return;

      // The track spans the full viewport (see the w-screen + counter-
      // margin on the section below) so cards can scroll underneath the
      // translucent sidebar instead of stopping dead at its edge — so
      // window.innerWidth is the real available width here, consistently,
      // regardless of how far the sidebar has revealed.
      const getScrollDistance = () => track.scrollWidth - window.innerWidth;

      // Centers the first card at rest instead of letting it sit flush
      // against the left edge with the second card's edge already
      // bleeding into view — scrolling should be what reveals the rest,
      // not the initial layout.
      const positionLead = () => {
        if (!lead || !firstCard) return;
        const cardWidth = firstCard.getBoundingClientRect().width;
        gsap.set(lead, { width: Math.max(0, (window.innerWidth - cardWidth) / 2) });
      };
      positionLead();

      // Cards' left offsets only change on resize (layout), not every
      // scroll frame — caching them here means applyFocus() below can run
      // on pure arithmetic instead of calling getBoundingClientRect() per
      // card per frame. That per-frame version was forcing a synchronous
      // layout flush for every card on every scrub tick (each read had to
      // flush the transform write from the card before it), which is what
      // was making the horizontal scroll stutter. Cached relative to
      // trackX=0 (subtracting whatever x happens to be live at cache time)
      // since onRefresh can re-cache mid-scroll, not just at rest.
      let restLefts: number[] = [];
      const cacheRestLefts = () => {
        const liveX = (gsap.getProperty(track, "x") as number) || 0;
        restLefts = cardRefs.current.map((card) => (card ? card.getBoundingClientRect().left - liveX : 0));
      };
      const onResize = () => {
        positionLead();
        cacheRestLefts();
      };
      window.addEventListener("resize", onResize);

      // A one-directional "streaming reveal", not a symmetric focus
      // gradient — matches heynesh.com's own project gallery exactly
      // (confirmed by inspecting its live computed styles): cards approach
      // from off-screen right at scale 0.6/opacity 0/y +55px, animate up
      // to scale 1/opacity 1/y 0 as they arrive, then STAY fully visible
      // — no blur, no re-dimming once a card has settled into view, even
      // as it later scrolls past center and off toward the left. Since
      // this is a plain clamped function of a card's absolute x position
      // (not "how far from center"), it's naturally reversible if the user
      // scrolls back without any extra bookkeeping.
      const applyFocus = () => {
        const revealStart = window.innerWidth * 1.3; // still approaching, fully hidden
        const revealEnd = window.innerWidth * 0.65; // settled, fully visible from here on
        const trackX = (gsap.getProperty(track, "x") as number) || 0;
        cardRefs.current.forEach((card, i) => {
          if (!card) return;
          const left = restLefts[i] + trackX;
          const raw = (revealStart - left) / (revealStart - revealEnd);
          const progress = Math.min(1, Math.max(0, raw));
          gsap.set(card, {
            opacity: Math.pow(progress, 4.5),
            scale: 0.6 + progress * 0.4,
            y: (1 - progress) * 55,
          });
        });
      };
      cacheRestLefts();

      const tween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          scrub: 0.6,
          pin: true,
          invalidateOnRefresh: true,
          onRefresh: cacheRestLefts,
          onUpdate: applyFocus,
        },
      });

      applyFocus();

      // The same reveal function also needs to run as the section scrolls
      // into view vertically (before the horizontal pin above even
      // engages) — otherwise cards sit frozen at whatever value the single
      // applyFocus() call above computed at mount, however far off-screen
      // that was. This trigger doesn't animate any property itself (which
      // would fight applyFocus for control of opacity/scale) — it just
      // re-invokes applyFocus on every scrub frame during the approach.
      const verticalTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top 85%",
        end: "top top",
        scrub: 0.6,
        onUpdate: applyFocus,
      });

      return () => {
        window.removeEventListener("resize", onResize);
        tween.scrollTrigger?.kill();
        tween.kill();
        verticalTrigger.kill();
      };
    });

    return () => mm.revert();
  }, [reducedMotion]);

  return (
    <div
      ref={sectionRef}
      className="relative hidden h-screen w-screen items-center overflow-hidden left-[calc(-1*var(--sidebar-w)*var(--sidebar-reveal))] lg:flex"
    >
      <div ref={trackRef} className="flex gap-10">
        <div ref={leadRef} className="w-[var(--space-gutter)] shrink-0" aria-hidden />
        {projects.map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            className="w-[min(60vw,42rem)] shrink-0"
            imageClassName="aspect-[4/3]"
            containerRef={(el) => {
              cardRefs.current[i] = el;
            }}
          />
        ))}
        <div className="w-[var(--space-gutter)] shrink-0" />
      </div>
    </div>
  );
}

function WorkMobile() {
  const ref = useStaggerReveal<HTMLDivElement>({ selector: "[data-project-item]", y: 40, start: "top 90%" });

  return (
    <div ref={ref} className="container-edge flex flex-col gap-14 lg:hidden">
      {projects.map((project) => (
        <div key={project.slug} data-project-item>
          <ProjectCard project={project} imageClassName="aspect-[4/3]" />
        </div>
      ))}
    </div>
  );
}
