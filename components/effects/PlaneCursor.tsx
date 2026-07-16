"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Aircraft cursor effect: a small plane glides after the pointer.
 * Desktop-only (pointer: fine) and disabled for reduced-motion users.
 */
export default function PlaneCursor() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 120, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 120, damping: 18, mass: 0.4 });
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    let px = 0;
    let py = 0;
    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - px;
      const dy = e.clientY - py;
      if (Math.abs(dx) + Math.abs(dy) > 2) {
        setAngle((Math.atan2(dy, dx) * 180) / Math.PI + 45); // icon points NE by default
      }
      px = e.clientX;
      py = e.clientY;
      x.set(e.clientX + 14);
      y.set(e.clientY + 14);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60] text-accent-400/70"
      style={{ x: sx, y: sy }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ transform: `rotate(${angle}deg)` }}>
        <path d="M21 3 3 10.5l7 2.5 2.5 7L21 3Z" />
      </svg>
    </motion.div>
  );
}
