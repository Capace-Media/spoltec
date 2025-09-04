import { POST_QUERY, POSTS_QUERY } from "@lib/queries/post";
import type { GetPostQueryData, GetPostsQueryData } from "@lib/types/post";
import { fetchGraphQL } from "@lib/wp/fetchGraphQL";

export const getPost = async (uri: string) => {
  const response = await fetchGraphQL<GetPostQueryData>(POST_QUERY, { uri }, [
    "post",
  ]);
  return response.post || null;
};

export async function getPosts(after?: string, first?: number) {
  try {
    const response = await fetchGraphQL<GetPostsQueryData>(
      POSTS_QUERY,
      {
        after,
        first,
      },
      ["post"]
    );
    console.log("Posts response:", response);
    return response.posts || null;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return null;
  }
}
