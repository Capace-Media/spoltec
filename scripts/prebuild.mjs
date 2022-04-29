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
      gqlAllService {
          edges {
            node {
              title
              slug
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
  const services = serviceRes.data.gqlAllService.edges.map(({ node }) => node);
  const positions = positionsRes.data.gqlAllEmployment.edges.map(
    ({ node }) => node
  );

  fs.writeFileSync('./data/static-services.json', JSON.stringify(services));
  fs.writeFileSync('./data/static-positions.json', JSON.stringify(positions));
};
prebuild();
