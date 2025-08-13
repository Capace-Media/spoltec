import { getPage } from "@lib/data/page";
import Blocks from "components/flexible-content/block";
import { generatePageMetadata } from "@lib/utils";
import { Metadata, ResolvingMetadata } from "next";
import Hero from "components/header/hero";
import { notFound } from "next/navigation";
import { webPageSchema } from "@lib/seo/schema";
import JsonLd from "components/JsonLd";

export async function generateMetadata(
  {},
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = await getPage("/om-spoltec");
  return generatePageMetadata(
    page,
    parent,
    "Om Spoltec - Spoltec",
    "Läs mer om Spoltec och våra tjänster."
  );
}

const OmSpoltecPage = async () => {
  const page = await getPage("/om-spoltec");

  if (!page) {
    notFound();
  }

  const canonical = "https://www.spoltec.se/om-spoltec";
  const schema = webPageSchema(page, "AboutPage", canonical);

  return (
    <>
      <JsonLd json={schema} id={"om-spoltec-page"} />
      <main key={`om-spoltec`}>
        <Hero
          title={page?.title || "Om Spoltec"}
          subtitle={page?.gqlHeroFields?.underrubrik || ""}
          text={page?.gqlHeroFields?.introduktionstext || ""}
          image={page?.gqlHeroFields?.bild?.mediaItemUrl}
        />

        <Blocks blocks={page?.gqlBlocks?.blocks || []} />
      </main>
    </>
  );
};

export default OmSpoltecPage;
