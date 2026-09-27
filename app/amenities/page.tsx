import type { Metadata } from "next";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import LandPageHeroSection from "@/components/land/LandPageHeroSection";
import LandCta from "@/components/land/LandCta";
import { LandBreadcrumbs } from "@/components/land/LandBreadcrumbs";
import { LandFaqSection } from "@/components/land/LandFaqSection";
import { LandRelatedPages, LOVELL_CANYON_CORE_RELATED_PAGES } from "@/components/land/LandRelatedPages";
import CommunityAmenityMap from "@/components/maps/CommunityAmenityMap";
import { getLovellCanyonPageMetadataWithHero } from "@/lib/lovell-canyon-seo";
import { LOVELL_CANYON_AREA } from "@/lib/lovell-canyon-area";
import { LOVELL_CANYON_AMENITY_CITY, LOVELL_CANYON_AMENITY_PAGE_PATH } from "@/lib/lovell-canyon-amenity-config";
import {
  LOVELL_CANYON_AMENITIES_FAQ,
  LOVELL_CANYON_AMENITY_WRITTEN_SECTIONS,
} from "@/lib/lovell-canyon-amenity-places";
import {
  getLovellCanyonAmenitiesBreadcrumbs,
  getLovellCanyonAmenitiesPageGraph,
} from "@/lib/lovell-canyon-amenities-schema";
import { LOVELL_CANYON_BRAND } from "@/lib/lovell-canyon-brand";

export async function generateMetadata(): Promise<Metadata> {
  return getLovellCanyonPageMetadataWithHero(
    LOVELL_CANYON_AMENITY_PAGE_PATH,
    `Nearby Amenities in ${LOVELL_CANYON_AREA.name}, ${LOVELL_CANYON_AMENITY_CITY} | Clark County NV`,
    `Map and guide to parks, dining, healthcare, and valley services near Lovell Canyon NV 89124 raw land. Plan NV-160 stops and Las Vegas errands before visiting the canyon.`
  );
}

export default function AmenitiesPage() {
  const breadcrumbs = getLovellCanyonAmenitiesBreadcrumbs();
  const schema = getLovellCanyonAmenitiesPageGraph();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Navbar />
      <main>
        <LandPageHeroSection
          pathname={LOVELL_CANYON_AMENITY_PAGE_PATH}
          badge="Clark County NV 89124"
          title={`Nearby Amenities in ${LOVELL_CANYON_AREA.name}, ${LOVELL_CANYON_AMENITY_CITY}`}
          subtitle="Interactive map, verified place references, and buyer FAQs for land in the Spring Mountains west of the valley."
        />

        <div className="container mx-auto px-4 max-w-5xl py-6">
          <LandBreadcrumbs items={breadcrumbs} />
        </div>

        <section className="pb-12 md:pb-16 bg-white" aria-labelledby="amenity-map-heading">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 id="amenity-map-heading" className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
              Interactive amenity map
            </h2>
            <CommunityAmenityMap showStaticList initialCategory="parks" />
          </div>
        </section>

        <section className="py-16 md:py-20 bg-slate-50 border-y border-slate-200">
          <div className="container mx-auto px-4 max-w-3xl space-y-12">
            {LOVELL_CANYON_AMENITY_WRITTEN_SECTIONS.map((section) => (
              <article key={section.id}>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">{section.title}</h2>
                {section.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-slate-700 text-lg leading-relaxed mt-4 first:mt-0">
                    {paragraph}
                  </p>
                ))}
              </article>
            ))}
          </div>
        </section>

        <LandFaqSection
          heading="Lovell Canyon amenities FAQ"
          faqs={LOVELL_CANYON_AMENITIES_FAQ}
          className="py-16 md:py-20 bg-white"
        />

        <LandCta
          headline={`Questions about land near ${LOVELL_CANYON_AREA.name}?`}
          subheadline={LOVELL_CANYON_BRAND.ctaSubheadline}
        />

        <LandRelatedPages
          pages={[
            { href: LOVELL_CANYON_AMENITY_PAGE_PATH, label: "Amenities", desc: "This guide" },
            ...LOVELL_CANYON_CORE_RELATED_PAGES.filter((p) => p.href !== LOVELL_CANYON_AMENITY_PAGE_PATH),
          ]}
          heading="More Lovell Canyon land resources"
        />
      </main>
      <Footer />
    </>
  );
}
