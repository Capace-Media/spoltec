import type { Service as ServiceType } from "@lib/types/service";
import type { Page } from "@lib/types/page";
import type { Service, WithContext, ImageObject } from "schema-dts";

export function buildServiceSchema(
  service: ServiceType | Page
): WithContext<Service> {
  const imageUrl = service.gqlHeroFields?.bild?.mediaItemUrl ?? "";

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${service.seo?.canonical ?? ""}#service`,
    name: service.seo?.title || service.title || "",
    serviceType: service.title || "",
    description:
      service.seo?.metaDesc ?? service.gqlHeroFields?.introduktionstext ?? "",
    url: service.seo?.canonical ?? "",
    image: imageUrl
      ? ({
          "@type": "ImageObject",
          url: imageUrl,
          caption:
            service.gqlHeroFields?.bild?.altText ||
            service.title ||
            service.seo?.title ||
            "",
        } as ImageObject)
      : undefined,
    provider: {
      "@id": "https://www.spoltec.se/#organization", // reference the org schema in layout
    },
    areaServed: ["Sverige"],
  };
}
