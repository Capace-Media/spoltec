import Contact from "@modules/blocks/components/Contact";
import getPage from "@modules/pages/lib/getPage";
import dynamic from "next/dynamic";
const Blocks = dynamic(() => import("@common/components/Blocks"));

interface PageProps {
  page: any;
}

const Page = ({ page }: PageProps) => {
  return (
    <div key={`kontakta-oss`}>
      <div className="contain-outer">
        <div className="bg-section">
          <div className="mt-24 text-center contain">
            <h1>Kontakta oss</h1>
          </div>
        </div>
      </div>
      <div id="content" className="w-full h-10 md:h-0"></div>
      <div id="">
        <Contact />
        <Blocks blocks={page?.gqlBlocks?.blocks} />
      </div>
    </div>
  );
};

export const getStaticProps = async (context) => {
  const page = await getPage("/kontakta-oss");

  return {
    props: {
      page,
    },
  };
};

export default Page;
