import type { Metadata } from "next";
import { Compass, Eye, HeartHandshake, Lightbulb, Target, Users, Wrench } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About",
  description: "Who we are: the aeronautics & aerospace club of École Centrale Casablanca.",
};

const VALUES = [
  { icon: Wrench, title: "Build first", text: "Theory earns its place when it flies. We learn by designing, prototyping and testing real hardware." },
  { icon: Users, title: "Crew mindset", text: "Aircraft are never built alone. Every project runs like a crew: clear roles, shared checklists, collective wins." },
  { icon: Lightbulb, title: "Curiosity at altitude", text: "From airfoils to orbits, we stay students of the sky — asking better questions each year." },
  { icon: HeartHandshake, title: "Open cockpit", text: "No prerequisites, no gatekeeping. Any Centralien with the passion gets a seat and the training to use it." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero

        eyebrow="About us"
        title="A student club run like an aviation company."
        lead="Club Aero Centrale Casablanca (CACC) is the aeronautical engineering association of École Centrale Casablanca — aviation first, space always on the horizon. A place where students turn a fascination with flight into projects, events and careers."
      />

      {/* Presentation */}
      <section className="section container-site">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <SectionHeader
            eyebrow="Who we are"
            title="From campus workshop to the edge of space"
            lead="Founded in 2019, the club brings together students across all years around two technical departments — Aeronautics and Aerospace — supported by events, sponsoring, communication and design teams. We build aircraft and rockets, host conferences with industry figures, run astronomy nights with our own telescope, and organize Space Day, our flagship event dedicated to AI, Earth observation and space engineering."
          />
          <Reveal direction="right">
            <div className="glass rounded-3xl p-8">
              <ul className="space-y-5">
                {[
                  ["2019", "Club founded at École Centrale Casablanca"],
                  ["2", "technical departments: Aeronautics & Aerospace"],
                  ["1", "telescope — and a campus rooftop that became an observatory"],
                  ["∞", "curiosity, from first solder joint to first launch"],
                ].map(([k, v]) => (
                  <li key={v} className="flex items-baseline gap-4">
                    <span className="font-display text-2xl font-semibold text-accent-400">{k}</span>
                    <span className="text-sm text-muted">{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="section border-y hairline bg-section-gradient">
        <div className="container-site grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="glass h-full rounded-3xl p-8 md:p-10">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent-400/15 text-accent-400">
                <Target size={22} />
              </span>
              <h2 className="mt-5 font-display text-2xl font-semibold">Our Mission</h2>
              <p className="mt-3 leading-relaxed text-muted">
                Give every Centrale Casablanca student a hands-on path into aeronautics and space:
                real projects, real hardware, real industry contact — regardless of prior experience.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="glass h-full rounded-3xl p-8 md:p-10">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent-400/15 text-accent-400">
                <Eye size={22} />
              </span>
              <h2 className="mt-5 font-display text-2xl font-semibold">Our Vision</h2>
              <p className="mt-3 leading-relaxed text-muted">
                Become the reference student aerospace club in Morocco: a launchpad where campus
                projects reach national competitions, industry partnerships and — one day — orbit.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="section container-site">
        <SectionHeader center eyebrow="Our values" title="How we fly" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="glass h-full rounded-3xl p-7 text-center transition-transform duration-300 hover:-translate-y-1.5">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-accent-400/15 text-accent-400">
                  <v.icon size={20} />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Compass CTA */}
      <section className="section border-t hairline">
        <div className="container-site text-center">
          <Reveal>
            <Compass className="mx-auto mb-4 text-accent-400" size={30} />
            <p className="mx-auto max-w-xl font-display text-xl font-semibold">
              “Exploring the sky and beyond” isn't a slogan — it's the flight plan.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
