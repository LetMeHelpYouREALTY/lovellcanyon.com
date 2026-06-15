/**
 * Sitewide footer navigation — land listing only (no residential template links).
 * Keep in sync with INDEXABLE_PATHS and SiteNavigationElement JSON-LD.
 */

import { CLARK_COUNTY_TAX_PORTAL_URL } from "@/lib/lovell-canyon-title-schedule-b";

export type FooterLink = {
  href: string;
  label: string;
  external?: boolean;
};

/** Primary indexable land pages — matches navbar. */
export const LOVELL_CANYON_FOOTER_LAND_LINKS: FooterLink[] = [
  { href: "/parcels", label: "Parcels Overview" },
  { href: "/parcels/lot-2", label: "Lot 2 — APN 135-31-801-006" },
  { href: "/parcels/lot-3", label: "Lot 3 — APN 135-31-801-007" },
  { href: "/location", label: "Lovell Canyon NV 89124" },
  { href: "/89124-land", label: "89124 Land for Sale" },
  { href: "/access", label: "NV-160 & Dirt Road Access" },
  { href: "/title-report", label: "Title Report Summary" },
  { href: "/faq", label: "Raw Land FAQ" },
  { href: "/contact", label: "Inquire About Land" },
];

/** Hyperlocal resources for land buyers (AEO/GEO — Clark County + canyon context). */
export const LOVELL_CANYON_FOOTER_RESOURCE_LINKS: FooterLink[] = [
  { href: "/access", label: "Directions from Las Vegas (NV-160)" },
  { href: "/89124-land", label: "Zip 89124 — Clark County Land" },
  { href: "/buying-raw-land", label: "How to Buy Raw Land" },
  { href: "/lovell-canyon-vs-pahrump", label: "Lovell Canyon vs Pahrump" },
  { href: "/location", label: "Section 31 T20S R57E — Map & GPS" },
  { href: "/title-report", label: "Fee Simple & Schedule A/B" },
  { href: "/faq", label: "Off-Grid & Vacant Land Questions" },
  {
    href: CLARK_COUNTY_TAX_PORTAL_URL,
    label: "Clark County Property Tax Lookup",
    external: true,
  },
  { href: "/fair-housing.txt", label: "Fair Housing Notice", external: true },
];

/** Labels for SiteNavigationElement schema (indexable paths only). */
export const LOVELL_CANYON_NAV_LABELS: Record<string, string> = {
  "/": "Lovell Canyon Land Overview",
  "/parcels": "Parcels Overview",
  "/parcels/lot-2": "Lot 2 — APN 135-31-801-006",
  "/parcels/lot-3": "Lot 3 — APN 135-31-801-007",
  "/location": "Lovell Canyon NV 89124 Location",
  "/89124-land": "89124 Land for Sale — Lovell Canyon",
  "/access": "NV-160 & Lovell Canyon Road Access",
  "/buying-raw-land": "How to Buy Raw Land in Clark County",
  "/lovell-canyon-vs-pahrump": "Lovell Canyon vs Pahrump — County Guide",
  "/title-report": "Title Report Summary",
  "/faq": "Raw Land FAQ",
  "/contact": "Inquire About Lovell Canyon Land",
};
