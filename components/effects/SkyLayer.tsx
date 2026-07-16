"use client";

import { useMemo } from "react";

type Props = {
  /** "day" = white clouds + contrail on blue sky, "night" = faint clouds on navy */
  tone?: "day" | "night";
  /** show the crossing-aircraft contrail line */
  contrail?: boolean;
};

/**
 * Aviation atmosphere layer: soft drifting clouds and an aircraft contrail
 * crossing the section. Replaces the old star field on daytime surfaces.
 * Deterministic layout (seeded) so SSR and client markup match.
 */
export default function SkyLayer({ tone = "day", contrail = true }: Props) {
  const clouds = useMemo(() => {
    let seed = 7;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    return Array.from({ length: 7 }, (_, i) => ({
      id: i,
      top: 8 + rand() * 70,
      scale: 0.7 + rand() * 1.1,
      duration: i % 2 ? "animate-drift" : "animate-drift-slow",
      delay: -(rand() * 70),
      opacity: tone === "day" ? 0.5 + rand() * 0.35 : 0.05 + rand() * 0.06,
    }));
  }, [tone]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Drifting clouds — three soft overlapping puffs each */}
      {clouds.map((c) => (
        <div
          key={c.id}
          className={`absolute left-0 ${c.duration}`}
          style={{
            top: `${c.top}%`,
            animationDelay: `${c.delay}s`,
            opacity: c.opacity,
            transform: `scale(${c.scale})`,
          }}
        >
          <div className="relative h-10 w-40">
            <span className="absolute left-0 top-3 h-7 w-24 rounded-full bg-white blur-md" />
            <span className="absolute left-12 top-0 h-9 w-28 rounded-full bg-white blur-md" />
            <span className="absolute left-24 top-4 h-6 w-20 rounded-full bg-white blur-md" />
          </div>
        </div>
      ))}

      {/* Aircraft contrail crossing the sky */}
      {contrail && (
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 60"
          preserveAspectRatio="none"
        >
          <line
            x1="-5"
            y1="46"
            x2="105"
            y2="14"
            stroke="white"
            strokeOpacity={tone === "day" ? 0.35 : 0.1}
            strokeWidth="0.35"
            strokeDasharray="2.5 1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      )}
    </div>
  );
}
