import { LOVELL_CANYON_AREA } from "@/lib/lovell-canyon-area";
import { LOVELL_CANYON_BRAND, LOVELL_CANYON_BROKERAGE } from "@/lib/lovell-canyon-brand";
import type { LandFaq } from "@/lib/lovell-canyon-faq";
import { LOVELL_CANYON_LOCATION, type LovellCanyonParcel } from "@/lib/lovell-canyon-parcels";
import { LOVELL_CANYON_SEO } from "@/lib/lovell-canyon-seo";
import {
  LOVELL_CANYON_EMAIL,
  LOVELL_CANYON_OFFICE,
  LOVELL_CANYON_PHONE_TEL,
  LOVELL_CANYON_SOCIAL_PROFILES,
} from "@/lib/lovell-canyon-contact";
import {
  getGeoCoordinatesSchema,
  getGeoShapeBoundingBoxSchema,
  getGoogleMapsViewUrl,
  getLovellCanyonSpatialCoverage,
  LOVELL_CANYON_GEO,
} from "@/lib/lovell-canyon-geo";
import { getLovellCanyonOpeningHoursSchema } from "@/lib/lovell-canyon-gbp-hours";
import { lovellCanyonGbpBusiness } from "@/lib/lovell-canyon-gbp";
import {
  getOfficeGoogleMapsViewUrl,
  LOVELL_CANYON_OFFICE_GEO,
} from "@/lib/lovell-canyon-office";
import type { LovellCanyonPhoto } from "@/lib/lovell-canyon-media";
import { LOVELL_CANYON_NAV_LABELS } from "@/lib/lovell-canyon-footer";
import { INDEXABLE_PATHS } from "@/lib/lovell-canyon-site-pages";
import { getCanonicalUrl, getSiteUrl } from "@/lib/site-url";

const SCHEMA_PHONE = LOVELL_CANYON_PHONE_TEL.replace("tel:", "");

/** Google Image Metadata — Person creator + licensing fields (not RealEstateAgent @id). */
function getLovellCanyonImageRightsMetadata(siteUrl: string) {
  const licenseUrl = getCanonicalUrl("/contact");

  return {
    creditText: `${LOVELL_CANYON_BRAND.agentName}, ${LOVELL_CANYON_BRAND.agentTitle} / ${LOVELL_CANYON_BROKERAGE}`,
    copyrightNotice: `© 2026 ${LOVELL_CANYON_BRAND.agentName} / ${LOVELL_CANYON_BROKERAGE}`,
    copyrightYear: "2026",
    license: licenseUrl,
    acquireLicensePage: licenseUrl,
    creator: {
      "@type": "Person" as const,
      name: LOVELL_CANYON_BRAND.agentName,
      url: siteUrl,
      email: LOVELL_CANYON_EMAIL,
    },
  };
}

function toAbsoluteImageUrl(url: string, siteUrl: string) {
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${siteUrl}${url.startsWith("/") ? url : `/${url}`}`;
}

/** Single ImageObject node — used for hero, gallery, and listing photos sitewide. */
export function getLovellCanyonImageObjectNode(
  photo: LovellCanyonPhoto,
  imageId: string,
  siteUrl = getSiteUrl()
) {
  const absoluteUrl = toAbsoluteImageUrl(photo.url, siteUrl);

  return {
    "@type": "ImageObject" as const,
    "@id": imageId,
    name: photo.name ?? photo.alt,
    caption: photo.caption ?? photo.alt,
    description: photo.alt,
    contentUrl: absoluteUrl,
    url: absoluteUrl,
    width: photo.width ?? 1600,
    height: photo.height ?? 900,
    encodingFormat: "image/jpeg",
    contentLocation: { "@id": schemaId(LOVELL_CANYON_SCHEMA_IDS.place) },
    ...getLovellCanyonImageRightsMetadata(siteUrl),
  };
}

function getLovellCanyonListingImageObject(
  photo: LovellCanyonPhoto,
  listingUrl: string,
  siteUrl: string
) {
  return getLovellCanyonImageObjectNode(photo, `${listingUrl}#listing-image`, siteUrl);
}

export const LOVELL_CANYON_SCHEMA_IDS = {
  website: "#website",
  place: "#lovell-canyon",
  trailhead: "#lovell-canyon-trailhead",
  agent: "#agent",
  parcelArea: "#parcel-section-31",
} as const;

/** ISO date when listings were first published on this site (schema datePosted). */
export const LOVELL_CANYON_LISTING_DATE_POSTED = "2026-06-01";

export function getLovellCanyonParcelListingId(parcelPath: string) {
  return `${getSiteUrl()}${parcelPath}#listing`;
}

function schemaId(fragment: string) {
  const siteUrl = getSiteUrl();
  if (fragment.startsWith("#")) {
    return `${siteUrl}${fragment}`;
  }
  return `${siteUrl}/${fragment.replace(/^\//, "")}`;
}

