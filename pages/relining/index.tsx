import Blocks from "@common/components/Blocks";
import Hero from "@common/sections/Hero";
import WP from "@lib/wp/wp";
import { SeoFragment } from "@modules/seo/lib/get-seo";

export const getStaticProps = async (context) => {
    // console.log("context ==>", context)

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
        { slug: '/relining' }
    )

    console.log("relining data ==>", data)

    return {
        props: {
            page,
            data: data.data
        }
    }
}

const Relining = ({ data }) => {
    

    return (
        <div key={data?.gqlService?.title}>
            <Hero
                title={`${data?.gqlService?.title}`}
                subtitle={data?.gqlService?.gqlHeroFields?.underrubrik}
                text={data?.gqlService?.gqlHeroFields?.introduktionstext}
                image={data?.gqlService?.gqlHeroFields?.bild?.mediaItemUrl}
            />
            <div id='content' className='w-full h-10 md:h-0'></div>
            <div id=''>

                <Blocks blocks={data?.gqlService?.gqlBlocks?.blocks} />
            </div>
        </div>
    )
};

export default Relining;