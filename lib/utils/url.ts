/**
 * Single source of truth for the canonical origin. Everything that emits a
 * public URL (metadata, canonicals, sitemaps, robots, JSON-LD) reads from here
 * so a staging override can never make canonicals and sitemaps disagree.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_MY_WEBSITE || "https://www.spoltec.se"
).replace(/\/$/, "");

export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
