import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, UserRound } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import { getArticles } from "@/lib/data";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "News",
  description: "Announcements, recaps and stories from Club Aero Centrale Casablanca (CACC).",
};

export default function NewsPage() {
  const articles = getArticles().sort((a, b) => +new Date(b.date) - +new Date(a.date));

  return (
    <>
      <PageHero

        eyebrow="News"
        title="Dispatches from the hangar."
        lead="Announcements, event recaps and stories, published by the communication team."
      />
      <section className="section container-site">
        <div className="grid gap-6 md:grid-cols-2">
          {articles.map((a, i) => (
            <Reveal key={a.id} delay={(i % 2) * 0.1}>
              <Link
                href={`/news/${a.slug}`}
                className="glass group flex h-full flex-col rounded-3xl p-8 shadow-glass-sm transition-transform duration-300 hover:-translate-y-1.5"
              >
                <div className="flex flex-wrap gap-2">
                  {a.tags.map((t) => (
                    <span key={t} className="rounded-full bg-accent-400/15 px-3 py-1 text-[11px] font-semibold text-accent-400">
                      {t}
                    </span>
                  ))}
                </div>
                <h2 className="mt-4 font-display text-xl font-semibold group-hover:text-accent-400">{a.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{a.excerpt}</p>
                <div className="mt-5 flex items-center gap-5 text-xs text-muted">
                  <span className="inline-flex items-center gap-1.5"><CalendarDays size={13} className="text-accent-400" />{formatDate(a.date)}</span>
                  <span className="inline-flex items-center gap-1.5"><UserRound size={13} className="text-accent-400" />{a.author}</span>
                </div>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent-400">
                  Read article <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
