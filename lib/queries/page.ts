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
      pageSchema: gqlPageFields {
        schema {
          json
        }
      }
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
        usp{
          text
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
