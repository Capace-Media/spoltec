import { getPage } from "@lib/data/page";
import { generatePageMetadata } from "@lib/utils";
import type { Metadata, ResolvingMetadata } from "next";
import Blocks from "components/flexible-content/block";
import MainHero from "components/header/main-hero";
import { webPageSchema } from "@lib/seo/schema";
import JsonLd from "components/JsonLd";
import Image from "next/image";
import Link from "next/link";
import InstagramFeed from "@components/instagram-feed";
import GoogleTrustIndex from "@components/google-trustindex";

export async function generateMetadata(
  { },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = await getPage("/");

  const canonical = "https://www.spoltec.se";
  return generatePageMetadata(page, parent, canonical);
}



export default async function Home() {
  const page = await getPage("/");

  if (!page) {
    return (
      <main>
        <MainHero />
        <section className="contain layout">
          <h2>Tekniskt fel</h2>
          <p>
            Det gick inte att ladda sidans innehåll. Vänligen försök igen
            senare. Prova att ladda om sidan.
          </p>
        </section>
      </main>
    );
  }

  const canonical = "https://www.spoltec.se";
  const schema = webPageSchema(page, "WebPage", canonical);


  return (
    <>
      <JsonLd json={schema} id={"home-page"} />
      <main key={page.title}>
        <InstagramFeed />

        <GoogleTrustIndex />
        <MainHero
          title={page?.title}
          subtitle={page?.gqlHeroFields?.underrubrik || ""}
          text={page?.gqlHeroFields?.introduktionstext || ""}
          usp={page?.gqlHeroFields?.usp || []}
        />

        <Blocks blocks={page?.gqlBlocks?.blocks || []} />
      </main>
    </>
  );
}
