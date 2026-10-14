/**
 * Hyperlocal amenity map — community center and category filters for Lovell Canyon.
 * Center: lib/lovell-canyon-geo.ts (Apple Maps place + USFS trailhead reference).
 */

import { LOVELL_CANYON_AREA } from "@/lib/lovell-canyon-area";
import { LOVELL_CANYON_GEO } from "@/lib/lovell-canyon-geo";

export const LOVELL_CANYON_AMENITY_PAGE_PATH = "/amenities" as const;

/** Primary city for SEO copy — canyon is Clark County west of the Las Vegas Valley. */
export const LOVELL_CANYON_AMENITY_CITY = "Las Vegas" as const;

export type AmenityCategoryId =
  | "parks"
  | "grocery"
  | "healthcare"
  | "restaurants"
  | "golf"
  | "fitness"
  | "pharmacies"
  | "shopping"
  | "cafes"
  | "parking"
  | "schools";

export type AmenityCategoryConfig = {
  id: AmenityCategoryId;
  label: string;
  /** Google Places API (New) primary types for searchNearby */
  placeTypes: string[];
  ariaLabel: string;
};

/** Rural / mountain land — recreation and NV-160 corridor first; schools last. */
export const LOVELL_CANYON_AMENITY_CATEGORIES: AmenityCategoryConfig[] = [
  {
    id: "parks",
    label: "Parks",
    placeTypes: ["park", "national_park", "hiking_area"],
    ariaLabel: "Show parks and recreation near Lovell Canyon",
  },
  {
    id: "grocery",
    label: "Grocery",
    placeTypes: ["grocery_store", "supermarket"],
    ariaLabel: "Show grocery stores near Lovell Canyon",
  },
  {
    id: "healthcare",
    label: "Healthcare",
    placeTypes: ["hospital", "doctor", "medical_clinic"],
    ariaLabel: "Show healthcare near Lovell Canyon",
  },
  {
    id: "restaurants",
    label: "Restaurants",
    placeTypes: ["restaurant"],
    ariaLabel: "Show restaurants near Lovell Canyon",
  },
  {
    id: "golf",
    label: "Golf",
    placeTypes: ["golf_course"],
    ariaLabel: "Show golf courses near Lovell Canyon",
  },
  {
    id: "fitness",
    label: "Fitness",
    placeTypes: ["gym", "fitness_center"],
    ariaLabel: "Show fitness centers near Lovell Canyon",
  },
  {
    id: "pharmacies",
    label: "Pharmacies",
    placeTypes: ["pharmacy", "drugstore"],
    ariaLabel: "Show pharmacies near Lovell Canyon",
  },
  {
    id: "shopping",
    label: "Shopping",
    placeTypes: ["shopping_mall", "department_store"],
    ariaLabel: "Show shopping near Lovell Canyon",
  },
  {
    id: "cafes",
    label: "Cafes",
    placeTypes: ["cafe", "coffee_shop"],
    ariaLabel: "Show cafes near Lovell Canyon",
  },
  {
    id: "parking",
    label: "Parking",
    placeTypes: ["parking"],
    ariaLabel: "Show parking near Lovell Canyon",
  },
  {
    id: "schools",
    label: "Schools",
    placeTypes: ["school", "primary_school", "secondary_school"],
    ariaLabel: "Show schools in the greater Las Vegas area",
  },
];

export const LOVELL_CANYON_AMENITY_MAP = {
  communityName: LOVELL_CANYON_AREA.name,
  communityMarkerTitle: `${LOVELL_CANYON_AREA.name} — Clark County NV ${LOVELL_CANYON_AREA.postalCode}`,
  center: {
    lat: LOVELL_CANYON_GEO.center.latitude,
    lng: LOVELL_CANYON_GEO.center.longitude,
  },
  defaultZoom: 11,
  /** Remote canyon — include NV-160 corridor and west Las Vegas valley services */
  searchRadiusMeters: 45_000,
  maxPlaceResults: 12,
} as const;

export function getGoogleMapsApiKey(): string | undefined {
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim();
  return key && key.length > 0 ? key : undefined;
}

export function getGoogleMapsMapId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID?.trim();
  return id && id.length > 0 ? id : undefined;
}
