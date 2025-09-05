"use client";

import type { ServiceFaqBlock } from "@lib/types/service";
import type { FaqBlock } from "@lib/types/page";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/ui/accordion";
import handleParse from "@lib/utils/parse";

export default function FAQ({ data }: { data: ServiceFaqBlock | FaqBlock }) {
  const { intro, faqs } = data;

  if (!intro.title || !faqs || faqs.length === 0) return null;

  return (
    <section
      className="contain-outer section"
      role="region"
      aria-labelledby="faq-heading"
    >
      <div className="contain">
        <div className="pb-4">
          <h2 id="faq-heading">{intro.title}</h2>
          {intro.text && <p>{intro.text}</p>}
        </div>
        <div className="space-y-4">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-1"
          >
            {faqs.map((item, index) => (
              <AccordionItem
                key={`faq-${index}`}
                value={`item-${index + 1}`}
                itemScope
                itemType="https://schema.org/Question"
                id={`faq-question-${index + 1}`}
              >
                <AccordionTrigger itemProp="name" className="text-left">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent
                  className="flex flex-col gap-4 text-balance"
                  itemScope
                  itemType="https://schema.org/Answer"
                  itemProp="acceptedAnswer"
                >
                  <div itemProp="text">{handleParse(item.a)}</div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
