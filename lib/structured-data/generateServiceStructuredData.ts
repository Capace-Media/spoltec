import type { Service } from "@lib/types/service";

export function generateServiceStructuredData(service: Service | null) {
  const baseUrl = "https://www.spoltec.se";

  if (!service) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.seo.title,
    description: service.seo.metaDesc,
    url: `${baseUrl}/tjanster/${service.slug}`,
    image: service.gqlHeroFields?.bild?.mediaItemUrl,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Start",
          item: `${baseUrl}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Tjänster",
          item: `${baseUrl}/tjanster`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: service.seo.title,
          item: `${baseUrl}/tjanster/${service.slug}`,
        },
      ],
    },
    provider: {
      "@type": "Organization",
      name: "Spoltec",
    },
    serviceArea: {
      "@type": "Country",
      name: "Sweden",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Spoltec Tjänster",
      itemListElement: [
        {
          "@type": "Offer",
          name: service.seo.title,
          description: service.seo.metaDesc,
          url: `${baseUrl}/tjanster/${service.slug}`,
          image: service.gqlHeroFields?.bild?.mediaItemUrl,
          provider: {
            "@type": "Organization",
            name: "Spoltec",
          },
        },
      ],
    },
  };
}
