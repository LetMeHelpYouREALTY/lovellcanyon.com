import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import LandPageHeroSection from "@/components/land/LandPageHeroSection";
import LandCta from "@/components/land/LandCta";
import ParcelDetailCard from "@/components/land/ParcelDetailCard";
import { getLovellCanyonPageMetadataWithHero } from "@/lib/lovell-canyon-seo";
import { LOVELL_CANYON_LOCATION, LOVELL_CANYON_PARCELS } from "@/lib/lovell-canyon-parcels";
import { getLovellCanyonParcelListingSchema } from "@/lib/lovell-canyon-schema";
import { getSiteUrl } from "@/lib/site-url";
import BelowHeroEngagement from "@/components/sections/BelowHeroEngagement";
import { LAND_SECTION_COPY } from "@/lib/lovell-canyon-glossary";

export async function generateMetadata(): Promise<Metadata> {
  return getLovellCanyonPageMetadataWithHero(
    "/parcels",
    "Lovell Canyon Land Parcels | Lot 2 & Lot 3 | APN 006 & 007",
    "Fee simple raw land parcels in Lovell Canyon NV 89124. Lot 2 (APN 135-31-801-006) and Lot 3 (APN 135-31-801-007). Legal descriptions and title report summaries."
  );
}

export default function ParcelsPage() {
  const siteUrl = getSiteUrl();
  const listingSchemas = LOVELL_CANYON_PARCELS.map((parcel) =>
    getLovellCanyonParcelListingSchema(parcel, siteUrl, `/parcels/${parcel.slug}`)
  );

  return (
    <>
      {listingSchemas.map((schema) => (
        <script
          key={schema.identifier}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <Navbar />
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
              <Link href="/title-report" className="text-blue-600 font-semibold hover:underline">
                View full title report summary
              </Link>
              {" · "}
              <Link href="/access" className="text-blue-600 font-semibold hover:underline">
                Driving directions
              </Link>
            </p>
          </div>
        </section>
        <LandCta />
      </main>
      <Footer />
    </>
  );
}
