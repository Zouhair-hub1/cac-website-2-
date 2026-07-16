"use client";

import { useMemo } from "react";

/**
 * Decorative star background for dark sections.
 * Pure CSS twinkle — deterministic pseudo-random layout so SSR and client match.
 */
export default function StarField({ count = 70 }: { count?: number }) {
  const stars = useMemo(() => {
    // Simple seeded generator to keep server/client markup identical
    let seed = 42;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      top: rand() * 100,
      left: rand() * 100,
      size: rand() * 2 + 1,
      delay: rand() * 4,
    }));
  }, [count]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            opacity: 0.4,
          }}
        />
      ))}
    </div>
  );
}
