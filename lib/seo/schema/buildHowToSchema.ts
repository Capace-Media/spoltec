import type { HowTo, HowToStep, WithContext } from "schema-dts";
import { stripHtml } from "./buildFAQSchema";

export type HowToData = {
  intro: {
    title: string | null;
    text: string | null;
  };
  listItem:
    | {
        title: string;
        text: string | null;
      }[]
    | null;
};

export function buildHowToSchema(
  data: HowToData,
  canonical: string
): WithContext<HowTo> | null {
  if (!data?.intro?.title || !data.listItem?.length) return null;

  const steps: HowToStep[] = data.listItem.map((item, index) => ({
    "@type": "HowToStep",
    position: index + 1,
    name: stripHtml(item.title),
    ...(item.text && { text: stripHtml(item.text) }),
    url: `${canonical}#steg-${index + 1}`,
  }));

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${canonical}#howto`,
    name: stripHtml(data.intro.title),
    ...(data.intro.text && { description: stripHtml(data.intro.text) }),
    inLanguage: "sv-SE",
    step: steps,
  };
}
