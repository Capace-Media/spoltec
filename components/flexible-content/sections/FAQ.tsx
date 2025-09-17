import type { ServiceFaqBlock } from "@lib/types/service";
import type { FaqBlock } from "@lib/types/page";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/ui/accordion";
import handleParse from "@lib/utils/parse";
import Link from "next/link";
import { buttonVariants } from "@components/ui/button";
import { cn } from "@lib/utils";
import { stripHtml } from "@lib/seo/schema/buildFAQSchema";

// Helper function to check if a path is a full URL or a URI
const isFullUrl = (path: string): boolean => {
  try {
    new URL(path);
    return true;
  } catch {
    return false;
  }
};

// Helper function to render CTA button
const renderCtaButton = (ctaButton: { text: string; path: string }) => {
  const buttonClasses = cn(
    buttonVariants({ variant: "secondary", size: "lg" })
  );

  if (isFullUrl(ctaButton.path)) {
    return (
      <a
        href={ctaButton.path}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses}
      >
        {ctaButton.text}
      </a>
    );
  }

  return (
    <Link href={ctaButton.path} className={buttonClasses}>
      {ctaButton.text}
    </Link>
  );
};

export default function FAQ({ data }: { data: ServiceFaqBlock | FaqBlock }) {
  const { intro, faqs } = data;

  if (!intro?.title || !faqs?.length) return null;

  return (
    <section
      className="contain-outer section"
      role="region"
      aria-labelledby="faq-heading"
    >
      <div className="">
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
          {faqs
            .filter((item) => item.q && item.a) // Filter out items with empty questions or answers
            .map((item, index) => {
              // Create a more unique key based on question content
              const questionSlug = item.q
                ?.replace(/[^a-zA-Z0-9\s]/g, "")
                .replace(/\s+/g, "-")
                .toLowerCase()
                .slice(0, 30);
              const uniqueKey = `faq-${index}-${questionSlug}`;

              return (
                <AccordionItem
                  key={uniqueKey}
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
                    <span itemProp="text" className="sr-only">
                      {stripHtml(item.a)}
                    </span>
                    <div className="parsed text-muted-foreground leading-relaxed">
                      {handleParse(item.a)}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
        </Accordion>
        {intro?.caption && (
          <div className="max-w-3xl text-muted-foreground space-y-2 pt-4">
            {intro.caption.text && (
              <div className="text-balance text-sm">
                {handleParse(intro.caption.text)}
              </div>
            )}

            {intro.caption.ctaButton?.text && intro.caption.ctaButton?.path && (
              <div className="flex">
                {renderCtaButton(intro.caption.ctaButton)}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
