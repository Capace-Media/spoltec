import Blocks from '@common/components/Blocks';
import Hero from '@common/sections/Hero';
import getPage from '@modules/pages/lib/getPage';
import getService from '@modules/services/lib/getService';
import servicesIndex from '@data/static-services.json';
import { useRouter } from 'next/router';
import Contact from '@modules/blocks/components/Contact';
import WP from '@lib/wp/wp';
import PageTransition from '@modules/transitions/components/PageTransition';

export const isCustomPageSlug = (slug: string) => {
  const pagesToExclude = [
      'hem',
      'akut-hjalp'
  ]
  return pagesToExclude.includes(slug)
}

export const GET_PAGES = `
query GET_PAGES {
  pages {
    nodes {
      slug
    }
  }
}

`

export const getStaticPaths = async () => {

  const {data} = await WP(GET_PAGES)
  
  const pagePaths = []
  
  data?.pages?.nodes && data?.pages?.nodes?.map((page: any) => {
    if(! isCustomPageSlug(page?.slug) ){
      pagePaths.push( { params: {slug: page?.slug } } )
    }
  })

  const servicePaths = servicesIndex.map((service) => {

    return {
      params: {
        slug: service.slug,
      },
    };
  });
  const paths = [...servicePaths, ...pagePaths];
  
  return { paths, fallback: 'blocking' };
};

export const getStaticProps = async (context) => {
  const isService = servicesIndex.some(
    (service) => service.slug === context.params.slug
  );
  let page;
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
  const router = useRouter()
  
  return (
    <PageTransition>

      <>
        <Hero
          title={page?.title}
          subtitle={page?.gqlHeroFields?.underrubrik}
          text={page?.gqlHeroFields?.introduktionstext}
          image={page?.gqlHeroFields?.bild?.mediaItemUrl}
        />
        <div id='content'>
          {router?.asPath === '/kontakta-oss' && (
            <Contact />
          )}
          <Blocks blocks={page?.gqlBlocks?.blocks} />
        </div>
        <></>
      </>
    </PageTransition>
  );
};

export default Page;
