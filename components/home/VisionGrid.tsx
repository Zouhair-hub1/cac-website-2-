import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import type { VisionItem } from "@/lib/types";

/**
 * "Our Vision for This Year" — planned initiatives as modern photo tiles.
 * Deliberately date-free: these are ambitions, not calendar entries.
 */
export default function VisionGrid({ items }: { items: VisionItem[] }) {
  return (
    <section className="section container-site">
      <SectionHeader
        center
        eyebrow="Flight plan"
        title="Our Vision for This Year"
        lead="The initiatives we're preparing — no dates yet, just destinations."
      />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((v, i) => (
          <Reveal key={v.id} delay={(i % 3) * 0.08}>
            <article className="glass group relative h-full overflow-hidden rounded-3xl shadow-glass-sm transition-transform duration-300 hover:-translate-y-1.5">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={v.image}
                  alt={v.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-60" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-semibold group-hover:text-accent-400">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.description}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
