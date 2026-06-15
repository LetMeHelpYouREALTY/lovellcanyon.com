import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import LandPageHeroSection from "@/components/land/LandPageHeroSection";
import LandCta from "@/components/land/LandCta";
import { LandFaqSection } from "@/components/land/LandFaqSection";
import { LandRelatedPages, LOVELL_CANYON_CORE_RELATED_PAGES } from "@/components/land/LandRelatedPages";
import { LandBreadcrumbs } from "@/components/land/LandBreadcrumbs";
import { getLovellCanyonPageMetadataWithHero } from "@/lib/lovell-canyon-seo";
import { LOVELL_CANYON_AREA } from "@/lib/lovell-canyon-area";
import { LOVELL_CANYON_LOCATION, LOVELL_CANYON_PARCELS } from "@/lib/lovell-canyon-parcels";
import { LOVELL_CANYON_BREADCRUMBS } from "@/lib/lovell-canyon-breadcrumbs";
import { FAQ_89124_LAND } from "@/lib/lovell-canyon-hub-faq";
import {
  getLovellCanyonBreadcrumbSchema,
  getLovellCanyonFaqSchema,
  getLovellCanyonParcelListingSchema,
} from "@/lib/lovell-canyon-schema";
import { getSiteUrl } from "@/lib/site-url";
import BelowHeroEngagement from "@/components/sections/BelowHeroEngagement";
import { formatParcelLegalLocation, LAND_GLOSSARY } from "@/lib/lovell-canyon-glossary";

export async function generateMetadata(): Promise<Metadata> {
  return getLovellCanyonPageMetadataWithHero(
    "/89124-land",
    "89124 Land for Sale | Lovell Canyon Clark County NV",
    "Raw land for sale in zip 89124 — Lovell Canyon, Clark County Nevada. Fee simple parcels APN 135-31-801-006 and 007 in Section 31 T20S R57E. Not Pahrump or East Las Vegas."
  );
}

export default function Zip89124LandPage() {
  const siteUrl = getSiteUrl();
  const breadcrumbSchema = getLovellCanyonBreadcrumbSchema(LOVELL_CANYON_BREADCRUMBS.hub89124);
  const faqSchema = getLovellCanyonFaqSchema(FAQ_89124_LAND);
  const listingSchemas = LOVELL_CANYON_PARCELS.map((parcel) =>
    getLovellCanyonParcelListingSchema(parcel, siteUrl, `/parcels/${parcel.slug}`)
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {listingSchemas.map((schema) => (
        <script
          key={schema.identifier}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <Navbar />
      <LandBreadcrumbs items={LOVELL_CANYON_BREADCRUMBS.hub89124} />
      <main>
        <LandPageHeroSection
          pathname="/89124-land"
          badge="Clark County NV 89124"
          title="89124 Land for Sale in Lovell Canyon"
          subtitle={`Fee simple raw land in ${LOVELL_CANYON_LOCATION.locality}, ${LOVELL_CANYON_LOCATION.county}, Nevada ${LOVELL_CANYON_LOCATION.postalCode}.`}
        />

        <BelowHeroEngagement />
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 max-w-3xl space-y-8 text-slate-700 text-lg leading-relaxed">
            <p>
              <strong>89124</strong> is the Clark County zip code for{" "}
              <strong>{LOVELL_CANYON_AREA.name}</strong> in the Spring Mountains west of the Las
              Vegas Valley. This site lists two fee simple raw land parcels — not residential homes,
              not East Las Vegas (89120), and not Pahrump in Nye County (89048).
            </p>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Parcels in 89124</h2>
              <ul className="list-disc pl-6 space-y-2">
                {LOVELL_CANYON_PARCELS.map((parcel) => (
                  <li key={parcel.apn}>
                    <Link
                      href={`/parcels/${parcel.slug}`}
                      className="text-blue-600 font-semibold hover:underline"
                    >
                      {parcel.label}
                    </Link>{" "}
                    — Clark County APN {parcel.apn}, {LAND_GLOSSARY.feeSimplePlain.toLowerCase()}
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                {LAND_GLOSSARY.legalLocationPlain}: {formatParcelLegalLocation()}. Assessor map{" "}
                {LOVELL_CANYON_LOCATION.assessorMap}.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Geographic context</h2>
              <p>{LOVELL_CANYON_AREA.areaContext}</p>
              <p className="mt-4">
                Primary access: {LOVELL_CANYON_AREA.highwayAccess}. See{" "}
                <Link href="/access" className="text-blue-600 font-semibold hover:underline">
                  driving directions
                </Link>{" "}
                and{" "}
                <Link href="/location" className="text-blue-600 font-semibold hover:underline">
                  map coordinates
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        <LandFaqSection faqs={FAQ_89124_LAND} heading="89124 land FAQ" />
        <LandRelatedPages
          pages={LOVELL_CANYON_CORE_RELATED_PAGES.filter((p) => p.href !== "/89124-land")}
        />
        <LandCta headline="Inquire About 89124 Land Parcels" />
      </main>
      <Footer />
    </>
  );
}
