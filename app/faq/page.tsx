import type { Metadata } from "next";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import LandPageHero from "@/components/land/LandPageHero";
import LandCta from "@/components/land/LandCta";
import { getLovellCanyonPageMetadata } from "@/lib/lovell-canyon-seo";
import { LOVELL_CANYON_FAQS } from "@/lib/lovell-canyon-faq";

export async function generateMetadata(): Promise<Metadata> {
  return getLovellCanyonPageMetadata(
    "/faq",
    "Lovell Canyon Land FAQ | Parcels, Access & Title",
    "Frequently asked questions about Lovell Canyon raw land parcels APN 135-31-801-006 and 007, access, zip 89120, taxes, and how to inquire."
  );
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: LOVELL_CANYON_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <main>
        <LandPageHero
          badge="FAQ"
          title="Lovell Canyon Land FAQ"
          subtitle="Questions about the parcels, access, title information, and how to inquire."
        />
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
