const CALENDLY_CSS = "https://assets.calendly.com/assets/external/widget.css";
const CALENDLY_JS = "https://assets.calendly.com/assets/external/widget.js";

let calendlyLoadPromise: Promise<void> | null = null;

function appendStylesheet(href: string): void {
  if (document.querySelector(`link[href="${href}"]`)) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

function appendScript(src: string): Promise<void> {
  const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
  if (existing?.dataset.loaded === "true") {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const script = existing ?? document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => {
      script.dataset.loaded = "true";
      resolve();
    };
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    if (!existing) {
      document.body.appendChild(script);
    }
  });
}

/** Load Calendly assets on demand (avoids render-blocking CSS in root layout). */
export function loadCalendlyAssets(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (!calendlyLoadPromise) {
    appendStylesheet(CALENDLY_CSS);
    calendlyLoadPromise = appendScript(CALENDLY_JS);
  }

  return calendlyLoadPromise;
}
