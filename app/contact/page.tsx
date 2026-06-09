import type { Metadata } from "next";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import LandPageHero from "@/components/land/LandPageHero";
import LandCta from "@/components/land/LandCta";
import { Phone, MapPin } from "lucide-react";
import { getLovellCanyonPageMetadata } from "@/lib/lovell-canyon-seo";

const PHONE_TEL = "tel:+17022221964";
const PHONE_SMS = "sms:+17022221964";
const PHONE_DISPLAY = "702-222-1964";

export async function generateMetadata(): Promise<Metadata> {
  return getLovellCanyonPageMetadata(
    "/contact",
    "Contact Dr. Jan Duffy | Lovell Canyon Land 89120",
    "Inquire about Lovell Canyon raw land parcels APN 135-31-801-006 and 007. Call or text Dr. Jan Duffy at 702-222-1964."
  );
}

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  mainEntity: {
    "@type": "RealEstateAgent",
    name: "Dr. Jan Duffy — Lovell Canyon Land",
    telephone: "+17022221964",
    address: {
      "@type": "PostalAddress",
      streetAddress: "9406 W Lake Mead Blvd, Suite 100",
      addressLocality: "Las Vegas",
      addressRegion: "NV",
      postalCode: "89134",
      addressCountry: "US",
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <Navbar />
      <main>
        <LandPageHero
          badge="Contact"
          title="Inquire About Lovell Canyon Land"
          subtitle="Lot 2 & Lot 3 — APN 135-31-801-006 and 135-31-801-007. Call, text, or request parcel details."
        />
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-2xl space-y-8">
            <div className="flex items-start bg-slate-50 rounded-lg p-6">
              <Phone className="h-6 w-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h2 className="font-bold text-slate-900 mb-2">Call or text</h2>
                <a href={PHONE_TEL} className="text-2xl font-bold text-blue-600 hover:text-blue-700 block">
                  {PHONE_DISPLAY}
                </a>
                <a href={PHONE_SMS} className="text-blue-600 hover:underline text-sm mt-2 inline-block">
                  Send a text message
                </a>
              </div>
            </div>
            <div className="flex items-start bg-slate-50 rounded-lg p-6">
              <MapPin className="h-6 w-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h2 className="font-bold text-slate-900 mb-2">Brokerage office</h2>
                <address className="not-italic text-slate-700 leading-relaxed">
                  Dr. Jan Duffy, REALTOR®
                  <br />
                  License S.0197614.LLC
                  <br />
                  Berkshire Hathaway HomeServices Nevada Properties
                  <br />
                  9406 W Lake Mead Blvd, Suite 100
                  <br />
                  Las Vegas, NV 89134
                </address>
                <p className="text-sm text-slate-500 mt-3">
                  Parcels are in Lovell Canyon, Clark County NV 89120 — not at the office address
                  above.
                </p>
              </div>
            </div>
          </div>
        </section>
        <LandCta />
      </main>
      <Footer />
    </>
  );
}
