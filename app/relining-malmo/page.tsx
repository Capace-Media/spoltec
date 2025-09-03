import Hero from "components/header/hero";
import Blocks from "components/flexible-content/block";
import { notFound } from "next/navigation";
import { getPage } from "@lib/data/page";

import { generatePageMetadata } from "@lib/utils";
import type { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  props: {},
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = await getPage("relining-malmo");

  const canonical = `https://www.spoltec.se/relining-malmo`;
  return generatePageMetadata(page, parent, canonical);
}

export default async function Page() {
  const page = await getPage("relining-malmo");

  if (!page) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Relining Malmö – Spoltec Södra AB",
    serviceType: "Relining",
    provider: {
      "@id": "https://www.spoltec.se/#organization", // reference the org schema in layout
    },
    areaServed: {
      "@type": "Place",
      name: "Malmö",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Malmö",
        addressRegion: "Skåne",
        addressCountry: "SE",
      },
    },
    description:
      "Vi löser dina avloppsproblem med hjälp av relining i Malmö. Få professionell hjälp med relining i Malmö – vi har expertis inom avloppsrör och avloppsrenovering. Oavsett om du äger villa, är medlem i en bostadsrättsförening eller representerar ett fastighetsbolag, skräddarsyr vi lösningar för dina behov. Kontakta oss för pålitlig och effektiv service.",
    url: "https://www.spoltec.se/relining-malmo",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Relining-tjänster i Malmö",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Relining för BRF och företag i Malmö",
            description:
              "Skräddarsydda relininglösningar för bostadsrättsföreningar, fastighetsbolag och företag i Malmö.",
            areaServed: {
              "@type": "City",
              name: "Malmö",
            },
          },
          priceCurrency: "SEK",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            priceType: "Estimates",
          },
          url: "https://www.spoltec.se/relining-malmo",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Relining för villor och privatpersoner i Malmö",
            description:
              "Effektiv och hållbar relining av avloppsrör för villaägare och privatpersoner i Malmö.",
            areaServed: {
              "@type": "City",
              name: "Malmö",
            },
          },
          priceCurrency: "SEK",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            priceType: "Estimates",
          },
          url: "https://www.spoltec.se/relining-malmo",
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <main key={page.title}>
        <Hero
          title={page?.title}
          subtitle={page?.gqlHeroFields?.underrubrik || ""}
          text={page?.gqlHeroFields?.introduktionstext || ""}
          image={page?.gqlHeroFields?.bild?.mediaItemUrl}
        />
        <div id="content" className="w-full h-10 md:h-0"></div>
        <div>
          <Blocks blocks={page?.gqlBlocks?.blocks || []} />
        </div>
      </main>
    </>
  );
}
