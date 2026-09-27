/** Lazy-load Google Maps JavaScript API (Places library) once per page. */

const MAPS_SCRIPT_ID = "google-maps-js";

export type GoogleMapsLoadOptions = {
  apiKey: string;
};

export function loadGoogleMapsScript({ apiKey }: GoogleMapsLoadOptions): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Google Maps can only load in the browser"));
  }

  const w = window as Window & { google?: typeof google };

  if (w.google?.maps) {
    return Promise.resolve();
  }

  const existing = document.getElementById(MAPS_SCRIPT_ID) as HTMLScriptElement | null;
  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error("Google Maps script failed to load")),
        { once: true }
      );
    });
  }

  return new Promise((resolve, reject) => {
    const params = new URLSearchParams({
      key: apiKey,
      v: "weekly",
      libraries: "places,marker",
      loading: "async",
    });

    const script = document.createElement("script");
    script.id = MAPS_SCRIPT_ID;
    script.async = true;
    script.defer = true;
    script.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Google Maps script failed to load"));
    document.head.appendChild(script);
  });
}
