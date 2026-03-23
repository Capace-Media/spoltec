import { fetchGraphQL } from "@lib/wp/fetchGraphQL";
import type { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_MY_WEBSITE || "https://www.spoltec.se";

interface ServiceNode {
  slug: string;
  modifiedGmt: string;
  parent: {
    node: {
      slug: string;
    };
  } | null;
}

interface GetAllServicesQueryData {
  gqlAllService: {
    nodes: ServiceNode[];
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const response = await fetchGraphQL<GetAllServicesQueryData>(
      `
      query GET_ALL_SERVICES {
        gqlAllService(first: 500) {
          nodes {
            slug
            modifiedGmt
            parent {
              node {
                ... on GqlService {
                  slug
                }
              }
            }
          }
        }
      }
      `
    );

    const nodes = response?.gqlAllService?.nodes ?? [];

    const entries: MetadataRoute.Sitemap = nodes.map((service) => {
      const isChild = !!service.parent?.node?.slug;
      const url = isChild
        ? `${BASE_URL}/tjanster/${service.parent!.node.slug}/${service.slug}`
        : `${BASE_URL}/tjanster/${service.slug}`;

      return {
        url,
        lastModified: service.modifiedGmt
          ? new Date(service.modifiedGmt)
          : new Date(),
        changeFrequency: "weekly" as const,
        priority: isChild ? 0.85 : 0.95,
      };
    });

    return entries;
  } catch (error) {
    console.error("Error generating tjanster sitemap:", error);
    return [];
  }
}
