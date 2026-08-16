"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "@/data/profile";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/utils/cn";

export function MobileHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = usePathname() === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[80] flex items-center justify-between px-5 py-4 transition-colors duration-500 lg:hidden",
          scrolled ? "bg-[var(--color-bg)]/85 backdrop-blur-md" : "bg-transparent",
        )}
      >
        <Link href="/" className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-ink)]">
          {profile.initials}
          <span className="text-[var(--color-accent)]">.</span>
        </Link>
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="flex flex-col items-end gap-1.5"
          aria-label="Open menu"
        >
          <span className="h-px w-7 bg-[var(--color-ink)]" />
          <span className="h-px w-4 bg-[var(--color-ink)]" />
        </button>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} isHome={isHome} />
    </>
  );
}
