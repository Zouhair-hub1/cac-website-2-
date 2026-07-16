import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Timeline from "@/components/ui/Timeline";
import { getHistory } from "@/lib/data";

export const metadata: Metadata = {
  title: "History",
  description: "The flight log of Club Aero Centrale Casablanca (CACC): founding, boards, achievements and flagship events.",
};

export default function HistoryPage() {
  const milestones = getHistory();
  return (
    <>
      <PageHero

        eyebrow="Flight log"
        title="Seven years of climbing."
        lead="From a handful of aviation enthusiasts to a structured club with two departments, a telescope and flagship events — this is how we got here."
      />
      <section className="section container-site">
        <Timeline milestones={milestones} />
      </section>
    </>
  );
}
