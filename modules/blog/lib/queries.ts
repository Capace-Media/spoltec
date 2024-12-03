export const FETCH_POSTS = `
  query GET_POSTS($after: String, $before: String, $first: Int = 9, $last: Int) {
    posts(after: $after, before: $before, first: $first, last: $last) {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      edges {
        node {
          id
          title
          slug
          gqlHeroFields {
            introduktionstext
            underrubrik
            bild {
              mediaItemUrl
              id
              altText
            }
          }
        }
      }
    }
  }
`;
