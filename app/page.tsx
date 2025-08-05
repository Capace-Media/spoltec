import { getPage } from "@lib/data/page";
import { generatePageMetadata } from "@lib/utils";
import { Metadata, ResolvingMetadata } from "next";
import LocalLinks from "components/local-links";
import Blocks from "components/flexible-content/block";
import MainHero from "components/header/main-hero";

export async function generateMetadata(
  {},
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = await getPage("/");
  return generatePageMetadata(page, parent);
}

export default async function Home() {
  const page = await getPage("/");

  return (
    <>
      <MainHero />
      <Blocks blocks={page?.gqlBlocks?.blocks || []} />
      <LocalLinks />
    </>
  );
}
