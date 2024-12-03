import { token } from "./token";

// lib/fetchGraphQL.ts
type GraphQLResponse<T> = {
  data: T;
  errors?: {
    message: string;
  }[];
};

export async function fetchGraphQL<T>(
  query: string,
  variables: { [key: string]: any } = {}
): Promise<T> {
  const endpoint = process.env.GRAPHQL_ENDPOINT as string;

  const response = await fetch(endpoint!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${token}`,
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
