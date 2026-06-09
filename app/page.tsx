import type { Metadata } from "next";
import { LOVELL_CANYON_BRAND } from "@/lib/lovell-canyon-brand";
import { LOVELL_CANYON_SEO, getLovellCanyonPageMetadataWithHero } from "@/lib/lovell-canyon-seo";
import {
  getLovellCanyonGalleryPhotos,
  getLovellCanyonPageHero,
} from "@/lib/lovell-canyon-media";
import { LandPropertyGallery } from "@/components/land/LandPropertyGallery";
import { MainlineHero } from "@/components/land/MainlineHero";
import {
  LOVELL_CANYON_LOCATION,
  LOVELL_CANYON_PARCELS,
  PARCEL_PLACEHOLDER_FIELDS,
} from "@/lib/lovell-canyon-parcels";
import {
  CLARK_COUNTY_TAX_PORTAL_URL,
  SCHEDULE_B_GENERAL_EXCEPTIONS,
  SCHEDULE_B_STANDARD_EXCEPTIONS_NOTE,
} from "@/lib/lovell-canyon-title-schedule-b";
import { LOVELL_CANYON_FAQS } from "@/lib/lovell-canyon-faq";
import { getLovellCanyonFaqSchema, getLovellCanyonPageHeroImageSchema, getLovellCanyonParcelListingSchema } from "@/lib/lovell-canyon-schema";

export async function generateMetadata(): Promise<Metadata> {
  return getLovellCanyonPageMetadataWithHero(
    "/",
    LOVELL_CANYON_BRAND.title,
    LOVELL_CANYON_SEO.description,
    LOVELL_CANYON_BRAND.ogTitle
  );
}

/**
 * TODO-VERIFY fields — fill in when confirmed; do not fabricate:
 * - acreage (APN 135-31-801-006)
 * - acreage (APN 135-31-801-007)
 * - price (APN 135-31-801-006)
 * - price (APN 135-31-801-007)
 * - lot dimensions (physical dimensions — legal description is on file)
 * - zoning
 * - utilities: water
 * - utilities: power
 * - utilities: septic
 * - road maintenance responsibility
 * - HOA (if any)
 *
 * Verified from title report Schedule B:
 * - property taxes FY 2025-2026 ($285.90 per parcel, paid in full)
 */

import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import Link from "next/link";
import { Phone, MapPin, Navigation, Mail } from "lucide-react";
import { getPageDomainConfig } from "@/lib/get-domain-config";
import BelowHeroEngagement from "@/components/sections/BelowHeroEngagement";
import {
  LOVELL_CANYON_EMAIL,
  LOVELL_CANYON_EMAIL_HREF,
  LOVELL_CANYON_PHONE_DISPLAY,
  LOVELL_CANYON_PHONE_SMS,
  LOVELL_CANYON_PHONE_TEL,
} from "@/lib/lovell-canyon-contact";

