import { fetchGraphQL } from "@lib/wp/fetchGraphQL";
import { TAGS } from "@lib/wp/tags";
import { SITE_URL } from "@lib/utils/url";
import type { MetadataRoute } from "next";

type PostNode = { slug: string; modifiedGmt: string | null };

type PostsResponse = {
  posts: {
    pageInfo: { hasNextPage: boolean; endCursor: string | null };
    nodes: PostNode[];
  };
};

const GET_ALL_POSTS = `
  query GET_ALL_POSTS($after: String) {
    posts(first: 100, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        slug
        modifiedGmt
      }
    }
  }
`;

/** Canonical sitemap for knowledge-base articles. Not duplicated in the root sitemap. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const nodes: PostNode[] = [];
    let after: string | null = null;

    for (let i = 0; i < 20; i++) {
      const response: PostsResponse = await fetchGraphQL<PostsResponse>(
        GET_ALL_POSTS,
        { after },
        [TAGS.post, TAGS.sitemap]
      );

      nodes.push(...(response?.posts?.nodes ?? []));

      if (!response?.posts?.pageInfo?.hasNextPage) break;
      after = response.posts.pageInfo.endCursor;
      if (!after) break;
    }

    const seen = new Set<string>();

    return nodes.flatMap((post) => {
      if (!post?.slug) return [];

      const url = `${SITE_URL}/kunskapsbank/${post.slug}`;
      if (seen.has(url)) return [];
      seen.add(url);

      return [
        {
          url,
          lastModified: post.modifiedGmt
            ? new Date(`${post.modifiedGmt}Z`)
            : undefined,
          changeFrequency: "monthly" as const,
          priority: 0.7,
        },
      ];
    });
  } catch (error) {
    console.error("Error generating kunskapsbank sitemap:", error);
    return [];
  }
}
