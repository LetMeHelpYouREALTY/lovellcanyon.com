/**
 * Plain-language + technical term pairs for visible body copy.
 * Meta tags, JSON-LD, llms.txt, and verbatim legal text keep technical forms unchanged.
 */

import { LOVELL_CANYON_LOCATION } from "@/lib/lovell-canyon-parcels";

/** Plain-first phrases — pair with technical entity strings in the same paragraph. */
export const LAND_GLOSSARY = {
  apnFirstUse: "Assessor Parcel Number (APN)",
  feeSimplePlain: "You own the land outright (fee simple)",
  scheduleAPlain: "Ownership section (Schedule A)",
  scheduleBPlain: "Title exceptions section (Schedule B)",
  legalLocationPlain: "Legal location",
  assessorMapPlain: "Clark County map reference number",
  mapCoordinatesPlain: "Map coordinates",
  rawLandOnly:
    "Raw vacant land only — not homes or condos listed on public home search sites.",
  titleCommitmentPlain: "full title report before closing",
} as const;

/** Field labels for parcel and title pages (plain language; legal values stay verbatim). */
export const LAND_UI_LABELS = {
  parcelNumber: "Parcel number (APN)",
  ownershipType: "Ownership type",
  certificateLot: "Recorded lot number",
  legalDescription: "Legal description (from title report)",
  scheduleAExceptions: "Ownership exceptions (Schedule A)",
  alternateDescription: "Alternate legal description",
  landDivisionSuffix: "Recorded lot split (Certificate of Land Division)",
  clarkCountyTaxLink: "Look up property taxes on Clark County's site",
  clarkCountyAssessorLink: "Clark County Assessor property account inquiry",
  clarkCountyAssessorGisLink: "Assessor GIS map",
  assessorLookupIntro: (apn: string) =>
    `Public assessor records for APN ${apn} (Clark County NV 89124) are available via the`,
  propertyTaxes: (scheduleBItem: number) =>
    `Property taxes (Schedule B, item ${scheduleBItem})`,
} as const;

export function parcelCardTitle(label: string): string {
  return `${label} — ${LAND_UI_LABELS.landDivisionSuffix}`;
}

export function parcelNumberLine(apn: string): string {
  return `${LAND_UI_LABELS.parcelNumber}: ${apn}`;
}

/** Homepage / title section intros */
export const LAND_SECTION_COPY = {
  parcelDetailsIntro:
    "Recorded legal descriptions from the title report ownership section (Schedule A), Clark County, Nevada. Additional specifications are available upon request.",
  parcelDetailsOwnership:
    "Ownership type: fee simple. Title holder recorded on Schedule A of the title report.",
  titleReportSectionHeading: "Title exceptions (Schedule B)",
  titleReportSectionIntro:
    "Exceptions to coverage in addition to the printed exceptions and exclusions in the title policy form, as stated in the title exceptions section (Schedule B) at the date thereof.",
  titleReportOwnershipHeading: "Ownership & legal descriptions (Schedule A)",
  titleReportOwnershipIntro:
    "You own the land outright (fee simple). Who holds title is recorded on Schedule A at the date of the title report.",
  titleReportHeroTitle: "Title Report Summary",
  titleReportHeroSubtitle:
    "You own the land outright (fee simple). Recorded ownership is on Schedule A; title exceptions and requirements are on Schedule B at the date of the report.",
  titleReportCta:
    "Request the full title report before closing and current requirements — call or text Dr. Jan Duffy.",
  exploreTitleReportDesc: "Ownership & title exceptions",
  locationAssessorNote: (assessorMap: string) =>
    `Clark County map reference number ${assessorMap}.`,
  heroPhotoPlaceholder: "Property photo coming soon",
  parcelsHeroSubtitle: `${LAND_GLOSSARY.feeSimplePlain} in ${LOVELL_CANYON_LOCATION.locality}, Clark County NV ${LOVELL_CANYON_LOCATION.postalCode}. ${LOVELL_CANYON_LOCATION.section}, ${LOVELL_CANYON_LOCATION.township} ${LOVELL_CANYON_LOCATION.range}.`,
  contactHeroSubtitle:
    "Lot 2 & Lot 3 — Assessor Parcel Numbers (APN) 135-31-801-006 and 135-31-801-007. Call, text, email, or schedule a consultation.",
  faqHeroSubtitle:
    "Questions about the vacant land parcels, driving access, ownership and title records, and how to inquire.",
  accessVisitLine: (phoneDisplay: string) =>
    `Schedule a showing or access consultation: call or text ${phoneDisplay}.`,
  accessCtaSubheadline: (phoneDisplay: string) =>
    `Get exact parcel access and a guided visit — call or text ${phoneDisplay}.`,
} as const;

/** Plain-language legal location line for body copy (entities preserved). */
export function formatParcelLegalLocation(): string {
  return `${LOVELL_CANYON_LOCATION.section}, ${LOVELL_CANYON_LOCATION.township} ${LOVELL_CANYON_LOCATION.range}, ${LAND_GLOSSARY.assessorMapPlain} ${LOVELL_CANYON_LOCATION.assessorMap}.`;
}

export const MAINLINE_HERO_HIGHLIGHTS = [
  {
    title: "Outright land ownership",
    description: `${LAND_GLOSSARY.feeSimplePlain}. Recorded on title report Schedule A for both parcels.`,
  },
  {
    title: "Two Clark County parcels",
    description: `Lot 2 (APN 135-31-801-006) and Lot 3 (APN 135-31-801-007) in ${LOVELL_CANYON_LOCATION.section}, ${LOVELL_CANYON_LOCATION.township} ${LOVELL_CANYON_LOCATION.range}.`,
  },
  {
    title: "NV-160 & Lovell Canyon Rd",
    description:
      "Reach the area via NV-160 past Mountain Springs, then north on paved Lovell Canyon Rd for roughly 11 miles. Local dirt roads continue to the parcels.",
  },
  {
    title: "Lovell Canyon NV 89124",
    description: `Rural Clark County location — map reference ${LOVELL_CANYON_LOCATION.assessorMap}. Title report Schedule A & B summaries on this site.`,
  },
] as const;
