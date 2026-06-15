import { LOVELL_CANYON_OFFICE } from "@/lib/lovell-canyon-contact";
import {
  getGoogleMapsEmbedUrl,
  getGoogleMapsViewUrl,
} from "@/lib/lovell-canyon-geo";

/** Office coordinates — matches GBP physical location (89134). */
export const LOVELL_CANYON_OFFICE_GEO = {
  latitude: 36.1941,
  longitude: -115.2678,
} as const;

export function getOfficeAddressLine() {
  return `${LOVELL_CANYON_OFFICE.street}, ${LOVELL_CANYON_OFFICE.city}, ${LOVELL_CANYON_OFFICE.region} ${LOVELL_CANYON_OFFICE.postalCode}`;
}

export function getOfficeGoogleMapsViewUrl() {
  return getGoogleMapsViewUrl(
    LOVELL_CANYON_OFFICE_GEO.latitude,
    LOVELL_CANYON_OFFICE_GEO.longitude
  );
}

export function getOfficeGoogleMapsDirectionsUrl() {
  const destination = encodeURIComponent(getOfficeAddressLine());
  return `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
}

export function getOfficeGoogleMapsEmbedUrl(zoom = 15) {
  return getGoogleMapsEmbedUrl(
    LOVELL_CANYON_OFFICE_GEO.latitude,
    LOVELL_CANYON_OFFICE_GEO.longitude,
    zoom
  );
}

export function getGbpProfileUrl(): string | null {
  const placeId = process.env.NEXT_PUBLIC_GBP_PLACE_ID?.trim();
  if (placeId) {
    return `https://www.google.com/maps/place/?q=place_id:${placeId}`;
  }
  return process.env.NEXT_PUBLIC_GBP_PROFILE_URL?.trim() || null;
}

export function getGbpReviewsUrl(): string | null {
  const placeId = process.env.NEXT_PUBLIC_GBP_PLACE_ID?.trim();
  if (placeId) {
    return `https://search.google.com/local/writereview?placeid=${placeId}`;
  }
  return process.env.NEXT_PUBLIC_GBP_REVIEWS_URL?.trim() || null;
}
