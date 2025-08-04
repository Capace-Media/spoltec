import Blocks from "@common/components/Blocks";
import { getPage } from "@lib/data/page";
import { generatePageMetadata } from "@lib/utils";
import { Metadata, ResolvingMetadata } from "next";

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

  return (
    <div key="akut-hjalp">
      <div className="contain-outer">
        <div className="bg-section">
          <div className="mt-24 text-center contain">
            <h1>Akut hjälp</h1>
            <p className="mt-3">
              Hjälplinje för dig som är i behov av akut hjälp.
            </p>
            <a
              href="tel:040474012"
              className="inline-block px-10 py-4 mt-10 text-3xl font-bold text-white rounded-sm bg-brand-orange"
            >
              040-47 40 12
            </a>
            <p className="mt-3">Klicka på knappen för att ringa.</p>
          </div>
        </div>
      </div>
      <div id="content" className="w-full h-10 md:h-0"></div>

      <div>
        <Blocks blocks={page?.gqlBlocks?.blocks || []} />
      </div>
    </div>
  );
}
