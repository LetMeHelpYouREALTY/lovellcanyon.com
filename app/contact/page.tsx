import type { Metadata } from "next";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import LandPageHeroSection from "@/components/land/LandPageHeroSection";
import LandCta from "@/components/land/LandCta";
import BelowHeroEngagement from "@/components/sections/BelowHeroEngagement";
import CalendlySection from "@/components/sections/CalendlySection";
import { Phone, MapPin, Mail } from "lucide-react";
import BusinessHours from "@/components/land/BusinessHours";
import OfficeMapEmbed from "@/components/maps/OfficeMapEmbed";
import { getLovellCanyonPageMetadataWithHero } from "@/lib/lovell-canyon-seo";
import {
  LOVELL_CANYON_EMAIL,
  LOVELL_CANYON_EMAIL_HREF,
  LOVELL_CANYON_OFFICE,
  LOVELL_CANYON_PHONE_DISPLAY,
  LOVELL_CANYON_PHONE_SMS,
  LOVELL_CANYON_PHONE_TEL,
} from "@/lib/lovell-canyon-contact";
import { LOVELL_CANYON_BRAND, LOVELL_CANYON_BROKERAGE } from "@/lib/lovell-canyon-brand";
import { getLovellCanyonContactPageSchema } from "@/lib/lovell-canyon-schema";
import { LAND_SECTION_COPY } from "@/lib/lovell-canyon-glossary";

export async function generateMetadata(): Promise<Metadata> {
  return getLovellCanyonPageMetadataWithHero(
    "/contact",
    "Contact Dr. Jan Duffy, Land Specialist | Lovell Canyon Land 89124",
    `Inquire about Lovell Canyon raw land parcels APN 135-31-801-006 and 007. Call, text, or email Dr. Jan Duffy, Land Specialist, at ${LOVELL_CANYON_PHONE_DISPLAY}.`
  );
}

const contactSchema = getLovellCanyonContactPageSchema();

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <Navbar />
      <main>
        <LandPageHeroSection
          pathname="/contact"
          badge="Contact"
          title="Inquire About Lovell Canyon Land"
          subtitle={LAND_SECTION_COPY.contactHeroSubtitle}
        />
        <CalendlySection />
        <BelowHeroEngagement showCalendly={false} />
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-2xl space-y-8">
            <div className="flex items-start bg-slate-50 rounded-lg p-6">
              <Mail className="h-6 w-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h2 className="font-bold text-slate-900 mb-2">Email</h2>
                <a
                  href={LOVELL_CANYON_EMAIL_HREF}
                  className="text-xl font-bold text-blue-600 hover:text-blue-700 block break-all"
                >
                  {LOVELL_CANYON_EMAIL}
                </a>
              </div>
            </div>
            <div className="flex items-start bg-slate-50 rounded-lg p-6">
              <Phone className="h-6 w-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h2 className="font-bold text-slate-900 mb-2">Call or text</h2>
                <a href={LOVELL_CANYON_PHONE_TEL} className="text-2xl font-bold text-blue-600 hover:text-blue-700 block">
                  {LOVELL_CANYON_PHONE_DISPLAY}
                </a>
                <a href={LOVELL_CANYON_PHONE_SMS} className="text-blue-600 hover:underline text-sm mt-2 inline-block">
                  Send a text message
                </a>
              </div>
            </div>
            <div className="flex items-start bg-slate-50 rounded-lg p-6">
              <MapPin className="h-6 w-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h2 className="font-bold text-slate-900 mb-2">Brokerage office</h2>
                <address className="not-italic text-slate-700 leading-relaxed">
                  {LOVELL_CANYON_BRAND.agentName}, {LOVELL_CANYON_BRAND.agentTitleLong}
                  <br />
                  License {LOVELL_CANYON_BRAND.license}
                  <br />
                  {LOVELL_CANYON_BROKERAGE}
                  <br />
                  {LOVELL_CANYON_OFFICE.street}
                  <br />
                  {LOVELL_CANYON_OFFICE.city}, {LOVELL_CANYON_OFFICE.region}{" "}
                  {LOVELL_CANYON_OFFICE.postalCode}
                </address>
                <p className="text-sm text-slate-500 mt-3">
                  Parcels are in Lovell Canyon, Clark County NV 89124 — not at the office address
                  above.
                </p>
              </div>
            </div>
            <BusinessHours />
          </div>
        </section>
        <OfficeMapEmbed />
        <LandCta />
      </main>
      <Footer />
    </>
  );
}
