"use client";

import { useState } from "react";
import { GradientPlate } from "./GradientPlate";
import { cn } from "@/utils/cn";

type Props = {
  src: string;
  alt: string;
  className?: string;
};

/** The hero's own background is set to match this photo's studio backdrop
 * (see HERO_BG in Hero.tsx), so the photo's rectangular bounds have nothing
 * to contrast against — no mask or card treatment needed to hide the edge. */
export function PortraitImage({ src, alt, className }: Props) {
  const [errored, setErrored] = useState(false);

  return (
    <div className={cn("relative", className)}>
      {!errored ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-contain object-bottom"
          onError={() => setErrored(true)}
        />
      ) : (
        <div className="absolute inset-0">
          <GradientPlate from="#1b2a1f" to="#c8ff4d" className="h-full w-full" />
        </div>
      )}
    </div>
  );
}
