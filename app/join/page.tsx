import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import JoinForm from "@/components/ui/JoinForm";
import Faq from "@/components/ui/Faq";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import { getFaq } from "@/lib/data";

export const metadata: Metadata = {
  title: "Join Us",
  description: "Apply to join Centrale Aero Club (CAC) — no prior aerospace experience required.",
};

export default function JoinPage() {
  return (
    <>
      <PageHero

        eyebrow="Recruitment"
        title="Your seat is waiting."
        lead="No prior aerospace experience required — bring the curiosity, we provide the workshops, the hardware and the crew."
      />
      <section className="section container-site">
        <JoinForm />
      </section>
      <section className="section border-t hairline bg-section-gradient">
        <div className="container-site">
          <SectionHeader center eyebrow="Before applying" title="Common questions" />
          <Reveal className="mt-12">
            <Faq items={getFaq()} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
