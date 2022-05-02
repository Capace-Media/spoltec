import Blocks from "@common/components/Blocks";
import getPage from "@modules/pages/lib/getPage";
import PageTransition from "@modules/transitions/components/PageTransition";

interface PageProps {
  page: any
}

const Page = ({page}: PageProps) => {
  return (
    <PageTransition>

      <>
        <div className='contain-outer'>
          <div className='bg-section'>
            <div className='mt-24 text-center contain'>
              <h1>Akut hjälp</h1>
              <p className='mt-3'>
                Hjälplinje för dig som är i behov av akut hjälp.
              </p>
              <a
                href='tel:040474012'
                className='inline-block px-10 py-4 mt-10 text-3xl font-bold text-white rounded bg-brand-orange'
              >
                040-47 40 12
              </a>
              <p className='mt-3'>Klicka på knappen för att ringa.</p>
            </div>
          </div>
        </div>

        <div id='content'>
          <Blocks blocks={page?.gqlBlocks?.blocks} />

        </div>
      </>
    </PageTransition>
  );
};

export const getStaticProps = async (context) => {
  const page = await getPage('/akut-hjalp');
  return { props: { page } };
};

export default Page;
