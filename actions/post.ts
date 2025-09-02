"use server";

import { fetchGraphQL } from "@lib/wp/fetchGraphQL";

// Define interfaces for the response structure
interface PostHeroFields {
  underrubrik?: string;
  introduktionstext?: string;
  bild?: {
    mediaItemUrl: string;
    altText?: string;
  };
}

interface PostNode {
  id: string;
  slug: string;
  title: string;
  gqlHeroFields?: PostHeroFields;
}

interface PostsPageInfo {
  endCursor?: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string;
}

interface PostsConnection {
  edges: Array<{
    node: PostNode;
  }>;
  pageInfo: PostsPageInfo;
}

interface GetPostsResponse {
  posts: PostsConnection;
}

interface GetPostsParams {
  after?: string;
  before?: string;
  first?: number;
  last?: number;
}

// GraphQL query for fetching posts
const GET_POSTS_QUERY = `
  query GetPosts($after: String, $before: String, $first: Int, $last: Int) {
    posts(after: $after, before: $before, first: $first, last: $last) {
      edges {
        node {
          id
          slug
          title
          gqlHeroFields {
            underrubrik
            introduktionstext
            bild {
              mediaItemUrl
              altText
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;

// Server action to fetch posts with pagination
export async function getPosts(
  params: GetPostsParams = {}
): Promise<PostsConnection> {
  try {
    const { after, before, first, last } = params;

    // Validate and parse numeric parameters
    const variables = {
      after: after || null,
      before: before || null,
      first: first ? parseInt(String(first), 10) : null,
      last: last ? parseInt(String(last), 10) : null,
    };

    const response = await fetchGraphQL<GetPostsResponse>(
      GET_POSTS_QUERY,
      variables
    );

    return response.posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts");
  }
}

// Alternative server action that mimics the original API structure
// This can be used if you need the exact same interface as the original
export async function getPostsWithParams(
  after?: string,
  before?: string,
  first?: string | number,
  last?: string | number
): Promise<PostsConnection> {
  return getPosts({
    after,
    before,
    first: first ? parseInt(String(first), 10) : undefined,
    last: last ? parseInt(String(last), 10) : undefined,
  });
}
