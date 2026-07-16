"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Plane } from "lucide-react";
import { useRef } from "react";
import SkyLayer from "@/components/effects/SkyLayer";
import { SITE } from "@/lib/site";

/**
 * Home hero — daytime aviation.
 * Azure sky gradient, drifting clouds, an aircraft crossing with its contrail,
 * and a runway-inspired horizon band at the bottom.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yPlane = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden bg-hero-gradient text-white">
      <SkyLayer tone="day" />

      {/* Aircraft climbing across the sky, pulled by scroll */}
      <motion.div
        aria-hidden
        style={{ y: yPlane }}
        className="absolute right-[8%] top-[16%] hidden -rotate-[18deg] text-white/90 drop-shadow-lg md:block"
      >
        <Plane size={52} fill="currentColor" strokeWidth={0} />
      </motion.div>

      {/* Runway horizon band */}
      <div aria-hidden className="absolute inset-x-0 bottom-0">
        <div className="h-24 bg-gradient-to-t from-navy-800/90 to-transparent" />
        <div className="absolute bottom-0 h-10 w-full bg-navy-900" />
        {/* runway centerline */}
        <div className="absolute bottom-[18px] left-1/2 flex -translate-x-1/2 gap-6">
          {Array.from({ length: 9 }, (_, i) => (
            <span key={i} className="h-1 w-10 rounded-full bg-white/60" />
          ))}
        </div>
      </div>

      <motion.div style={{ y: yText, opacity }} className="container-site relative z-10 pb-36 pt-32 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-medium tracking-wide text-white backdrop-blur-md"
        >
          <Plane size={13} /> École Centrale Casablanca · Aeronautical engineering club
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mx-auto max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          Exploring the sky <span className="text-accent-100">and beyond.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg"
        >
          We design aircraft, build drones and train on real flight procedures. {SITE.abbr} is where
          the engineers who will build what flies next take off — starting on campus.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="/join" className="btn bg-white text-navy-700 hover:bg-accent-50 hover:shadow-glow">
            Join the Club <ArrowRight size={16} />
          </Link>
          <Link
            href="/projects"
            className="btn border border-white/30 bg-white/10 text-white backdrop-blur-md hover:border-white/60"
          >
            See our projects
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-14 left-1/2 z-10 -translate-x-1/2 text-white/70"
      >
        <ChevronDown size={22} />
      </motion.div>
    </section>
  );
}
