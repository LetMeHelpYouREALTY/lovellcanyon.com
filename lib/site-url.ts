const SITE_HOST = "lovellcanyon.com";

/** Canonical origin for lovellcanyon.com (no trailing slash). */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  return `https://${SITE_HOST}`;
}

export function getSiteHost(): string {
  return SITE_HOST;
}
