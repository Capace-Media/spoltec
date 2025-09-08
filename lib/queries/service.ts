import { SEO } from "./seo";

export const SERVICE_QUERY = `
query SERVICE_QUERY($slug: ID!) {
    gqlService(id: $slug, idType: URI) {
        title
        slug
        ${SEO}
        gqlBlocks {
          blocks {
                  ... on GqlService_Gqlblocks_Blocks_Faq {
          fieldGroupName
          intro {
            title
            text
          }
          faqs {
            q
            a
          }
        }
                  ... on GqlService_Gqlblocks_Blocks_HowTo {
          fieldGroupName
          intro {
            text
            title
          }
          listItem {
            text
            title
          }
        }
                  ... on GqlService_Gqlblocks_Blocks_ProsAndCons {
          fieldGroupName
          intro {
            text
            title
          }
          table {
            caption
            tbody {
              td1
              td2{
              text
              truefalse
            }
              td3{
              text
              truefalse
            }
            }
            thead {
              th1
              th2
              th3
            }
          }
        }
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
             usp {
              text
            }
            bild {
                mediaItemUrl
                altText
            }
        }
    }
}
`;
