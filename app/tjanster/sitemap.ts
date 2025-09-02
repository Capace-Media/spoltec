import { fetchGraphQL } from "@lib/wp/fetchGraphQL";
import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_MY_WEBSITE || "https://www.spoltec.se";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // Fetch dynamic services for tjanster
    const response = await fetchGraphQL<any>(
      `
      query GET_ALL_SERVICES {
        gqlAllService(first: 100) {
          nodes {
            slug
            modifiedGmt
          }
        }
      }
      `
    );

    const dynamicPages: MetadataRoute.Sitemap =
      response?.gqlAllService?.nodes?.map((service: any) => ({
        url: `${BASE_URL}/tjanster/${service.slug}`,
        lastModified: service.modifiedGmt
          ? new Date(service.modifiedGmt)
          : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })) || [];

    return [...dynamicPages];
  } catch (error) {
    console.error("Error generating tjanster sitemap:", error);
    // Return empty array on error - the main sitemap will handle the base tjanster URL
    return [];
  }
}
