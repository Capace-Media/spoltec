import { getPage } from "@lib/data/page";
import { generatePageMetadata } from "@lib/utils";
import { Metadata, ResolvingMetadata } from "next";
import Script from "next/script";
import LocalLinks from "components/local-links";
import Blocks from "components/flexible-content/block";
import MainHero from "components/header/main-hero";

export async function generateMetadata(
  {},
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = await getPage("/");
  return generatePageMetadata(page, parent);
}

// Generate JSON-LD structured data for homepage
function generateHomepageStructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_MY_WEBSITE || "https://spoltec.se";

  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "Spoltec",
      legalName: "Spoltec AB",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/images/spoltec-logo-new.png`,
        width: 300,
        height: 100,
      },
      image: `${baseUrl}/images/spoltec-logo-new.png`,
      description:
        "Specialist på avlopp, spolning, rörinspektion och relining. Vi hjälper dig med alla typer av avloppsproblem och underhåll.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Grävmaskinsvägen 2",
        postalCode: "241 38",
        addressLocality: "Eslöv",
        addressCountry: "SE",
        addressRegion: "Sverige",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: "+46 (0)40 474 012",
        availableLanguage: ["Swedish"],
        areaServed: "SE",
      },
      sameAs: [
        // Add social media URLs if available
        // "https://www.facebook.com/spoltec",
        // "https://www.linkedin.com/company/spoltec"
      ],
      serviceArea: {
        "@type": "Country",
        name: "Sweden",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Spoltec Tjänster",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Kanaltätning",
              description:
                "Genomför energibesparing och börja spara pengar från dag ett. Över 100,000 meter kanaltätning med vår metod har installerats i Sverige, Finl...",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Kvicksilversanering",
              description:
                "Kvicksilver är en förorening som kan skada människor och miljön, men det går att bli av med det. Om ditt företag eller din egendom har skada...",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Relining",
              description:
                "Relining från Spoltec som är en bekväm och miljövänlig teknik för att återställa äldre och skadade avloppsrör utan grävarbete. Vårt fokus på...",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Rörinspektion med filmning",
              description:
                "Är ni nyfikna på vilket skick era ledningar befinner sig i? En rörinspektion är ett smart sätt att upptäcka skador i tid och förebygga framti...",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Oljeavskiljare",
              description:
                "En oljeavskiljare är en anläggning vars syfte är att separera övriga vätskor från avloppsvattnet och därefter leda vattnet vidare till ett r...",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Provtagning av vatten",
              description:
                "Det finns lagstadgade krav kring vilken kvalité ditt vatten måste hålla. Genom att utföra regelbundna kontroller säkerställer du att ditt va...",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Avloppsspolning",
              description:
                "Med en avloppsspolning rengörs rören med vatten under högtryck. Detta är något man kan göra när man får att akut stopp eller för att underhå...",
            },
          },
        ],
      },
      knowsAbout: [
        "Avlopp",
        "Spolning",
        "Rörinspektion",
        "Relining",
        "Kanaltätning",
        "Avloppsproblem",
        "Underhåll",
        "Energibesparing",
      ],
    },
    // WebSite Schema
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      url: baseUrl,
      name: "Spoltec - Specialist på Avlopp och Spolning",
      description:
        "Sveriges ledande företag inom avlopp, spolning, rörinspektion och relining. Kontakta oss för professionell hjälp med ditt avloppssystem.",
      inLanguage: "sv-SE",
    },
  ];
}

export default async function Home() {
  const page = await getPage("/");
  const structuredData = generateHomepageStructuredData();

  return (
    <>
      {/* Homepage Structured Data */}
      <Script
        id="homepage-structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <MainHero />
      <Blocks blocks={page?.gqlBlocks?.blocks || []} />
      <LocalLinks />
    </>
  );
}
