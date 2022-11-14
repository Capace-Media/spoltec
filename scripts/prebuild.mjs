import dotenv from 'dotenv';
import fetch from 'node-fetch';
import fs from 'fs';
dotenv.config();

const auth = Buffer.from(
  process.env.GRAPHQL_USER + ':' + process.env.GRAPHQL_PASS
).toString('base64');
export const token = auth;

const WP = async (query) => {
  const response = await fetch(process.env.GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${token}`,
    },
    body: JSON.stringify({
      query,
    }),
  });
  const data = await response.json();

  return data;
};

const prebuild = async () => {
  const serviceRes = await WP(`
  query getServices {
      gqlAllService(first: 50) {
          edges {
            node {
              title
              slug
              uri
              gqlHeroFields {
                underrubrik
                introduktionstext
                bild {
                  mediaItemUrl
                }
              }
            }
          }
        }
  }
`);
  const positionsRes = await WP(`
  query getAllPositions {
    gqlAllEmployment {
      edges {
        node {
          title
          slug
          uri
          gqlPositionFields {
            bild {
              mediaItemUrl
            }
            underrubrik
          }
        }
      }
    }
  }
`);
  const categoriesRes = await WP(`
  query GET_CATEGORIES {
    page(id: "/kunskapsbank", idType: URI) {
      id
      title
      uri
      slug
      gqlKategori {
        kategorier {
          uri
          title
          slug
          underrubrik
          introduktionstext
          bild {
            mediaItemUrl
          }
        }
      }
    }
  }
`)
  const articlesRes = await WP(`
  query GET_ARTICLES {
    page(id: "/kunskapsbank", idType: URI) {
      id
      title
      uri
      slug
      children {
        nodes {
          slug
          uri
          id
          ... on Page {
            title
            id
            gqlArtikel {
              artiklar {
                slug
                title
                underrubrik
                introduktionstext
                uri
                bild {
                  mediaItemUrl
                }
              }
            }
            gqlBlocks {
              blocks {
                ... on Page_Gqlblocks_Blocks_Text {
                  installning
                  rubrik
                  text
                }
                ... on Page_Gqlblocks_Blocks_Lista {
                  avslut
                  fieldGroupName
                }
                ... on Page_Gqlblocks_Blocks_Blurbs {
                  text
                  blurbs {
                    rubrik
                    text
                    underrubrik
                    bild {
                      mediaItemUrl
                    }
                  }
                }
                ... on Page_Gqlblocks_Blocks_TextBild {
                  bilder {
                    mediaItemUrl
                  }
                }
                ... on Page_Gqlblocks_Blocks_Tjanster {
                  rubrik
                  text
                }
                ... on Page_Gqlblocks_Blocks_LedigaTjanster {
                  rubrik
                  text
                }
              }
            }
            gqlHeroFields {
              introduktionstext
              underrubrik
              bild {
                mediaItemUrl
              }
            }
          }
        }
      }
    }
  }
  `)

  const services = serviceRes.data.gqlAllService.edges.map(({ node }) => node);
  const positions = positionsRes.data.gqlAllEmployment.edges.map(
    ({ node }) => node
  );
  const categories = categoriesRes.data.page.gqlKategori.kategorier
  const articles = articlesRes.data.page.children.nodes

  fs.writeFileSync('./data/static-services.json', JSON.stringify(services));
  fs.writeFileSync('./data/static-positions.json', JSON.stringify(positions));
  fs.writeFileSync('./data/static-categories.json', JSON.stringify(categories))
  fs.writeFileSync('./data/static-articles.json', JSON.stringify(articles))
};
prebuild();
