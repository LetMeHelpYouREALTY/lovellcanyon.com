import type { Metadata } from "next";
import { getLovellCanyonMetadata } from "@/lib/lovell-canyon-seo";

export async function generateMetadata(): Promise<Metadata> {
  return getLovellCanyonMetadata("/");
}

/**
 * TODO-VERIFY fields — fill in when confirmed; do not fabricate:
 * - acreage (APN 135-31-801-006)
 * - acreage (APN 135-31-801-007)
 * - price (APN 135-31-801-006)
 * - price (APN 135-31-801-007)
 * - lot dimensions (both parcels)
 * - zoning
 * - utilities: water
 * - utilities: power
 * - utilities: septic
 * - road maintenance responsibility
 * - HOA (if any)
 * - APN ownership details
 */

import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import Link from "next/link";
import { Phone, MapPin, Navigation } from "lucide-react";
import { getPageDomainConfig } from "@/lib/get-domain-config";

const PHONE_DISPLAY = "702-222-1964";
const PHONE_TEL = "tel:+17022221964";
const PHONE_SMS = "sms:+17022221964";

const PARCELS = [
  { apn: "135-31-801-006", label: "Parcel 1" },
  { apn: "135-31-801-007", label: "Parcel 2" },
] as const;

const ACCESS_ROADS = [
  "Cabin Canyon Rd",
  "Crackling Leaf Wy",
  "Ringtail Feather Dr",
  "White Winter Dr",
  "Gavern View Dr",
  "Charleston Blvd",
] as const;

type PlaceholderField = {
  key: string;
  label: string;
};

const PLACEHOLDER_FIELDS: PlaceholderField[] = [
  { key: "acreage", label: "Acreage" },
  { key: "price", label: "Price" },
  { key: "lot-dimensions", label: "Lot dimensions" },
  { key: "zoning", label: "Zoning" },
  { key: "utilities-water", label: "Water" },
  { key: "utilities-power", label: "Power" },
  { key: "utilities-septic", label: "Septic" },
  { key: "road-maintenance", label: "Road maintenance" },
  { key: "hoa", label: "HOA" },
  { key: "ownership", label: "Ownership details" },
];

function PlaceholderValue({ fieldKey }: { fieldKey: string }) {
  return (
    <span className="text-slate-500 italic">
      {/* TODO-VERIFY: {fieldKey} */}
      Details — request info
    </span>
  );
}

export default async function Home() {
  const config = await getPageDomainConfig();
  const siteUrl = `https://${config.domain !== "default" ? config.domain : "lovellcanyon.com"}`;

  const listingSchemas = PARCELS.map((parcel) => ({
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: `Lovell Canyon Land — APN ${parcel.apn}`,
    url: siteUrl,
    description: `Raw land parcel in Lovell Canyon, Clark County NV. APN ${parcel.apn}. T20S R57E Section 31, assessor map 135-31-8.`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lovell Canyon",
      addressRegion: "NV",
      addressCountry: "US",
    },
    identifier: parcel.apn,
    category: "Land",
    seller: {
      "@type": "RealEstateAgent",
      name: "Dr. Jan Duffy",
      telephone: "+17022221964",
      memberOf: {
        "@type": "Organization",
        name: "Berkshire Hathaway HomeServices Nevada Properties",
      },
    },
  }));

  const agentSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Dr. Jan Duffy — Lovell Canyon Land",
    url: siteUrl,
    telephone: "+17022221964",
    jobTitle: "REALTOR®",
    identifier: "S.0197614.LLC",
    worksFor: {
      "@type": "Organization",
      name: "Berkshire Hathaway HomeServices Nevada Properties",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "9406 W Lake Mead Blvd, Suite 100",
      addressLocality: "Las Vegas",
      addressRegion: "NV",
      postalCode: "89134",
      addressCountry: "US",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(agentSchema) }}
      />
      {listingSchemas.map((schema) => (
        <script
          key={schema.identifier}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative bg-slate-900 text-white py-24 md:py-32 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: "url('/Image/hero_bg_1.jpg')" }}
          />
          <div className="relative z-10 container mx-auto px-4 text-center">
            <span className="inline-block bg-blue-600 text-white text-sm font-semibold px-4 py-1 rounded-full mb-6">
              {config.ctaBadge}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {config.heroHeadline}
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-6 max-w-3xl mx-auto">
              {config.heroSubheadline}
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm text-white/90">
              {PARCELS.map((parcel) => (
                <span
                  key={parcel.apn}
                  className="bg-white/10 border border-white/20 rounded-full px-4 py-2 font-mono"
                >
                  APN {parcel.apn}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Location & Access */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="h-8 w-8 text-blue-600 flex-shrink-0" />
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Location &amp; Access
              </h2>
            </div>
            <div className="space-y-6 text-slate-700 text-lg leading-relaxed">
              <p>
                <strong>Location:</strong> Lovell Canyon, Clark County, Nevada. Township T20S,
                Range R57E, Section 31. Assessor map 135-31-8.
              </p>
              <p>
                <strong>Area context:</strong> Near Pahrump, in the Lovell Canyon area west of the
                Las Vegas Valley.
              </p>
              <div>
                <div className="flex items-start gap-3 mb-3">
                  <Navigation className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <p>
                    <strong>Primary access:</strong> From NV-160 (Blue Diamond Rd), past the
                    Mountain Springs summit, turn right on Lovell Canyon Rd (paved) and proceed
                    approximately 11 miles north. Local access continues via dirt roads.
                  </p>
                </div>
                <p className="ml-9 text-base text-slate-600">
                  Local dirt roads: {ACCESS_ROADS.join(", ")}.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Parcel Details */}
        <section className="py-16 md:py-20 bg-slate-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center">
              Parcel Details
            </h2>
            <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
              Verified parcel identifiers are listed below. Additional specifications are available
              upon request.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {PARCELS.map((parcel) => (
                <div
                  key={parcel.apn}
                  className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 md:p-8"
                >
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{parcel.label}</h3>
                  <p className="font-mono text-blue-700 mb-6">APN {parcel.apn}</p>
                  <dl className="space-y-4">
                    {PLACEHOLDER_FIELDS.map((field) => (
                      <div
                        key={`${parcel.apn}-${field.key}`}
                        className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 border-b border-slate-100 pb-3"
                      >
                        <dt className="text-slate-600 font-medium">{field.label}</dt>
                        <dd className="text-right">
                          <PlaceholderValue fieldKey={`${parcel.apn}-${field.key}`} />
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-slate-500 mt-8">
              T20S R57E Section 31 · Assessor map 135-31-8 · Clark County, NV
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{config.ctaHeadline}</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {config.ctaSubheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={PHONE_TEL}
                className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-md font-bold text-lg hover:bg-blue-50 transition-colors"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call {PHONE_DISPLAY}
              </a>
              <a
                href={PHONE_SMS}
                className="inline-flex items-center justify-center bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-md font-bold text-lg transition-colors"
              >
                Text {PHONE_DISPLAY}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-md font-bold text-lg transition-colors"
              >
                Send an Inquiry
              </Link>
            </div>
            <p className="mt-6 text-blue-200 text-sm">
              Dr. Jan Duffy, REALTOR® | License S.0197614.LLC | Berkshire Hathaway HomeServices
              Nevada Properties
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
