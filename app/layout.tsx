import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { headers } from "next/headers";
import { getLovellCanyonGlobalSchemaGraph } from "@/lib/lovell-canyon-schema";
import { getLovellCanyonMetadata } from "@/lib/lovell-canyon-seo";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import { CALLACTION_WIDGET_ID } from "@/lib/lovell-canyon-contact";

const globalSchemaGraph = getLovellCanyonGlobalSchemaGraph();

export async function generateMetadata(): Promise<Metadata> {
  const pathname = headers().get("x-pathname") || "/";
  return getLovellCanyonMetadata(pathname);
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.className}>
      <head>
        {/* WidgetTracker — defer until after first paint (PageSpeed / Core Web Vitals) */}
        <Script id="widget-tracker" strategy="lazyOnload">{`
          (function(w,i,d,g,e,t){w["WidgetTrackerObject"]=g;(w[g]=w[g]||function()
          {(w[g].q=w[g].q||[]).push(arguments);}),(w[g].ds=1*new Date());(e="script"),
          (t=d.createElement(e)),(e=d.getElementsByTagName(e)[0]);t.async=1;t.src=i;
          e.parentNode.insertBefore(t,e);})
          (window,"https://widgetbe.com/agent",document,"widgetTracker");
          window.widgetTracker("create","${CALLACTION_WIDGET_ID}");
          window.widgetTracker("send","pageview");
        `}</Script>
        <Script
          src="https://em.realscout.com/widgets/office-listings.js"
          strategy="lazyOnload"
        />
      </head>
      <body>
        <div
          className="hidden"
          aria-hidden="true"
          dangerouslySetInnerHTML={{
            __html:
              "<!-- Property ZIP verified 89124 per MLS comps, June 2026. GBP NAP must match. -->",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchemaGraph) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