const ACCESS_ROADS = [
  "Cabin Canyon Rd",
  "Crackling Leaf Wy",
  "Ringtail Feather Dr",
  "White Winter Dr",
  "Gavern View Dr",
  "Charleston Blvd",
] as const;

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
  const [heroPhoto, galleryPhotos] = await Promise.all([
    getLovellCanyonPageHero("/"),
    getLovellCanyonGalleryPhotos(),
  ]);
  const propertyPhotos = heroPhoto
    ? [heroPhoto, ...galleryPhotos.filter((p) => p.key !== heroPhoto.key)]
    : galleryPhotos;

  const listingSchemas = LOVELL_CANYON_PARCELS.map((parcel) =>
    getLovellCanyonParcelListingSchema(parcel, siteUrl, `/parcels/${parcel.slug}`)
  );

  const faqSchema = getLovellCanyonFaqSchema(LOVELL_CANYON_FAQS.slice(0, 6));
  const heroSchema = heroPhoto
    ? getLovellCanyonPageHeroImageSchema(heroPhoto, "/", config.heroHeadline)
    : null;

  return (
    <>
      {heroSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(heroSchema) }}
        />
      )}
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
      <main>
        <MainlineHero
          badge={config.ctaBadge}
          headline={config.heroHeadline}
          subheadline={config.heroSubheadline}
          heroImageUrl={heroPhoto?.url}
          heroImageAlt={heroPhoto?.alt}
        />

        <BelowHeroEngagement />

        <LandPropertyGallery photos={propertyPhotos} />

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
                <strong>Location:</strong> Lovell Canyon, Clark County, Nevada {LOVELL_CANYON_LOCATION.postalCode}. Township{" "}
                {LOVELL_CANYON_LOCATION.township}, Range {LOVELL_CANYON_LOCATION.range},{" "}
                {LOVELL_CANYON_LOCATION.section}. Assessor map {LOVELL_CANYON_LOCATION.assessorMap}.
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
            <p className="text-center text-slate-600 mb-4 max-w-2xl mx-auto">
              Title and legal descriptions per Schedule A, Clark County, Nevada. Additional
              specifications are available upon request.
            </p>
            <p className="text-center text-sm text-slate-500 mb-12 max-w-2xl mx-auto">
              Estate or interest covered: fee simple. Title vested as stated in title report
              Schedule A.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {LOVELL_CANYON_PARCELS.map((parcel) => (
                <div
                  key={parcel.apn}
                  className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 md:p-8"
                >
                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    {parcel.label} — Certificate of Land Division
                  </h3>
                  <p className="font-mono text-blue-700 mb-6">APN {parcel.apn}</p>

                  <dl className="space-y-4 mb-8">
                    <div className="border-b border-slate-100 pb-3">
                      <dt className="text-slate-600 font-medium mb-1">Estate or interest</dt>
                      <dd className="text-slate-900">{parcel.estate}</dd>
                    </div>
                    <div className="border-b border-slate-100 pb-3">
                      <dt className="text-slate-600 font-medium mb-1">Certificate lot</dt>
                      <dd className="text-slate-900">{parcel.certificateLot}</dd>
                    </div>
                    <div className="border-b border-slate-100 pb-3">
                      <dt className="text-slate-600 font-medium mb-2">Legal description</dt>
                      <dd className="text-slate-800 text-sm leading-relaxed">
                        {parcel.legalDescription}
                      </dd>
                    </div>
                    <div className="border-b border-slate-100 pb-3">
                      <dt className="text-slate-600 font-medium mb-2">
                        Schedule A exceptions
                      </dt>
                      <dd className="text-slate-800 text-sm leading-relaxed">
                        {parcel.scheduleAExceptions}
                      </dd>
                    </div>
                    <div className="border-b border-slate-100 pb-3">
                      <dt className="text-slate-600 font-medium mb-1">
                        Property taxes (Schedule B, item {parcel.scheduleBItemNumber})
                      </dt>
                      <dd className="text-slate-900">
                        Fiscal year {parcel.propertyTaxFiscalYear}: {parcel.propertyTaxStatus} (
                        {parcel.propertyTaxAmountPaid} total).
                      </dd>
                      <dd className="text-sm mt-1">
                        <a
                          href={CLARK_COUNTY_TAX_PORTAL_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Clark County tax records (trweb.co.clark.nv.us)
                        </a>
                      </dd>
                    </div>
                    <div className="border-b border-slate-100 pb-3">
                      <dt className="text-slate-600 font-medium mb-2">Alternate description</dt>
                      <dd className="text-slate-800 text-sm leading-relaxed">
                        {parcel.alternateDescription}
                      </dd>
                    </div>
                  </dl>

                  <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">
                    Additional details
                  </h4>
                  <dl className="space-y-4">
                    {PARCEL_PLACEHOLDER_FIELDS.map((field) => (
                      <div
                        key={`${parcel.apn}-${field.key}`}
                        className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 border-b border-slate-100 pb-3"
                      >
                        <dt className="text-slate-600 font-medium">{field.label}</dt>
                        <dd className="text-right sm:text-right">
                          <PlaceholderValue fieldKey={`${parcel.apn}-${field.key}`} />
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-slate-500 mt-8">
              {LOVELL_CANYON_LOCATION.township} {LOVELL_CANYON_LOCATION.range}{" "}
              {LOVELL_CANYON_LOCATION.section} · Assessor map {LOVELL_CANYON_LOCATION.assessorMap} ·{" "}
              {LOVELL_CANYON_LOCATION.locality}, {LOVELL_CANYON_LOCATION.region}{" "}
              {LOVELL_CANYON_LOCATION.postalCode}
            </p>
          </div>
        </section>

        {/* Title Report — Schedule B */}
        <section className="py-16 md:py-20 bg-white border-t border-slate-200">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Title Report — Schedule B
            </h2>
            <p className="text-slate-600 mb-2 leading-relaxed">
              Exceptions to coverage in addition to the printed exceptions and exclusions in the
              title policy form, as stated in title report Schedule B at the date thereof.
            </p>
            <p className="text-sm text-slate-500 mb-8 italic">
              {SCHEDULE_B_STANDARD_EXCEPTIONS_NOTE}
            </p>
            <ol className="space-y-6 list-none">
              {SCHEDULE_B_GENERAL_EXCEPTIONS.map((item) => (
                <li
                  key={item.number}
                  className="border-l-4 border-slate-200 pl-5 text-slate-800 text-sm leading-relaxed"
                >
                  <span className="font-semibold text-slate-900 block mb-1">
                    {item.number}.
                  </span>
                  {item.text}
                </li>
              ))}
            </ol>
            <p className="text-sm text-slate-500 mt-10">
              Per-parcel property tax status (Schedule B items 7 and 8) is shown in Parcel Details
              above. Contact Dr. Jan Duffy for the current title commitment and closing requirements.
            </p>
          </div>
        </section>

        {/* Site sections */}
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Explore this listing</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { href: "/parcels", label: "Both parcels", desc: "Lot 2 & Lot 3 details" },
                { href: "/parcels/lot-2", label: "Lot 2", desc: "APN 135-31-801-006" },
                { href: "/parcels/lot-3", label: "Lot 3", desc: "APN 135-31-801-007" },
                { href: "/location", label: "Location", desc: "Lovell Canyon NV 89120" },
                { href: "/access", label: "Access", desc: "NV-160 & dirt roads" },
                { href: "/title-report", label: "Title report", desc: "Schedule A & B" },
                { href: "/faq", label: "FAQ", desc: "Common questions" },
                { href: "/contact", label: "Contact", desc: `${LOVELL_CANYON_PHONE_DISPLAY} · email` },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block p-5 rounded-lg border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all"
                >
                  <p className="font-bold text-slate-900">{item.label}</p>
                  <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{config.ctaHeadline}</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {config.ctaSubheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
              <a
                href={LOVELL_CANYON_PHONE_TEL}
                className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-md font-bold text-lg hover:bg-blue-50 transition-colors"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call {LOVELL_CANYON_PHONE_DISPLAY}
              </a>
              <a
                href={LOVELL_CANYON_PHONE_SMS}
                className="inline-flex items-center justify-center bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-md font-bold text-lg transition-colors"
              >
                Text {LOVELL_CANYON_PHONE_DISPLAY}
              </a>
              <a
                href={LOVELL_CANYON_EMAIL_HREF}
                className="inline-flex items-center justify-center bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-md font-bold text-lg transition-colors"
              >
                <Mail className="h-5 w-5 mr-2" />
                Email
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-md font-bold text-lg transition-colors"
              >
                Send an Inquiry
              </Link>
            </div>
            <p className="mt-6 text-blue-200 text-sm">
              {LOVELL_CANYON_BRAND.agentAttribution} · {LOVELL_CANYON_EMAIL}
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
