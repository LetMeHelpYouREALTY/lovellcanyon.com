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
import { LOVELL_CANYON_BREADCRUMBS } from "@/lib/lovell-canyon-breadcrumbs";
import { FAQ_BUYING_RAW_LAND } from "@/lib/lovell-canyon-hub-faq";
import { getLovellCanyonBreadcrumbSchema, getLovellCanyonFaqSchema } from "@/lib/lovell-canyon-schema";
import { LOVELL_CANYON_PHONE_DISPLAY } from "@/lib/lovell-canyon-contact";
import BelowHeroEngagement from "@/components/sections/BelowHeroEngagement";
import { LAND_GLOSSARY, LAND_SECTION_COPY } from "@/lib/lovell-canyon-glossary";

export async function generateMetadata(): Promise<Metadata> {
  return getLovellCanyonPageMetadataWithHero(
    "/buying-raw-land",
    "How to Buy Raw Land in Clark County NV | Lovell Canyon Guide",
    "Due diligence for buying raw land in Clark County Nevada: title report Schedule A/B, APN verification, access roads, and site visits for Lovell Canyon 89124 parcels."
  );
}

const DUE_DILIGENCE_STEPS = [
  {
    title: "Verify APN and legal description",
    body: "Match Clark County assessor records to title Schedule A. For Lovell Canyon, APNs are 135-31-801-006 (Lot 2) and 135-31-801-007 (Lot 3) in Section 31, T20S R57E.",
  },
  {
    title: "Review title exceptions",
    body: "Read Schedule B for standard exceptions, county road interests, and property tax status before closing.",
  },
  {
    title: "Confirm access",
    body: "Drive NV-160 to Lovell Canyon Road, then local dirt roads. Schedule a showing for current road conditions and parcel boundaries.",
  },
  {
    title: "Research utilities and zoning",
    body: "Raw land may lack water, power, and sewer. Zoning and buildability are confirmed on request — not published until verified.",
  },
  {
    title: "Work with a land specialist",
    body: `Dr. Jan Duffy guides buyers through showings, offers, and closing for these Clark County parcels. Call or text ${LOVELL_CANYON_PHONE_DISPLAY}.`,
  },
] as const;

export default function BuyingRawLandPage() {
  const breadcrumbSchema = getLovellCanyonBreadcrumbSchema(LOVELL_CANYON_BREADCRUMBS.buyingRawLand);
  const faqSchema = getLovellCanyonFaqSchema(FAQ_BUYING_RAW_LAND);

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
      <Navbar />
      <LandBreadcrumbs items={LOVELL_CANYON_BREADCRUMBS.buyingRawLand} />
      <main>
        <LandPageHeroSection
          pathname="/buying-raw-land"
          badge="Buyer guide"
          title="How to Buy Raw Land in Clark County"
          subtitle={`Due diligence steps for fee simple vacant land in Lovell Canyon NV 89124 — ${LAND_GLOSSARY.feeSimplePlain.toLowerCase()}.`}
        />

        <BelowHeroEngagement />
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 max-w-3xl space-y-10 text-slate-700 text-lg leading-relaxed">
            <p>
              Buying raw land in Clark County requires title research, access verification, and
              realistic expectations about utilities. This guide applies to the Lovell Canyon parcels
              on this site and general Nevada vacant-land due diligence.
            </p>
            <ol className="space-y-8 list-none">
              {DUE_DILIGENCE_STEPS.map((step, index) => (
                <li key={step.title} className="border-l-4 border-blue-200 pl-5">
                  <h2 className="text-xl font-bold text-slate-900 mb-2">
                    {index + 1}. {step.title}
                  </h2>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
            <p>
              Read the{" "}
              <Link href="/title-report" className="text-blue-600 font-semibold hover:underline">
                title report summary
              </Link>
              , review{" "}
              <Link href="/parcels" className="text-blue-600 font-semibold hover:underline">
                parcel details
              </Link>
              , and see{" "}
              <Link href="/access" className="text-blue-600 font-semibold hover:underline">
                access directions
              </Link>{" "}
              before scheduling a site visit. {LAND_SECTION_COPY.accessVisitLine(LOVELL_CANYON_PHONE_DISPLAY)}
            </p>
          </div>
        </section>

        <LandFaqSection faqs={FAQ_BUYING_RAW_LAND} heading="Raw land buyer FAQ" />
        <LandRelatedPages
          pages={LOVELL_CANYON_CORE_RELATED_PAGES.filter((p) => p.href !== "/buying-raw-land")}
        />
        <LandCta headline="Schedule a Lovell Canyon Land Showing" />
      </main>
      <Footer />
    </>
  );
}
