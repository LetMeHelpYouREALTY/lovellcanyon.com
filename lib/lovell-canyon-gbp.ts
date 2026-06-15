/**
 * Google Business Profile alignment for lovellcanyon.com land listing.
 * Office NAP (89134) = GBP physical address. Parcel area = Lovell Canyon NV 89124.
 */

import { LOVELL_CANYON_AREA } from "@/lib/lovell-canyon-area";
import {
  LOVELL_CANYON_BRAND,
  LOVELL_CANYON_BROKERAGE,
  LOVELL_CANYON_GBP_NAME,
} from "@/lib/lovell-canyon-brand";
import {
  LOVELL_CANYON_EMAIL,
  LOVELL_CANYON_OFFICE,
  LOVELL_CANYON_PHONE_DISPLAY,
  LOVELL_CANYON_PHONE_TEL,
  LOVELL_CANYON_SOCIAL_PROFILES,
} from "@/lib/lovell-canyon-contact";
import { LOVELL_CANYON_GEO } from "@/lib/lovell-canyon-geo";
import { getLovellCanyonOpeningHoursSchema } from "@/lib/lovell-canyon-gbp-hours";
import { LOVELL_CANYON_OFFICE_GEO, getOfficeGoogleMapsViewUrl } from "@/lib/lovell-canyon-office";
import { LOVELL_CANYON_LOCATION, LOVELL_CANYON_PARCELS } from "@/lib/lovell-canyon-parcels";
import { getSiteUrl } from "@/lib/site-url";

const SITE_URL = getSiteUrl();

/** Office NAP — must match GBP physical location exactly. */
export const lovellCanyonGbpBusiness = {
  name: LOVELL_CANYON_GBP_NAME,
  address: {
    streetAddress: LOVELL_CANYON_OFFICE.street,
    addressLocality: LOVELL_CANYON_OFFICE.city,
    addressRegion: LOVELL_CANYON_OFFICE.region,
    postalCode: LOVELL_CANYON_OFFICE.postalCode,
    addressCountry: LOVELL_CANYON_OFFICE.country,
  },
  phone: {
    display: LOVELL_CANYON_PHONE_DISPLAY,
    tel: LOVELL_CANYON_PHONE_TEL.replace("tel:", ""),
  },
  email: LOVELL_CANYON_EMAIL,
  url: SITE_URL,
  license: LOVELL_CANYON_BRAND.license,
  /** Office coordinates (Summerlin/Lake Mead office). */
  officeGeo: LOVELL_CANYON_OFFICE_GEO,
  /** Parcel area center — service geography, not office address. */
  parcelGeo: {
    latitude: LOVELL_CANYON_GEO.center.latitude,
    longitude: LOVELL_CANYON_GEO.center.longitude,
    postalCode: LOVELL_CANYON_LOCATION.postalCode,
    label: LOVELL_CANYON_GEO.center.label,
  },
  hours: {
    monday: "09:00-18:00",
    tuesday: "09:00-18:00",
    wednesday: "09:00-18:00",
    thursday: "09:00-18:00",
    friday: "09:00-18:00",
    saturday: "10:00-16:00",
    sunday: "By Appointment",
  },
  categories: {
    primary: "Real Estate Agent",
    secondary: ["Real Estate Consultant", "Real Estate Agency"],
  },
  serviceAreas: [
    "Lovell Canyon, NV 89124",
    "Clark County, NV",
    "Las Vegas, NV",
    "Spring Mountains, NV",
  ],
  services: [
    {
      name: "Lovell Canyon Raw Land Sales",
      description: "Fee simple vacant land — Lot 2 & Lot 3, APN 135-31-801-006 and 007",
    },
    {
      name: "Vacant Land Buyer Representation",
      description: "Due diligence, access, title, and closing guidance for Clark County land",
    },
    {
      name: "Land Parcel Consultations",
      description: "Site visits, legal location, and Schedule A/B title review",
    },
    {
      name: "Off-Grid Land Guidance",
      description: "Utilities, zoning, and county assessor research for raw parcels",
    },
  ],
  sameAs: LOVELL_CANYON_SOCIAL_PROFILES,
} as const;

/**
 * GBP "From the business" description (≤750 chars, ASCII-only).
 * Avoid em dashes, dotted license strings, and APN dash patterns — GBP may reject as Invalid value.
 * @see docs/seo/gbp-business-description.md
 */
export const lovellCanyonGbpBusinessDescription =
  "Dr Jan Duffy, Land Specialist with Berkshire Hathaway HomeServices Nevada Properties, helps buyers with raw land in Lovell Canyon, Clark County, Nevada 89124. Two fee simple vacant parcels are listed in the Spring Mountains west of Las Vegas, reached from Highway 160 and Lovell Canyon Road. Services include land buyer representation, parcel consultations, due diligence, title and legal description review, Clark County assessor research, access guidance, site visits, and closing support for off-grid raw land. Office at 9406 W Lake Mead Boulevard, Suite 100, Las Vegas, Nevada 89134.";

