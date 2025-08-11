import { Service as ServiceType } from "@lib/types/service";
import { Service, WithContext } from "schema-dts";
import { orgSchema } from ".";

export function buildServiceSchema(service: ServiceType): WithContext<Service> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.seo.title ?? "",
    serviceType: service.title ?? "",
    description: service.seo.metaDesc ?? "",
    url: service.seo?.canonical ?? "",
    image: service.gqlHeroFields?.bild?.mediaItemUrl ?? "",
    provider: orgSchema({
      name: "Spoltec",
      url: "https://www.spoltec.se",
    }),
  };
}
