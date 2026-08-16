import { cn } from "@/utils/cn";

type Props = {
  from: string;
  to: string;
  className?: string;
  angle?: number;
  /** Artwork layered over the plate. The gradient stays visible underneath,
   * so it doubles as the backdrop while an image loads and as the fallback
   * if one is missing. The noise overlay always sits on top of both. */
  children?: React.ReactNode;
};

/** Generated duotone plate used behind project and timeline artwork —
 * keeps every visual on-brand, and stands in on its own for milestones
 * that have no image of their own. */
export function GradientPlate({ from, to, className, angle = 135, children }: Props) {
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{
        backgroundImage: `linear-gradient(${angle}deg, ${from}, ${to})`,
      }}
    >
      {children}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
