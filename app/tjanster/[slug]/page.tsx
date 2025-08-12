import ServiceHero from "components/header/service-hero";
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";

import WP from "@lib/wp/wp";

import { generatePageMetadata } from "@lib/utils";
import { getService } from "@lib/data/service";
import Blocks from "components/flexible-content/block";
import { generateServiceStructuredData } from "@lib/structured-data/generateServiceStructuredData";
import { breadcrumbsSchema } from "@lib/seo/schema";
import JsonLd from "components/JsonLd";

export const dynamicParams = true;

const GET_SERVICES_QUERY = `
  query GET_SERVICES {
    gqlAllService(first: 100, where: {parent: "0"}) {
      nodes {
        slug
      }
    }
  }
`;

export async function generateStaticParams() {
  const { data } = await WP(GET_SERVICES_QUERY);

  const servicePaths =
    data?.gqlAllService?.nodes
      ?.filter(
        (service: any) => service?.slug && typeof service.slug === "string"
      )
      ?.map((service: any) => ({ slug: service.slug })) || [];

  return servicePaths;
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params;
  const uri = `/services/${params.slug}`;
  const page = await getService(uri);

  return generatePageMetadata(page, parent);
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ServicePage(props: PageProps) {
  const params = await props.params;
  const uri = `/services/${params.slug}`;
  const page = await getService(uri);

  if (!page) {
    notFound();
  }

  const bread = breadcrumbsSchema([
    {
      name: "Hem",
      url: "/",
    },
    {
      name: "Tjänster",
      url: "/tjanster",
    },
    {
      name: page?.title,
      url: `/tjanster/${params.slug}`,
    },
  ]);

  return (
    <>
      <JsonLd json={bread} id="breadcrumbs-schema" />
      <main key={page?.title}>
        <ServiceHero
          title={page?.title}
          subtitle={page?.gqlHeroFields?.underrubrik}
          text={page?.gqlHeroFields?.introduktionstext}
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