function getLovellCanyonPostalAddress() {
  return {
    "@type": "PostalAddress" as const,
    addressLocality: LOVELL_CANYON_LOCATION.locality,
    addressRegion: LOVELL_CANYON_LOCATION.region,
    postalCode: LOVELL_CANYON_LOCATION.postalCode,
    addressCountry: "US",
  };
}

function getParcelLegalLocationProperties() {
  return {
    additionalProperty: [
      {
        "@type": "PropertyValue" as const,
        name: "Section",
        value: LOVELL_CANYON_LOCATION.section,
      },
      {
        "@type": "PropertyValue" as const,
        name: "Township",
        value: LOVELL_CANYON_LOCATION.township,
      },
      {
        "@type": "PropertyValue" as const,
        name: "Range",
        value: LOVELL_CANYON_LOCATION.range,
      },
      {
        "@type": "PropertyValue" as const,
        name: "Clark County Assessor Map",
        value: LOVELL_CANYON_LOCATION.assessorMap,
      },
    ],
  };
}

export function getLovellCanyonPlaceSchema() {
  const { latitude, longitude } = LOVELL_CANYON_GEO.center;

  return {
    "@context": "https://schema.org",
    "@type": "Place",
    "@id": schemaId(LOVELL_CANYON_SCHEMA_IDS.place),
    name: LOVELL_CANYON_AREA.name,
    alternateName: `${LOVELL_CANYON_AREA.name}, ${LOVELL_CANYON_AREA.county}, ${LOVELL_CANYON_AREA.state} ${LOVELL_CANYON_AREA.postalCode}`,
    description:
      "Lovell Canyon is an unincorporated area in Clark County, Nevada, west of the Las Vegas Valley, accessed via NV-160 and paved Lovell Canyon Road. Fee simple raw land parcels offered in Section 31, T20S R57E.",
    address: getLovellCanyonPostalAddress(),
    geo: getGeoCoordinatesSchema(latitude, longitude),
    geoContains: getGeoShapeBoundingBoxSchema(),
    hasMap: getGoogleMapsViewUrl(latitude, longitude),
    ...getParcelLegalLocationProperties(),
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

export function getLovellCanyonTrailheadPlaceSchema() {
  const { latitude, longitude, label } = LOVELL_CANYON_GEO.trailhead;

  return {
    "@context": "https://schema.org",
    "@type": "Place",
    "@id": schemaId(LOVELL_CANYON_SCHEMA_IDS.trailhead),
    name: label,
    description:
      "USFS Lovell Canyon Trailhead at the end of paved Lovell Canyon Road — primary recreation access point for the canyon.",
    geo: getGeoCoordinatesSchema(latitude, longitude),
    hasMap: getGoogleMapsViewUrl(latitude, longitude),
    containedInPlace: {
      "@id": schemaId(LOVELL_CANYON_SCHEMA_IDS.place),
    },
  };
}

export function getLovellCanyonAgentSchema() {
  const siteUrl = getSiteUrl();
  const { latitude, longitude } = LOVELL_CANYON_GEO.center;
  const { latitude: officeLat, longitude: officeLng } = LOVELL_CANYON_OFFICE_GEO;

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": schemaId(LOVELL_CANYON_SCHEMA_IDS.agent),
    name: lovellCanyonGbpBusiness.name,
    alternateName: LOVELL_CANYON_BRAND.agentName,
    url: siteUrl,
    telephone: SCHEMA_PHONE,
    email: LOVELL_CANYON_EMAIL,
    jobTitle: LOVELL_CANYON_BRAND.agentTitle,
    description: LOVELL_CANYON_BRAND.agentBio,
    identifier: LOVELL_CANYON_BRAND.license,
    knowsAbout: [
      "Raw land",
      "Vacant land",
      "Fee simple land",
      "Lovell Canyon NV 89124",
      "Clark County Nevada land parcels",
      "APN 135-31-801-006",
      "APN 135-31-801-007",
      "NV-160 Lovell Canyon Road access",
      "Mountain Springs Nevada land",
      "Off-grid vacant land",
    ],
    sameAs: LOVELL_CANYON_SOCIAL_PROFILES,
    worksFor: {
      "@type": "Organization",
      name: LOVELL_CANYON_BROKERAGE,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: LOVELL_CANYON_OFFICE.street,
      addressLocality: LOVELL_CANYON_OFFICE.city,
      addressRegion: LOVELL_CANYON_OFFICE.region,
      postalCode: LOVELL_CANYON_OFFICE.postalCode,
      addressCountry: LOVELL_CANYON_OFFICE.country,
    },
    geo: getGeoCoordinatesSchema(officeLat, officeLng),
    hasMap: getOfficeGoogleMapsViewUrl(),
    openingHoursSpecification: getLovellCanyonOpeningHoursSchema(),
    areaServed: [
      {
        "@id": schemaId(LOVELL_CANYON_SCHEMA_IDS.place),
      },
      {
        "@type": "Place",
        name: `${LOVELL_CANYON_LOCATION.locality}, ${LOVELL_CANYON_LOCATION.county}, NV ${LOVELL_CANYON_LOCATION.postalCode}`,
        address: getLovellCanyonPostalAddress(),
        geo: getGeoCoordinatesSchema(latitude, longitude),
        geoContains: getGeoShapeBoundingBoxSchema(),
        hasMap: getGoogleMapsViewUrl(latitude, longitude),
        ...getParcelLegalLocationProperties(),
      },
    ],
  };
}

export function getLovellCanyonWebSiteSchema() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": schemaId(LOVELL_CANYON_SCHEMA_IDS.website),
    name: LOVELL_CANYON_SEO.siteName,
    alternateName: LOVELL_CANYON_SEO.brandShort,
    url: siteUrl,
    description: LOVELL_CANYON_SEO.description,
    inLanguage: "en-US",
    about: {
      "@id": schemaId(LOVELL_CANYON_SCHEMA_IDS.place),
    },
    contentLocation: {
      "@id": schemaId(LOVELL_CANYON_SCHEMA_IDS.place),
    },
    spatialCoverage: getLovellCanyonSpatialCoverage(),
    publisher: {
      "@type": "Organization",
      name: LOVELL_CANYON_BROKERAGE,
    },
    audience: {
      "@type": "Audience",
      audienceType: "Raw land and vacant parcel buyers in Lovell Canyon, Clark County NV 89124",
    },
  };
}

