import {
  LOVELL_CANYON_AMENITY_CATEGORIES,
  LOVELL_CANYON_AMENITY_MAP,
  type AmenityCategoryId,
} from "@/lib/lovell-canyon-amenity-config";

const cache = new Map<string, Promise<google.maps.places.Place[]>>();

export function searchAmenityCategory(
  center: google.maps.LatLngLiteral,
  categoryId: AmenityCategoryId
): Promise<google.maps.places.Place[]> {
  const config = LOVELL_CANYON_AMENITY_CATEGORIES.find((c) => c.id === categoryId);
  if (!config) {
    return Promise.resolve([]);
  }

  let p = cache.get(categoryId);
  if (!p) {
    p = (async () => {
      const { Place } = (await google.maps.importLibrary("places")) as google.maps.PlacesLibrary;
      const { places } = await Place.searchNearby({
        fields: ["displayName", "location", "formattedAddress", "googleMapsURI"],
        locationRestriction: {
          center,
          radius: LOVELL_CANYON_AMENITY_MAP.searchRadiusMeters,
        },
        includedPrimaryTypes: config.placeTypes,
        maxResultCount: LOVELL_CANYON_AMENITY_MAP.maxPlaceResults,
        rankPreference: "POPULARITY" as google.maps.places.SearchNearbyRankPreference,
      });
      return places ?? [];
    })();
    p.catch(() => cache.delete(categoryId));
    cache.set(categoryId, p);
  }
  return p;
}
