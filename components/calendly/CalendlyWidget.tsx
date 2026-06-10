"use client";

import { useEffect, useRef, useState } from "react";
import { loadCalendlyAssets } from "@/lib/load-calendly";

interface CalendlyWidgetProps {
  url?: string;
  minWidth?: string;
  height?: string;
}

export default function CalendlyWidget({
  url = "https://calendly.com/drjanduffy/showing",
  minWidth = "320px",
  height = "700px",
}: CalendlyWidgetProps) {
  const widgetRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    loadCalendlyAssets()
      .then(() => {
        if (!cancelled) setReady(true);
      })
      .catch(() => {
        if (!cancelled) setReady(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!ready || !widgetRef.current) return;

    const calendly = (window as Window & { Calendly?: { initInlineWidget: (opts: object) => void } })
      .Calendly;
    if (!calendly) return;

    widgetRef.current.innerHTML = "";

    const widgetDiv = document.createElement("div");
    widgetDiv.className = "calendly-inline-widget";
    widgetDiv.setAttribute("data-url", url);
    widgetDiv.style.minWidth = minWidth;
    widgetDiv.style.height = height;
    widgetDiv.style.width = "100%";

    widgetRef.current.appendChild(widgetDiv);

    calendly.initInlineWidget({
      url,
      parentElement: widgetDiv,
    });
  }, [ready, url, minWidth, height]);

  return (
    <div ref={widgetRef} style={{ minWidth, height, width: "100%" }}>
      {!ready && (
        <div
          className="flex h-full min-h-[320px] items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-500"
          aria-live="polite"
        >
          Loading scheduling calendar…
        </div>
      )}
    </div>
  );
}
