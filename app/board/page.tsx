import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import MemberCard from "@/components/ui/MemberCard";
import { getMembers } from "@/lib/data";
import type { Member } from "@/lib/types";

export const metadata: Metadata = {
  title: "Executive Board",
  description: "Meet the 2026 bureau of Centrale Aero Club (CAC).",
};

const GROUPS: { team: Member["team"]; title: string; lead: string }[] = [
  { team: "Executive", title: "Executive Team", lead: "The flight deck — steering the club's strategy, coordination and finances." },
  { team: "Events", title: "Events Team", lead: "The crew behind Space Day, Aero Day, conferences and every gathering in between." },
  { team: "Sponsoring", title: "Sponsorship Team", lead: "Building the partnerships that fund our projects and open industry doors." },
  { team: "Communication", title: "Design & Communications Team", lead: "Telling the club's story and shaping its visual identity across every channel." },
  { team: "Aeronautics", title: "Aeronautics Department", lead: "Aircraft, drones and simulation — led by the department head." },
  { team: "Aerospace", title: "Aerospace Department", lead: "Rockets, satellites and astronomy — led by the department head." },
  { team: "IT", title: "IT Department", lead: "Building and maintaining the club's digital infrastructure and website." },
];

export default function BoardPage() {
  const members = getMembers();

  return (
    <>
      <PageHero

        eyebrow="The crew · 2026 mandate"
        title="Meet the Executive Board."
        lead="Twenty-four members across seven teams keep Centrale Aero Club (CAC) flying — from strategy and sponsoring to the workbenches of both departments."
      />

      {GROUPS.map((g, gi) => {
        const team = members.filter((m) => m.team === g.team);
        if (team.length === 0) return null;
        return (
          <section key={g.team} className={`section container-site ${gi > 0 ? "!pt-0" : ""}`}>
            <SectionHeader eyebrow={`0${gi + 1}`} title={g.title} lead={g.lead} />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((m, i) => (
                <MemberCard key={m.id} member={m} index={i} />
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
