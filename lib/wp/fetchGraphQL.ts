import { credentials, token } from "./token";

// lib/fetchGraphQL.ts
type GraphQLResponse<T> = {
  data: T;
  errors?: {
    message: string;
  }[];
};

/**
 * Safety net so a dropped WordPress webhook can't freeze content forever.
 * On-demand `revalidateTag` is still the primary invalidation path.
 */
const FALLBACK_REVALIDATE_SECONDS = 60 * 60 * 4;

export async function fetchGraphQL<T>(
  query: string,
  variables: { [key: string]: any } = {},
  tags?: string[],
  revalidate: number | false = FALLBACK_REVALIDATE_SECONDS
): Promise<T> {
  const endpoint = process.env.GRAPHQL_ENDPOINT as string;

  const response = await fetch(endpoint!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${credentials}`,
    },
    next: {
      tags: tags,
      revalidate,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json: GraphQLResponse<T> = await response.json();

  if (json.errors) {
    throw new Error(json.errors.map((error) => error.message).join(", "));
  }

  return json.data;
}
