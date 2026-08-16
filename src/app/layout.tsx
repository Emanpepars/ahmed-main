import type { Metadata } from "next";
import { display, body, mono } from "@/lib/fonts";
import { profile } from "@/data/profile";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { IntroProvider } from "@/components/layout/Intro";
import { CursorProvider } from "@/components/cursor/CursorProvider";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { PageTransition } from "@/components/layout/PageTransition";
import { NavBridgeProvider } from "@/components/layout/NavBridge";
import { Sidebar } from "@/components/layout/Sidebar";
import { HeroNavMigration } from "@/components/layout/HeroNavMigration";
import { HeroNavLinksMigration } from "@/components/layout/HeroNavLinksMigration";
import { HeroPortraitGhost } from "@/components/layout/HeroPortraitGhost";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const siteDescription =
  "Ahmed Boukadida is a senior multimedia designer in Dubai — brand identity, print and retail design, social content, video, motion graphics, and AI-driven content across GCC markets.";

export const metadata: Metadata = {
  title: {
    default: `${profile.name} — ${profile.title}`,
    template: `%s — ${profile.name}`,
  },
  description: siteDescription,
  keywords: [
    "graphic designer Dubai",
    "multimedia designer UAE",
    "video editor Dubai",
    "motion graphics",
    "brand identity",
    "AI content creation",
    profile.name,
  ],
  authors: [{ name: profile.name, url: profile.socials[0]?.href }],
  creator: profile.name,
  openGraph: {
    type: "profile",
    title: `${profile.name} — ${profile.title}`,
    description: siteDescription,
    siteName: profile.name,
    locale: "en_AE",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.title}`,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[var(--color-bg)] text-[var(--color-ink)] transition-colors duration-500">
        <SmoothScrollProvider>
          <CursorProvider>
            <IntroProvider>
              <NavBridgeProvider>
                <CustomCursor />
                <div className="noise-layer" />
                <Sidebar />
                <HeroNavMigration />
                <HeroNavLinksMigration />
                <HeroPortraitGhost />
                <MobileHeader />
                <div className="main-column flex-1">
                  <PageTransition>
                    <main>{children}</main>
                  </PageTransition>
                  <Footer />
                </div>
              </NavBridgeProvider>
            </IntroProvider>
          </CursorProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
