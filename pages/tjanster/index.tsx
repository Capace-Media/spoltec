import Hero from "@common/sections/Hero";
import getPage from "@modules/pages/lib/getPage";

import dynamic from "next/dynamic";
const Blocks = dynamic(() => import("@common/components/Blocks"), {
  loading: () => <p>Loading...</p>,
});

export const getStaticProps = async (context) => {
  const page = await getPage("tjanster");

  return {
    props: {
      page,
    },
  };
};

export default function Home({ page }) {
  return (
    <>
      <Hero
        title={page?.title}
        subtitle={page?.gqlHeroFields?.underrubrik}
        text={page?.gqlHeroFields?.introduktionstext}
        image={page?.gqlHeroFields?.bild?.mediaItemUrl}
      />
      <Blocks blocks={page?.gqlBlocks?.blocks} />
    </>
  );
}
