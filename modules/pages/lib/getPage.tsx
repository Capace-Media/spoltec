import WP from '@lib/wp/wp';
import { SeoFragment } from '@modules/seo/lib/get-seo';

const getPage = async (uri: string) => {
  try {
    const response = await WP(
      `
      query getPage($uri: ID!) {
        page(id: $uri, idType: URI) {
          title
          slug
          uri
          id
          ${SeoFragment}
          gqlHeroFields {
            underrubrik
            introduktionstext
            bild {
              mediaItemUrl
              altText
            }
          }
          gqlBlocks {
            blocks {
              ... on Page_Gqlblocks_Blocks_Blurbs {
                fieldGroupName
                blurbText:text
                installningar {
                  bakgrund
                }
                blurbs {
                  rubrik
                  text
                  underrubrik
                  
                  bild {
                    mediaItemUrl
                    altText
                  }
                }
              }
              ... on Page_Gqlblocks_Blocks_Personal {
                fieldGroupName
                anstalld {
                  bild {
                    altText
                    id
                    mediaItemUrl
                    altText
                  }
                  namn
                  titel
                  telefon
                  email
                }
              }
              ... on Page_Gqlblocks_Blocks_Lista {
                fieldGroupName
                text
                punkter {
                  text
                }
                avslut
              }
              ... on Page_Gqlblocks_Blocks_TextBild {
                fieldGroupName
                installningar {
                  bakgrund
                }
                textBody:text {
                  rubrik
                  text
                  knapp {
                    url
                    text
                  }
                }
                bilder {
                  mediaItemUrl
                  altText
                }
              }
              ... on Page_Gqlblocks_Blocks_Tjanster {
                fieldGroupName
                rubrik
                serviceText: text
              }
              ... on Page_Gqlblocks_Blocks_Text {
                fieldGroupName
                rubrik
                text
                installning
                knapp {
                  text
                  url {
                    ... on Page {
                      id
                      uri
                    }
                    ... on GqlService {
                      id
                      slug
                    }
                  }
                }
              }
              ... on Page_Gqlblocks_Blocks_LedigaTjanster {
                fieldGroupName
                rubrik
                jobsText:text
              }
            }
          }
        }
      }
    `,
      { uri }
    );

    const data = response?.data?.page;
    if (!data) {
      throw 'Could not fetch data';
    }
    return data;
  } catch (error) {
    console.error('ERROR getPage ==>', error);
    return false;
  }
};

export default getPage;
