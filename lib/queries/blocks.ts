export const BLOCKS = `
  gqlBlocks {
            blocks {
          ... on Page_Gqlblocks_Blocks_Faq {
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
        ... on Page_Gqlblocks_Blocks_HowTo {
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
        ... on Page_Gqlblocks_Blocks_ProsAndCons {
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
`;
