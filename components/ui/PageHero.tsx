import SkyLayer from "@/components/effects/SkyLayer";
import Reveal from "./Reveal";

type Props = { eyebrow: string; title: string; lead?: string };

/** Compact daytime-sky hero used on interior pages. */
export default function PageHero({ eyebrow, title, lead }: Props) {
  return (
    <section className="relative overflow-hidden bg-hero-gradient pb-16 pt-36 text-white md:pb-24 md:pt-44">
      <SkyLayer tone="day" />
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
