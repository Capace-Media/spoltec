import type { Thing, WithContext } from "schema-dts";
import { buildFAQSchema, type FAQData } from "./buildFAQSchema";
import { buildHowToSchema, type HowToData } from "./buildHowToSchema";

/**
 * Derives block-level structured data (FAQPage, HowTo) from a page's flexible
 * content so any route rendering those blocks gets the matching rich result,
 * not just /faq.
 */

const FAQ_BLOCKS = new Set([
  "Page_Gqlblocks_Blocks_Faq",
  "GqlService_Gqlblocks_Blocks_Faq",
]);

const HOWTO_BLOCKS = new Set([
  "Page_Gqlblocks_Blocks_HowTo",
  "GqlService_Gqlblocks_Blocks_HowTo",
]);

type AnyBlock = { fieldGroupName: string };

export function buildBlockSchemas(
  blocks: readonly AnyBlock[] | null | undefined,
  canonical: string
): { id: string; json: WithContext<Thing> }[] {
  if (!blocks?.length) return [];

  const schemas: { id: string; json: WithContext<Thing> }[] = [];

  const faqBlocks = blocks.filter((block) =>
    FAQ_BLOCKS.has(block.fieldGroupName)
  ) as unknown as FAQData;

  if (faqBlocks.length > 0) {
    const faq = buildFAQSchema(faqBlocks, canonical);
    // Only emit FAQPage when at least one question/answer pair survived.
    if (Array.isArray(faq.mainEntity) && faq.mainEntity.length > 0) {
      schemas.push({ id: "faq-schema", json: faq });
    }
  }

  blocks
    .filter((block) => HOWTO_BLOCKS.has(block.fieldGroupName))
    .forEach((block, index) => {
      const howTo = buildHowToSchema(block as unknown as HowToData, canonical);
      if (howTo) {
        schemas.push({ id: `howto-schema-${index + 1}`, json: howTo });
      }
    });

  return schemas;
}
