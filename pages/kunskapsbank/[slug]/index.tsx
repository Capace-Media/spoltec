import Blocks from '@common/components/Blocks';
import Hero from '@common/sections/Hero';
import WP from '@lib/wp/wp';
import getPage from '@modules/pages/lib/getPage';
import { SeoFragment } from "@modules/seo/lib/get-seo";

interface KunskapsbankSlugProps {
    service: any;
    page: any;
}

const KunskapsbankSlug = ({service, page}: KunskapsbankSlugProps) => {

    return (
        <div key={service?.title}>
            <Hero
                title={`${service?.title}`}
                subtitle={service?.gqlHeroFields?.underrubrik}
                text={service?.gqlHeroFields?.introduktionstext}
                image={service?.gqlHeroFields?.bild?.mediaItemUrl}
            />
            <div className="contain-outer flex">
                {page.seo.breadcrumbs.map(breadcrumb => {
                    const url = breadcrumb.url.replace("https://spoltec-staging.h.capacedev.se", "").slice(0, -1)
                    return (
                        <p className="hidden lg:block xs:small-breadcrumb-text xs:breadcrumb-text sm:text-base md:text-lg " key={breadcrumb.url}>{breadcrumb.text === page.seo.breadcrumbs[0].text ? "" : "> " } 
                            <a href={`${url ? url : '/'}`}>{breadcrumb.text}</a> {breadcrumb.text === page.seo.breadcrumbs[page.seo.breadcrumbs.length - 1].text ? "" : "-"} 
                        </p>
                    )
                })}
            </div>
            <div id='content' className='w-full h-10 md:h-0'></div>
            <div id=''>
                <Blocks blocks={page?.gqlBlocks.blocks} />
            </div>
        </div>
    )
}

export default KunskapsbankSlug

export const GET_CATEGORIES = `
    query GET_CATEGORIES {
        page(id: "/kunskapsbank", idType: URI) {
            id
            title
            uri
            slug
            gqlKategori {
                kategorier {
                    uri
                    title
                    slug
                    underrubrik
                    introduktionstext
                    bild {
                        mediaItemUrl
                    }
                }
            }
        }
    }
`

export const getStaticPaths = async () => {
    const { data } = await WP(GET_CATEGORIES)
    const categoryPaths = []

    data?.page?.gqlKategori?.kategorier && data?.page?.gqlKategori?.kategorier.map((cat: any) => {
        categoryPaths.push( { params: { slug: cat.slug } } )
    })

    return {
        paths: categoryPaths,
        fallback: false,
    }
}

export const getStaticProps = async ({params}: any) => {
    const {data} = await WP(
        `
            query GET_CATEGORIES {
                page(id: "/kunskapsbank", idType: URI) {
                    id
                    title
                    uri
                    slug
                    children {
                        nodes {
                            slug
                            uri
                            id
                            ... on Page {
                                ${SeoFragment}
                                title
                                id
                                gqlArtikel {
                                    artiklar {
                                        slug
                                        title
                                        underrubrik
                                        introduktionstext
                                        bild {
                                            mediaItemUrl
                                        }
                                    }
                                }
                                gqlBlocks {
                                    blocks {
                                        ... on Page_Gqlblocks_Blocks_Text {
                                            installning
                                            rubrik
                                            text
                                        }
                                        ... on Page_Gqlblocks_Blocks_Lista {
                                            avslut
                                            fieldGroupName
                                        }
                                        ... on Page_Gqlblocks_Blocks_Blurbs {
                                            text
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
                                            bilder {
                                                mediaItemUrl
                                            }
                                        }
                                        ... on Page_Gqlblocks_Blocks_Tjanster {
                                            rubrik
                                            text
                                        }
                                        ... on Page_Gqlblocks_Blocks_LedigaTjanster {
                                            rubrik
                                            text
                                        }
                                    }
                                }
                                gqlHeroFields {
                                    introduktionstext
                                    underrubrik
                                    bild {
                                      mediaItemUrl
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `
    )

    const service = data?.page?.children?.nodes.find((service: any) => service.slug === params.slug)
    const page = await getPage(`kunskapsbank/${params.slug}`)

    return {
        props: {
            service,
            page
        },
        revalidate: 100,
    }
}