import type { MetadataRoute } from "next";
import { SITE_URL } from "@lib/utils/url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/wp-admin/", "/actions"],
    },
    sitemap: [
      `${SITE_URL}/sitemap.xml`,
      `${SITE_URL}/tjanster/sitemap.xml`,
      `${SITE_URL}/kunskapsbank/sitemap.xml`,
    ],
    host: SITE_URL,
  };
}
