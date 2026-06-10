import { CLARK_COUNTY_TAX_PORTAL_URL } from "@/lib/lovell-canyon-title-schedule-b";

/** Clark County Assessor GIS map (parcel boundaries). */
export const CLARK_COUNTY_ASSESSOR_GIS_URL =
  "https://maps.clarkcountynv.gov/assessor/";

/**
 * Clark County property account inquiry — enter APN with dashes (e.g. 135-31-801-006).
 * Verified postal code for Lovell Canyon parcels in this map area: 89124 (Clark County).
 */
export function getClarkCountyAssessorParcelInquiryUrl(apn: string): string {
  return `${CLARK_COUNTY_TAX_PORTAL_URL}/search_public1.asp`;
}

export function formatApnForAssessorSearch(apn: string): string {
  return apn;
}
