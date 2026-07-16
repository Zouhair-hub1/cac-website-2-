import type { Partner } from "@/lib/types";

/** Infinite sponsor carousel — pure CSS marquee, list duplicated for the loop. */
export default function PartnerMarquee({ partners }: { partners: Partner[] }) {
  const loop = [...partners, ...partners];
  return (
    <div className="relative overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
      <div className="flex w-max animate-marquee gap-6 hover:[animation-play-state:paused]">
        {loop.map((p, i) => (
          <a
            key={`${p.id}-${i}`}
            href={p.url}
            target="_blank"
            rel="noreferrer"
            className="glass flex h-16 min-w-[180px] items-center justify-center rounded-2xl px-8 font-display text-sm font-semibold tracking-wide text-muted transition-colors hover:text-accent-400"
          >
            {p.name}
          </a>
        ))}
      </div>
    </div>
  );
}
