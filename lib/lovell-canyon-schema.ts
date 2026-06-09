import { LOVELL_CANYON_AREA } from "@/lib/lovell-canyon-area";
import type { LandFaq } from "@/lib/lovell-canyon-faq";
import { LOVELL_CANYON_LOCATION } from "@/lib/lovell-canyon-parcels";
import { LOVELL_CANYON_SEO } from "@/lib/lovell-canyon-seo";
import { getSiteUrl } from "@/lib/site-url";

const AGENT_PHONE = "+17022221964";
const OFFICE_STREET = "9406 W Lake Mead Blvd, Suite 100";
const OFFICE_CITY = "Las Vegas";
const OFFICE_REGION = "NV";
const OFFICE_ZIP = "89134";

export function getLovellCanyonWebSiteSchema() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: LOVELL_CANYON_SEO.siteName,
    alternateName: LOVELL_CANYON_SEO.brandShort,
    url: siteUrl,
    description: LOVELL_CANYON_SEO.description,
    inLanguage: "en-US",
    publisher: {
      "@type": "Organization",
      name: "Berkshire Hathaway HomeServices Nevada Properties",
    },
  };
}

export function getLovellCanyonPlaceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    name: LOVELL_CANYON_AREA.name,
    description:
      "Lovell Canyon is an unincorporated area in Clark County, Nevada, west of the Las Vegas Valley, accessed via NV-160 and paved Lovell Canyon Road.",
    address: {
      "@type": "PostalAddress",
      addressLocality: LOVELL_CANYON_LOCATION.locality,
      addressRegion: LOVELL_CANYON_LOCATION.region,
      postalCode: LOVELL_CANYON_LOCATION.postalCode,
      addressCountry: "US",
    },
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: LOVELL_CANYON_AREA.county,
      containedInPlace: {
        "@type": "State",
        name: LOVELL_CANYON_AREA.state,
        addressCountry: "US",
      },
    },
  };
}

export function getLovellCanyonAgentSchema() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Dr. Jan Duffy",
    alternateName: "Dr. Jan Duffy — Lovell Canyon Land",
    url: siteUrl,
    telephone: AGENT_PHONE,
    jobTitle: "REALTOR®",
    identifier: "S.0197614.LLC",
    worksFor: {
      "@type": "Organization",
      name: "Berkshire Hathaway HomeServices Nevada Properties",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: OFFICE_STREET,
      addressLocality: OFFICE_CITY,
      addressRegion: OFFICE_REGION,
      postalCode: OFFICE_ZIP,
      addressCountry: "US",
    },
    areaServed: {
      "@type": "Place",
      name: "Lovell Canyon, Clark County, Nevada 89120",
    },
  };
}

export function getLovellCanyonFaqSchema(faqs: LandFaq[]) {
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

export function getLovellCanyonBreadcrumbSchema(
  items: Array<{ name: string; path: string }>
) {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path === "/" ? "" : item.path}`,
    })),
  };
}
