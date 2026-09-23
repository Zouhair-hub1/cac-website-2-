"use client";

import Link from "next/link";
import SkyLayer from "@/components/effects/SkyLayer";
import StarField from "@/components/effects/StarField";
import { useTheme } from "@/components/layout/ThemeProvider";

export default function NotFound() {
  const { theme } = useTheme();
  const isNight = theme === "dark";

  return (
    <div
      className={`relative grid min-h-[100svh] place-items-center overflow-hidden text-white transition-colors duration-700 ${
        isNight ? "bg-night-gradient" : "bg-hero-gradient"
      }`}
    >
      {isNight ? <StarField count={60} /> : <SkyLayer tone="day" />}
      <div className="relative text-center">
        <p className="font-display text-7xl font-semibold text-white">404</p>
        <h1 className="mt-3 font-display text-2xl font-semibold">Off the flight path.</h1>
        <p className="mt-3 text-sm text-white/80">This page isn't on our charts — let's vector you back to base.</p>
        <Link href="/" className="btn mt-8 bg-white text-navy-700 hover:bg-accent-50">Return to home</Link>
      </div>
    </div>
  );
}
