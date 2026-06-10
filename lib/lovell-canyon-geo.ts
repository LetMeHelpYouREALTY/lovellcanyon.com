/**
 * Verified geographic coordinates for Lovell Canyon (Parallel search + USFS, Jun 2026).
 * - Canyon area center: Apple Maps place listing (Clark County, NV)
 * - Trailhead: USFS Humboldt-Toiyabe Lovell Canyon Trailhead (Apr 2025)
 */

export const LOVELL_CANYON_GEO = {
  /** Representative map center for Lovell Canyon valley (Clark County NV 89124) */
  center: {
    latitude: 36.13286,
    longitude: -115.56287,
    label: "Lovell Canyon, Clark County, Nevada 89124",
    source: "https://maps.apple.com/place?place-id=I35D243F2ED2FD200",
  },
  /** USFS Lovell Canyon Trailhead at end of paved Lovell Canyon Rd */
  trailhead: {
    latitude: 36.166591,
    longitude: -115.583236,
    label: "Lovell Canyon Trailhead",
    source: "https://www.fs.usda.gov/r04/humboldt-toiyabe/recreation/lovell-canyon-trailhead",
  },
  /** Bounding box from public topographic sources (approximate canyon extent) */
  boundingBox: {
    south: 35.99607,
    west: -115.58883,
    north: 36.09054,
    east: -115.50935,
    source: "https://en-us.topographic-map.com/map-n4nq51/Lovell-Canyon/",
  },
} as const;

export function getGoogleMapsViewUrl(
  lat: number = LOVELL_CANYON_GEO.center.latitude,
  lng: number = LOVELL_CANYON_GEO.center.longitude
) {
  return `https://www.google.com/maps?q=${lat},${lng}`;
}

export function getGoogleMapsDirectionsUrl(
  lat: number = LOVELL_CANYON_GEO.center.latitude,
  lng: number = LOVELL_CANYON_GEO.center.longitude
) {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}

export function getGoogleMapsEmbedUrl(
  lat: number = LOVELL_CANYON_GEO.center.latitude,
  lng: number = LOVELL_CANYON_GEO.center.longitude,
  zoom = 11
) {
  return `https://maps.google.com/maps?q=${lat},${lng}&hl=en&z=${zoom}&output=embed`;
}

export function getGeoCoordinatesSchema(
  lat: number = LOVELL_CANYON_GEO.center.latitude,
  lng: number = LOVELL_CANYON_GEO.center.longitude
) {
  return {
    "@type": "GeoCoordinates" as const,
    latitude: lat,
    longitude: lng,
  };
}

/** Schema.org GeoShape bounding box — south west north east (WGS84). */
export function getGeoShapeBoundingBoxSchema() {
  const { south, west, north, east } = LOVELL_CANYON_GEO.boundingBox;
  return {
    "@type": "GeoShape" as const,
    box: `${south} ${west} ${north} ${east}`,
  };
}

export function getLovellCanyonSpatialCoverage() {
  return {
    "@type": "Place" as const,
    name: LOVELL_CANYON_GEO.center.label,
    geo: getGeoCoordinatesSchema(),
    geoContains: getGeoShapeBoundingBoxSchema(),
    hasMap: getGoogleMapsViewUrl(),
  };
}

export const LOVELL_CANYON_GEO_SOURCES = [
  LOVELL_CANYON_GEO.center,
  LOVELL_CANYON_GEO.trailhead,
] as const;
