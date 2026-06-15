import type { LovellCanyonParcel } from "@/lib/lovell-canyon-parcels";
import { LOVELL_CANYON_LOCATION } from "@/lib/lovell-canyon-parcels";
import { LOVELL_CANYON_AREA } from "@/lib/lovell-canyon-area";
import { LAND_GLOSSARY } from "@/lib/lovell-canyon-glossary";

/** Lot-specific narrative for SEO/AEO — factual only, no unverified specs. */
export function getParcelOverviewCopy(parcel: LovellCanyonParcel): string[] {
  const sibling =
    parcel.slug === "lot-2"
      ? "Lot 3 (APN 135-31-801-007) is the adjacent certificate lot in the same subdivision."
      : "Lot 2 (APN 135-31-801-006) is the adjacent certificate lot in the same subdivision.";

  return [
    `${parcel.label} is ${LAND_GLOSSARY.feeSimplePlain.toLowerCase()} in ${LOVELL_CANYON_LOCATION.locality}, ${LOVELL_CANYON_LOCATION.county}, Nevada ${LOVELL_CANYON_LOCATION.postalCode}. Clark County assessor parcel number (APN) ${parcel.apn}. Legal location: ${LOVELL_CANYON_LOCATION.section}, ${LOVELL_CANYON_LOCATION.township} ${LOVELL_CANYON_LOCATION.range}, assessor map ${LOVELL_CANYON_LOCATION.assessorMap}.`,
    `${LOVELL_CANYON_AREA.areaContext} Primary paved access is via NV-160 and Lovell Canyon Road; local parcel access continues on unpaved roads in the canyon. ${sibling}`,
    `Property taxes for fiscal year ${parcel.propertyTaxFiscalYear} are ${parcel.propertyTaxStatus.toLowerCase()} (${parcel.propertyTaxAmountPaid} per title report Schedule B, item ${parcel.scheduleBItemNumber}). Acreage, zoning, utilities, and asking price are confirmed on request — not published until verified.`,
  ];
}
