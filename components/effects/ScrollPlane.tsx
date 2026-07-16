"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Plane } from "lucide-react";
import { useRef } from "react";

/**
 * Animated airplane that follows the page scroll along the right edge,
 * leaving a dashed "flight path" behind it.
 */
export default function ScrollPlane() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  const top = useTransform(smooth, [0, 1], ["6%", "88%"]);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed right-5 top-0 z-40 hidden h-full xl:block">
      <div className="absolute right-[11px] top-[6%] h-[82%] border-r border-dashed border-accent-400/25" />
      <motion.div style={{ top }} className="absolute right-0 -translate-y-1/2">
        <span className="grid h-6 w-6 rotate-180 place-items-center text-accent-400/80">
          <Plane size={20} fill="currentColor" strokeWidth={0} />
        </span>
      </motion.div>
    </div>
  );
}
