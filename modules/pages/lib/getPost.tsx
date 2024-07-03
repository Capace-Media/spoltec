import WP from "@lib/wp/wp";
import { SeoFragment } from "@modules/seo/lib/get-seo";

const getPost = async (uri: string) => {
  try {
    const response = await WP(
      `
      query getPost($uri: ID!) {
        post(id: $uri, idType: URI) {
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
    `,
      { uri }
    );

    const data = response?.data?.post;
    if (!data) {
      throw "Could not fetch data";
    }
    return data;
  } catch (error) {
    console.error("ERROR getPost ==>", error);
    return false;
  }
};

export default getPost;
