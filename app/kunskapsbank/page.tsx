import Blocks from "@common/components/Blocks";
import Hero from "@common/sections/Hero";
import { getPage } from "@lib/data/page";
import { notFound } from "next/navigation";

export default async function KunskapsBank() {
  const page = await getPage("kunskapsbank");

  if (!page) {
    notFound();
  }

  return (
    <div>
      <Hero
        title={page?.title}
        subtitle={page?.gqlHeroFields?.underrubrik || ""}
        text={page?.gqlHeroFields?.introduktionstext || ""}
        image={page?.gqlHeroFields?.bild?.mediaItemUrl}
      />
      <div>
        <Blocks blocks={page?.gqlBlocks?.blocks || []} />
      </div>

      <div className="text-center section contain">
        <div className="max-w-[700px] mx-auto">
          <h2>Artiklar</h2>
        </div>
      </div>
    </div>
  );
}
