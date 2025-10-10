import ServiceHero from "components/header/service-hero";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import { generatePageMetadata } from "@lib/utils";
import { getService } from "@lib/data/service";
import Blocks from "components/flexible-content/block";
import { breadcrumbsSchema, serviceSchema } from "@lib/seo/schema";
import JsonLd from "components/JsonLd";
import { absoluteUrl } from "@lib/utils/url";
import { fetchGraphQL } from "@lib/wp/fetchGraphQL";
import BreadcrumbsComponent from "@components/breadcrumbs";

const cities = [
  { name: "Malmö", slug: "malmo" },
  { name: "Helsingborg", slug: "helsingborg" },
  { name: "Lund", slug: "lund" },
  { name: "Kristianstad", slug: "kristianstad" },
  { name: "Göteborg", slug: "goteborg" },
  { name: "Borås", slug: "boras" },
  { name: "Varberg", slug: "varberg" },
  { name: "Jönköping", slug: "jonkoping" },
  { name: "Växjö", slug: "vaxjo" },
];

type GetServicesQueryData = {
  gqlAllService: {
    nodes: {
      slug: string;
    }[];
  };
};

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
  const response = await fetchGraphQL<GetServicesQueryData>(
    GET_SERVICES_QUERY,
    {},
    ["services"]
  );

  const servicePaths =
    response.gqlAllService?.nodes?.map((service: any) => ({
      slug: service.slug,
    })) || [];

  return servicePaths;
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await props.params;
  const uri = `/services/${slug}`; // ✅ fix path
  const page = await getService(uri);

  const canonical = `https://www.spoltec.se/tjanster/${slug}`;
  return generatePageMetadata(page, parent, canonical);
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ServicePage(props: PageProps) {
  const { slug } = await props.params;
  const uri = `/services/${slug}/`; // ✅ fix path
  const page = await getService(uri);

  if (!page) {
    notFound();
  }

  const canonical = await absoluteUrl(`/tjanster/${slug}`);

  const breadcrumbItems = [
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
      current: true,
    },
  ];
  const bread = breadcrumbsSchema(
    breadcrumbItems.map((item) => ({
      name: item.name,
      url: item.url,
      type: item.current ? "Service" : undefined,
    })),
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
          usp={page?.gqlHeroFields.usp}
          width={page?.gqlHeroFields?.bild?.mediaDetails?.width}
          height={page?.gqlHeroFields?.bild?.mediaDetails?.height}
        />
        <BreadcrumbsComponent items={breadcrumbItems} />

        <Blocks blocks={page?.gqlBlocks?.blocks || []} />
      </main>
    </>
  );
}
