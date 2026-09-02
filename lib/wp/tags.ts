/**
 * Canonical cache tags for WordPress content.
 *
 * Every GraphQL fetch must tag itself with one of these so the
 * /api/revalidate webhook can invalidate it. Build-time fetches
 * (generateStaticParams, sitemaps) use the same tags as runtime fetches —
 * otherwise newly published content is never picked up without a redeploy.
 */
export const TAGS = {
  page: "page",
  post: "post",
  service: "tjanster",
  position: "lediga-tjanster",
  sitemap: "sitemap",
} as const;

export type ContentTag = (typeof TAGS)[keyof typeof TAGS];

/**
 * Maps the `path` value WordPress sends to the webhook onto every tag that
 * needs clearing. Aliases exist because earlier code used several spellings
 * for the same content type.
 */
export const REVALIDATE_ALIASES: Record<string, ContentTag[]> = {
  page: [TAGS.page, TAGS.sitemap],
  pages: [TAGS.page, TAGS.sitemap],
  post: [TAGS.post, TAGS.sitemap],
  posts: [TAGS.post, TAGS.sitemap],
  kunskapsbank: [TAGS.post, TAGS.sitemap],
  tjanster: [TAGS.service, TAGS.sitemap],
  service: [TAGS.service, TAGS.sitemap],
  services: [TAGS.service, TAGS.sitemap],
  "lediga-tjanster": [TAGS.position, TAGS.sitemap],
};
