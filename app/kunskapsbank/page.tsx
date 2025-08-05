import Hero from "components/header/hero";
import Blocks from "components/flexible-content/block";
import { getPage } from "@lib/data/page";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@lib/utils";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  {},
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = await getPage("/kunskapsbank");
  return generatePageMetadata(
    page,
    parent,
    "Kunskapsbank - Spoltec",
    "Kunskapsbank"
  );
}

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
