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
        ?.filter((page: any) => {
          // Exclude pages that are handled statically
          const pagesToExclude = [
            "hem",
            "akut-hjalp",
            "kontakta-oss",
            "kunskapsbank", // Add this to prevent duplicate
            "tjanster",
            // Add other exclusions as needed
          ];
          return !pagesToExclude.includes(page.slug);
        })
        ?.map((page: any) => {
          // High priority for location/commercial pages
          const isLocationPage =
            /-(boras|goteborg|malmo|helsingborg|kalmar|karlskrona|kristianstad|halmstad|varberg|vaxjo|jonkoping)$/.test(
              page.slug
            );
          const isCommercialPage =
            page.slug.includes("avloppsspolning") ||
            page.slug.includes("relining") ||
            page.slug.includes("oljeavskiljare") ||
            page.slug.includes("rorinspektion");

          let priority = 0.8; // default

          if (isLocationPage && isCommercialPage) {
            priority = 0.95; // Highest for location + service pages
          } else if (isCommercialPage) {
            priority = 0.9; // High for service pages
          } else if (isLocationPage) {
            priority = 0.85; // Medium-high for location pages
          }

          return {
            url: `${BASE_URL}/${page.slug}`,
            lastModified: page.modifiedGmt
              ? new Date(page.modifiedGmt)
              : new Date(),
            changeFrequency: "weekly" as const,
            priority,
          };
        }) || [];

    // Add this to your main sitemap function
    const postsResponse = await fetchGraphQL<any>(
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

    const postPages: MetadataRoute.Sitemap =
      postsResponse?.posts?.nodes?.map((post: any) => ({
        url: `${BASE_URL}/kunskapsbank/${post.slug}`,
        lastModified: post.modifiedGmt
          ? new Date(post.modifiedGmt)
          : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      })) || [];

    return [...staticPages, ...dynamicPages, ...postPages];
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
