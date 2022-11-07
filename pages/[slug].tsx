import Blocks from '@common/components/Blocks';
import Hero from '@common/sections/Hero';
import getPage from '@modules/pages/lib/getPage';
import getService from '@modules/services/lib/getService';
import servicesIndex from '@data/static-services.json';
import WP from '@lib/wp/wp';
import PageTransition from '@modules/transitions/components/PageTransition';

export const isCustomPageSlug = (slug: string) => {
  const pagesToExclude = [
      'hem',
      'akut-hjalp',
      'kontakta-oss',
      'avloppsspolning',
      'kvicksilversanering',
      'oljeavskiljare',
      'provtagning-av-vatten',
      'relining',
      'rorinspektion',
      'boras',
      'goteborg',
      'halmstad',
      'helsingborg',
      'jonkoping',
      'kalmar',
      'karlskrona',
      'kristianstad',
      'malmo',
      'undefined',
      'varberg',
      'vaxjo'
  ]
  return pagesToExclude.includes(slug)
}

export const GET_PAGES = `
query GET_PAGES {
  pages(first: 100) {
    nodes {
      slug
    }
  }
}
`

export const getStaticPaths = async () => {

  const {data} = await WP(GET_PAGES)
  console.log("data ==>", data)
  
  const pagePaths = []
  
  data?.pages?.nodes && data?.pages?.nodes?.map((page: any) => {
    if(! isCustomPageSlug(page?.slug) ){
      pagePaths.push( { params: {slug: page?.slug } } )
    }
  })

  // console.log("pagePaths ==>", pagePaths)

  const paths = [...pagePaths];

  // console.log("paths ==>", paths)
  
  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
  // console.log("getStaticProps context ==>", context)
  const isService = servicesIndex.some(
    (service) => service.slug === context.params.slug
  );
  let page;
  // console.log("servicesIndex ==>", servicesIndex.map((service) => service.slug))
  if (isService) {
    page = await getService(context.params.slug);
  } else {
    page = await getPage(context.params.slug);
  }
  if (!page) {
    return {
      notFound: true,
    };
  }
  return { 
    props: { 
      page 
    },
    revalidate: 100, 
  };
};

interface PageProps {
  page: any;
}

const Page = ({ page }: PageProps) => {
  console.log("page ==>", page)

  
  return (
    <PageTransition>

      <div key={page.title}>
        <Hero
          title={page?.title}
          subtitle={page?.gqlHeroFields?.underrubrik}
          text={page?.gqlHeroFields?.introduktionstext}
          image={page?.gqlHeroFields?.bild?.mediaItemUrl}
        />
        <div id='content' className='w-full h-10 md:h-0'></div>
        <div>
          <Blocks blocks={page?.gqlBlocks?.blocks} />
        </div>
      </div>
    </PageTransition>
  );
};

export default Page;