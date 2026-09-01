import { cache } from "react";
import { PAGE_QUERY } from "@lib/queries/page";
import type { GetPageQueryData } from "@lib/types/page";
import { fetchGraphQL } from "@lib/wp/fetchGraphQL";
import { TAGS } from "@lib/wp/tags";

export const getPage = cache(async (uri: string) => {
  const response = await fetchGraphQL<GetPageQueryData>(PAGE_QUERY, { uri }, [
    TAGS.page,
  ]);

  return response.page;
});
