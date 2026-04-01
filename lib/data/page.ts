import { cache } from "react";
import { PAGE_QUERY } from "@lib/queries/page";
import type { GetPageQueryData } from "@lib/types/page";
import { fetchGraphQL } from "@lib/wp/fetchGraphQL";

export const getPage = cache(async (uri: string) => {
  const response = await fetchGraphQL<GetPageQueryData>(PAGE_QUERY, { uri }, [
    "page",
  ]);

  return response.page;
});
