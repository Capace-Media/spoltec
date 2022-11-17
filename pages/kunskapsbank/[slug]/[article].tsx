import Blocks from '@common/components/Blocks';
import Hero from '@common/sections/Hero';
import WP from '@lib/wp/wp';
import getPage from '@modules/pages/lib/getPage';
import categories from 'data/static-categories.json'
import Link from 'next/link'

interface KunskapsbankArtikelProps {
    page: any;
    articleInfo: any;
}

const KunskapsbankArtikel = ({page, articleInfo}: KunskapsbankArtikelProps) => {
    // console.log("page ==>", page)

    console.log("articleInfo ==>", articleInfo)

    const fixedSchema = page.seo.schema.raw.replace(/@/g, "")
    const raw = JSON.parse(fixedSchema)
    const rawWebPage = raw.graph.filter(r => r.type === "WebPage")
    const datePublished = rawWebPage[0].datePublished.slice(0, 10)
    const breadcrumbs = page.seo.breadcrumbs

    // console.log("breadcrumbs ==>", breadcrumbs)

    // console.log("categories ==>", categories)

    // console.log("datePublished ==>", datePublished)
    
    return (
        <div key={page?.title}>
            <Hero
                title={`${page?.title}`}
                subtitle={page?.gqlHeroFields?.underrubrik}
                text={page?.gqlHeroFields?.introduktionstext}
                image={page?.gqlHeroFields?.bild?.mediaItemUrl}
            />
            <div className="contain-outer flex">
                {breadcrumbs.map(breadcrumb => {
                    const url = breadcrumb.url.replace("https://spoltec-staging.h.capacedev.se", "")
                    console.log("breadcrumb ==>", breadcrumb)
                    return (
                        <p className="hidden lg:block xs:small-breadcrumb-text xs:breadcrumb-text sm:text-base md:text-lg " key={breadcrumb.url}>{breadcrumb.text === breadcrumbs[0].text ? "" : "> " } 
                            <a href={`${url}`}>{breadcrumb.text}</a> {breadcrumb.text === breadcrumbs[breadcrumbs.length - 1].text ? "" : "-"} 
                        </p>
                        // lg:text-base
                    )
                })}
            </div>
            <div id='content' className='w-full h-10 md:h-0'></div>
            <div id=''>
            <div className="hidden md:flex items-center absolute max-w-md md:max-w-[15rem] lg:max-w-xs md:right-10 md:top-16 lg:right-20 xl:right-20 xl:top-16 2xl:right-96 2xl:top-16 3xl:!right-[30%] z-40">
                {/* left-5 md:left-10 2xl:left-[20%] 3xl:!left-1/4 */}
                {/* max-w-md md:max-w-[15rem] lg:max-w-xs */}
                {/* md:right-10 md:top-10 lg:right-2 xl:right-20 xl:top-8 2xl:right-96 2xl:top-10 3xl:!right-[30%] */}
                    {/* <div>
                        <img className="pb-1 max-w-1-5 md:max-w-2-5 lg:max-w-xs" src="https://via.placeholder.com/250" alt="" />
                        <p className="text-2xs md:text-xs lg:text-xl">Publicerad: {datePublished}</p>
                    </div> */}
                    {/* flex flex-col line-height article-ul */}
                    <ul className="pl-5 list-disc block text-1-5xs article-ul">
                        {categories.map(cat => {
                            const url = cat.uri.replace('kunskapsbank', '')
                            console.log("cat ==>", cat)
                            return (
                                <li  key={cat.slug}>
                                    <Link href={`${url}`}>
                                        <a className="ul-a text-lg">{cat.title}</a>
                                    </Link>
                                </li>
                                // <a className="" href={`${cat.uri}`}>Artiklar om {cat.title}</a>
                                // text-2xs md:text-xs lg:text-base
                            )
                        })}
                    </ul>
                </div>
                <div className="pb-0 md:mr-64 lg:mr-80 xl:mr-0 z-38 !text-base">
                {/* md:pb-0 */}
                    <Blocks blocks={page?.gqlBlocks.blocks} />
                </div>
                <div className="flex flex-col absolute right-5 bottom-28 md:bottom-20 md:right-10 2xl:right-[20%] 3xl:!right-1/4 max-w-2-5 lg:max-w-xs">
                {/* 2xl:right-110 */}
                    { articleInfo[0].knappText ? 
                        <p className="text-lg md:text-xl text-center pb-3">{articleInfo[0].knappText}</p>
                    : 
                        ""
                    }
                    <Link href="/kontakta-oss">
                        <a
                            className="px-2 py-2 lg:px-4 lg:py-2 rounded-sm opacity-90 text-base lg:text-base hover:opacity-100 font-bold border-2 border-brand-blue text-brand-blue items-center text-center"
                        >
                        Kontakta oss
                        </a>
                    </Link>
                </div>
                <div className="flex md:hidden items-center contain w-full mx-auto bottom-0 mb-5 z-38 mt-12">
                {/* left-5 md:left-10 2xl:left-[20%] 3xl:!left-1/4 */}
                {/* max-w-md md:max-w-[15rem] lg:max-w-xs */}
                {/* md:right-10 md:top-10 lg:right-2 xl:right-20 xl:top-8 2xl:right-96 2xl:top-10 3xl:!right-[30%] */}
                    {/* <div>
                        <img className="pb-1 max-w-1-5 md:max-w-2-5 lg:max-w-xs" src="https://via.placeholder.com/250" alt="" />
                        <p className="text-2xs md:text-xs lg:text-xl">Publicerad: {datePublished}</p>
                    </div> */}
                    {/* flex flex-col line-height article-ul */}
                    <ul className="pl-5 list-disc block text-1-5xs article-ul">
                        {categories.map(cat => {
                            const url = cat.uri.replace('kunskapsbank', '')
                            // console.log("cat south ==>", cat)
                            return (
                                <li  key={`${cat.slug}2`}>
                                    <Link href={`${url}`}>
                                        <a className="ul-a text-lg">{cat.title}</a>
                                    </Link>
                                </li>
                                // <a className="" href={`${cat.uri}`}>Artiklar om {cat.title}</a>
                                // text-2xs md:text-xs lg:text-base
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default KunskapsbankArtikel

export const GET_ARTICLES = `
    query GET_ARTICLES {
        page(id: "/kunskapsbank", idType: URI) {
            id
            title
            uri
            slug
            children {
                nodes {
                    slug
                    uri
                    ... on Page {
                        id
                        gqlArtikel {
                            artiklar {
                              slug
                              article
                              title
                              underrubrik
                              uri
                              knappText
                            }
                        }
                        children {
                            nodes {
                                ... on Page {
                                    id
                                    uri
                                    title
                                    slug
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`

export const getStaticPaths = async () => {

    const {data} = await WP(GET_ARTICLES)

    // console.log("getStaticPaths data ==>", data.page.children.nodes)

    const paths = []
    const articleInfo = []
    const articleNodes = data?.page?.children?.nodes
    // const articleNodes2 = 


    // console.log("articleNodes ==>", articleNodes)
    // console.log("articleNodes2 ==>", articleNodes2)

    if (!data) {
        return {
            notFound: true
        }
    }

    if (!articleNodes) {
        return {
            notFound: true
        }
    }

    console.log("articleNodes ==>", articleNodes)
    articleNodes && articleNodes?.map((node: any) => {
        console.log("node?.gqlArtikel?.artiklar[0].article ==>", node?.gqlArtikel?.artiklar[0].article)
        if (node?.gqlArtikel?.artiklar[0]) {
            // console.log("node.gqlArtikel.artiklar ==>", node.gqlArtikel.artiklar)
            node?.gqlArtikel?.artiklar && node?.gqlArtikel?.artiklar?.map(article => {
                // console.log("article ==>", article)
                articleInfo.push(article)
                paths.push( { params: { slug: article?.slug, article: article?.article } } )
            })
        } else {
            return {
                notFound: true
            }
        }
    })

    if (!paths) {
        return {
            notFound: true
        }
    }

    // console.log("paths ==>", paths)
    // console.log("articleInfo ==>", articleInfo)

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async ({params}) => {
    // console.log("params ==>", params)

    const data = await getPage(`/kunskapsbank/${params?.slug}/${params?.article}`)
    // console.log("data ==>", data)

    const data2 = await WP(GET_ARTICLES)
    // console.log("data2.data.page?.children?.nodes ==>", data2.data.page?.children?.nodes)

    const articleNodes = data2.data.page?.children?.nodes
    const articleInfo = []

    articleNodes && articleNodes.map((node: any) => {
        node.gqlArtikel.artiklar && node.gqlArtikel.artiklar.map(article => {
            if (article.article === params.article) {
                // console.log("article ==>", article)
                articleInfo.push(article)
            }
        })
    })

    // console.log("articleInfo ==>", articleInfo)

    // console.log("getStaticProps data ==>", data)

    // const page = await getPage(``)

    if (!data) {
        return {
            notFound: true
        }
    }

    if (!data2) {
        return {
            notFound: true
        }
    }

    if (!articleInfo) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            page: data,
            articleInfo
        },
        revalidate: 100
    }
}