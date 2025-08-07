import { POST_QUERY, POSTS_QUERY } from "@lib/queries/post";
import { GetPostQueryData, GetPostsQueryData } from "@lib/types/post";
import { fetchGraphQL } from "@lib/wp/fetchGraphQL";

export const getPost = async (uri: string) => {
  const response = await fetchGraphQL<GetPostQueryData>(POST_QUERY, { uri });
  return response.post || null;
};

export async function getPosts(after?: string, first?: number) {
  const response = await fetchGraphQL<GetPostsQueryData>(POSTS_QUERY, {
    after,
    first,
  });
  return response.posts || null;
}
