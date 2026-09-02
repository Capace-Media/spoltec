import { fetchGraphQL } from "@lib/wp/fetchGraphQL";
import { TAGS } from "@lib/wp/tags";
import { SITE_URL as BASE_URL } from "@lib/utils/url";
import type { MetadataRoute } from "next";

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
      `,
      {},
      [TAGS.service, TAGS.sitemap]
    );

    const nodes = response?.gqlAllService?.nodes ?? [];
    const seen = new Set<string>();

    return nodes.flatMap((service) => {
      if (!service?.slug) return [];

      const isChild = !!service.parent?.node?.slug;
      const url = isChild
        ? `${BASE_URL}/tjanster/${service.parent!.node.slug}/${service.slug}`
        : `${BASE_URL}/tjanster/${service.slug}`;

      if (seen.has(url)) return [];
      seen.add(url);

      return [
        {
          url,
          lastModified: service.modifiedGmt
            ? new Date(`${service.modifiedGmt}Z`)
            : undefined,
          changeFrequency: "weekly" as const,
          priority: isChild ? 0.85 : 0.95,
        },
      ];
    });
  } catch (error) {
    console.error("Error generating tjanster sitemap:", error);
    return [];
  }
}
