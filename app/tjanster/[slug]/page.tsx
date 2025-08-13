import ServiceHero from "components/header/service-hero";
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";

import WP from "@lib/wp/wp";

import { generatePageMetadata } from "@lib/utils";
import { getService } from "@lib/data/service";
import Blocks from "components/flexible-content/block";
import { generateServiceStructuredData } from "@lib/structured-data/generateServiceStructuredData";
import { breadcrumbsSchema, serviceSchema } from "@lib/seo/schema";
import JsonLd from "components/JsonLd";
import { absoluteUrl } from "@lib/utils/url";

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
  const { slug } = await props.params;
  const uri = `/services/${slug}`; // ✅ fix path
  const page = await getService(uri);

  return generatePageMetadata(page, parent);
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ServicePage(props: PageProps) {
  const { slug } = await props.params;
  const uri = `/services/${slug}`; // ✅ fix path
  const page = await getService(uri);

  if (!page) {
    notFound();
  }

  const canonical = await absoluteUrl(`/tjanster/${slug}`);
  const bread = breadcrumbsSchema(
    [
      {
        name: "Hem",
        url: await absoluteUrl("/"),
      },
      {
        name: "Tjänster",
        url: await absoluteUrl("/tjanster"),
      },
      {
        name: page?.title ?? "",
        url: canonical,
        type: "Service",
        entityId: `${canonical}#service`,
      },
    ],
    canonical
  );
  const serviceSchemaLD = serviceSchema(page);

  return (
    <>
      <JsonLd json={bread} id="breadcrumbs-schema" />
      <JsonLd json={serviceSchemaLD} id="service-schema" />
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
