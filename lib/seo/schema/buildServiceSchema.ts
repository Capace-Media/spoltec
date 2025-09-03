import type { Service as ServiceType } from "@lib/types/service";
import type { Service, WithContext, ImageObject } from "schema-dts";

export function buildServiceSchema(service: ServiceType): WithContext<Service> {
  const imageUrl = service.gqlHeroFields?.bild?.mediaItemUrl ?? "";

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${service.seo?.canonical ?? ""}#service`,
    name: service.seo.title || service.title || "",
    serviceType: service.title || "",
    description: service.seo.metaDesc ?? "",
    url: service.seo?.canonical ?? "",
    image: imageUrl
      ? ({
          "@type": "ImageObject",
          url: imageUrl,
          caption: service.gqlHeroFields?.bild?.altText || service.title || "",
        } as ImageObject)
      : undefined,
    provider: {
      "@id": "https://www.spoltec.se/#organization",
    },
    areaServed: ["Sverige"],
  };
}
