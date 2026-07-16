import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import MasonryGallery from "@/components/ui/MasonryGallery";
import { getGallery } from "@/lib/data";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos from conferences, workshops, visits and competitions.",
};

export default function GalleryPage() {
  const items = getGallery();
  return (
    <>
      <PageHero

        eyebrow="Gallery"
        title="The club, frame by frame."
        lead="Conferences, workshops, company visits and competitions — captured by our communication and design teams."
      />
      <section className="section container-site">
        <MasonryGallery items={items} />
      </section>
    </>
  );
}
