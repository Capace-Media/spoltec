import type { FAQPage, WithContext, Question } from "schema-dts";

export type FAQData = {
  fieldGroupName: string;
  intro: {
    title: string;
    text: string | null;
  };
  faqs:
    | {
        q: string;
        a: string;
      }[]
    | null;
}[];

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/\n\s*/g, " ") // Replace newlines with spaces
    .trim();
}

export function buildFAQSchema(
  faqData: FAQData,
  canonical: string
): WithContext<FAQPage> {
  const questions: Question[] = faqData
    .filter((faqGroup) => faqGroup.faqs !== null)
    .map((faqGroup) =>
      faqGroup.faqs!.map((faq) => ({
        "@type": "Question" as const,
        name: faq.q,
        about: faqGroup.intro.title,
        acceptedAnswer: {
          "@type": "Answer" as const,
          text: stripHtml(faq.a), // Strip HTML from answers
        },
      }))
    )
    .flat();

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${canonical}#faq`,
    name:
      faqData.length > 1
        ? "Vanliga frågor"
        : faqData[0]?.intro.title || "Vanliga frågor",
    description: faqData[0]?.intro.text || "Vanliga frågor om våra tjänster",
    url: canonical,
    provider: {
      "@id": "https://www.spoltec.se/#organization",
    },
    mainEntity: questions,
  };
}
