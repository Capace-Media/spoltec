import MainHero from "@common/sections/MainHero";
import LocalLinks from "@modules/blocks/components/LocalLinks.tsx";
import getPage from "@modules/pages/lib/getPage";

import Blocks from "@common/components/Blocks";

export default async function Home() {
  const page = await getPage("/");
  return (
    <>
      <MainHero />
      <Blocks blocks={page?.gqlBlocks?.blocks} />
      <LocalLinks />
    </>
  );
}
