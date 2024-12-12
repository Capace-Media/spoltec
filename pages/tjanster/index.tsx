import Blocks from "@common/components/Blocks";
import Hero from "@common/sections/Hero";

import getPage from "@modules/pages/lib/getPage";

export const getStaticProps = async (context) => {
  const page = await getPage("tjanster");

  if (!page) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      page,
    },
  };
};

interface PageProps {
  page: any;
}

const ServicesPage = ({ page }: PageProps) => {
  return (
    <div key={page.title}>
      <Hero
        title={page?.title}
        subtitle={page?.gqlHeroFields?.underrubrik}
        text={page?.gqlHeroFields?.introduktionstext}
        image={page?.gqlHeroFields?.bild?.mediaItemUrl}
      />
      <div id="content" className="w-full h-10 md:h-0"></div>
      <div>
        <Blocks blocks={page?.gqlBlocks?.blocks} />
      </div>
    </div>
  );
};

export default ServicesPage;