export function getLovellCanyonParcelListingSchema(
  parcel: LovellCanyonParcel,
  siteUrl: string,
  parcelPath?: string,
  options?: { imageUrl?: string; imagePhoto?: LovellCanyonPhoto }
) {
  const { latitude, longitude } = LOVELL_CANYON_GEO.center;
  const listingUrl = parcelPath ? `${siteUrl}${parcelPath}` : siteUrl;
  const listingImage =
    options?.imagePhoto ??
    (options?.imageUrl
      ? {
          url: options.imageUrl,
          alt: `Lovell Canyon land — ${parcel.label} APN ${parcel.apn}`,
          key: `${parcel.slug}-listing`,
        }
      : null);

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    ...(parcelPath ? { "@id": getLovellCanyonParcelListingId(parcelPath) } : {}),
    name: `Lovell Canyon Land — ${parcel.label} (APN ${parcel.apn})`,
    url: listingUrl,
    datePosted: LOVELL_CANYON_LISTING_DATE_POSTED,
    description: `${parcel.estate} land in Lovell Canyon, Clark County NV. APN ${parcel.apn}. ${parcel.alternateDescription}`,
    ...(listingImage
      ? { image: getLovellCanyonListingImageObject(listingImage, listingUrl, siteUrl) }
      : {}),
    address: getLovellCanyonPostalAddress(),
    geo: getGeoCoordinatesSchema(latitude, longitude),
    hasMap: getGoogleMapsViewUrl(latitude, longitude),
    contentLocation: {
      "@type": "Place",
      name: `${LOVELL_CANYON_LOCATION.locality} — ${parcel.label}`,
      address: getLovellCanyonPostalAddress(),
      geo: getGeoCoordinatesSchema(latitude, longitude),
      geoContains: getGeoShapeBoundingBoxSchema(),
      hasMap: getGoogleMapsViewUrl(latitude, longitude),
      ...getParcelLegalLocationProperties(),
    },
    spatialCoverage: getLovellCanyonSpatialCoverage(),
    identifier: parcel.apn,
    category: "Land",
    ...(parcel.specs?.price
      ? {
          offers: {
            "@type": "Offer",
            price: parcel.specs.price.replace(/[^0-9.]/g, ""),
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
    offeredBy: {
      "@id": schemaId(LOVELL_CANYON_SCHEMA_IDS.agent),
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "APN",
        value: parcel.apn,
      },
      ...(parcel.specs?.acreage
        ? [
            {
              "@type": "PropertyValue" as const,
              name: "Acreage",
              value: parcel.specs.acreage,
            },
          ]
        : []),
      ...(parcel.specs?.zoning
        ? [
            {
              "@type": "PropertyValue" as const,
              name: "Zoning",
              value: parcel.specs.zoning,
            },
          ]
        : []),
      {
        "@type": "PropertyValue",
        name: "Certificate of Land Division Lot",
        value: parcel.certificateLot,
      },
      {
        "@type": "PropertyValue",
        name: "Section",
        value: LOVELL_CANYON_LOCATION.section,
      },
      {
        "@type": "PropertyValue",
        name: "Township",
        value: LOVELL_CANYON_LOCATION.township,
      },
      {
        "@type": "PropertyValue",
        name: "Range",
        value: LOVELL_CANYON_LOCATION.range,
      },
      {
        "@type": "PropertyValue",
        name: "Assessor Map",
        value: LOVELL_CANYON_LOCATION.assessorMap,
      },
    ],
    seller: {
      "@id": schemaId(LOVELL_CANYON_SCHEMA_IDS.agent),
    },
  };
}

/** ItemList for /parcels — links both RealEstateListing nodes for SERP clarity. */
export function getLovellCanyonParcelItemListSchema(
  parcels: LovellCanyonParcel[],
  siteUrl: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Lovell Canyon Land Parcels — Clark County NV 89124",
    description:
      "Fee simple raw land parcels in Lovell Canyon, Section 31 T20S R57E, Clark County Nevada 89124.",
    numberOfItems: parcels.length,
    itemListElement: parcels.map((parcel, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${parcel.label} — APN ${parcel.apn}`,
      url: `${siteUrl}/parcels/${parcel.slug}`,
      item: {
        "@id": getLovellCanyonParcelListingId(`/parcels/${parcel.slug}`),
      },
    })),
  };
}

export function getLovellCanyonFaqSchema(faqs: LandFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    about: {
      "@id": schemaId(LOVELL_CANYON_SCHEMA_IDS.place),
    },
    spatialCoverage: getLovellCanyonSpatialCoverage(),
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

export function getLovellCanyonContactPageSchema() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: `${siteUrl}/contact`,
    about: {
      "@id": schemaId(LOVELL_CANYON_SCHEMA_IDS.place),
    },
    spatialCoverage: getLovellCanyonSpatialCoverage(),
    mainEntity: {
      "@id": schemaId(LOVELL_CANYON_SCHEMA_IDS.agent),
    },
  };
}

/** Indexable land pages for AEO/GEO — matches footer and sitemap (no residential routes). */
export function getLovellCanyonSiteNavigationSchema() {
  return INDEXABLE_PATHS.map((path) => ({
    "@type": "SiteNavigationElement" as const,
    "@id": `${getCanonicalUrl(path)}#navigation`,
    name: LOVELL_CANYON_NAV_LABELS[path] ?? path,
    url: getCanonicalUrl(path),
    isPartOf: {
      "@id": schemaId(LOVELL_CANYON_SCHEMA_IDS.website),
    },
    about: {
      "@id": schemaId(LOVELL_CANYON_SCHEMA_IDS.place),
    },
  }));
}

