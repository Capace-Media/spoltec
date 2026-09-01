import { cache } from "react";
import { POSITION_QUERY, POSITIONS_QUERY } from "@lib/queries/employment";
import type {
  GetPositionQueryData,
  GetPositionsQueryData,
} from "@lib/types/employment";
import { fetchGraphQL } from "@lib/wp/fetchGraphQL";
import { TAGS } from "@lib/wp/tags";

export const getPosition = cache(async (slug: string) => {
  const response = await fetchGraphQL<GetPositionQueryData>(
    POSITION_QUERY,
    { slug },
    [TAGS.position]
  );

  return response.gqlEmployment || null;
});

export async function getPositions(after?: string, first?: number) {
  try {
    const response = await fetchGraphQL<GetPositionsQueryData>(
      POSITIONS_QUERY,
      { after, first },
      [TAGS.position]
    );

    return response.gqlAllEmployment || null;
  } catch (error) {
    console.error("Error fetching positions:", error);
    return null;
  }
}
