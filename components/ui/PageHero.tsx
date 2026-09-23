"use client";

import SkyLayer from "@/components/effects/SkyLayer";
import StarField from "@/components/effects/StarField";
import { useTheme } from "@/components/layout/ThemeProvider";
import Reveal from "./Reveal";

type Props = { eyebrow: string; title: string; lead?: string };

/** Compact hero used on interior pages — adapts to day/night theme. */
export default function PageHero({ eyebrow, title, lead }: Props) {
  const { theme } = useTheme();
  const isNight = theme === "dark";

  return (
    <section
      className={`relative overflow-hidden pb-16 pt-36 text-white transition-colors duration-700 md:pb-24 md:pt-44 ${
        isNight ? "bg-night-gradient" : "bg-hero-gradient"
      }`}
    >
      {isNight ? <StarField count={60} /> : <SkyLayer tone="day" />}
      <div className="container-site relative">
        <Reveal>
          <p className="eyebrow !text-white/90">{eyebrow}</p>
          <h1 className="h-display max-w-3xl !text-4xl md:!text-6xl">{title}</h1>
          {lead && <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">{lead}</p>}
        </Reveal>
      </div>
    </section>
  );
}
