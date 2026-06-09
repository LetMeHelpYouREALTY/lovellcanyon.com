/** Verified from title report Schedule A — Clark County, Nevada */

export const LOVELL_CANYON_LOCATION = {
  locality: "Lovell Canyon",
  county: "Clark County",
  region: "NV",
  postalCode: "89120",
  section: "Section 31",
  township: "T20S",
  range: "R57E",
  assessorMap: "135-31-8",
} as const;

export type LovellCanyonParcelSlug = "lot-2" | "lot-3";

export type LovellCanyonParcel = {
  slug: LovellCanyonParcelSlug;
  apn: string;
  label: string;
  certificateLot: string;
  estate: string;
  titleVestedIn: string;
  legalDescription: string;
  scheduleAExceptions: string;
  alternateDescription: string;
  /** Schedule B — verified property tax status at date of title report */
  propertyTaxFiscalYear: string;
  propertyTaxAmountPaid: string;
  propertyTaxStatus: string;
  scheduleBItemNumber: number;
};

export const TITLE_ESTATE = "Fee simple";

export const LOVELL_CANYON_PARCELS: LovellCanyonParcel[] = [
  {
    slug: "lot-2",
    apn: "135-31-801-006",
    label: "Lot 2",
    certificateLot: "Lot 2",
    estate: TITLE_ESTATE,
    titleVestedIn: "David George Petrides, a single man",
    legalDescription:
      "The Northeast Quarter (NE1/4) of the Northeast Quarter (NE1/4) of the Southwest Quarter (SW1/4) of the Southeast Quarter (SE1/4), in Section 31, Township 20 South, Range 57 East, M.D.M.",
    scheduleAExceptions:
      "Excepting therefrom any interest in those portions of land as conveyed to the County of Clark, by deed recorded March 15, 1993 in Book 930315, as Instrument No. 00597, of Official Records, Clark County, Nevada.",
    alternateDescription:
      "Said land is also described as Lot 2 of that certain Certificate of Land Division recorded July 18, 1994 in Book 940719, as Instrument No. 01170, of Official Records, Clark County, Nevada.",
    propertyTaxFiscalYear: "2025-2026",
    propertyTaxAmountPaid: "$285.90",
    propertyTaxStatus: "Paid in full per title report Schedule B",
    scheduleBItemNumber: 7,
  },
  {
    slug: "lot-3",
    apn: "135-31-801-007",
    label: "Lot 3",
    certificateLot: "Lot 3",
    estate: TITLE_ESTATE,
    titleVestedIn: "David George Petrides, a single man",
    legalDescription:
      "The Southeast Quarter (SE1/4) of the Northeast Quarter (NE1/4) of the Southwest Quarter (SW1/4) of the Southeast Quarter (SE1/4) of Section 31, Township 20 South, Range 57 East, M.D.B. & M.",
    scheduleAExceptions:
      "Excepting therefrom any interest in the east thirty feet (30') and the south thirty feet (30') together with the spandrel area in the southeast corner thereof as conveyed to the County of Clark, by those certain deeds recorded March 15, 1993 in Book 930315, Instrument No. 00597, of Official Records, and recorded July 18, 1994 in Book 940719, Instrument No. 01171, of Official Records, Clark County, Nevada.",
    alternateDescription:
      "Said land is also described as Lot 3 of that certain Certificate of Land Division recorded July 19, 1994 in Book 940719, as Instrument No. 01170, of Official Records, Clark County, Nevada.",
    propertyTaxFiscalYear: "2025-2026",
    propertyTaxAmountPaid: "$285.90",
    propertyTaxStatus: "Paid in full per title report Schedule B",
    scheduleBItemNumber: 8,
  },
];

/** Fields still awaiting confirmation — do not invent values */
export const PARCEL_PLACEHOLDER_FIELDS = [
  { key: "acreage", label: "Acreage" },
  { key: "price", label: "Price" },
  { key: "lot-dimensions", label: "Lot dimensions" },
  { key: "zoning", label: "Zoning" },
  { key: "utilities-water", label: "Water" },
  { key: "utilities-power", label: "Power" },
  { key: "utilities-septic", label: "Septic" },
  { key: "road-maintenance", label: "Road maintenance" },
  { key: "hoa", label: "HOA" },
];

export function getParcelBySlug(slug: LovellCanyonParcelSlug): LovellCanyonParcel | undefined {
  return LOVELL_CANYON_PARCELS.find((p) => p.slug === slug);
}
