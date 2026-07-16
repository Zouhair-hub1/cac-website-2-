import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, UserRound } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SkyLayer from "@/components/effects/SkyLayer";
import { getArticles } from "@/lib/data";
import { formatDate } from "@/lib/format";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const a = getArticles().find((x) => x.slug === params.slug);
  return { title: a?.title ?? "Article", description: a?.excerpt };
}

export default function ArticlePage({ params }: Props) {
  const article = getArticles().find((a) => a.slug === params.slug);
  if (!article) notFound();

  return (
    <>
      <section className="relative overflow-hidden bg-hero-gradient pb-14 pt-36 text-white md:pt-44">
        <SkyLayer tone="day" />
        <div className="container-site relative">
          <Reveal>
            <Link href="/news" className="mb-6 inline-flex items-center gap-1.5 text-sm text-accent-300 hover:text-accent-200">
              <ArrowLeft size={15} /> All news
            </Link>
            <h1 className="h-display max-w-3xl">{article.title}</h1>
            <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-white/80">
              <span className="inline-flex items-center gap-1.5"><CalendarDays size={14} className="text-accent-400" />{formatDate(article.date)}</span>
              <span className="inline-flex items-center gap-1.5"><UserRound size={14} className="text-accent-400" />{article.author}</span>
            </div>
          </Reveal>
        </div>
      </section>

      <article className="section container-site">
        <div className="mx-auto max-w-2xl space-y-6">
          {article.content.split("\n\n").map((para, i) => (
            <Reveal key={i} delay={Math.min(i * 0.05, 0.2)}>
              <p className="leading-relaxed text-muted">{para}</p>
            </Reveal>
          ))}
        </div>
      </article>
    </>
  );
}
