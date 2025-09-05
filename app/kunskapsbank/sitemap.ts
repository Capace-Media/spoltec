import { fetchGraphQL } from "@lib/wp/fetchGraphQL";
import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_MY_WEBSITE || "https://www.spoltec.se";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // Fetch dynamic posts for kunskapsbank
    const response = await fetchGraphQL<any>(
      `
      query GET_ALL_POSTS {
        posts(first: 100) {
          nodes {
            slug
            modifiedGmt
          }
        }
      }
      `
    );

    const dynamicPages: MetadataRoute.Sitemap =
      response?.posts?.nodes?.map((post: any) => ({
        url: `${BASE_URL}/kunskapsbank/${post.slug}`,
        lastModified: post.modifiedGmt
          ? new Date(post.modifiedGmt)
          : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })) || [];

    return [...dynamicPages];
  } catch (error) {
    console.error("Error generating kunskapsbank sitemap:", error);
    // Return empty array on error - the main sitemap will handle the base kunskapsbank URL
    return [];
  }
}
