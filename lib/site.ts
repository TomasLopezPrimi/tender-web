/**
 * Canonical domain for the Tender site.
 * www.tender.com.ar 301-redirects to this (no-www).
 * Use this constant everywhere URLs are needed — JSON-LD, metadata, sitemap, robots.
 */
export const SITE_URL = "https://tender.com.ar";

/**
 * Returns an absolute URL by joining SITE_URL with a relative path.
 * The path should start with "/".
 *
 * @example
 * absoluteUrl("/tienda") // "https://tender.com.ar/tienda"
 * absoluteUrl("/")       // "https://tender.com.ar/"
 */
export function absoluteUrl(path: string): string {
  // Ensure no double slashes when path starts with "/"
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
