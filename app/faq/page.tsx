import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import LandPageHeroSection from "@/components/land/LandPageHeroSection";
import LandCta from "@/components/land/LandCta";
import { LOVELL_CANYON_FAQS } from "@/lib/lovell-canyon-faq";
import { getLovellCanyonFaqSchema } from "@/lib/lovell-canyon-schema";
import { getLovellCanyonPageMetadataWithHero } from "@/lib/lovell-canyon-seo";
import BelowHeroEngagement from "@/components/sections/BelowHeroEngagement";
import { LAND_SECTION_COPY } from "@/lib/lovell-canyon-glossary";
import { LandRelatedPages } from "@/components/land/LandRelatedPages";

export async function generateMetadata(): Promise<Metadata> {
  return getLovellCanyonPageMetadataWithHero(
    "/faq",
    "Lovell Canyon Land FAQ | Parcels, Access & Title",
    "Frequently asked questions about Lovell Canyon raw land parcels APN 135-31-801-006 and 007, access, zip 89124, taxes, and how to inquire."
  );
}

const faqSchema = getLovellCanyonFaqSchema(LOVELL_CANYON_FAQS);

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <main>
        <LandPageHeroSection
          pathname="/faq"
          badge="FAQ"
          title="Lovell Canyon Land FAQ"
          subtitle={LAND_SECTION_COPY.faqHeroSubtitle}
        />

        <BelowHeroEngagement />
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4 max-w-3xl text-slate-700 leading-relaxed">
            <p>
              Answers about Lovell Canyon raw land in Clark County NV 89124 — parcels, access, title,
              taxes, and how to inquire. For zip-code context see{" "}
              <Link href="/89124-land" className="text-blue-600 font-semibold hover:underline">
                89124 land
              </Link>
              ; for buyer due diligence see{" "}
              <Link href="/buying-raw-land" className="text-blue-600 font-semibold hover:underline">
                how to buy raw land
              </Link>
              .
            </p>
          </div>
        </section>
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 max-w-3xl">
            <dl className="space-y-8">
              {LOVELL_CANYON_FAQS.map((faq) => (
                <div key={faq.question} className="bg-white rounded-lg border border-slate-200 p-6">
                  <dt className="text-lg font-bold text-slate-900 mb-3">{faq.question}</dt>
                  <dd className="text-slate-700 leading-relaxed">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
        <LandRelatedPages
          pages={[
            { href: "/89124-land", label: "89124 land", desc: "Zip code hub" },
            { href: "/parcels", label: "Parcels", desc: "Lot 2 & Lot 3" },
            { href: "/access", label: "Access", desc: "Driving directions" },
            { href: "/title-report", label: "Title report", desc: "Schedule A & B" },
            { href: "/lovell-canyon-vs-pahrump", label: "vs Pahrump", desc: "Geography guide" },
            { href: "/contact", label: "Contact", desc: "Inquire about land" },
          ]}
          className="py-12 bg-white border-t border-slate-200"
        />
        <LandCta />
      </main>
      <Footer />
    </>
  );
}
