import type { WithContext, Thing } from "schema-dts";

function safeJsonLdString(data: unknown) {
  // Next.js doc recommends at least escaping "<"
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

type JsonLdProps = {
  json: WithContext<Thing> | WithContext<Thing>[];
  id?: string;
};

export default function JsonLd({ json, id }: JsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLdString(json) }}
    />
  );
}
