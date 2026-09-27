"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { MapPin, Navigation } from "lucide-react";
import {
  LOVELL_CANYON_AMENITY_CATEGORIES,
  LOVELL_CANYON_AMENITY_MAP,
  type AmenityCategoryId,
  getGoogleMapsApiKey,
  getGoogleMapsMapId,
} from "@/lib/lovell-canyon-amenity-config";
import { searchAmenityCategory } from "@/lib/lovell-canyon-amenity-search";
import { getCuratedPlacesByCategory, type CuratedAmenityPlace } from "@/lib/lovell-canyon-amenity-places";
import { getGoogleMapsDirectionsUrl, getGoogleMapsEmbedUrl } from "@/lib/lovell-canyon-geo";
import { loadGoogleMaps, mapsAuthFailed } from "@/lib/load-google-maps";

const MAP_HEIGHT_CLASS = "h-[360px] md:h-[480px]";

type CommunityAmenityMapProps = {
  /** Show curated list below map (fallback always includes list when API unavailable). */
  showStaticList?: boolean;
  initialCategory?: AmenityCategoryId;
  /** Hide category intro line on compact embeds */
  compact?: boolean;
};

type MapMode = "idle" | "loading" | "interactive" | "fallback";

type ListPlace = {
  id: string;
  name: string;
  address: string;
  description?: string;
};

function formatDirectionsUrl(lat: number, lng: number) {
  return getGoogleMapsDirectionsUrl(lat, lng);
}

function formatPlaceDirectionsQuery(name: string, address: string) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${name}, ${address}`)}`;
}

function setInfoWindowDomContent(
  infoWindow: google.maps.InfoWindow,
  title: string,
  lines: string[],
  directionsUrl: string
) {
  const wrap = document.createElement("div");
  wrap.style.maxWidth = "240px";
  wrap.style.fontFamily = "system-ui, sans-serif";
  wrap.style.fontSize = "14px";
  wrap.style.lineHeight = "1.4";

  const heading = document.createElement("strong");
  heading.textContent = title;
  wrap.appendChild(heading);

  lines.filter(Boolean).forEach((line) => {
    const lineEl = document.createElement("div");
    lineEl.style.marginTop = "6px";
    lineEl.style.color = "#475569";
    lineEl.textContent = line;
    wrap.appendChild(lineEl);
  });

  const linkWrap = document.createElement("div");
  linkWrap.style.marginTop = "10px";
  const link = document.createElement("a");
  link.href = directionsUrl;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.style.color = "#2563eb";
  link.style.fontWeight = "600";
  link.textContent = "Directions";
  linkWrap.appendChild(link);
  wrap.appendChild(linkWrap);

  infoWindow.setContent(wrap);
}

function curatedToListPlace(place: CuratedAmenityPlace): ListPlace {
  const addressParts = [place.address, place.addressLocality, place.postalCode].filter(Boolean);
  return {
    id: place.id,
    name: place.name,
    address: addressParts.join(", "),
    description: place.description,
  };
}

