import Blocks from "@common/components/Blocks";
import Hero from "@common/sections/Hero";
import WP from "@lib/wp/wp";
import { SeoFragment } from "@modules/seo/lib/get-seo";

interface AvloppsspolningOrterProps {
  city: any;
}

const AvloppsspolningOrter = ({ city }: AvloppsspolningOrterProps) => {
  return (
    <div key={city?.title}>
      <Hero
        title={`${city?.title}`}
        subtitle={city?.gqlHeroFields?.underrubrik}
        text={city?.gqlHeroFields?.introduktionstext}
        image={city?.gqlHeroFields?.bild?.mediaItemUrl}
      />
      <div id="content" className="w-full h-10 md:h-0"></div>
      <div id="">
        <Blocks blocks={city.gqlBlocks.blocks} />
      </div>
    </div>
  );
};

export default AvloppsspolningOrter;

export const GET_ORTER = `
    query GET_ORTER {
        gqlService(id: "/avloppsspolning", idType: URI) {
            children(first: 20) {
              nodes {
                ... on GqlService {
                  slug
                }
              }
            }
        }
    }
`;

export const excludePageSlug = (slug: any) => {
  const pagesToExclude = ["stockholm"];
  return pagesToExclude.includes(slug);
};

export const getStaticPaths = async () => {
  const { data } = await WP(GET_ORTER);

  const ortPaths = [];
  const orter = data?.gqlService?.children?.nodes;

  orter &&
    orter.map((ort: any) => {
      if (!excludePageSlug(ort?.slug)) {
        ortPaths.push({ params: { slug: ort.slug } });
      }
    });
  return {
    paths: ortPaths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const { data: newData } = await WP(
    `
        query getService($slug: ID!) {
        gqlService(id: $slug, idType: URI) {
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
            ${SeoFragment}
            children(first: 20) {
              nodes {
                id
                ... on GqlService {
                  id
                  slug
                  title
                  gqlHeroFields {
                    underrubrik
                    introduktionstext
                    bild {
                        mediaItemUrl
                    }
                }
                  gqlBlocks {
                    blocks {
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
                }
              }
            }
          }
        }
        `,
    { slug: "/avloppsspolning" }
  );

  const page = await WP(
    `
            query getServiceTitleAndDesc {
                gqlAllService(first: 50) {
                    nodes {
                        slug
                        title
                        uri
                        seo {
                            opengraphTitle
                            metaDesc
                        }
                    }
                }
            }
        `
  );

  const city = newData?.gqlService?.children?.nodes.find(
    (city: any) => city.slug === params.slug
  );

  const orter = await WP(GET_ORTER);

  if (
    !orter?.data?.gqlService?.children?.nodes.find(
      (ort: any) => ort.slug === params.slug
    )
  ) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      city,
      page,
    },
  };
};