/** Single linked graph for sitewide JSON-LD — avoids duplicate Place nodes. */
export function getLovellCanyonGlobalSchemaGraph() {
  const website = getLovellCanyonWebSiteSchema();
  const place = getLovellCanyonPlaceSchema();
  const trailhead = getLovellCanyonTrailheadPlaceSchema();
  const agent = getLovellCanyonAgentSchema();
  const navigation = getLovellCanyonSiteNavigationSchema();

  return {
    "@context": "https://schema.org",
    "@graph": [website, place, trailhead, agent, ...navigation],
  };
}

export function getLovellCanyonPageHeroImageSchema(
  hero: LovellCanyonPhoto,
  pathname: string,
  pageTitle: string,
  galleryPhotos: LovellCanyonPhoto[] = []
) {
  const siteUrl = getSiteUrl();
  const pageUrl = pathname === "/" ? siteUrl : `${siteUrl}${pathname}`;
  const heroImageId = `${pageUrl}#hero-image`;
  const heroNode = getLovellCanyonImageObjectNode(hero, heroImageId, siteUrl);

  const galleryNodes = galleryPhotos.map((photo, index) =>
    getLovellCanyonImageObjectNode(photo, `${pageUrl}#gallery-image-${index + 1}`, siteUrl)
  );

  const associatedMedia = [
    { "@id": heroImageId },
    ...galleryNodes.map((node) => ({ "@id": node["@id"] })),
  ];

  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebPage",
      "@id": pageUrl,
      name: pageTitle,
      url: pageUrl,
      primaryImageOfPage: { "@id": heroImageId },
      ...(associatedMedia.length > 1 ? { associatedMedia } : {}),
      about: { "@id": schemaId(LOVELL_CANYON_SCHEMA_IDS.place) },
      spatialCoverage: getLovellCanyonSpatialCoverage(),
    },
    heroNode,
    ...galleryNodes,
  ];

  if (galleryNodes.length > 0) {
    graph.push({
      "@type": "ItemList",
      "@id": `${pageUrl}#property-photos`,
      name: "Lovell Canyon Property Photos",
      numberOfItems: galleryNodes.length,
      itemListElement: galleryNodes.map((node, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: { "@id": node["@id"] },
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
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
