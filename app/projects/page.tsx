import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ProjectsGrid from "@/components/ui/ProjectsGrid";
import { getProjects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects",
  description: "Current and past projects of Club Aero Centrale Casablanca (CACC): drones, RC aircraft, rockets, CubeSat, flight simulation and workshops.",
};

export default function ProjectsPage() {
  const projects = getProjects();
  return (
    <>
      <PageHero

        eyebrow="Hangar"
        title="Everything on the workbench."
        lead="Drones, RC aircraft, rockets, a CubeSat study, a flight-sim corner and a full workshop series — filter by department, open a card, see the details."
      />
      <section className="section container-site">
        <ProjectsGrid projects={projects} />
      </section>
    </>
  );
}
