import type { ServiceLocalLandingPagesBlock } from "@lib/types/service";
import type { LocalLandingPagesBlock } from "@lib/types/page";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@components/ui/button";
import { cn } from "@lib/utils";

export default function LocalServiceLinks({
  data,
}: {
  data: ServiceLocalLandingPagesBlock | LocalLandingPagesBlock;
}) {
  if (!data.intro.rubrik || data.localLandingpages.length === 0) return null;
  const { intro, localLandingpages } = data;

  return (
    <section
      className=" border-t pt-10 contain-outer "
      aria-labelledby="local-links-heading"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <div className="">
        <h2
          id="local-links-heading"
          className="text-2xl md:text-3xl font-bold tracking-tight"
          itemProp="name"
        >
          {intro.rubrik}
        </h2>

        {intro.text && (
          <p
            className="pt-2 text-muted-foreground max-w-2xl"
            itemProp="description"
          >
            {intro.text}
          </p>
        )}

        <ul
          className="pt-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"
          itemProp="itemListElement"
        >
          {localLandingpages.map((c, index) => (
            <li
              key={c.slug}
              itemScope
              itemType="https://schema.org/ListItem"
              itemProp="item"
              className="w-full "
            >
              <meta itemProp="position" content={(index + 1).toString()} />
              <Link
                href={`/${c.slug}`}
                className={cn(
                  buttonVariants({ variant: "link", size: "lg" }),
                  "group w-full justify-start !pl-0"
                )}
                aria-label={`${c.title}`}
                itemProp="url"
              >
                <span itemProp="name">{c.title}</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
