import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import LandPageHeroSection from "@/components/land/LandPageHeroSection";
import LandCta from "@/components/land/LandCta";
import ParcelDetailCard from "@/components/land/ParcelDetailCard";
import { getLovellCanyonPageMetadataWithHero } from "@/lib/lovell-canyon-seo";
import { LOVELL_CANYON_LOCATION, LOVELL_CANYON_PARCELS } from "@/lib/lovell-canyon-parcels";
import {
  getLovellCanyonBreadcrumbSchema,
  getLovellCanyonParcelItemListSchema,
  getLovellCanyonParcelListingSchema,
} from "@/lib/lovell-canyon-schema";
import { getSiteUrl } from "@/lib/site-url";
import { getLovellCanyonPageHero } from "@/lib/lovell-canyon-media";
import BelowHeroEngagement from "@/components/sections/BelowHeroEngagement";
import { LAND_SECTION_COPY } from "@/lib/lovell-canyon-glossary";
import { LandRelatedPages } from "@/components/land/LandRelatedPages";
import { LOVELL_CANYON_BREADCRUMBS } from "@/lib/lovell-canyon-breadcrumbs";
import { LandBreadcrumbs } from "@/components/land/LandBreadcrumbs";

export async function generateMetadata(): Promise<Metadata> {
  return getLovellCanyonPageMetadataWithHero(
    "/parcels",
    "Lovell Canyon Land Parcels | Lot 2 & Lot 3 | APN 006 & 007",
    "Fee simple raw land parcels in Lovell Canyon NV 89124. Lot 2 (APN 135-31-801-006) and Lot 3 (APN 135-31-801-007). Legal descriptions and title report summaries."
  );
}

export default async function ParcelsPage() {
  const siteUrl = getSiteUrl();
  const listingSchemas = await Promise.all(
    LOVELL_CANYON_PARCELS.map(async (parcel) => {
      const parcelHero = await getLovellCanyonPageHero(`/parcels/${parcel.slug}`);
      return getLovellCanyonParcelListingSchema(parcel, siteUrl, `/parcels/${parcel.slug}`, {
        ...(parcelHero ? { imagePhoto: parcelHero } : {}),
      });
    })
  );
  const itemListSchema = getLovellCanyonParcelItemListSchema(LOVELL_CANYON_PARCELS, siteUrl);
  const breadcrumbSchema = getLovellCanyonBreadcrumbSchema(LOVELL_CANYON_BREADCRUMBS.parcels);

  const relatedPages = [
    { href: "/89124-land", label: "89124 land", desc: "Zip code hub" },
    { href: "/location", label: "Location", desc: "Map & area context" },
    { href: "/access", label: "Access", desc: "Driving directions" },
    { href: "/title-report", label: "Title report", desc: "Schedule A & B" },
    { href: "/buying-raw-land", label: "Buying guide", desc: "Due diligence" },
    { href: "/faq", label: "FAQ", desc: "Common questions" },
    { href: "/contact", label: "Contact", desc: "Inquire about parcels" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      {listingSchemas.map((schema) => (
        <script
          key={schema.identifier}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <Navbar />
      <LandBreadcrumbs items={LOVELL_CANYON_BREADCRUMBS.parcels} />
      <main className="pt-0">
        <LandPageHeroSection
          pathname="/parcels"
          badge="Two Parcels"
          title="Lovell Canyon Land Parcels"
          subtitle={LAND_SECTION_COPY.parcelsHeroSubtitle}
        />

        <BelowHeroEngagement />
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-8">
              {LOVELL_CANYON_PARCELS.map((parcel) => (
                <ParcelDetailCard key={parcel.apn} parcel={parcel} />
              ))}
            </div>
            <p className="text-center mt-10 text-slate-600">
              Both parcels are in Lovell Canyon, Clark County NV {LOVELL_CANYON_LOCATION.postalCode},{" "}
              {LOVELL_CANYON_LOCATION.section}, {LOVELL_CANYON_LOCATION.township}{" "}
              {LOVELL_CANYON_LOCATION.range}. See{" "}
              <Link href="/89124-land" className="text-blue-600 font-semibold hover:underline">
                89124 land overview
              </Link>
              ,{" "}
              <Link href="/title-report" className="text-blue-600 font-semibold hover:underline">
                title report summary
              </Link>
              , and{" "}
              <Link href="/access" className="text-blue-600 font-semibold hover:underline">
                driving directions
              </Link>
              .
            </p>
          </div>
        </section>
        <LandRelatedPages pages={relatedPages} className="py-12 bg-white border-t border-slate-200" />
        <LandCta />
      </main>
      <Footer />
    </>
  );
}
