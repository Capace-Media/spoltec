import { PAGE_QUERY } from "@lib/queries/page";
import type { GetPageQueryData } from "@lib/types/page";
import { fetchGraphQL } from "@lib/wp/fetchGraphQL";

export const getPage = async (uri: string) => {
  const response = await fetchGraphQL<GetPageQueryData>(PAGE_QUERY, { uri });
  return response.page;
};
