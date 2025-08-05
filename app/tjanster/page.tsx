import { getPage } from "@lib/data/page";
import { generatePageMetadata } from "@lib/utils";
import Hero from "components/header/hero";
import Blocks from "components/flexible-content/block";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  {},
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = await getPage("tjanster");
  return generatePageMetadata(page, parent);
}

export default async function ServicesPage() {
  const page = await getPage("tjanster");

  if (!page) {
    return <div>Page not found</div>;
  }

  return (
    <div key={page.title}>
      <Hero
        title={page?.title}
        subtitle={page?.gqlHeroFields?.underrubrik || ""}
        text={page?.gqlHeroFields?.introduktionstext || ""}
        image={page?.gqlHeroFields?.bild?.mediaItemUrl}
      />
      <div id="content" className="w-full h-10 md:h-0"></div>
      <div>
        <Blocks blocks={page?.gqlBlocks?.blocks || []} />
      </div>
    </div>
  );
}
