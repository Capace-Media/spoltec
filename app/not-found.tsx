import Link from "next/link";
import type { Metadata } from "next";
import { cn } from "@lib/utils";
import { buttonVariants } from "components/ui/button";

export const metadata: Metadata = {
  title: "404 - Sidan hittades inte | Spoltec",
  description:
    "Sidan du letade efter kunde inte hittas. Kontakta Spoltec för hjälp med avloppsproblem eller navigera till våra tjänster och kunskapsbank.",
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "404 - Sidan hittades inte | Spoltec",
    description:
      "Sidan du letade efter kunde inte hittas. Kontakta Spoltec för hjälp med avloppsproblem eller navigera till våra tjänster och kunskapsbank.",
    type: "website",
    siteName: "Spoltec",
  },
  twitter: {
    card: "summary",
    title: "404 - Sidan hittades inte | Spoltec",
    description:
      "Sidan du letade efter kunde inte hittas. Kontakta Spoltec för hjälp med avloppsproblem eller navigera till våra tjänster och kunskapsbank.",
  },
};

export default function NotFound() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "404 - Sidan hittades inte",
    description:
      "404-felsida för Spoltec - Professionell hjälp med avloppsproblem",
    url: "https://www.spoltec.se/404",
    isPartOf: {
      "@type": "WebSite",
      name: "Spoltec",
      url: "https://www.spoltec.se",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Hem",
          item: "https://www.spoltec.se",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "404 - Sidan hittades inte",
        },
      ],
    },
    mainEntity: {
      "@type": "Organization",
      name: "Spoltec",
      telephone: "040-47 40 12",
      url: "https://www.spoltec.se",
      address: {
        "@type": "PostalAddress",
        addressCountry: "SE",
      },
      serviceArea: {
        "@type": "Country",
        name: "Sverige",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="contain-outer mt-5">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="contain">
          <ol className="flex items-center space-x-2 text-sm text-gray-600 mt-4">
            <li>
              <Link href="/" className="hover:text-brand-blue">
                Hem
              </Link>
            </li>
            <li className="before:content-['/'] before:mx-2">
              <span aria-current="page">404 - Sidan hittades inte</span>
            </li>
          </ol>
        </nav>

        <div className="bg-section">
          <div className="mt-24 text-center contain">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              404 - Sidan hittades inte
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Tyvärr kunde vi inte hitta sidan du letade efter. Den kan ha
              flyttats, tagits bort eller så skrev du in fel webbadress.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "lg" })
                )}
                title="Gå till Spoltecs startsida"
              >
                Gå till startsidan
              </Link>
              <Link
                href="/kontakta-oss"
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" })
                )}
                title="Kontakta Spoltec för hjälp"
              >
                Kontakta oss
              </Link>
            </div>
          </div>
        </div>

        <div className="contain section">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">
              Behöver du hjälp med avloppsproblem?
            </h2>
            <p className="text-gray-600 mb-6">
              Spoltec hjälper dig med alla typer av avloppsproblem i hela
              Sverige. Om du inte hittar det du söker kan du:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="text-left">
                <h3 className="font-semibold mb-3 text-brand-blue">
                  Navigera på webbplatsen:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-brand-orange mr-2 font-bold">•</span>
                    <span>
                      Besöka vår{" "}
                      <Link
                        href="/"
                        className="text-brand-blue hover:underline font-medium"
                        title="Spoltecs startsida"
                      >
                        startsida
                      </Link>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-orange mr-2 font-bold">•</span>
                    <span>
                      Se våra{" "}
                      <Link
                        href="/tjanster"
                        className="text-brand-blue hover:underline font-medium"
                        title="Spoltecs tjänster för avloppsproblem"
                      >
                        tjänster för avloppsproblem
                      </Link>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-orange mr-2 font-bold">•</span>
                    <span>
                      Läsa vår{" "}
                      <Link
                        href="/kunskapsbank"
                        className="text-brand-blue hover:underline font-medium"
                        title="Kunskapsbank om avloppssystem"
                      >
                        kunskapsbank om avloppssystem
                      </Link>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-orange mr-2 font-bold">•</span>
                    <span>
                      Få{" "}
                      <Link
                        href="/akut-hjalp"
                        className="text-brand-blue hover:underline font-medium"
                        title="Akut hjälp med avloppsproblem"
                      >
                        akut hjälp med avloppsproblem
                      </Link>
                    </span>
                  </li>
                </ul>
              </div>

              <div className="text-left">
                <h3 className="font-semibold mb-3 text-brand-blue">
                  Kontakta oss direkt:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-brand-orange mr-2 font-bold">•</span>
                    <div>
                      <span className="block">Ring oss direkt på</span>
                      <a
                        href="tel:0404740012"
                        className="text-brand-blue hover:underline font-bold text-lg"
                        title="Ring Spoltec för hjälp med avloppsproblem"
                      >
                        040 - 47 40 12
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-orange mr-2 font-bold">•</span>
                    <span>
                      Eller{" "}
                      <Link
                        href="/kontakta-oss"
                        className="text-brand-blue hover:underline font-medium"
                        title="Kontaktformulär för Spoltec"
                      >
                        fyll i vårt kontaktformulär
                      </Link>
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-2 text-brand-blue">Om Spoltec</h3>
              <p className="text-sm text-gray-600">
                Vi är specialister på avloppsproblem och erbjuder professionell
                hjälp med spolning, reparationer och underhåll av avloppssystem
                för hem och företag i hela Sverige.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
