import { PAGE_QUERY, PAGE_WITH_PARENT_QUERY } from "@lib/queries/page";
import type { GetPageQueryData } from "@lib/types/page";
import { fetchGraphQL } from "@lib/wp/fetchGraphQL";

export const getPage = async (uri: string) => {
  const response = await fetchGraphQL<GetPageQueryData>(PAGE_QUERY, { uri }, [
    "page",
  ]);
  return response.page;
};

export const getPageWithParent = async (id: string) => {
  const response = await fetchGraphQL<GetPageQueryData>(
    PAGE_WITH_PARENT_QUERY,
    { uri: id },
    ["page"]
  );
  return response.page;
};
