// lib/seo/breadcrumbs.ts
import type { BreadcrumbList, WithContext } from "schema-dts";

type CrumbType = "WebPage" | "Service" | "Article" | "BlogPosting";

export type BreadcrumbItem = {
  name: string;
  url: string; // page URL (used as @id if no entityId)
  type?: CrumbType; // explicit type; defaults to WebPage
  entityId?: string; // optional @id of the entity (e.g. `${canonical}#service`)
};

export function buildBreadcrumbs(
  items: BreadcrumbItem[],
  canonical: string
): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonical}#breadcrumb`,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": it.type ?? "WebPage",
        "@id": it.entityId ?? it.url,
        name: it.name,
      },
    })),
  };
}
