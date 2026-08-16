import type { Metadata } from "next";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="flex min-h-screen items-center py-[var(--space-section)]">
      <div className="container-edge">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-accent)]">
          404
        </span>
        <h1 className="font-display mt-6 max-w-2xl text-5xl font-medium leading-[1.02] tracking-tight text-[var(--color-ink)] sm:text-7xl">
          This page doesn&apos;t exist.
        </h1>
        <p className="mt-8 max-w-md text-base leading-relaxed text-[var(--color-ink-muted)] sm:text-lg">
          The link may be out of date, or the project moved. The work is all still there.
        </p>
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <MagneticButton href="/#work" cursorText="VIEW">
            See Selected Work
          </MagneticButton>
          <MagneticButton href={`mailto:${profile.email}`} variant="outline" cursorText="OPEN">
            Get in touch
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
