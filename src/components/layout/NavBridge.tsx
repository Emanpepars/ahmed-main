"use client";

import { createContext, useContext, useState } from "react";
import { navLinks } from "@/data/profile";

type BridgeRefs = {
  ctaFrom: React.RefObject<HTMLDivElement | null>;
  ctaTo: React.RefObject<HTMLDivElement | null>;
  /** One ghost-slot pair per nav link, keyed by href — same idea as
   * ctaFrom/ctaTo but multiplied, so each link can migrate from its own
   * hero position into its own sidebar row independently. */
  navFrom: Record<string, React.RefObject<HTMLDivElement | null>>;
  navTo: Record<string, React.RefObject<HTMLDivElement | null>>;
};

const NavBridgeContext = createContext<BridgeRefs | null>(null);

/** Shares ghost-slot refs between Hero and Sidebar — two different parts
 * of the tree that both need to know where a migrating element starts
 * and ends. */
export function NavBridgeProvider({ children }: { children: React.ReactNode }) {
  const [refs] = useState<BridgeRefs>(() => ({
    ctaFrom: { current: null },
    ctaTo: { current: null },
    navFrom: Object.fromEntries(navLinks.map((l) => [l.href, { current: null }])),
    navTo: Object.fromEntries(navLinks.map((l) => [l.href, { current: null }])),
  }));

  return <NavBridgeContext.Provider value={refs}>{children}</NavBridgeContext.Provider>;
}

export function useNavBridge() {
  const ctx = useContext(NavBridgeContext);
  if (!ctx) throw new Error("useNavBridge must be used within NavBridgeProvider");
  return ctx;
}
