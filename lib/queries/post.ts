import { SEO } from "./seo";

export const POST_QUERY = `
    query getPost($uri: ID!) {
      post(id: $uri, idType: URI) {
          title
          slug
          uri
          id
          modifiedGmt
          dateGmt
          ${SEO}
          gqlHeroFields {
            underrubrik
            introduktionstext
            bild {
              mediaItemUrl
              mediaDetails {
                width
                height
              }
              altText
            }
          }
          gqlBlocks {
            blocks {
              ... on Post_Gqlblocks_Blocks_Blurbs {
                fieldGroupName
                blurbText: text
                installningar {
                  bakgrund
                }
                blurbs {
                  rubrik
                  text
                  underrubrik
                  bild {
                    mediaItemUrl
                    mediaDetails {
                      width
                      height
                    }
                    altText
                  }
                }
              }
              ... on Post_Gqlblocks_Blocks_Personal {
                fieldGroupName
                anstalld {
                  bild {
                    altText
                    id
                    mediaItemUrl
                    mediaDetails {
                      width
                      height
                    }
                    altText
                  }
                  namn
                  titel
                  telefon
                  email
                }
              }
              ... on Post_Gqlblocks_Blocks_Lista {
                fieldGroupName
                text
                punkter {
                  text
                }
                avslut
              }
              ... on Post_Gqlblocks_Blocks_TextBild {
                fieldGroupName
                installningar {
                  bakgrund
                }
                textBody: text {
                  rubrik
                  text
                  knapp {
                    url
                    text
                  }
                }
                bilder {
                  mediaItemUrl
                  mediaDetails {
                    width
                    height
                  }
                  altText
                }
              }
              ... on Post_Gqlblocks_Blocks_Tjanster {
                fieldGroupName
                rubrik
                serviceText: text
              }
              ... on Post_Gqlblocks_Blocks_Text {
                fieldGroupName
                rubrik
                text
                installning
                knapp {
                  text
                  url {
                   
                    ... on GqlService {
                      id
                      slug
                    }
                  }
                }
              }
              ... on Post_Gqlblocks_Blocks_LedigaTjanster {
                fieldGroupName
                rubrik
                jobsText: text
              }
            }
          }
      }
    }
  `;
export const POSTS_QUERY = `
  query POSTS_QUERY($after: String, $first: Int) {
    posts(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          title
          slug
          uri
          id
          gqlHeroFields {
            underrubrik
            introduktionstext
            bild {
              mediaItemUrl
              mediaDetails {
                width
                height
              }
              altText
            }
          }
        }
      }
    }
  }
`;
