import Blocks from "@common/components/Blocks";
import ServiceHero from "@common/sections/service-hero";
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";

import WP from "@lib/wp/wp";

import { generatePageMetadata } from "@lib/utils";
import { getService } from "@lib/data/service";

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
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const uri = `/services/${params.slug}`;
  const page = await getService(uri);

  return generatePageMetadata(page, parent);
}

interface PageProps {
  params: { slug: string };
}

export default async function ServicePage({ params }: PageProps) {
  const uri = `/services/${params.slug}`;
  const page = await getService(uri);

  if (!page) {
    notFound();
  }

  return (
    <div key={page?.title}>
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
    </div>
  );
}
