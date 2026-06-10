import { MapPin, Navigation, ExternalLink } from "lucide-react";
import {
  LOVELL_CANYON_GEO,
  getGoogleMapsDirectionsUrl,
  getGoogleMapsEmbedUrl,
  getGoogleMapsViewUrl,
} from "@/lib/lovell-canyon-geo";
import { LOVELL_CANYON_AREA } from "@/lib/lovell-canyon-area";
import { LOVELL_CANYON_PHONE_TEL, LOVELL_CANYON_PHONE_DISPLAY } from "@/lib/lovell-canyon-contact";

export default function LovellCanyonMap() {
  const { latitude, longitude } = LOVELL_CANYON_GEO.center;

  return (
    <section
      className="py-12 md:py-16 bg-white border-y border-slate-200"
      aria-labelledby="lovell-canyon-map-heading"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h2
            id="lovell-canyon-map-heading"
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-3"
          >
            Lovell Canyon Map
          </h2>
          <p className="text-slate-600">
            Raw land parcels in {LOVELL_CANYON_AREA.name}, {LOVELL_CANYON_AREA.county},{" "}
            {LOVELL_CANYON_AREA.state} {LOVELL_CANYON_AREA.postalCode}. Access from{" "}
            {LOVELL_CANYON_AREA.highwayAccess}.
          </p>
          <p className="mt-3 text-sm text-slate-500 font-mono">
            GPS: {latitude.toFixed(5)}° N, {Math.abs(longitude).toFixed(5)}° W
          </p>
        </div>

        <div className="max-w-5xl mx-auto rounded-xl overflow-hidden border border-slate-200 shadow-sm">
          <iframe
            title="Google Maps — Lovell Canyon, Clark County Nevada 89124"
            src={getGoogleMapsEmbedUrl(latitude, longitude, 11)}
            className="w-full h-[360px] md:h-[420px] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        <div className="max-w-5xl mx-auto mt-6 flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
          <a
            href={getGoogleMapsDirectionsUrl(latitude, longitude)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            <Navigation className="h-4 w-4" aria-hidden />
            Get Directions
          </a>
          <a
            href={getGoogleMapsViewUrl(latitude, longitude)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
          >
            <ExternalLink className="h-4 w-4" aria-hidden />
            View on Google Maps
          </a>
          <a
            href={LOVELL_CANYON_PHONE_TEL}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
          >
            <MapPin className="h-4 w-4" aria-hidden />
            Call {LOVELL_CANYON_PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </section>
  );
}