export default function CommunityAmenityMap({
  showStaticList = true,
  initialCategory = "parks",
  compact = false,
}: CommunityAmenityMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapDivRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const communityMarkerRef = useRef<google.maps.Marker | google.maps.marker.AdvancedMarkerElement | null>(
    null
  );
  const placeMarkersRef = useRef<Array<google.maps.Marker | google.maps.marker.AdvancedMarkerElement>>([]);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const observerStartedRef = useRef(false);

  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<MapMode>("idle");
  const [activeCategory, setActiveCategory] = useState<AmenityCategoryId>(initialCategory);
  const [apiListPlaces, setApiListPlaces] = useState<ListPlace[]>([]);
  const [useCuratedList, setUseCuratedList] = useState(false);

  const filterGroupId = useId();
  const apiKey = getGoogleMapsApiKey();
  const { lat, lng } = LOVELL_CANYON_AMENITY_MAP.center;

  const curatedForCategory = getCuratedPlacesByCategory(activeCategory).map(curatedToListPlace);
  const listPlaces =
    mode === "interactive" && apiListPlaces.length > 0 && !useCuratedList
      ? apiListPlaces
      : curatedForCategory;

  const clearPlaceMarkers = useCallback(() => {
    placeMarkersRef.current.forEach((marker) => {
      if ("map" in marker && marker.map) {
        marker.map = null;
      } else if ("setMap" in marker && typeof marker.setMap === "function") {
        marker.setMap(null);
      }
    });
    placeMarkersRef.current = [];
  }, []);

  const destroyMap = useCallback(() => {
    clearPlaceMarkers();
    if (communityMarkerRef.current) {
      if ("map" in communityMarkerRef.current) {
        communityMarkerRef.current.map = null;
      } else if ("setMap" in communityMarkerRef.current) {
        communityMarkerRef.current.setMap(null);
      }
      communityMarkerRef.current = null;
    }
    infoWindowRef.current?.close();
    infoWindowRef.current = null;
    mapInstanceRef.current = null;
  }, [clearPlaceMarkers]);

  const enterFallback = useCallback(() => {
    destroyMap();
    setApiListPlaces([]);
    setUseCuratedList(true);
    setMode("fallback");
  }, [destroyMap]);

  const openInfo = useCallback(
    (title: string, lines: string[], directionsUrl: string) => {
      if (!infoWindowRef.current || !mapInstanceRef.current) return;
      setInfoWindowDomContent(infoWindowRef.current, title, lines, directionsUrl);
    },
    []
  );

  const addCommunityMarker = useCallback(
    async (map: google.maps.Map) => {
      const position = { lat, lng };
      const mapId = getGoogleMapsMapId();
      const title = LOVELL_CANYON_AMENITY_MAP.communityMarkerTitle;

      if (mapId && google.maps.marker?.AdvancedMarkerElement) {
        await google.maps.importLibrary("marker");
        const pin = document.createElement("div");
        pin.className =
          "rounded-full bg-blue-700 text-white text-xs font-bold px-2 py-1 shadow-md border-2 border-white";
        pin.textContent = "Lovell Canyon";
        const marker = new google.maps.marker.AdvancedMarkerElement({
          map,
          position,
          title,
          content: pin,
        });
        communityMarkerRef.current = marker;
        marker.addListener("click", () => {
          openInfo(title, [LOVELL_CANYON_AMENITY_MAP.communityName], formatDirectionsUrl(lat, lng));
          infoWindowRef.current?.open({ map, anchor: marker });
        });
        return;
      }

      const marker = new google.maps.Marker({
        map,
        position,
        title,
        label: { text: "★", color: "#ffffff", fontWeight: "700" },
        zIndex: 1000,
      });
      communityMarkerRef.current = marker;
      marker.addListener("click", () => {
        openInfo(title, [LOVELL_CANYON_AMENITY_MAP.communityName], formatDirectionsUrl(lat, lng));
        infoWindowRef.current?.open({ map, anchor: marker });
      });
    },
    [lat, lng, openInfo]
  );

  const renderCuratedMarkers = useCallback(
    (map: google.maps.Map, places: CuratedAmenityPlace[]) => {
      clearPlaceMarkers();
      places.forEach((place) => {
        const position =
          place.latitude != null && place.longitude != null
            ? { lat: place.latitude, lng: place.longitude }
            : null;
        if (!position) return;

        const marker = new google.maps.Marker({
          map,
          position,
          title: place.name,
        });
        const addressLine = [place.address, place.addressLocality, place.postalCode]
          .filter(Boolean)
          .join(", ");
        marker.addListener("click", () => {
          openInfo(
            place.name,
            [addressLine, place.description ?? ""].filter(Boolean),
            formatPlaceDirectionsQuery(place.name, addressLine)
          );
          infoWindowRef.current?.open({ map, anchor: marker });
        });
        placeMarkersRef.current.push(marker);
      });
    },
    [clearPlaceMarkers, openInfo]
  );

  const searchNearby = useCallback(
    async (map: google.maps.Map, category: AmenityCategoryId) => {
      clearPlaceMarkers();
      setApiListPlaces([]);
      setUseCuratedList(false);

      try {
        const places = await searchAmenityCategory({ lat, lng }, category);

        if (!places.length) {
          setUseCuratedList(true);
          renderCuratedMarkers(map, getCuratedPlacesByCategory(category));
          return;
        }

        const mapped: ListPlace[] = [];

        places.forEach((place) => {
          const location = place.location;
          if (!location) return;

          const coords = location.toJSON();
          const name = place.displayName ?? "Place";
          const address = place.formattedAddress ?? "";
          const directions =
            place.googleMapsURI ?? formatPlaceDirectionsQuery(name, address);

          const marker = new google.maps.Marker({
            map,
            position: coords,
            title: name,
          });
          marker.addListener("click", () => {
            openInfo(name, [address], directions);
            infoWindowRef.current?.open({ map, anchor: marker });
          });
          placeMarkersRef.current.push(marker);

          mapped.push({
            id: `api-${name}-${address}`.slice(0, 80),
            name,
            address,
          });
        });

        setApiListPlaces(mapped);
      } catch {
        setUseCuratedList(true);
        renderCuratedMarkers(map, getCuratedPlacesByCategory(category));
      }
    },
    [clearPlaceMarkers, lat, lng, openInfo, renderCuratedMarkers]
  );

  const initInteractiveMap = useCallback(async () => {
    if (!mapDivRef.current || mapInstanceRef.current) return;

    if (!apiKey || mapsAuthFailed) {
      enterFallback();
      return;
    }

    setMode("loading");

    try {
      await loadGoogleMaps(apiKey);
      if (mapsAuthFailed) {
        enterFallback();
        return;
      }

      const mapId = getGoogleMapsMapId();
      const map = new google.maps.Map(mapDivRef.current, {
        center: { lat, lng },
        zoom: LOVELL_CANYON_AMENITY_MAP.defaultZoom,
        mapId,
        disableDefaultUI: false,
        fullscreenControl: true,
        mapTypeControl: false,
        streetViewControl: false,
      });

      mapInstanceRef.current = map;
      infoWindowRef.current = new google.maps.InfoWindow();

      await addCommunityMarker(map);
      await searchNearby(map, initialCategory);
      setMode("interactive");
    } catch {
      enterFallback();
    }
  }, [addCommunityMarker, apiKey, enterFallback, initialCategory, lat, lng, searchNearby]);

  useEffect(() => {
    const onAuthFailure = () => enterFallback();
    window.addEventListener("gmaps:auth-failure", onAuthFailure);
    return () => window.removeEventListener("gmaps:auth-failure", onAuthFailure);
  }, [enterFallback]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || observerStartedRef.current) return;
    observerStartedRef.current = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    if (mapsAuthFailed) {
      enterFallback();
      return;
    }
    void initInteractiveMap();
  }, [visible, initInteractiveMap, enterFallback]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || mode !== "interactive") return;
    void searchNearby(map, activeCategory);
  }, [activeCategory, mode, searchNearby]);

  const showFallbackEmbed = mode === "fallback" || (mode === "idle" && !apiKey);

  return (
    <div ref={containerRef} className="w-full">
      <div
        role="group"
        aria-labelledby={`${filterGroupId}-label`}
        className="flex flex-wrap gap-2 mb-4"
      >
        <span id={`${filterGroupId}-label`} className="sr-only">
          Filter nearby amenities by category
        </span>
        {LOVELL_CANYON_AMENITY_CATEGORIES.map((category) => {
          const pressed = activeCategory === category.id;
          return (
            <button
              key={category.id}
              type="button"
              aria-pressed={pressed}
              aria-label={category.ariaLabel}
              onClick={() => setActiveCategory(category.id)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium border transition-colors ${
                pressed
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-slate-700 border-slate-300 hover:border-blue-400 hover:text-blue-700"
              }`}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      {!compact && (
        <p className="text-sm text-slate-600 mb-3">
          Map center: Lovell Canyon, Clark County NV — search includes the NV-160 corridor and west
          Las Vegas valley services (approximate).
        </p>
      )}

      <div
        className={`relative w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100 ${MAP_HEIGHT_CLASS}`}
        aria-label="Map showing amenities near Lovell Canyon"
      >
        {showFallbackEmbed ? (
          <iframe
            title="Map of Lovell Canyon Nevada and nearby area"
            src={getGoogleMapsEmbedUrl(lat, lng, LOVELL_CANYON_AMENITY_MAP.defaultZoom)}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <div ref={mapDivRef} className="absolute inset-0 h-full w-full" />
        )}
        {mode === "loading" && !showFallbackEmbed && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-slate-100/80 text-slate-600 text-sm"
            aria-live="polite"
          >
            Loading map…
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <a
          href={formatDirectionsUrl(lat, lng)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          <Navigation className="h-4 w-4" aria-hidden />
          Directions to Lovell Canyon
        </a>
      </div>

      {showStaticList && (
        <div className="mt-8">
          <h3 className="text-lg font-bold text-slate-900 mb-3">
            {LOVELL_CANYON_AMENITY_CATEGORIES.find((c) => c.id === activeCategory)?.label} near
            Lovell Canyon
          </h3>
          {listPlaces.length === 0 ? (
            <p className="text-slate-600 text-sm">
              No curated listings for this category — use the map search or zoom out to explore the
              valley.
            </p>
          ) : (
            <ul className="space-y-3">
              {listPlaces.map((place) => (
                <li
                  key={place.id}
                  className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <p className="font-semibold text-slate-900">{place.name}</p>
                  <p className="text-sm text-slate-600 mt-1">{place.address}</p>
                  {place.description && (
                    <p className="text-sm text-slate-500 mt-2">{place.description}</p>
                  )}
                  <a
                    href={formatPlaceDirectionsQuery(place.name, place.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    <MapPin className="h-3.5 w-3.5" aria-hidden />
                    Directions
                  </a>
                </li>
              ))}
            </ul>
          )}
          {mode === "fallback" && (
            <p className="mt-4 text-xs text-slate-500">
              Interactive category search is unavailable — showing a static map and verified place
              references below.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
