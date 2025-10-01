import { getPage } from "@lib/data/page";
import { generatePageMetadata } from "@lib/utils";
import Hero from "components/header/hero";
import Blocks from "components/flexible-content/block";
import type { Metadata, ResolvingMetadata } from "next";
import { webPageSchema } from "@lib/seo/schema";
import JsonLd from "components/JsonLd";

export async function generateMetadata(
  {},
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = await getPage("tjanster");
  const canonical = "https://www.spoltec.se/tjanster";
  return generatePageMetadata(page, parent, canonical);
}

export default async function ServicesPage() {
  const page = await getPage("tjanster");

  if (!page) {
    return <div>Page not found</div>;
  }

  const canonical = "https://www.spoltec.se/tjanster";
  const schema = webPageSchema(page, "CollectionPage", canonical);

  return (
    <>
      <JsonLd json={schema} id={"services-collection-page"} />
      <main key={page.title}>
        <Hero
          title={page?.title}
          subtitle={page?.gqlHeroFields?.underrubrik || ""}
          text={page?.gqlHeroFields?.introduktionstext || ""}
          image={page?.gqlHeroFields?.bild?.mediaItemUrl}
          width={page?.gqlHeroFields?.bild?.mediaDetails?.width}
          height={page?.gqlHeroFields?.bild?.mediaDetails?.height}
        />
        <div id="content" className="w-full h-10 md:h-0"></div>
        <div>
          <Blocks blocks={page?.gqlBlocks?.blocks || []} />
        </div>
      </main>
    </>
  );
}
