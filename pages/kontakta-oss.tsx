import Blocks from "@common/components/Blocks";
import Contact from "@modules/blocks/components/Contact";
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
                <h1>Kontakta oss</h1>
            </div>
          </div>
        </div>

        <div id='content'>
          <Contact />
          <Blocks blocks={page?.gqlBlocks?.blocks} />

        </div>
      </>
    </PageTransition>
  );
};

export const getStaticProps = async (context) => {
  const page = await getPage('/kontakta-oss');
  return { 
    props: { 
      page 
    },
    revalidate: 100, 
  };
};

export default Page;
