import Blocks from '@common/components/Blocks';
import MainHero from '@common/sections/MainHero';
import PageTransition from '@modules/transitions/components/PageTransition';
import getPage from '@modules/pages/lib/getPage';
export const getStaticProps = async (context) => {
  const page = await getPage('/');
  return { props: { page } };
};

export default function Home({ page }) {
  return (
    <PageTransition>
      <>
        <MainHero />
        <Blocks blocks={page?.gqlBlocks?.blocks} />
      </>
    </PageTransition>
  );
}
