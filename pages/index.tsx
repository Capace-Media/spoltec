import Blocks from '@common/components/Blocks';
import MainHero from '@common/sections/MainHero';
import PageTransition from '@modules/transitions/components/PageTransition';
import getPage from '@modules/pages/lib/getPage';
import Head from 'next/head';

export const getStaticpaths = async () => {
  const page = await getPage('/')

  const path = { params: {slug: page?.slug } }

  return { path, fallback: false }
}

export const getStaticProps = async (context) => {
  const page = await getPage('/');

  return { 
    props: { 
      page 
    },
    revalidate: 100, 
  };
};

export default function Home({ page }) {
  return (
    <PageTransition>
      <>
        <Head>
          <meta name="google-site-verification" content="jomTNzo9DicBaELndHU7Wb5SFyRTbVlBcpI65E77bio" />
        </Head>
        <MainHero />
        <Blocks blocks={page?.gqlBlocks?.blocks} />
      </>
    </PageTransition>
  );
}
