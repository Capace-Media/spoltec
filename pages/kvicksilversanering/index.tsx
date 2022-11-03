import Blocks from "@common/components/Blocks";
import Hero from "@common/sections/Hero";
import WP from "@lib/wp/wp";
import { SeoFragment } from "@modules/seo/lib/get-seo";
import {useEffect, useState} from 'react'

export const getStaticProps = async (context) => {
    console.log("context ==>", context)

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
    ) 

    const getService = await WP(`
                query getService {
                    gqlAllService(first: 50, where: {title: "Kvicksilversanering"}) {
                        edges {
                            node {
                            title
                            slug
                            ${SeoFragment}
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
                                        text
                                        installningar {
                                            bakgrund
                                        }
                                        blurbs {
                                            rubrik
                                            text
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
                  
                `)

    return {
        props: {
            page,
            data: getService.data
        }
    }
}

const Kvicksilversanering = ({ data }) => {

    return (
        <div key={data?.gqlAllService?.edges[0]?.node?.title}>
            <Hero
                title={`${data?.gqlAllService?.edges[0]?.node?.title}`}
                subtitle={data?.gqlAllService?.edges[0]?.node?.gqlHeroFields.underrubrik}
                text={data?.gqlAllService?.edges[0]?.node?.gqlHeroFields.introduktionstext}
                image={data?.gqlAllService?.edges[0]?.node?.gqlHeroFields.bild?.mediaItemUrl}
            />
            <div id='content' className='w-full h-10 md:h-0'></div>
            <div id=''>

                <Blocks blocks={data?.gqlAllService?.edges[0]?.node?.gqlBlocks?.blocks} />
            </div>
        </div>
    )
};

export default Kvicksilversanering;