import Blocks from "@common/components/Blocks";
import Hero from "@common/sections/Hero";
import WP from "@lib/wp/wp";
import { SeoFragment } from "@modules/seo/lib/get-seo";

interface OljeavskiljareOrterProps {
    data: any;
    orter: any;
    ort: any;
};

const OljeavskiljareOrter = ({data, orter, ort}:OljeavskiljareOrterProps) => {
    return (
        <div key={data?.gqlService?.title}>
            <Hero
                title={`${data?.gqlService?.title}`}
                subtitle={data?.gqlService?.gqlHeroFields?.underrubrik}
                text={data?.gqlService?.gqlHeroFields?.introduktionstext}
                image={data?.gqlService?.gqlHeroFields?.bild?.mediaItemUrl}
            />
            <div id='content'>
            <section className="pb-0 contain section">
                  <div className="max-w-2xl">
                    <h2>Besiktning och renovering av oljeavskiljare i {ort?.ort} samt tankar och bassänger</h2>

                    <p>Oljeavskiljare används vid verksamheter där det förekommer olja, bensin och andra vätskor med lägre densitet än vatten. Det kan gälla anslutning till spillvatten från t.ex. bensinstationer, tvätthallar, spolplattor, verkstäder, garage, P-platser, lantbruk m.m.<br /> Efter oljeavskiljaren leds vattnet vidare till ett reningsverk på plats eller till ett kommunalt reningsverk. Vi har alla ett ansvar att se till att spillvattnet inte orsakar miljöföroreningar.<br /> Det finns många regler kring hur oljeavskiljare ska installeras och användas. För att värna om miljön ska ni vara noga med vem som får förtroendet att tömma och renspola oljeavskiljaren när detta är dags. <strong>Oljeavskiljare {ort?.ort}</strong></p>

                    <h3 className="pt-6">Varför välja spoltec för oljeavskiljare i {ort?.ort}?</h3>
                    <p>Spoltec har flera års erfarenhet av renovering och besiktning av oljeavskiljare i {ort?.ort}.</p>
                  </div>

                </section>
                <Blocks blocks={data?.gqlService?.gqlBlocks?.blocks} />
            </div>
        </div>
    )
};

export default OljeavskiljareOrter;

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
        'helsingborg',
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
        { slug: '/oljeavskiljare' }
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
            title: `Oljeavskiljare ${ort?.ort}`,
            uri: `/oljeavskiljare/${ort?.ort}`,
            seo: {
              ...originData.gqlService.seo,
              title: `Oljeavskiljare i ${ort?.ort}`,
              opengraphTitle: `Oljeavskiljare ${ort?.ort} | Oljeavskiljare av högsta kvalite | Spoltec`,
              opengraphDescription: `Oljeavskiljare används där det förekommer vätskor med annan densitet än vatten, som olja och bensin. Har du några frågor? Kontakta Spoltec idag.`
                
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