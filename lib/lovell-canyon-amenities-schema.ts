import type { BreadcrumbItem } from "@/lib/lovell-canyon-breadcrumbs";
import { LOVELL_CANYON_AMENITY_CITY, LOVELL_CANYON_AMENITY_PAGE_PATH } from "@/lib/lovell-canyon-amenity-config";
import { LOVELL_CANYON_CURATED_AMENITIES, LOVELL_CANYON_AMENITIES_FAQ } from "@/lib/lovell-canyon-amenity-places";
import { LOVELL_CANYON_AREA } from "@/lib/lovell-canyon-area";
import {
  getGeoCoordinatesSchema,
  getGoogleMapsViewUrl,
  LOVELL_CANYON_GEO,
} from "@/lib/lovell-canyon-geo";
import {
  getLovellCanyonAgentSchema,
  getLovellCanyonBreadcrumbSchema,
  getLovellCanyonFaqSchema,
  getLovellCanyonPlaceSchema,
  LOVELL_CANYON_SCHEMA_IDS,
} from "@/lib/lovell-canyon-schema";
import { getCanonicalUrl, getSiteUrl } from "@/lib/site-url";

function schemaId(fragment: string) {
  const siteUrl = getSiteUrl();
  if (fragment.startsWith("#")) {
    return `${siteUrl}${fragment}`;
  }
  return `${siteUrl}/${fragment.replace(/^\//, "")}`;
}

export function getLovellCanyonAmenitiesBreadcrumbs(): BreadcrumbItem[] {
  return [
    { name: "Lovell Canyon Land", path: "/" },
    { name: "Nearby Amenities", path: LOVELL_CANYON_AMENITY_PAGE_PATH },
  ];
}

export function getLovellCanyonAmenitiesItemListSchema() {
  const { latitude, longitude } = LOVELL_CANYON_GEO.center;

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Nearby amenities near ${LOVELL_CANYON_AREA.name}, ${LOVELL_CANYON_AMENITY_CITY}`,
    description:
      "Verified parks, dining, healthcare, and recreation destinations referenced for Lovell Canyon land buyers and visitors.",
    numberOfItems: LOVELL_CANYON_CURATED_AMENITIES.length,
    itemListElement: LOVELL_CANYON_CURATED_AMENITIES.map((place, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": place.schemaType,
        name: place.name,
        address: {
          "@type": "PostalAddress",
          streetAddress: place.address,
          addressLocality: place.addressLocality,
          ...(place.postalCode && { postalCode: place.postalCode }),
          addressRegion: "NV",
          addressCountry: "US",
        },
        url: place.sourceUrl,
        ...(place.latitude != null &&
          place.longitude != null && {
            geo: getGeoCoordinatesSchema(place.latitude, place.longitude),
          }),
      },
    })),
    areaServed: {
      "@type": "Place",
      name: LOVELL_CANYON_AREA.name,
      geo: getGeoCoordinatesSchema(latitude, longitude),
      hasMap: getGoogleMapsViewUrl(latitude, longitude),
    },
  };
}

function stripSchemaContext(schema: Record<string, unknown>) {
  const { "@context": _context, ...rest } = schema;
  return rest;
}

export function getLovellCanyonAmenitiesPageGraph() {
  const pageUrl = getCanonicalUrl(LOVELL_CANYON_AMENITY_PAGE_PATH);
  const breadcrumbs = getLovellCanyonAmenitiesBreadcrumbs();

  const webPage = {
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    name: `Nearby Amenities in ${LOVELL_CANYON_AREA.name}, ${LOVELL_CANYON_AMENITY_CITY}`,
    description:
      "Interactive map and guide to parks, dining, healthcare, and valley services near Lovell Canyon Clark County NV 89124 raw land.",
    url: pageUrl,
    isPartOf: { "@id": schemaId(LOVELL_CANYON_SCHEMA_IDS.website) },
    about: { "@id": schemaId(LOVELL_CANYON_SCHEMA_IDS.place) },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      webPage,
      stripSchemaContext(getLovellCanyonPlaceSchema() as Record<string, unknown>),
      stripSchemaContext(getLovellCanyonAgentSchema() as Record<string, unknown>),
      stripSchemaContext(getLovellCanyonFaqSchema(LOVELL_CANYON_AMENITIES_FAQ) as Record<string, unknown>),
      stripSchemaContext(getLovellCanyonAmenitiesItemListSchema() as Record<string, unknown>),
      stripSchemaContext(getLovellCanyonBreadcrumbSchema(breadcrumbs) as Record<string, unknown>),
    ],
  };
}
