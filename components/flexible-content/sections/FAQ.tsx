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
        <div className="pb-4 max-w-3xl">
          <h2 id="faq-heading">{intro.title}</h2>
          {intro.text && (
            <p className="text-balance text-muted-foreground md:text-lg">
              {intro.text}
            </p>
          )}
        </div>

        <Accordion
          type="single"
          collapsible
          className="max-w-3xl space-y-3"
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
                className="flex flex-col gap-3 text-balance md:pr-6"
                itemScope
                itemType="https://schema.org/Answer"
                itemProp="acceptedAnswer"
              >
                <div
                  itemProp="text"
                  className="parsed text-muted-foreground leading-relaxed"
                >
                  {handleParse(item.a)}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
