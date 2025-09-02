import { SEO } from "./seo";
import { BLOCKS } from "./blocks";

export const PAGE_QUERY = `
  query getPage($uri: ID!) {
    page(id: $uri, idType: URI) {
      title
      slug
      uri
      id
      ${SEO}
      ${BLOCKS}
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
`;

export const GET_PAGES_QUERY = `
    query GET_PAGES_QUERY {
    pages(first: 100) {
        nodes {
        slug
        }
    }
    }
`;
