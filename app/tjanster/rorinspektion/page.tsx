import ServiceHero from "components/header/service-hero";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import { generatePageMetadata } from "@lib/utils";
import { getService } from "@lib/data/service";
import Blocks from "components/flexible-content/block";
import { breadcrumbsSchema, serviceSchema } from "@lib/seo/schema";
import JsonLd from "components/JsonLd";
import { absoluteUrl } from "@lib/utils/url";
import BreadcrumbsComponent from "@components/breadcrumbs";

export async function generateMetadata(
  props: {},
  parent: ResolvingMetadata
): Promise<Metadata> {
  const uri = `/services/rorinspektion`;
  const page = await getService(uri);

  const canonical = `https://www.spoltec.se/tjanster/rorinspektion`;
  return generatePageMetadata(page, parent, canonical);
}

export default async function ServicePage() {
  const uri = `/services/rorinspektion`;
  const page = await getService(uri);

  if (!page) {
    notFound();
  }

  const canonical = await absoluteUrl(`/tjanster/rorinspektion`);
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
        />
        <BreadcrumbsComponent items={breadcrumbItems} />

        <div>
          <Blocks blocks={page?.gqlBlocks?.blocks || []} />
        </div>
      </main>
    </>
  );
}
