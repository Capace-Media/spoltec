import { BreadcrumbList, WithContext } from "schema-dts";

export function buildBreadcrumbs(
  items: { name: string; url: string }[]
): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: { "@id": it.url, name: it.name },
    })),
  };
}
