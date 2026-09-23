import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, UserRound } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import ArticleHero from "@/components/ui/ArticleHero";
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
      <ArticleHero title={article.title} date={article.date} author={article.author} />

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
