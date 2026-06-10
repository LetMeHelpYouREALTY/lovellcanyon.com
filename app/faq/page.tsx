import type { Metadata } from "next";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import LandPageHeroSection from "@/components/land/LandPageHeroSection";
import LandCta from "@/components/land/LandCta";
import { LOVELL_CANYON_FAQS } from "@/lib/lovell-canyon-faq";
import { getLovellCanyonFaqSchema } from "@/lib/lovell-canyon-schema";
import { getLovellCanyonPageMetadataWithHero } from "@/lib/lovell-canyon-seo";
import BelowHeroEngagement from "@/components/sections/BelowHeroEngagement";
import { LAND_SECTION_COPY } from "@/lib/lovell-canyon-glossary";

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
        <LandCta />
      </main>
      <Footer />
    </>
  );
}
