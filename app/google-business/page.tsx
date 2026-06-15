import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  CheckCircle,
  Users,
  Navigation,
} from "lucide-react";
import type { Metadata } from "next";
import BelowHeroEngagement from "@/components/sections/BelowHeroEngagement";
import BusinessHours from "@/components/land/BusinessHours";
import OfficeMapEmbed from "@/components/maps/OfficeMapEmbed";
import {
  lovellCanyonGbpBusiness,
  lovellCanyonGbpDescription,
  lovellCanyonGbpFaqs,
  lovellCanyonGbpShortDescription,
  generateLovellCanyonGbpFaqSchema,
} from "@/lib/lovell-canyon-gbp";
import { LOVELL_CANYON_BROKERAGE, LOVELL_CANYON_GBP_NAME } from "@/lib/lovell-canyon-brand";
import { LOVELL_CANYON_LOCATION } from "@/lib/lovell-canyon-parcels";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: `GBP Reference | ${LOVELL_CANYON_GBP_NAME}`,
  description: lovellCanyonGbpShortDescription,
  robots: { index: false, follow: true },
  openGraph: {
    title: LOVELL_CANYON_GBP_NAME,
    description: lovellCanyonGbpShortDescription,
    url: `${siteUrl}/google-business`,
    type: "website",
  },
};

export default function GoogleBusinessPage() {
  const faqSchema = generateLovellCanyonGbpFaqSchema();
  const biz = lovellCanyonGbpBusiness;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <section className="max-w-5xl mx-auto mb-16">
            <div className="bg-gradient-to-br from-slate-900 to-blue-900 text-white rounded-2xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div>
                  <p className="text-blue-300 text-sm mb-2 uppercase tracking-wide">
                    Google Business Profile reference
                  </p>
                  <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{biz.name}</h1>
                  <p className="text-xl text-blue-200 mb-2">
                    License {biz.license} · {LOVELL_CANYON_BROKERAGE}
                  </p>
                  <p className="text-slate-300 mb-6">Google Business Profile business name (copy exactly)</p>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-sm text-blue-200">Office (GBP address)</p>
                        <p className="font-medium">{biz.address.streetAddress}</p>
                        <p>
                          {biz.address.addressLocality}, {biz.address.addressRegion}{" "}
                          {biz.address.postalCode}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Navigation className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-sm text-blue-200">Parcel area (89124)</p>
                        <p>
                          {LOVELL_CANYON_LOCATION.locality}, {LOVELL_CANYON_LOCATION.county}{" "}
                          {LOVELL_CANYON_LOCATION.postalCode}
                        </p>
                        <p className="text-slate-400 text-sm mt-1">
                          Not at office address — Spring Mountains west of Las Vegas
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-blue-400 flex-shrink-0" />
                      <a href={`tel:${biz.phone.tel}`} className="font-medium hover:text-blue-300">
                        {biz.phone.display}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                      <a href={`mailto:${biz.email}`} className="hover:text-blue-300">
                        {biz.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 rounded-xl p-6">
                  <h2 className="font-bold text-lg mb-3">GBP description (≤750 chars)</h2>
                  <p className="text-sm text-blue-100 leading-relaxed">
                    {lovellCanyonGbpShortDescription}
                  </p>
                  <a
                    href={`tel:${biz.phone.tel}`}
                    className="mt-6 inline-block w-full text-center bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-bold transition-colors"
                  >
                    Call {biz.phone.display}
                  </a>
                </div>
              </div>
            </div>
          </section>

          <BelowHeroEngagement showCalendly={false} />

          <OfficeMapEmbed />

          <section className="max-w-5xl mx-auto mb-16 px-4">
            <BusinessHours />
          </section>

          <section className="max-w-4xl mx-auto mb-16 space-y-8">
            <h2 className="text-3xl font-bold text-slate-900 text-center">About this listing</h2>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                Who
              </h3>
              <p className="text-slate-700 leading-relaxed">{lovellCanyonGbpDescription.whoWeAre}</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600" />
                What
              </h3>
              <p className="text-slate-700 leading-relaxed">{lovellCanyonGbpDescription.whatWeDo}</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                Where
              </h3>
              <p className="text-slate-700 leading-relaxed">
                {lovellCanyonGbpDescription.whereWeServe}
              </p>
            </div>
          </section>

          <section className="max-w-5xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Land services</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {biz.services.map((service) => (
                <div
                  key={service.name}
                  className="bg-white border border-slate-200 rounded-lg p-4"
                >
                  <h3 className="font-semibold text-slate-900">{service.name}</h3>
                  <p className="text-sm text-slate-600 mt-1">{service.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="max-w-5xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Service areas</h2>
            <ul className="flex flex-wrap gap-3 justify-center">
              {biz.serviceAreas.map((area) => (
                <li
                  key={area}
                  className="bg-blue-50 text-slate-800 px-4 py-2 rounded-full text-sm font-medium"
                >
                  {area}
                </li>
              ))}
            </ul>
          </section>

          <section className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              GBP Q&amp;A suggestions
            </h2>
            <div className="space-y-4">
              {lovellCanyonGbpFaqs.map((faq) => (
                <div key={faq.question} className="bg-white border border-slate-200 rounded-lg p-6">
                  <h3 className="font-bold text-slate-900 mb-3 flex items-start gap-2">
                    <MessageSquare className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    {faq.question}
                  </h3>
                  <p className="text-slate-600 ml-7">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="max-w-4xl mx-auto">
            <div className="bg-slate-900 text-white rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Inquire about Lovell Canyon land</h2>
              <p className="text-xl text-slate-300 mb-8">
                Lot 2 &amp; Lot 3 — Clark County NV 89124
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`tel:${biz.phone.tel}`}
                  className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  {biz.phone.display}
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-white text-slate-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-slate-100 transition-colors"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Contact
                </Link>
              </div>
            </div>
          </section>
        </div>
        <p className="text-center text-sm text-slate-500 mt-8">
          GBP docs: docs/seo/gbp-nap-audit.md · docs/seo/gbp-verification-checklist.md · Last updated
          June 2026
        </p>
      </main>
      <Footer />
    </>
  );
}
