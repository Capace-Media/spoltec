import Hero from "components/header/hero";
import Blocks from "components/flexible-content/block";
import { notFound } from "next/navigation";
import { getPage } from "@lib/data/page";
import { GET_PAGES_QUERY } from "@lib/queries/page";
import { generatePageMetadata, isBlacklistedPageSlug } from "@lib/utils";
import type { Metadata, ResolvingMetadata } from "next";
import { fetchGraphQL } from "@lib/wp/fetchGraphQL";
import SchemaScript from "./schema-script";

export const dynamicParams = false;

type GetPagesQueryData = {
  pages: {
    nodes: {
      slug: string;
    }[];
  };
};

export async function generateStaticParams() {
  const response = await fetchGraphQL<GetPagesQueryData>(GET_PAGES_QUERY, {}, [
    "pages",
  ]);
  const pagesToExclude = [
    "hem",
    "akut-hjalp",
    "kontakta-oss",
    "avloppsspolning",
    "kvicksilversanering",
    "oljeavskiljare",
    "provtagning-av-vatten",
    "relining",
    "rorinspektion",
    "boras",
    "goteborg",
    "halmstad",
    "helsingborg",
    "jonkoping",
    "kalmar",
    "karlskrona",
    "kristianstad",
    "malmo",
    "undefined",
    "varberg",
    "vaxjo",
    "kunskapsbank",
    "tjanster",
    "lokala-tjanster",
  ];

  const pagePaths = response.pages.nodes
    .filter(
      (page: any) =>
        !isBlacklistedPageSlug(page.slug, pagesToExclude) &&
        typeof page.slug === "string"
    )
    .map((page: any) => ({ slug: page.slug }));

  return pagePaths;
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params;

  const page = await getPage(params.slug);

  const canonical = `https://www.spoltec.se/${params.slug}`;
  return generatePageMetadata(page, parent, canonical);
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const page = await getPage(params.slug);

  console.log(page);

  if (!page) {
    notFound();
  }

  const raw = page?.pageSchema?.schema?.json;

  return (
    <>
      <SchemaScript raw={raw} />
      <main key={page.title}>
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
      </main>
    </>
  );
}
