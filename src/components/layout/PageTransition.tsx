"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { FM_EASE } from "@/animations/tokens";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.55, ease: FM_EASE.out }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
      <AnimatePresence initial={false}>
        <motion.div
          key={`${pathname}-wipe`}
          className="pointer-events-none fixed inset-0 z-[90] origin-top bg-[var(--color-accent)]"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.6, ease: FM_EASE.inOut }}
          style={{ transformOrigin: "top" }}
        />
      </AnimatePresence>
    </>
  );
}
