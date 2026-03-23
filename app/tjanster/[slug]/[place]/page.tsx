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

type GetChildServicesQueryData = {
  gqlAllService: {
    nodes: {
      slug: string;
      parent: {
        node: {
          slug: string;
        };
      } | null;
    }[];
  };
};

const GET_CHILD_SERVICES_QUERY = `
  query GET_CHILD_SERVICES {
    gqlAllService(first: 500) {
      nodes {
        slug
        parent {
          node {
            ... on GqlService {
              slug
            }
          }
        }
      }
    }
  }
`;

export async function generateStaticParams() {
  const response = await fetchGraphQL<GetChildServicesQueryData>(
    GET_CHILD_SERVICES_QUERY,
    {},
    ["services"]
  );

  const routes =
    response.gqlAllService?.nodes
      ?.filter((node) => node.parent?.node?.slug)
      .map((node) => ({
        slug: node.parent!.node.slug,
        place: node.slug,
      })) ?? [];

  return routes;
}

interface PageProps {
  params: Promise<{ slug: string; place: string }>;
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string; place: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug, place } = await props.params;
  const uri = `/services/${slug}/${place}`;
  const page = await getService(uri);

  if (!page) return {};

  const canonical = `https://www.spoltec.se/tjanster/${slug}/${place}`;
  return generatePageMetadata(page, parent, canonical);
}

export default async function PlacePage(props: PageProps) {
  const { slug, place } = await props.params;
  const uri = `/services/${slug}/${place}/`;
  const page = await getService(uri);

  if (!page) {
    notFound();
  }

  // Fetch parent service for breadcrumb name
  const parentService = await getService(`/services/${slug}/`);
  const parentTitle = parentService?.title ?? slug;

  const canonical = absoluteUrl(`/tjanster/${slug}/${place}`);

  const breadcrumbItems = [
    { name: "Hem", url: absoluteUrl("/") },
    { name: "Tjänster", url: absoluteUrl("/tjanster") },
    {
      name: parentTitle,
      url: absoluteUrl(`/tjanster/${slug}`),
    },
    {
      name: page.title,
      url: canonical,
      current: true,
    },
  ];

  const bread = breadcrumbsSchema(
    breadcrumbItems.map((item) => ({
      name: item.name,
      url: item.url,
      type: "current" in item ? "Service" : undefined,
    })),
    canonical
  );

  const serviceSchemaLD = serviceSchema(page, page.title);

  return (
    <>
      <JsonLd json={bread} id="breadcrumbs-schema" />
      <JsonLd json={serviceSchemaLD} id="service-schema" />
      <main key={page.title}>
        <ServiceHero
          title={page?.gqlHeroFields?.h1 ? page.gqlHeroFields.h1 : page.title}
          subtitle={page.gqlHeroFields?.underrubrik}
          text={page.gqlHeroFields?.introduktionstext}
          image={page.gqlHeroFields?.bild?.mediaItemUrl}
          usp={page.gqlHeroFields?.usp}
          width={page.gqlHeroFields?.bild?.mediaDetails?.width}
          height={page.gqlHeroFields?.bild?.mediaDetails?.height}
        />
        <BreadcrumbsComponent items={breadcrumbItems} />

        <Blocks blocks={page.gqlBlocks?.blocks || []} />
      </main>
    </>
  );
}
