import WP from '@lib/wp/wp';

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
          gqlHeroFields {
            underrubrik
            introduktionstext
            bild {
              mediaItemUrl
            }
          }
          gqlBlocks {
            blocks {
              ... on Page_Gqlblocks_Blocks_Blurbs {
                fieldGroupName
                blurbText:text {
                  body
                  rubrik
                }
                installningar {
                  bakgrund
                }
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
                fieldGroupName
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
    console.log('DATA getPage ==>', data);
    return data;
  } catch (error) {
    console.error('ERROR getPage ==>', error);
    return false;
  }
};

export default getPage;
