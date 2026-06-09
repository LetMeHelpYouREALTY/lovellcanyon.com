import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { headers } from "next/headers";
import {
  getLovellCanyonAgentSchema,
  getLovellCanyonPlaceSchema,
  getLovellCanyonWebSiteSchema,
} from "@/lib/lovell-canyon-schema";
import { getLovellCanyonMetadata } from "@/lib/lovell-canyon-seo";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

const globalSchemas = [
  getLovellCanyonWebSiteSchema(),
  getLovellCanyonAgentSchema(),
  getLovellCanyonPlaceSchema(),
];

export async function generateMetadata(): Promise<Metadata> {
  const pathname = headers().get("x-pathname") || "/";
  return getLovellCanyonMetadata(pathname);
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.className}>
      <head>
        {/* WidgetTracker */}
        <Script id="widget-tracker" strategy="afterInteractive">{`
          (function(w,i,d,g,e,t){w["WidgetTrackerObject"]=g;(w[g]=w[g]||function()
          {(w[g].q=w[g].q||[]).push(arguments);}),(w[g].ds=1*new Date());(e="script"),
          (t=d.createElement(e)),(e=d.getElementsByTagName(e)[0]);t.async=1;t.src=i;
          e.parentNode.insertBefore(t,e);})
          (window,"https://widgetbe.com/agent",document,"widgetTracker");
          window.widgetTracker("create","WT-XQHVYQWW");
          window.widgetTracker("send","pageview");
        `}</Script>
      </head>
      <body>
        {globalSchemas.map((schema) => (
          <script
            key={schema["@type"]}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        {children}
        <Analytics />
      </body>
    </html>
  );
}
