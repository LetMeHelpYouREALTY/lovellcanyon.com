"use client";

import {
  AGENT_LISTINGS_LINK_LABEL,
  AGENT_LISTINGS_SECTION_DESC,
  AGENT_LISTINGS_SECTION_TITLE,
  REALSCOUT_AGENT_ENCODED_ID,
  REALSCOUT_OFFICE_URL,
} from "@/lib/lovell-canyon-contact";

export default function RealScoutOfficeWidget() {
  return (
    <section className="py-12 md:py-16 bg-slate-50 border-y border-slate-200">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            {AGENT_LISTINGS_SECTION_TITLE}
          </h2>
          <p className="text-slate-600">{AGENT_LISTINGS_SECTION_DESC}</p>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: `<realscout-office-listings
              agent-encoded-id="${REALSCOUT_AGENT_ENCODED_ID}"
              sort-order="NEWEST"
              listing-status="For Sale"
              property-types=",SFR,MF,TC,LD"
            ></realscout-office-listings>`,
          }}
        />
        <p className="text-center mt-6">
          <a
            href={REALSCOUT_OFFICE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            {AGENT_LISTINGS_LINK_LABEL}
          </a>
        </p>
      </div>
    </section>
  );
}
