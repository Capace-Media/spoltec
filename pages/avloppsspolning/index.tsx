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

    return {
        props: {
            page
        }
    }
}

const Avloppsspolning = () => {
    const [Data, setData] = useState({
        gqlService: {
            gqlBlocks: {
                blocks: []
            },
            gqlHeroFields: {
                bild: {
                    mediaItemUrl: null
                },
                introduktionstext: null,
                underrubrik: null
            },
            title: null
        },
    })

    
    useEffect(() => {
        const getData = async () => {
            // console.log("getData function")
            try {
                // console.log("getData function try")

                const data = await WP(
                    `
                        query getService($slug: ID!) {
                            gqlService(id: $slug, idType: URI) {
                                title
                                slug
                                uri
                                ${SeoFragment}
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
                                gqlHeroFields {
                                    underrubrik
                                    introduktionstext
                                    bild {
                                        mediaItemUrl
                                    }
                                }
                            }
                        }
                    `,
                    { slug: '/avloppsspolning' }
                )
        
                setData(data.data)
            } catch (error) {

                console.log("ERROR ==>", error)
            }
        }

        getData()

    }, [])

    useEffect(() => {
        console.log("Data ==>", Data)
    }, [Data])

    return (
        <div key={Data?.gqlService?.title}>
            <Hero
                title={`${Data?.gqlService?.title}`}
                subtitle={Data?.gqlService?.gqlHeroFields?.underrubrik}
                text={Data?.gqlService?.gqlHeroFields?.introduktionstext}
                image={Data?.gqlService?.gqlHeroFields?.bild?.mediaItemUrl}
            />
            <div id='content' className='w-full h-10 md:h-0'></div>
            <div id=''>

                <Blocks blocks={Data?.gqlService?.gqlBlocks?.blocks} />
            </div>
        </div>
    )
};

export default Avloppsspolning;