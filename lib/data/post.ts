import { POST_QUERY } from "@lib/queries/post";
import { GetPostQueryData } from "@lib/types/post";
import { fetchGraphQL } from "@lib/wp/fetchGraphQL";

export const getPost = async (uri: string) => {
  const response = await fetchGraphQL<GetPostQueryData>(POST_QUERY, { uri });
  return response.post || null;
};
