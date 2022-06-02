import Blocks from '@common/components/Blocks';
import MainHero from '@common/sections/MainHero';
import PageTransition from '@modules/transitions/components/PageTransition';
import getPage from '@modules/pages/lib/getPage';
import Head from 'next/head';
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
          <meta name="google-site-verification" content={process.env.VERIFICATION_ID} />
        </Head>
        <MainHero />
        <Blocks blocks={page?.gqlBlocks?.blocks} />
      </>
    </PageTransition>
  );
}
