import { fetchGraphQL } from "@lib/wp/fetchGraphQL";
import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_MY_WEBSITE || "https://www.spoltec.se";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
      {
        url: BASE_URL,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1.0,
      },
      {
        url: `${BASE_URL}/tjanster`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${BASE_URL}/kunskapsbank`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      },
      {
        url: `${BASE_URL}/kontakta-oss`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.9,
      },
      {
        url: `${BASE_URL}/akut-hjalp`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      },
    ];

    // Fetch dynamic pages
    const response = await fetchGraphQL<any>(
      `
      query GET_ALL_PAGES {
        pages(first: 100) {
          nodes {
            slug
            modifiedGmt
          }
        }
      }
      `
    );

    const dynamicPages: MetadataRoute.Sitemap =
      response?.pages?.nodes
        ?.filter((page: any) => page.slug !== "hem") // Exclude /hem as it duplicates root page
        ?.map((page: any) => ({
          url: `${BASE_URL}/${page.slug}`,
          lastModified: page.modifiedGmt
            ? new Date(page.modifiedGmt)
            : new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.6,
        })) || [];

    return [...staticPages, ...dynamicPages];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // Return minimal sitemap on error
    return [
      {
        url: BASE_URL,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1.0,
      },
    ];
  }
}
