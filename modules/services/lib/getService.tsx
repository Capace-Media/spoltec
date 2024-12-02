import WP from "@lib/wp/wp";
import { SeoFragment } from "@modules/seo/lib/get-seo";

const getService = async (slug: string) => {
  try {
    if (!slug) {
      throw "No slug was provided";
    }

    const response = await WP(
      `
    query getService($slug: ID!) {
        gqlService(id: $slug, idType: URI) {
            title
            slug
            ${SeoFragment}
            gqlBlocks {
              blocks {
                  ... on GqlService_Gqlblocks_Blocks_Video {
                  fieldGroupName
                  thumbnailurl {
                    mediaItemUrl
                  }
                  video {
                    mediaItemUrl
                    mediaDetails {
                      file
                      height
                      width
                    }
                    altText
                  }
                }
                ... on GqlService_Gqlblocks_Blocks_Blurbs {
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
                ... on GqlService_Gqlblocks_Blocks_TextBild {
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
                    altText
                  }
                }
                ... on GqlService_Gqlblocks_Blocks_Lista {
                  fieldGroupName
                  text
                  punkter {
                    text
                  }
                  avslut
                }
                ... on GqlService_Gqlblocks_Blocks_Tjanster {
                  fieldGroupName
                  rubrik
                  serviceText: text
                }
                ... on GqlService_Gqlblocks_Blocks_Text {
                  fieldGroupName
                  rubrik
                  text
                }
              }
            }
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
`,
      { slug: slug }
    );

    const data = response.data.gqlService;
    return data;
  } catch (error) {
    console.error("ERROR getService ==>", error);
    return false;
  }
};

export default getService;
