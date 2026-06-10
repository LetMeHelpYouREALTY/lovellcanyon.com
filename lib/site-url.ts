/** Matches Vercel primary domain (apex redirects to www). */
const SITE_HOST = "www.lovellcanyon.com";
const APEX_HOST = "lovellcanyon.com";

function normalizeLovellCanyonOrigin(raw: string): string {
  const withProtocol = raw.startsWith("http") ? raw : `https://${raw}`;
  const url = new URL(withProtocol.replace(/\/$/, ""));

  if (url.hostname === APEX_HOST) {
    url.hostname = SITE_HOST;
  }

  return url.origin;
}

/** Canonical origin for lovellcanyon.com (no trailing slash). Always www. */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    try {
      return normalizeLovellCanyonOrigin(fromEnv);
    } catch {
      // fall through to default
    }
  }
  return `https://${SITE_HOST}`;
}

export function getSiteHost(): string {
  return SITE_HOST;
}

/** Absolute canonical URL for a pathname (no trailing slash except origin-only). */
export function getCanonicalUrl(pathname = "/"): string {
  const siteUrl = getSiteUrl();
  if (pathname === "/" || pathname === "") {
    return siteUrl;
  }

  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const withoutTrailingSlash =
    normalized.endsWith("/") && normalized !== "/"
      ? normalized.slice(0, -1)
      : normalized;

  return `${siteUrl}${withoutTrailingSlash}`;
}

/** Sitemap and robots.txt absolute URL — must match GSC property host. */
export function getSitemapUrl(): string {
  return `${getSiteUrl()}/sitemap.xml`;
}
