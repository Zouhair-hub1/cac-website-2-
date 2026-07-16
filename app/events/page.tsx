import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import EventCard from "@/components/ui/EventCard";
import Countdown from "@/components/ui/Countdown";
import { getEvents, getNextEvent } from "@/lib/data";

export const metadata: Metadata = {
  title: "Events",
  description: "Conferences, workshops, company visits, Space Day, Aero Day and astronomy nights.",
};

export default function EventsPage() {
  const events = getEvents().sort((a, b) => +new Date(b.date) - +new Date(a.date));
  const upcoming = events.filter((e) => new Date(e.date) >= new Date()).reverse();
  const past = events.filter((e) => new Date(e.date) < new Date());
  const next = getNextEvent();

  return (
    <>
      <PageHero

        eyebrow="Calendar"
        title="Every launch window, in one place."
        lead="Conferences, workshops, company visits, competitions — plus Space Day, Aero Day and astronomy nights under the club telescope."
      />

      {next && (
        <section className="section container-site !pb-0">
          <Reveal>
            <div className="glass rounded-3xl p-10">
              <Countdown target={next.date} title={next.title} />
            </div>
          </Reveal>
        </section>
      )}

      <section className="section container-site">
        <SectionHeader eyebrow="Upcoming" title="On the flight plan" />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {upcoming.map((e, i) => (
            <EventCard key={e.id} event={e} index={i} />
          ))}
        </div>
      </section>

      <section className="section border-t hairline bg-section-gradient">
        <div className="container-site">
          <SectionHeader eyebrow="Archive" title="Past missions" />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {past.map((e, i) => (
              <EventCard key={e.id} event={e} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
