import { getPage } from "@lib/data/page";
import { webPageSchema } from "@lib/seo/schema";
import { cn, generatePageMetadata } from "@lib/utils";
import Blocks from "components/flexible-content/block";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "components/JsonLd";
import Link from "next/link";
import { buttonVariants } from "@components/ui/button";

export async function generateMetadata(
  {},
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = await getPage("/akut-hjalp");
  const canonical = "https://www.spoltec.se/akut-hjalp";
  return generatePageMetadata(
    page,
    parent,
    canonical,
    "Akut hjälp - Spoltec",
    "Hjälplinje för dig som är i behov av akut hjälp med avloppsproblem. Ring 040-47 40 12 för omedelbar hjälp."
  );
}

export default async function AkutHjalpPage() {
  const page = await getPage("/akut-hjalp");

  if (!page) {
    notFound();
  }

  const canonical = "https://www.spoltec.se/akut-hjalp";
  const schema = webPageSchema(page, "WebPage", canonical);

  return (
    <>
      <JsonLd json={schema} id={"akut-hjalp-page"} />
      <main key={page.title}>
        <div className="contain-outer ">
          <div className="bg-section">
            <div className="text-center contain">
              <h1>Akut hjälp</h1>
              <p className="">
                Hjälplinje för dig som är i behov av akut hjälp.
              </p>
              <Link
                href="tel:040474012"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "xl" })
                )}
                aria-label="Ring 040-47 40 12 för akut hjälp med avloppsproblem"
              >
                040-47 40 12
              </Link>
              <p className="mt-3">Klicka på knappen för att ringa.</p>
            </div>
          </div>
        </div>

        <Blocks blocks={page?.gqlBlocks?.blocks || []} />
      </main>
    </>
  );
}
