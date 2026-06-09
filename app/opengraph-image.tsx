import { ImageResponse } from "next/og";
import { LOVELL_CANYON_SEO } from "@/lib/lovell-canyon-seo";

export const runtime = "edge";
export const alt = LOVELL_CANYON_SEO.imageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)",
          padding: "64px",
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: "#93c5fd",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Clark County, Nevada · Raw Land
          </div>
          <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.15, maxWidth: 900 }}>
            Lovell Canyon Land — Two Parcels
          </div>
          <div style={{ fontSize: 28, color: "#cbd5e1", lineHeight: 1.4, maxWidth: 820 }}>
            Lot 2 &amp; Lot 3 · APN 006 &amp; 007 · Fee Simple · NV-160 &amp; Lovell Canyon Rd
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "2px solid rgba(255,255,255,0.2)",
            paddingTop: "32px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ fontSize: 26, fontWeight: 600 }}>Dr. Jan Duffy, REALTOR®</div>
            <div style={{ fontSize: 22, color: "#94a3b8" }}>
              Berkshire Hathaway HomeServices Nevada Properties
            </div>
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, color: "#60a5fa" }}>702-222-1964</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
