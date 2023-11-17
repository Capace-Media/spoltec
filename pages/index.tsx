import getPage from "@modules/pages/lib/getPage";

import dynamic from "next/dynamic";

const MainHero = dynamic(() => import("@common/sections/MainHero"));
const Blocks = dynamic(() => import("@common/components/Blocks"));

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
