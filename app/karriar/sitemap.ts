import { fetchGraphQL } from "@lib/wp/fetchGraphQL";
import { POSITION_SLUGS_QUERY } from "@lib/queries/employment";
import { TAGS } from "@lib/wp/tags";
import { SITE_URL } from "@lib/utils/url";
import type { MetadataRoute } from "next";

type PositionNode = { slug: string | null; modifiedGmt: string | null };

type PositionsResponse = {
  gqlAllEmployment: {
    nodes: PositionNode[];
  } | null;
};

/** Canonical sitemap for job openings. Not duplicated in the root sitemap. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const response = await fetchGraphQL<PositionsResponse>(
      POSITION_SLUGS_QUERY,
      {},
      [TAGS.position, TAGS.sitemap]
    );

    const seen = new Set<string>();

    return (response?.gqlAllEmployment?.nodes ?? []).flatMap((position) => {
      if (!position?.slug) return [];

      const url = `${SITE_URL}/karriar/${position.slug}`;
      if (seen.has(url)) return [];
      seen.add(url);

      return [
        {
          url,
          lastModified: position.modifiedGmt
            ? new Date(`${position.modifiedGmt}Z`)
            : undefined,
          changeFrequency: "weekly" as const,
          priority: 0.6,
        },
      ];
    });
  } catch (error) {
    console.error("Error generating karriar sitemap:", error);
    return [];
  }
}
