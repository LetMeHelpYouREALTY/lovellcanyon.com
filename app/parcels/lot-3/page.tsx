import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import LandPageHeroSection from "@/components/land/LandPageHeroSection";
import LandCta from "@/components/land/LandCta";
import ParcelDetailCard from "@/components/land/ParcelDetailCard";
import { LandRelatedPages } from "@/components/land/LandRelatedPages";
import { LandBreadcrumbs } from "@/components/land/LandBreadcrumbs";
import { getLovellCanyonPageMetadataWithHero } from "@/lib/lovell-canyon-seo";
import { getParcelBySlug } from "@/lib/lovell-canyon-parcels";
import { getParcelOverviewCopy } from "@/lib/lovell-canyon-parcel-copy";
import { LOVELL_CANYON_BREADCRUMBS } from "@/lib/lovell-canyon-breadcrumbs";
import {
  getLovellCanyonBreadcrumbSchema,
  getLovellCanyonParcelListingSchema,
} from "@/lib/lovell-canyon-schema";
import { getLovellCanyonPageHero } from "@/lib/lovell-canyon-media";
import { getSiteUrl } from "@/lib/site-url";
import BelowHeroEngagement from "@/components/sections/BelowHeroEngagement";

const parcel = getParcelBySlug("lot-3");
const pathname = "/parcels/lot-3";

export async function generateMetadata(): Promise<Metadata> {
  if (!parcel) return {};
  return getLovellCanyonPageMetadataWithHero(
    pathname,
    `Lovell Canyon Lot 3 Land | APN ${parcel.apn} | Clark County NV 89124`,
    `Fee simple raw land — Lot 3, APN ${parcel.apn}, Lovell Canyon NV 89124. Schedule A legal description, title vesting, and property tax status.`
  );
}

export default async function Lot3Page() {
  if (!parcel) notFound();

  const hero = await getLovellCanyonPageHero(pathname);
  const listingSchema = getLovellCanyonParcelListingSchema(parcel, getSiteUrl(), pathname, {
    imageUrl: hero?.url,
  });
  const breadcrumbSchema = getLovellCanyonBreadcrumbSchema(LOVELL_CANYON_BREADCRUMBS.lot3);
  const overview = getParcelOverviewCopy(parcel);

  const relatedPages = [
    { href: "/parcels/lot-2", label: "Lot 2", desc: "Adjacent parcel APN 135-31-801-006" },
    { href: "/parcels", label: "Both parcels", desc: "Overview of Lot 2 & Lot 3" },
    { href: "/89124-land", label: "89124 land", desc: "Zip code context" },
    { href: "/location", label: "Location", desc: "Map & GPS coordinates" },
    { href: "/access", label: "Access", desc: "NV-160 directions" },
    { href: "/title-report", label: "Title report", desc: "Schedule A & B" },
    { href: "/buying-raw-land", label: "Buying guide", desc: "Due diligence steps" },
    { href: "/faq", label: "FAQ", desc: "Common questions" },
    { href: "/contact", label: "Contact", desc: "Inquire about Lot 3" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listingSchema) }}
      />
      <Navbar />
      <LandBreadcrumbs items={LOVELL_CANYON_BREADCRUMBS.lot3} />
      <main>
        <LandPageHeroSection
          pathname={pathname}
          badge="Lot 3"
          title={`Lovell Canyon Lot 3 — APN ${parcel.apn}`}
          subtitle={`Fee simple raw land in Section 31, T20S R57E, Clark County, Nevada 89124.`}
        />

        <BelowHeroEngagement />
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-3xl space-y-4 text-slate-700 text-lg leading-relaxed">
            {overview.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
            <p>
              <Link href="/title-report" className="text-blue-600 font-semibold hover:underline">
                Read the title report summary
              </Link>{" "}
              for Schedule A legal descriptions and Schedule B exceptions.
            </p>
          </div>
        </section>
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 max-w-3xl">
            <ParcelDetailCard parcel={parcel} showParcelLink={false} />
          </div>
        </section>
        <LandRelatedPages pages={relatedPages} />
        <LandCta headline={`Inquire About Lot 3 (APN ${parcel.apn})`} />
      </main>
      <Footer />
    </>
  );
}
