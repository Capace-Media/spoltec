import { getPage } from "@lib/data/page";
import { generatePageMetadata } from "@lib/utils";
import { Metadata, ResolvingMetadata } from "next";
import Script from "next/script";
import LocalLinks from "components/local-links";
import Blocks from "components/flexible-content/block";
import MainHero from "components/header/main-hero";
import { generateHomepageStructuredData } from "@lib/structured-data/generateHomepageStructuredData";

export async function generateMetadata(
  {},
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = await getPage("/");
  return generatePageMetadata(page, parent);
}

export default async function Home() {
  const page = await getPage("/");
  const structuredData = generateHomepageStructuredData();

  return (
    <>
      {/* Homepage Structured Data */}
      <Script
        id="homepage-structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <main>
        <MainHero />
        <Blocks blocks={page?.gqlBlocks?.blocks || []} />
        <LocalLinks />
      </main>
    </>
  );
}
