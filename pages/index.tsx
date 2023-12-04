import MainHero from "@common/sections/MainHero";
import getPage from "@modules/pages/lib/getPage";

import dynamic from "next/dynamic";
const Blocks = dynamic(() => import("@common/components/Blocks"), {
  loading: () => <p>Loading...</p>,
});

export const getStaticProps = async (context) => {
  const page = await getPage("/");

  return {
    props: {
      page,
    },
  };
};

export default function Home({ page }) {
  return (
    <>
      <MainHero />
      <Blocks blocks={page?.gqlBlocks?.blocks} />
    </>
  );
}
