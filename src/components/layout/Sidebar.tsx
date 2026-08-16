"use client";

import { useState } from "react";
import Link from "next/link";
import { navLinks, profile } from "@/data/profile";
import { useNavBridge } from "./NavBridge";
import {
  CopyIcon,
  CheckIcon,
  PhoneIcon,
  DownloadIcon,
  XSocialIcon,
  LinkedInSocialIcon,
  InstagramSocialIcon,
  BehanceSocialIcon,
} from "@/components/ui/NavIcons";
import { cn } from "@/utils/cn";

const chipClass =
  "rounded-[var(--radius-lg)] border border-[var(--chip-border)] bg-[var(--chip-bg)] backdrop-blur-md transition-colors duration-500";

const SOCIAL_ICONS: Record<string, (props: { className?: string }) => React.JSX.Element> = {
  X: XSocialIcon,
  LinkedIn: LinkedInSocialIcon,
  Instagram: InstagramSocialIcon,
  Behance: BehanceSocialIcon,
};

export function Sidebar() {
  const { ctaTo, navTo } = useNavBridge();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard permission denied — silently ignore, the email is still selectable text
    }
  };

  return (
    <aside
      className="fixed inset-y-0 left-0 z-[70] hidden w-[var(--sidebar-w)] flex-col gap-3 overflow-y-auto p-4 lg:flex"
      style={{
        transform: "translateX(calc((var(--sidebar-reveal) - 1) * 100%))",
        opacity: "var(--sidebar-reveal)",
      }}
    >
      <div className={cn(chipClass, "flex items-center justify-between gap-3 px-5 py-4")}>
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-lg font-semibold uppercase tracking-[0.15em] text-[var(--color-ink)]">
            {profile.initials}
            <span className="text-[var(--color-accent)]">.</span>
          </span>
        </Link>
        <div className="flex items-center gap-1.5">
          {/* Sits with the socials rather than in its own row — the sidebar
              column is already full at a 900px viewport, and an extra chip
              pushed the CTA below the fold. */}
          <a
            href={profile.cvHref}
            download
            aria-label="Download CV"
            title="Download CV"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--chip-item-bg)] text-[var(--color-ink-muted)] transition-colors hover:text-[var(--color-accent)]"
          >
            <DownloadIcon className="h-3.5 w-3.5" />
          </a>
          {profile.socials.map((s) => {
            const Icon = SOCIAL_ICONS[s.label];
            if (!Icon) return null;
            return (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--chip-item-bg)] text-[var(--color-ink-muted)] transition-colors hover:text-[var(--color-ink)]"
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            );
          })}
        </div>
      </div>

      <div className={cn(chipClass, "px-5 py-5")}>
        <p className="text-sm leading-relaxed text-[var(--color-ink-muted)]">{profile.sidebarIntro}</p>
      </div>

      <div className={cn(chipClass, "flex gap-8 px-5 py-4")}>
        {profile.miniStats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-0.5">
            <span className="font-display text-xl font-medium text-[var(--color-ink)]">{stat.value}</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-ink-faint)]">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Invisible sizing/position markers — the real, interactive nav
          pills live in HeroNavLinksMigration and land in these exact slots
          via FLIP as the hero scrolls out (the same pattern the CTA
          button below uses). */}
      <nav className={cn(chipClass, "flex flex-col gap-1 px-3 py-3")} aria-hidden>
        {navLinks.map((link) => (
          <div
            key={link.href}
            ref={navTo[link.href] as React.RefObject<HTMLDivElement>}
            className="invisible flex items-center gap-3 rounded-[var(--radius-pill)] px-3 py-2 font-mono text-xs uppercase tracking-[0.15em]"
          >
            <span className="h-5 w-5" />
            <span>{link.label}</span>
          </div>
        ))}
      </nav>

      <div className={cn(chipClass, "flex flex-wrap items-center gap-x-4 gap-y-1 px-5 py-4")}>
        {profile.clients.map((name) => (
          <span key={name} className="font-display text-xs font-medium text-[var(--color-ink-muted)]">
            {name}
          </span>
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-3">
        <button
          type="button"
          onClick={copyEmail}
          className={cn(
            chipClass,
            "flex items-center justify-between gap-3 px-5 py-3.5 text-left transition-colors hover:bg-[var(--chip-item-bg)]",
          )}
        >
          <span className="truncate font-mono text-xs text-[var(--color-ink-muted)]">{profile.email}</span>
          <span className="flex h-6 w-6 shrink-0 items-center justify-center text-[var(--color-ink-faint)]">
            {copied ? (
              <CheckIcon className="h-3.5 w-3.5 text-[var(--color-accent)]" />
            ) : (
              <CopyIcon className="h-3.5 w-3.5" />
            )}
          </span>
        </button>

        <a
          href={profile.phoneHref}
          className="flex items-center gap-2.5 px-5 pb-1 text-[var(--color-ink-faint)] transition-colors hover:text-[var(--color-ink-muted)]"
        >
          <PhoneIcon className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate font-mono text-[11px]">{profile.phone}</span>
        </a>

        {/* Invisible sizing/position marker — the real CTA button lives in
            HeroNavMigration and lands here via FLIP as the hero scrolls out. */}
        <div
          ref={ctaTo as React.RefObject<HTMLDivElement>}
          aria-hidden
          className="invisible flex w-full items-center justify-center gap-2 rounded-[var(--radius-pill)] px-7 py-3.5 text-sm font-medium"
        >
          {profile.ctaLabel}
          <span className="h-3.5 w-3.5" />
        </div>
      </div>
    </aside>
  );
}
