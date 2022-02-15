import Blocks from '@common/components/Blocks';
import Hero from '@common/sections/Hero';
import getPage from '@modules/pages/lib/getPage';
import getService from '@modules/services/lib/getService';
import servicesIndex from '@data/static-services.json';
export const getStaticPaths = async () => {
  const servicePaths = servicesIndex.map((service) => {
    return {
      params: {
        slug: service.slug,
      },
    };
  });

  const paths = servicePaths;
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
  return { props: { page } };
};

interface PageProps {
  page: any;
}

const Page = ({ page }: PageProps) => {
  console.log('page', page);
  return (
    <>
      <Hero
        title={page?.title}
        subtitle={page?.gqlHeroFields?.underrubrik}
        text={page?.gqlHeroFields?.introduktionstext}
        image={page?.gqlHeroFields?.bild?.mediaItemUrl}
      />
      <div id='content'>
        <Blocks blocks={page?.gqlBlocks?.blocks} />
      </div>
      <></>
    </>
  );
};

export default Page;