/** Shorter fallback if GBP still rejects the full description (387 chars). */
export const lovellCanyonGbpBusinessDescriptionShort =
  "Land Specialist with Berkshire Hathaway HomeServices Nevada Properties. Raw land in Lovell Canyon, Clark County, Nevada 89124. Two fee simple vacant parcels west of Las Vegas in the Spring Mountains. Buyer representation, consultations, due diligence, site visits, and closing guidance. Office at 9406 W Lake Mead Boulevard, Suite 100, Las Vegas, Nevada 89134.";

/** @deprecated Use lovellCanyonGbpBusinessDescription — kept for existing imports */
export const lovellCanyonGbpShortDescription = lovellCanyonGbpBusinessDescription;

export const lovellCanyonGbpDescription = {
  whoWeAre: `${LOVELL_CANYON_BRAND.agentName} is the Land Specialist for ${LOVELL_CANYON_BROKERAGE}, representing two fee simple vacant land parcels in Lovell Canyon, Clark County, Nevada 89124. Lot 2 (APN 135-31-801-006) and Lot 3 (APN 135-31-801-007) are in Section 31, Township 20 South, Range 57 East. License ${LOVELL_CANYON_BRAND.license}.`,

  whatWeDo: `This listing site covers raw land only — legal descriptions from title report Schedule A, property tax status from Schedule B, NV-160 and Lovell Canyon Road access, and inquiries for site visits. Dr. Jan Duffy provides land-buyer guidance on due diligence, Clark County assessor records, and closing requirements. Acreage, price, and utilities are confirmed on request — not published until verified.`,

  whereWeServe: `Parcels are in Lovell Canyon, an unincorporated area of Clark County NV 89124 in the Spring Mountains, roughly 40–45 minutes west of Las Vegas via NV-160 past Mountain Springs — not the Pahrump valley (Nye County). ${LOVELL_CANYON_AREA.highwayNote}. Brokerage office: ${LOVELL_CANYON_OFFICE.street}, ${LOVELL_CANYON_OFFICE.city}, ${LOVELL_CANYON_OFFICE.region} ${LOVELL_CANYON_OFFICE.postalCode}. Listing website: ${SITE_URL}.`,
};

export const lovellCanyonGbpFaqs = [
  {
    question: "What ZIP code are the Lovell Canyon land parcels in?",
    answer:
      "The parcels are in Clark County, Nevada 89124 (Lovell Canyon / Spring Mountains area west of Las Vegas). This is not 89120 (East Las Vegas) and not Pahrump 89048 (Nye County).",
  },
  {
    question: "What APNs are for sale in Lovell Canyon?",
    answer: `Lot 2 is APN ${LOVELL_CANYON_PARCELS[0].apn} and Lot 3 is APN ${LOVELL_CANYON_PARCELS[1].apn}, both fee simple in Section 31, T20S R57E.`,
  },
  {
    question: "How do I reach the Lovell Canyon parcels from Las Vegas?",
    answer:
      "Take NV-160 (Blue Diamond Rd) west past Mountain Springs, turn north on paved Lovell Canyon Rd (~11–12 miles), then local dirt roads. 4WD may be needed on some routes.",
  },
  {
    question: "Is Lovell Canyon near Pahrump?",
    answer:
      "No. Lovell Canyon is in Clark County in the Spring Mountains west of Las Vegas. NV-160 is locally called the Pahrump Highway, but the Lovell Canyon turnoff is before Nye County and Pahrump.",
  },
  {
    question: "How do I contact Dr. Jan Duffy about these land parcels?",
    answer: `Call or text ${LOVELL_CANYON_PHONE_DISPLAY}, email ${LOVELL_CANYON_EMAIL}, or schedule at calendly.com/drjanduffy/showing.`,
  },
];

export function generateLovellCanyonLocalBusinessSchema() {
  const biz = lovellCanyonGbpBusiness;

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${SITE_URL}/#agent`,
    name: biz.name,
    url: biz.url,
    telephone: biz.phone.tel,
    email: biz.email,
    identifier: biz.license,
    jobTitle: LOVELL_CANYON_BRAND.agentTitle,
    description: lovellCanyonGbpShortDescription,
    address: {
      "@type": "PostalAddress",
      ...biz.address,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: biz.officeGeo.latitude,
      longitude: biz.officeGeo.longitude,
    },
    hasMap: getOfficeGoogleMapsViewUrl(),
    openingHoursSpecification: getLovellCanyonOpeningHoursSchema(),
    areaServed: [
      {
        "@type": "Place",
        name: biz.parcelGeo.label,
        address: {
          "@type": "PostalAddress",
          addressLocality: LOVELL_CANYON_LOCATION.locality,
          addressRegion: LOVELL_CANYON_LOCATION.region,
          postalCode: biz.parcelGeo.postalCode,
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: biz.parcelGeo.latitude,
          longitude: biz.parcelGeo.longitude,
        },
      },
      ...biz.serviceAreas.map((area) => ({
        "@type": "AdministrativeArea",
        name: area,
      })),
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Lovell Canyon Land Listings",
      itemListElement: biz.services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
        },
      })),
    },
    sameAs: [...biz.sameAs],
  };
}

export function generateLovellCanyonGbpFaqSchema(
  faqs = lovellCanyonGbpFaqs
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
