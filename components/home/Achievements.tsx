import Image from "next/image";
import { Instagram } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import type { Achievement } from "@/lib/types";
import { SITE } from "@/lib/site";

/**
 * Achievements (2025–2026): large photo cards with hover zoom,
 * plus a link to the full archive on Instagram.
 */
export default function Achievements({ items, instagramUrl }: { items: Achievement[]; instagramUrl: string }) {
  return (
    <section className="section border-y hairline bg-section-gradient">
      <div className="container-site">
        <SectionHeader
          eyebrow="Achievements · 2025–2026"
          title="What we've already made happen"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {items.map((a, i) => (
            <Reveal key={a.id} delay={i * 0.12}>
              <article className="glass group overflow-hidden rounded-3xl shadow-glass-sm transition-transform duration-300 hover:-translate-y-1.5">
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={a.image}
                    alt={a.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-navy-900/70 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-sm">
                    {a.period}
                  </span>
                </div>
                <div className="p-7">
                  <h3 className="font-display text-xl font-semibold group-hover:text-accent-400">{a.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{a.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <a href={instagramUrl} target="_blank" rel="noreferrer" className="btn-ghost">
            <Instagram size={16} /> See more achievements on Instagram — {SITE.instagramHandle}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
