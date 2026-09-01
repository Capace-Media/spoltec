import { SEO } from "./seo";

const POSITION_FIELDS = `
  gqlPositionFields {
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
`;

export const POSITIONS_QUERY = `
  query POSITIONS_QUERY($after: String, $first: Int) {
    gqlAllEmployment(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          title
          slug
          uri
          date
          ${POSITION_FIELDS}
        }
      }
    }
  }
`;

export const POSITION_QUERY = `
  query POSITION_QUERY($slug: ID!) {
    gqlEmployment(id: $slug, idType: SLUG) {
      id
      title
      slug
      uri
      date
      dateGmt
      modifiedGmt
      ${SEO}
      ${POSITION_FIELDS}
      gqlBlocks {
        blocks {
          ... on GqlEmployment_Gqlblocks_Blocks_Text {
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
          ... on GqlEmployment_Gqlblocks_Blocks_Lista {
            fieldGroupName
            text
            punkter {
              text
            }
            avslut
          }
          ... on GqlEmployment_Gqlblocks_Blocks_Blurbs {
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
          ... on GqlEmployment_Gqlblocks_Blocks_TextBild {
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
          ... on GqlEmployment_Gqlblocks_Blocks_Personal {
            fieldGroupName
            anstalld {
              bild {
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
          ... on GqlEmployment_Gqlblocks_Blocks_Tjanster {
            fieldGroupName
            rubrik
            serviceText: text
          }
        }
      }
    }
  }
`;

export const POSITION_SLUGS_QUERY = `
  query POSITION_SLUGS_QUERY {
    gqlAllEmployment(first: 100) {
      nodes {
        slug
        modifiedGmt
      }
    }
  }
`;
