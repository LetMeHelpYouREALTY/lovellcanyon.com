/** Breadcrumb trails for nested land pages — used in UI and BreadcrumbList JSON-LD. */

export type BreadcrumbItem = { name: string; path: string };

export const LOVELL_CANYON_BREADCRUMBS = {
  home: [{ name: "Lovell Canyon Land", path: "/" }],
  parcels: [
    { name: "Lovell Canyon Land", path: "/" },
    { name: "Parcels", path: "/parcels" },
  ],
  lot2: [
    { name: "Lovell Canyon Land", path: "/" },
    { name: "Parcels", path: "/parcels" },
    { name: "Lot 2 — APN 135-31-801-006", path: "/parcels/lot-2" },
  ],
  lot3: [
    { name: "Lovell Canyon Land", path: "/" },
    { name: "Parcels", path: "/parcels" },
    { name: "Lot 3 — APN 135-31-801-007", path: "/parcels/lot-3" },
  ],
  titleReport: [
    { name: "Lovell Canyon Land", path: "/" },
    { name: "Title Report", path: "/title-report" },
  ],
  hub89124: [
    { name: "Lovell Canyon Land", path: "/" },
    { name: "89124 Land", path: "/89124-land" },
  ],
  buyingRawLand: [
    { name: "Lovell Canyon Land", path: "/" },
    { name: "Buying Raw Land", path: "/buying-raw-land" },
  ],
  vsPahrump: [
    { name: "Lovell Canyon Land", path: "/" },
    { name: "Lovell Canyon vs Pahrump", path: "/lovell-canyon-vs-pahrump" },
  ],
} as const satisfies Record<string, BreadcrumbItem[]>;
