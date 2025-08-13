import { getPage } from "@lib/data/page";

import Blocks from "components/flexible-content/block";
import { Contact } from "components/flexible-content/sections";
import { generatePageMetadata } from "@lib/utils";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { webPageSchema } from "@lib/seo/schema";
import JsonLd from "components/JsonLd";

export async function generateMetadata(
  {},
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = await getPage("/kontakta-oss");
  return generatePageMetadata(
    page,
    parent,
    "Kontakta oss - Spoltec",
    "Kontakta oss för att få hjälp med dina avloppsproblem. Ring oss på 040-47 40 12."
  );
}

const KontaktaOssPage = async () => {
  const page = await getPage("/kontakta-oss");

  if (!page) {
    notFound();
  }

  const canonical = "https://www.spoltec.se/kontakta-oss";
  const schema = webPageSchema(page, "ContactPage", canonical);

  return (
    <>
      <JsonLd json={schema} id={"contact-page"} />
      <main key={`kontakta-oss`}>
        <div className="contain-outer mt-5">
          <div className="bg-section">
            <div className="mt-24 text-center contain">
              <h1>Kontakta oss</h1>
            </div>
          </div>
        </div>

        <div id="">
          <Contact />
          <Blocks blocks={page?.gqlBlocks?.blocks || []} />
        </div>
      </main>
    </>
  );
};

export default KontaktaOssPage;
