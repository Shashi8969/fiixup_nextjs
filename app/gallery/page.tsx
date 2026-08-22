import type { Metadata } from "next";
import { getStaticPageSEO } from "@/lib/data/seo";
import { galleryPageSchema, jsonLdString } from "@/lib/schema";
import { PageHero } from "@/components/ui/PageHero";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { getGalleryImages } from "@/lib/gallery";
import { metadataFromBasicSeo } from "@/lib/seo/metadata";

export const revalidate = 3600; // refreshes every 1 hour

const seo = getStaticPageSEO("gallery")!;

export const metadata: Metadata = metadataFromBasicSeo({
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  canonical: seo.canonical,
  path: "/gallery",
  ogImageAlt: seo.ogTitle ?? seo.title,
});

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(
            galleryPageSchema(images.map((img) => ({ imageUrl: img.imageUrl, title: img.title, altText: img.altText })))
          ),
        }}
      />
      <PageHero
        heading="Our Work"
        subtext="Real doorstep car & bike repairs completed by Fiixup's certified technicians — see the quality for yourself."
      />
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <GalleryGrid images={images} />
        </div>
      </section>
    </>
  );
}
