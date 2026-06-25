/**
 * Google Image Metadata URLs — per Search Central Image License guidance (2026).
 * @see https://developers.google.com/search/docs/appearance/structured-data/image-license-metadata
 *
 * - license: page describing usage terms
 * - acquireLicensePage: page where users request usage rights
 */

import { getCanonicalUrl } from "@/lib/site-url";

export const LOVELL_CANYON_IMAGE_LICENSE_PATH = "/image-license" as const;

export function getLovellCanyonImageLicenseUrls() {
  return {
    license: getCanonicalUrl(LOVELL_CANYON_IMAGE_LICENSE_PATH),
    acquireLicensePage: getCanonicalUrl("/contact"),
  } as const;
}
