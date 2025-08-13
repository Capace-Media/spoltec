import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_MY_WEBSITE || "https://localhost:3000";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/", "/wp-admin/", "/actions"],
    },
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/kunskapsbank/sitemap.xml`,
      `${baseUrl}/tjanster/sitemap.xml`,
    ],
  };
}
