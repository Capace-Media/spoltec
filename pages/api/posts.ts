// pages/api/posts.js

import { token } from "@lib/wp/token";

export default async function handler(req, res) {
  const { after, before, first, last } = req.query;

  try {
    const response = await fetch(process.env.GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${token}`,
      },
      body: JSON.stringify({
        query: `
            query NewQuery($after: String, $before: String, $first: Int, $last: Int) {
              posts(after: $after, before: $before, first: $first, last: $last) {
                edges {
                  node {
                    id
                    slug
                    title
                    gqlHeroFields {
                        underrubrik
                        introduktionstext
                        bild {
                          mediaItemUrl
                          altText
                        }
                      }
                  }
                }
                pageInfo {
                  endCursor
                  hasNextPage
                  hasPreviousPage
                  startCursor
                }
              }
            }
          `,
        variables: {
          after,
          before,
          first: parseInt(first),
          last: parseInt(last),
        },
      }),
    });

    const json = await response.json();
    res.status(200).json(json.data.posts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching posts" });
  }
}
