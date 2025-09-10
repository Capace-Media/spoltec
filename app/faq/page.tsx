import { getPage } from "@lib/data/page";
import Blocks from "components/flexible-content/block";
import { generatePageMetadata } from "@lib/utils";
import type { Metadata, ResolvingMetadata } from "next";
import Hero from "components/header/hero";
import { notFound } from "next/navigation";

import SchemaScript from "@lib/utils/schema-script";

export async function generateMetadata(
  {},
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = await getPage("/faq");
  const canonical = "https://www.spoltec.se/faq";
  return generatePageMetadata(
    page,
    parent,
    canonical,
    "Frågor och svar om avloppservice",
    "Läs mer om avloppsservice och våra tjänster."
  );
}

const FaqPage = async () => {
  const page = await getPage("/faq");

  if (!page) {
    notFound();
  }

  const raw = page?.pageSchema?.schema?.json;

  return (
    <>
      <SchemaScript raw={raw} />
      <main key={`faq`}>
        <Hero
          title={page?.title || "Frågor och svar om avloppservice"}
          subtitle={page?.gqlHeroFields?.underrubrik || ""}
          text={page?.gqlHeroFields?.introduktionstext || ""}
          image={page?.gqlHeroFields?.bild?.mediaItemUrl}
        />

        <Blocks blocks={page?.gqlBlocks?.blocks || []} />
      </main>
    </>
  );
};

export default FaqPage;
