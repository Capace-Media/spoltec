import Blocks from "@common/components/Blocks";
import Hero from "@common/sections/Hero";
import WP from "@lib/wp/wp";
import { SeoFragment } from "@modules/seo/lib/get-seo";

interface AvloppsspolningOrterProps {
    data: any;
    orter: any;
    ort: any;
};

const AvloppsspolningOrter = ({data, orter, ort}:AvloppsspolningOrterProps) => {
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
            <section className="pb-0 contain section">
                  <div className="max-w-2xl">
                  <h2>Avloppsspolning {ort?.ort}</h2>
                    <p>Med en stor erfarenhet av <strong>avloppsspolning {ort?.ort}</strong> innehar vi grundlig kompetens för att kunna hjälpa er i {ort?.ort}<b>.</b></p>
                    
                    <h3><b><br /> </b>Varför välja Spoltec för Avloppsspolning i {ort?.ort}?</h3>
                    <p>Spoltec erbjuder hjälp med avloppsspolning i {ort?.ort} med såväl precision som kvalité. Ett företag som du alltid kan lita på!<b></b></p>
                  </div>

                </section>
                <Blocks blocks={data?.gqlService?.gqlBlocks?.blocks} />
            </div>
        </div>
    )
};

export default AvloppsspolningOrter;

export const GET_ORTER = `
    query GET_ORTER {
        gqlOrter {
        orter {
            orter {
            ort
            slug
            }
        }
        }
    }
`

export const excludePageSlug = (slug: any) => {
    const pagesToExclude = [
        'boras',
        'halmstad',
        'varberg',
        'vaxjo',
        'jonkoping',
        'karlskrona',
        'kalmar',
        'malmo',
        'kristianstad',
        'goteborg'
    ]
    return pagesToExclude.includes(slug)
}

export const getStaticPaths = async () => {
    const { data } = await WP(GET_ORTER)

    const ortPaths = []
    const orter = data?.gqlOrter?.orter?.orter

    orter && orter.map((ort: any) => {
        if(! excludePageSlug( ort?.slug ) ){
            ortPaths.push( { params: { slug: ort.slug } } )
        }
        
    })
    return {
        paths: ortPaths,
        fallback: false
    };
}

export const getStaticProps = async ({params}: any) => {
    const {data: originData} = await WP(
        `
            query getService($slug: ID!) {
                gqlService(id: $slug, idType: SLUG) {
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
    );

    const orter = await WP(GET_ORTER)
    if(!orter?.data?.gqlOrter?.orter?.orter.find((ort: any) => ort.slug === params.slug)){
        return {
            notFound: true
        }
    }
    
    const ort = orter?.data?.gqlOrter?.orter?.orter.find((ort: any) => ort.slug === params.slug)

     
    let data = {
        ...originData,
        gqlService: {
            ...originData.gqlService,
            title: `Avloppsspolning ${ort?.ort} | Precision och kvalité | Spoltec`,
            uri: `/avloppsspolning/${ort?.slug}`,
            seo: {
              ...originData.gqlService.seo,
              title: `Avloppsspolning i ${ort?.ort}`,
              opengraphTitle: `Avloppsspolning ${ort?.ort} | Precision och kvalité | Spoltec`,
              opengraphDescription: `Avloppsspolning i ${ort?.ort}. Vi på Spoltec kan hjälpa er vare sig det är akuta stop eller underhållsspolning. Vi hjälper er! Kontakta Spoltec idag. `
                
            },

        }
    }
    return {
        props: {
            data: data,
            orter,
            ort
        }, 
        revalidate: 100,
    }
}
