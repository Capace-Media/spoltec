import Blocks from "@common/components/Blocks";
import Hero from "@common/sections/Hero";
import WP from "@lib/wp/wp";
import { SeoFragment } from "@modules/seo/lib/get-seo";


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
      'helsingborg',
  ]
  return pagesToExclude.includes(slug)
}

export const getStaticPaths = async () => {
    const {data} = await  WP(GET_ORTER)

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
        { slug: '/relining' }
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
            title: `Relining ${ort?.ort} | Nya alternativet till stambyte | Spoltec`,
            uri: `/relining/${ort?.slug}`,
            seo: {
              ...originData.gqlService.seo,
              title: `Relining i ${ort?.ort} | Nya alternativet till stambyte | Spoltec`,
              opengraphTitle: `Relining ${ort?.ort} | Nya alternativet till stambyte | Spoltec`,
              opengraphDescription: `Behöver du hjälp med relining i ${ort?.ort}? Relining är ett kostnadseffektivt och snabbt alternativ till stambyte. Kontakta Spoltec för relining i ${ort?.ort}.`
                
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

interface ReliningOrterProps {
    data: any;
    orter: any;
    ort: any;
};

const ReliningOrter = ({data, orter, ort}:ReliningOrterProps) => {
    
    return (
        <div key={ort}>
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
                    <h2>{`${data?.gqlService?.title}`}</h2>

                    <p>Spoltec besitter stor erfarenhet inom relining och grundlig kompetens för att kunna hjälpa er i <strong>{ort?.ort}</strong> med allt kring <strong>avloppspolning</strong> och <strong>relining</strong>.</p>

                  </div>

                </section>
                <Blocks blocks={data?.gqlService?.gqlBlocks?.blocks} />
            </div>
        </div>
    )
};

export default ReliningOrter;
