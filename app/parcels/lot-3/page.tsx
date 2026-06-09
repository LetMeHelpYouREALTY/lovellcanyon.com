import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import LandPageHeroSection from "@/components/land/LandPageHeroSection";
import LandCta from "@/components/land/LandCta";
import ParcelDetailCard from "@/components/land/ParcelDetailCard";
import { getLovellCanyonPageMetadataWithHero } from "@/lib/lovell-canyon-seo";
import { getParcelBySlug } from "@/lib/lovell-canyon-parcels";
import { getLovellCanyonParcelListingSchema } from "@/lib/lovell-canyon-schema";
import { getSiteUrl } from "@/lib/site-url";
import BelowHeroEngagement from "@/components/sections/BelowHeroEngagement";

const parcel = getParcelBySlug("lot-3");

export async function generateMetadata(): Promise<Metadata> {
  if (!parcel) return {};
  return getLovellCanyonPageMetadataWithHero(
    "/parcels/lot-3",
    `Lovell Canyon Lot 3 Land | APN ${parcel.apn} | Clark County NV 89120`,
    `Fee simple raw land — Lot 3, APN ${parcel.apn}, Lovell Canyon NV 89120. Schedule A legal description, title vesting, and property tax status.`
  );
}

export default function Lot3Page() {
  if (!parcel) notFound();

  const listingSchema = getLovellCanyonParcelListingSchema(
    parcel,
    getSiteUrl(),
    "/parcels/lot-3"
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listingSchema) }}
      />
      <Navbar />
      <main>
        <LandPageHeroSection
          pathname="/parcels/lot-3"
          badge="Lot 3"
          title={`Lovell Canyon Lot 3 — APN ${parcel.apn}`}
          subtitle="Fee simple land in Section 31, T20S R57E, Clark County, Nevada 89120."
        />

        <BelowHeroEngagement />
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 max-w-3xl">
            <ParcelDetailCard parcel={parcel} showParcelLink={false} />
          </div>
        </section>
        <LandCta headline={`Inquire About Lot 3 (APN ${parcel.apn})`} />
      </main>
      <Footer />
    </>
  );
}
