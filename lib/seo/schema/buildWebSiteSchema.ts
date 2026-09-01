import type { WebSite, WithContext } from "schema-dts";

/**
 * Emits the WebSite node that buildWebPageSchema references via
 * `isPartOf: { "@id": "<origin>/#website" }`. Without this the reference
 * dangles and the graph is incomplete.
 */
export interface WebSiteSchemaInput {
  url: string;
  name: string;
  description?: string;
}

export function buildWebSiteSchema(
  input: WebSiteSchemaInput
): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${input.url}/#website`,
    url: input.url,
    name: input.name,
    ...(input.description && { description: input.description }),
    inLanguage: "sv-SE",
    publisher: {
      "@id": "https://www.spoltec.se/#organization",
    },
  };
}
