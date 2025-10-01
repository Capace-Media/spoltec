import { getPage } from "@lib/data/page";
import Blocks from "components/flexible-content/block";
import { generatePageMetadata } from "@lib/utils";
import type { Metadata, ResolvingMetadata } from "next";
import Hero from "components/header/hero";
import { notFound } from "next/navigation";
import JsonLd from "@components/JsonLd";
import { buildFAQSchema, type FAQData } from "@lib/seo/schema/buildFAQSchema";
import Link from "next/link";

export async function generateMetadata(
  {},
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = await getPage("/faq");
  const canonical = "https://www.spoltec.se/faq";
  return generatePageMetadata(
    page,
    parent,
    canonical,
    "Frågor och svar om avloppsservice",
    "Läs mer om avloppsservice och våra tjänster."
  );
}

const FaqPage = async () => {
  const page = await getPage("/faq");

  if (!page) {
    notFound();
  }

  const canonical = "https://www.spoltec.se/faq";
  const faqData = page?.gqlBlocks?.blocks?.filter(
    (block) => block.fieldGroupName === "Page_Gqlblocks_Blocks_Faq"
  ) as FAQData;

  const schema = buildFAQSchema(faqData, canonical);

  return (
    <>
      <JsonLd json={schema} id={"faq-page"} />

      <main key={`faq`}>
        <Hero
          title={page?.title || "Frågor och svar om avloppsservice"}
          subtitle={page?.gqlHeroFields?.underrubrik || ""}
          text={page?.gqlHeroFields?.introduktionstext || ""}
          image={page?.gqlHeroFields?.bild?.mediaItemUrl}
          width={page?.gqlHeroFields?.bild?.mediaDetails?.width}
          height={page?.gqlHeroFields?.bild?.mediaDetails?.height}
        />

        <Blocks blocks={page?.gqlBlocks?.blocks || []} />

        {/* CTA Section */}
        <section className="py-12 md:py-16">
          <div className="contain">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Hittade du inte svaret du sökte?
              </h2>
              <p className="text-lg mb-6 text-gray-600">
                Kontakta oss så hjälper vi dig med dina frågor om
                avloppsservice.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="mailto:info@spoltec.se"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  aria-label="Kontakta oss för mer information"
                >
                  Kontakta oss
                </a>
                <a
                  href="tel:040-47-40-12"
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  aria-label="Ring oss på 040-47 40 12"
                >
                  📞 040-47 40 12
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default FaqPage;
