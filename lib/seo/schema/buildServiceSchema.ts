import type { Service as ServiceType } from "@lib/types/service";
import type { Service, WithContext, ImageObject } from "schema-dts";

export function buildServiceSchema(
  service: ServiceType,
  cityName?: string
): WithContext<Service> {
  const imageUrl = service.gqlHeroFields?.bild?.mediaItemUrl ?? "";
  const localizedName = cityName
    ? `${service.title} i ${cityName}`
    : service.seo.title || service.title || "";

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${service.seo?.canonical ?? ""}#service`,
    name: localizedName,
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
    areaServed: cityName
      ? { "@type": "City", name: cityName }
      : ["Sverige"],
  };
}
