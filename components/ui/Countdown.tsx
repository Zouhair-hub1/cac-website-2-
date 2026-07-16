"use client";

import { useEffect, useState } from "react";

/** Live countdown to the next club event. */
export default function Countdown({ target, title }: { target: string; title: string }) {
  const [t, setT] = useState<{ d: number; h: number; m: number; s: number } | null>(null);

  useEffect(() => {
    const compute = () => {
      const diff = +new Date(target) - Date.now();
      if (diff <= 0) return setT({ d: 0, h: 0, m: 0, s: 0 });
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor(diff / 3600000) % 24,
        m: Math.floor(diff / 60000) % 60,
        s: Math.floor(diff / 1000) % 60,
      });
    };
    compute();
    const id = setInterval(compute, 1000);
    return () => clearInterval(id);
  }, [target]);

  const cells = t
    ? [
        { label: "Days", value: t.d },
        { label: "Hours", value: t.h },
        { label: "Min", value: t.m },
        { label: "Sec", value: t.s },
      ]
    : [];

  return (
    <div className="text-center">
      <p className="eyebrow justify-center">Next mission</p>
      <p className="font-display text-xl font-semibold">{title}</p>
      <div className="mt-6 flex justify-center gap-3 sm:gap-4">
        {cells.map((c) => (
          <div key={c.label} className="glass w-[72px] rounded-2xl py-4 sm:w-20">
            <p className="font-display text-2xl font-semibold tabular-nums text-accent-400 sm:text-3xl">
              {String(c.value).padStart(2, "0")}
            </p>
            <p className="mt-1 text-[11px] uppercase tracking-widest text-muted">{c.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
