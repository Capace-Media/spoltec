import { getPage } from "@lib/data/page";
import { webPageSchema } from "@lib/seo/schema";
import { generatePageMetadata } from "@lib/utils";
import Blocks from "components/flexible-content/block";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "components/JsonLd";

export async function generateMetadata(
  {},
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = await getPage("/akut-hjalp");
  return generatePageMetadata(
    page,
    parent,
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
        <div className="contain-outer mt-5">
          <div className="bg-section">
            <div className="mt-24 text-center contain">
              <h1>Akut hjälp</h1>
              <p className="mt-3">
                Hjälplinje för dig som är i behov av akut hjälp.
              </p>
              <a
                href="tel:040474012"
                className="inline-block px-10 py-4 mt-10 text-3xl font-bold text-white rounded-sm bg-brand-orange"
                aria-label="Ring 040-47 40 12 för akut hjälp med avloppsproblem"
              >
                040-47 40 12
              </a>
              <p className="mt-3">Klicka på knappen för att ringa.</p>
            </div>
          </div>
        </div>

        <Blocks blocks={page?.gqlBlocks?.blocks || []} />
      </main>
    </>
  );
}
