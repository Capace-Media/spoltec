import { SERVICE_QUERY } from "@lib/queries/service";
import type { GetServiceQueryData } from "@lib/types/service";
import { fetchGraphQL } from "@lib/wp/fetchGraphQL";

export const getService = async (slug: string) => {
  try {
    const response = await fetchGraphQL<GetServiceQueryData>(
      SERVICE_QUERY,
      {
        slug,
      },
      ["tjanster"]
    );

    return response.gqlService;
  } catch (error) {
    console.error(error);
    return null;
  }
};
