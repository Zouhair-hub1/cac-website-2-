import type { Metadata } from "next";
import { Handshake } from "lucide-react";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import PartnerMarquee from "@/components/ui/PartnerMarquee";
import { getPartners } from "@/lib/data";

export const metadata: Metadata = {
  title: "Partners",
  description: "The institutions and aerospace companies supporting Centrale Aero Club (CAC).",
};

export default function PartnersPage() {
  const partners = getPartners();
  const tiers = ["Institutional", "Industry", "Community"] as const;

  return (
    <>
      <PageHero

        eyebrow="Partners"
        title="We don't fly alone."
        lead="Institutions and aerospace companies support our projects, host our visits and speak at our events."
      />

      <section className="section container-site !pb-8">
        <PartnerMarquee partners={partners} />
      </section>

      {tiers.map((tier) => {
        const list = partners.filter((p) => p.tier === tier);
        if (!list.length) return null;
        return (
          <section key={tier} className="section container-site !pt-10">
            <SectionHeader eyebrow={tier} title={`${tier} partners`} />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.06}>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="glass group flex h-28 items-center justify-center rounded-3xl font-display text-lg font-semibold text-muted transition-all hover:-translate-y-1 hover:text-accent-400"
                  >
                    {p.name}
                  </a>
                </Reveal>
              ))}
            </div>
          </section>
        );
      })}

      <section className="section border-t hairline">
        <div className="container-site text-center">
          <Reveal>
            <Handshake className="mx-auto mb-4 text-accent-400" size={30} />
            <h2 className="h-display">Partner with us</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Sponsor a project, host a visit or speak at an event — our sponsoring team will get back to you within days.
            </p>
            <Link href="/contact" className="btn-primary mt-8">
              Contact the sponsoring team
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
