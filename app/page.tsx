import Link from "next/link";
import { ArrowRight, Orbit, Plane, Telescope } from "lucide-react";
import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import Achievements from "@/components/home/Achievements";
import VisionGrid from "@/components/home/VisionGrid";
import InstagramFeed from "@/components/home/InstagramFeed";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import ProjectCard from "@/components/ui/ProjectCard";
import Countdown from "@/components/ui/Countdown";
import WorldMap from "@/components/ui/WorldMap";
import PartnerMarquee from "@/components/ui/PartnerMarquee";
import Testimonials from "@/components/ui/Testimonials";
import Faq from "@/components/ui/Faq";
import NewsletterForm from "@/components/ui/NewsletterForm";
import SkyLayer from "@/components/effects/SkyLayer";
import ScrollPlane from "@/components/effects/ScrollPlane";
import { SITE } from "@/lib/site";
import {
  getAchievements,
  getFaq,
  getNextEvent,
  getPartners,
  getProjects,
  getSettings,
  getTestimonials,
  getVision,
} from "@/lib/data";

export default function HomePage() {
  const projects = getProjects().filter((p) => p.status === "In progress").slice(0, 3);
  const nextEvent = getNextEvent();
  const partners = getPartners();
  const testimonials = getTestimonials();
  const faq = getFaq();
  const settings = getSettings();
  const achievements = getAchievements();
  const vision = getVision();

  return (
    <>
      <ScrollPlane />
      <Hero />
      <Stats />

      {/* Departments teaser */}
      <section className="section container-site">
        <SectionHeader
          eyebrow="What we do"
          title="Two departments, one obsession: flight."
          lead="From the runway to low Earth orbit, every member finds an altitude that fits."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[
            {
              icon: Plane,
              title: "Aeronautics",
              href: "/departments/aeronautics",
              text: "RC aircraft, drones, flight simulation and everything aerodynamic. Design it, build it, fly it.",
            },
            {
              icon: Orbit,
              title: "Aerospace",
              href: "/departments/aerospace",
              text: "Rockets, CubeSat concepts, orbital mechanics — and astronomy nights with the club telescope.",
            },
          ].map((d, i) => (
            <Reveal key={d.title} delay={i * 0.12}>
              <Link
                href={d.href}
                className="glass group block h-full rounded-3xl p-8 shadow-glass-sm transition-transform duration-300 hover:-translate-y-1.5"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent-400/15 text-accent-400 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                  <d.icon size={22} />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold group-hover:text-accent-400">
                  {d.title} Department
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{d.text}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent-400">
                  Explore <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Achievements 2025–2026 */}
      <Achievements items={achievements} instagramUrl={settings.instagram} />

      {/* Vision for this year — planned initiatives, no dates */}
      <VisionGrid items={vision} />

      {/* Featured projects */}
      <section className="section border-t hairline">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeader
              eyebrow="On the workbench"
              title="Projects in progress"
              lead="Hardware, software and everything in between — built by members, for the sky."
            />
            <Reveal delay={0.15}>
              <Link href="/projects" className="btn-ghost">
                All projects <ArrowRight size={15} />
              </Link>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Countdown to next event — night-approach contrast section */}
      {nextEvent && (
        <section className="relative overflow-hidden bg-night-gradient py-24 text-white">
          <SkyLayer tone="night" />
          <div className="container-site relative">
            <Reveal>
              <Countdown target={nextEvent.date} title={nextEvent.title} />
            </Reveal>
            <Reveal delay={0.15} className="mt-8 text-center">
              <Link href="/events" className="btn-ghost !text-white">
                Full event calendar <ArrowRight size={15} />
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* Interactive world map */}
      <section className="section container-site">
        <SectionHeader
          center
          eyebrow="The industry we aim for"
          title="A world of aerospace, one hub at a time"
          lead="Hover the pulses to explore the companies and agencies that inspire our projects — starting from our own runway in Casablanca."
        />
        <Reveal className="mt-12">
          <WorldMap />
        </Reveal>
      </section>

      {/* Partners */}
      <section className="section border-y hairline">
        <div className="container-site">
          <SectionHeader
            center
            eyebrow="Partners"
            title="Backed by the people who build aircraft"
          />
        </div>
        <div className="mt-12">
          <PartnerMarquee partners={partners} />
        </div>
      </section>

      {/* Testimonials */}
      <section className="section container-site">
        <SectionHeader center eyebrow="Crew voices" title="Why members stay" />
        <Reveal className="mt-12">
          <Testimonials items={testimonials} />
        </Reveal>
      </section>

      {/* Instagram */}
      <section className="section border-t hairline bg-section-gradient">
        <div className="container-site">
          <SectionHeader center eyebrow="Mission log" title="Latest from Instagram" />
          <div className="mt-12">
            <InstagramFeed handle={SITE.instagramHandle} url={settings.instagram} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section container-site">
        <SectionHeader center eyebrow="Questions" title="Before you board" />
        <Reveal className="mt-12">
          <Faq items={faq} />
        </Reveal>
      </section>

      {/* Newsletter CTA */}
      <section className="relative overflow-hidden bg-night-gradient py-24 text-white">
        <SkyLayer tone="night" />
        <div className="container-site relative text-center">
          <Reveal>
            <h2 className="h-display">Ready for takeoff?</h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              Join the club, or subscribe to hear about the next flight, conference and observation night.
            </p>
            <div className="mt-8 flex flex-col items-center gap-5">
              <Link href="/join" className="btn-primary">
                Join the Club <ArrowRight size={16} />
              </Link>
              <NewsletterForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
