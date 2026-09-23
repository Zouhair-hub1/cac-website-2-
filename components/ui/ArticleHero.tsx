"use client";

import Link from "next/link";
import { ArrowLeft, CalendarDays, UserRound } from "lucide-react";
import SkyLayer from "@/components/effects/SkyLayer";
import StarField from "@/components/effects/StarField";
import { useTheme } from "@/components/layout/ThemeProvider";
import { formatDate } from "@/lib/format";
import Reveal from "./Reveal";

type Props = { title: string; date: string; author: string };

/** Article page hero — adapts to day/night theme. */
export default function ArticleHero({ title, date, author }: Props) {
  const { theme } = useTheme();
  const isNight = theme === "dark";

  return (
    <section
      className={`relative overflow-hidden pb-14 pt-36 text-white transition-colors duration-700 md:pt-44 ${
        isNight ? "bg-night-gradient" : "bg-hero-gradient"
      }`}
    >
      {isNight ? <StarField count={60} /> : <SkyLayer tone="day" />}
      <div className="container-site relative">
        <Reveal>
          <Link
            href="/news"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-accent-300 hover:text-accent-200"
          >
            <ArrowLeft size={15} /> All news
          </Link>
          <h1 className="h-display max-w-3xl">{title}</h1>
          <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-white/80">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={14} className="text-accent-400" />
              {formatDate(date)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <UserRound size={14} className="text-accent-400" />
              {author}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
