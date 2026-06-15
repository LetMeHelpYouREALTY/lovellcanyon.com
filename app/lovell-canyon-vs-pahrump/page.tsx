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
import { LOVELL_CANYON_LOCATION } from "@/lib/lovell-canyon-parcels";
import { LOVELL_CANYON_BREADCRUMBS } from "@/lib/lovell-canyon-breadcrumbs";
import { FAQ_LOVELL_CANYON_VS_PAHRUMP } from "@/lib/lovell-canyon-hub-faq";
import { getLovellCanyonBreadcrumbSchema, getLovellCanyonFaqSchema } from "@/lib/lovell-canyon-schema";
import BelowHeroEngagement from "@/components/sections/BelowHeroEngagement";

export async function generateMetadata(): Promise<Metadata> {
  return getLovellCanyonPageMetadataWithHero(
    "/lovell-canyon-vs-pahrump",
    "Lovell Canyon vs Pahrump | Clark County vs Nye County Land",
    "Lovell Canyon is Clark County NV 89124 west of Las Vegas — not Pahrump (Nye County 89048). NV-160 access explained for Nevada land buyers."
  );
}

export default function LovellCanyonVsPahrumpPage() {
  const breadcrumbSchema = getLovellCanyonBreadcrumbSchema(LOVELL_CANYON_BREADCRUMBS.vsPahrump);
  const faqSchema = getLovellCanyonFaqSchema(FAQ_LOVELL_CANYON_VS_PAHRUMP);

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
      <LandBreadcrumbs items={LOVELL_CANYON_BREADCRUMBS.vsPahrump} />
      <main>
        <LandPageHeroSection
          pathname="/lovell-canyon-vs-pahrump"
          badge="Geography"
          title="Lovell Canyon vs Pahrump"
          subtitle="Clark County 89124 (Spring Mountains) is not Nye County / Pahrump 89048."
        />

        <BelowHeroEngagement />
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 max-w-3xl space-y-8 text-slate-700 text-lg leading-relaxed">
            <p>
              Searchers often confuse <strong>Lovell Canyon</strong> with <strong>Pahrump</strong> because
              both are reached from Las Vegas via <strong>NV-160</strong>, locally signed as the Pahrump
              Highway. The parcels on this site are in <strong>{LOVELL_CANYON_LOCATION.county}</strong>, zip{" "}
              <strong>{LOVELL_CANYON_LOCATION.postalCode}</strong> — not in Nye County.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-base border border-slate-200 rounded-lg">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="p-3 font-semibold text-slate-900"> </th>
                    <th className="p-3 font-semibold text-slate-900">Lovell Canyon</th>
                    <th className="p-3 font-semibold text-slate-900">Pahrump</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="p-3 font-medium">County</td>
                    <td className="p-3">Clark County</td>
                    <td className="p-3">Nye County</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Example zip</td>
                    <td className="p-3">89124</td>
                    <td className="p-3">89048, 89060</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Setting</td>
                    <td className="p-3">Spring Mountains, west of Las Vegas Valley</td>
                    <td className="p-3">Desert valley east of Spring Mountains</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">This site&apos;s parcels</td>
                    <td className="p-3">Yes — Lot 2 &amp; Lot 3</td>
                    <td className="p-3">No</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>{LOVELL_CANYON_AREA.areaContext}</p>
            <p>
              Turn north on paved Lovell Canyon Road from NV-160 <em>before</em> continuing west into
              Nye County. See{" "}
              <Link href="/access" className="text-blue-600 font-semibold hover:underline">
                access directions
              </Link>{" "}
              and{" "}
              <Link href="/89124-land" className="text-blue-600 font-semibold hover:underline">
                89124 land overview
              </Link>
              .
            </p>
          </div>
        </section>

        <LandFaqSection faqs={FAQ_LOVELL_CANYON_VS_PAHRUMP} heading="Lovell Canyon vs Pahrump FAQ" />
        <LandRelatedPages
          pages={LOVELL_CANYON_CORE_RELATED_PAGES.filter(
            (p) => p.href !== "/lovell-canyon-vs-pahrump"
          )}
        />
        <LandCta headline="Ask About Clark County 89124 Land" />
      </main>
      <Footer />
    </>
  );
}
