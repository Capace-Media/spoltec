import Hero from "components/header/hero";
import Blocks from "components/flexible-content/block";
import BreadcrumbsComponent from "components/breadcrumbs";
import ApplicationForm from "../_components/application-form";
import JsonLd from "components/JsonLd";
import { getPosition } from "@lib/data/employment";
import { POSITION_SLUGS_QUERY } from "@lib/queries/employment";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@lib/utils";
import type { Metadata, ResolvingMetadata } from "next";
import { breadcrumbsSchema } from "@lib/seo/schema";
import { absoluteUrl } from "@lib/utils/url";
import { fetchGraphQL } from "@lib/wp/fetchGraphQL";
import { TAGS } from "@lib/wp/tags";

export const dynamicParams = true;

type PositionSlugsQueryData = {
  gqlAllEmployment: {
    nodes: { slug: string | null }[];
  } | null;
};

export async function generateStaticParams() {
  try {
    const response = await fetchGraphQL<PositionSlugsQueryData>(
      POSITION_SLUGS_QUERY,
      {},
      [TAGS.position]
    );

    return (
      response.gqlAllEmployment?.nodes
        ?.filter((position) => typeof position?.slug === "string")
        ?.map((position) => ({ slug: position.slug as string })) || []
    );
  } catch (error) {
    console.error("Error generating static params for karriar:", error);
    return [];
  }
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params;
  const position = await getPosition(params.slug);

  const canonical = absoluteUrl(`/karriar/${params.slug}`);
  return generatePageMetadata(position, parent, canonical);
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PositionPage(props: PageProps) {
  const params = await props.params;
  const position = await getPosition(params.slug);

  if (!position) {
    notFound();
  }

  const canonical = absoluteUrl(`/karriar/${params.slug}`);

  const breadcrumbItems = [
    { name: "Hem", url: absoluteUrl("/") },
    { name: "Karriär", url: absoluteUrl("/karriar") },
    { name: position.title, url: canonical, current: true },
  ];

  const bread = breadcrumbsSchema(
    breadcrumbItems.map((item) => ({
      name: item.name,
      url: item.url,
      type: undefined,
    })),
    canonical
  );

  return (
    <>
      <JsonLd json={bread} id="breadcrumbs-schema" />

      <main key={position.slug}>
        <article>
          <Hero
            title={position.title}
            subtitle={position.gqlPositionFields?.underrubrik || ""}
            image={position.gqlPositionFields?.bild?.mediaItemUrl}
            width={position.gqlPositionFields?.bild?.mediaDetails?.width}
            height={position.gqlPositionFields?.bild?.mediaDetails?.height}
          />

          <BreadcrumbsComponent items={breadcrumbItems} />

          <Blocks blocks={position.gqlBlocks?.blocks || []} />

          <ApplicationForm position={position.title} positionUrl={canonical} />
        </article>
      </main>
    </>
  );
}
