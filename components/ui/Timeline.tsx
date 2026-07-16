"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Award, CalendarDays, Flag, Users } from "lucide-react";
import type { HistoryMilestone } from "@/lib/types";

const KIND_ICON = { founding: Flag, board: Users, achievement: Award, event: CalendarDays };

/**
 * Scrolling vertical timeline: the center line fills as you scroll,
 * milestones alternate sides on desktop.
 */
export default function Timeline({ milestones }: { milestones: HistoryMilestone[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 22 });

  return (
    <div ref={ref} className="relative mx-auto max-w-4xl">
      {/* Track + animated fill */}
      <div className="absolute left-5 top-0 h-full w-px bg-[var(--line)] md:left-1/2" />
      <motion.div
        style={{ scaleY: progress }}
        className="absolute left-5 top-0 h-full w-px origin-top bg-accent-400 md:left-1/2"
      />

      <div className="space-y-12">
        {milestones.map((m, i) => {
          const Icon = KIND_ICON[m.kind];
          const left = i % 2 === 0;
          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55 }}
              className={`relative flex pl-16 md:w-1/2 ${left ? "md:pl-0 md:pr-12" : "md:ml-auto md:pl-12"}`}
            >
              {/* Node */}
              <span
                className={`absolute left-5 top-1 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full border border-accent-400/50 bg-[var(--bg-elevated)] text-accent-400 ${
                  left ? "md:left-full" : "md:left-0"
                }`}
              >
                <Icon size={16} />
              </span>
              <div className="glass w-full rounded-3xl p-6 shadow-glass-sm">
                <p className="font-display text-sm font-semibold text-accent-400">{m.year}</p>
                <h3 className="mt-1 font-display text-lg font-semibold">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{m.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
