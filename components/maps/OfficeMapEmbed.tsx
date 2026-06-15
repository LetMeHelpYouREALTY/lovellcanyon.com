"use client";

import { useState } from "react";
import { Building2, ExternalLink, Navigation, Star } from "lucide-react";
import {
  LOVELL_CANYON_OFFICE,
  LOVELL_CANYON_PHONE_DISPLAY,
  LOVELL_CANYON_PHONE_TEL,
} from "@/lib/lovell-canyon-contact";
import {
  getOfficeGoogleMapsDirectionsUrl,
  getOfficeGoogleMapsEmbedUrl,
  getOfficeGoogleMapsViewUrl,
  getGbpProfileUrl,
  getGbpReviewsUrl,
} from "@/lib/lovell-canyon-office";

type OfficeMapEmbedProps = {
  showTitle?: boolean;
};

export default function OfficeMapEmbed({ showTitle = true }: OfficeMapEmbedProps) {
  const [mapLoaded, setMapLoaded] = useState(false);
  const gbpProfileUrl = getGbpProfileUrl();
  const gbpReviewsUrl = getGbpReviewsUrl();

  return (
    <section
      className="py-12 md:py-16 bg-white border-y border-slate-200"
      aria-labelledby="office-map-heading"
    >
      <div className="container mx-auto px-4">
        {showTitle && (
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2
              id="office-map-heading"
              className="text-2xl md:text-3xl font-bold text-slate-900 mb-3"
            >
              Brokerage office
            </h2>
            <p className="text-slate-600">
              Dr. Jan Duffy, Land Specialist — {LOVELL_CANYON_OFFICE.street},{" "}
              {LOVELL_CANYON_OFFICE.city}, {LOVELL_CANYON_OFFICE.region}{" "}
              {LOVELL_CANYON_OFFICE.postalCode}
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Lovell Canyon land parcels are in Clark County NV 89124 — not at this office address.
            </p>
          </div>
        )}

        <div className="max-w-5xl mx-auto rounded-xl overflow-hidden border border-slate-200 shadow-sm">
          {mapLoaded ? (
            <iframe
              title="Google Maps — Berkshire Hathaway HomeServices office, Las Vegas NV 89134"
              src={getOfficeGoogleMapsEmbedUrl()}
              className="w-full h-[360px] md:h-[420px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setMapLoaded(true)}
              className="flex h-[360px] md:h-[420px] w-full flex-col items-center justify-center gap-4 bg-slate-100 px-6 text-center transition-colors hover:bg-slate-200/80"
              aria-label="Load Google Map for brokerage office"
            >
              <Building2 className="h-10 w-10 text-blue-600" aria-hidden />
              <span className="text-lg font-semibold text-slate-900">Load office map</span>
              <span className="max-w-md text-sm text-slate-600">
                Tap to load the interactive map. Call, directions, and Google profile links work
                without loading the embed.
              </span>
            </button>
          )}
        </div>

        <div className="max-w-5xl mx-auto mt-6 flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
          <a
            href={LOVELL_CANYON_PHONE_TEL}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            Call {LOVELL_CANYON_PHONE_DISPLAY}
          </a>
          <a
            href={getOfficeGoogleMapsDirectionsUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
          >
            <Navigation className="h-4 w-4" aria-hidden />
            Directions
          </a>
          <a
            href={getOfficeGoogleMapsViewUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
          >
            <ExternalLink className="h-4 w-4" aria-hidden />
            View on Google Maps
          </a>
          {gbpProfileUrl && (
            <a
              href={gbpProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
            >
              <Building2 className="h-4 w-4" aria-hidden />
              Google Business Profile
            </a>
          )}
          {gbpReviewsUrl && (
            <a
              href={gbpReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
            >
              <Star className="h-4 w-4" aria-hidden />
              View Google Reviews
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
