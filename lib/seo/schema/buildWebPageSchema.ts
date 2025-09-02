// lib/seo/webpage.ts
import type { Page } from "@lib/types/page";
import type {
  WithContext,
  WebPage as WebPageSchema,
  AboutPage,
  ContactPage,
  CollectionPage,
  ImageObject,
} from "schema-dts";

type PageType = "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";

export function buildWebPageSchema(
  page: Page,
  type: PageType = "WebPage",
  canonical: string
): WithContext<WebPageSchema | AboutPage | ContactPage | CollectionPage> {
  // Extract image URL safely
  const imageUrl = page.gqlHeroFields?.bild?.mediaItemUrl;

  // Build image object only if image exists
  const image: ImageObject | undefined = imageUrl
    ? {
        "@type": "ImageObject",
        url: imageUrl,
        caption: page.gqlHeroFields?.bild?.altText || page.title || "",
      }
    : undefined;

  // Build base URL for WebSite reference
  const baseUrl = new URL(canonical).origin;

  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${canonical}#${type.toLowerCase()}`,
    url: canonical,
    name: page.seo?.title || page.title || "",
    headline: page.title || "",
    description: page.seo?.metaDesc || "",
    inLanguage: "sv-SE",
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    ...(image && { image }),
    isPartOf: {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://www.spoltec.se/#organization",
    },
    // Add breadcrumbs if available
    ...(page.seo?.breadcrumbs && {
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: page.seo.breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.text,
          item: crumb.url,
        })),
      },
    }),
    // Add keywords if available
    ...(page.seo?.focuskw && {
      keywords: [page.seo.focuskw],
    }),
  };
}
