import Hero from "@common/sections/Hero";
import getPage from "@modules/pages/lib/getPage";
import Blocks from "components/globals/blocks";

export default async function Services() {
  const page = await getPage("tjanster");
  console.log("page =====>", page);
  return (
    <main>
      <Hero
        title={page?.title}
        subtitle={page?.gqlHeroFields?.underrubrik}
        text={page?.gqlHeroFields?.introduktionstext}
        image={page?.gqlHeroFields?.bild?.mediaItemUrl}
      />
      <Blocks blocks={page?.gqlBlocks?.blocks} />
    </main>
  );
}
