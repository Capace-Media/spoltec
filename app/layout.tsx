import "../styles/globals.css";

import { Chivo } from "next/font/google";
import Nav from "components/header/nav";
import Footer from "components/footer";
import { GoogleTagManager } from "@next/third-parties/google";
import Providers from "./providers";
import JsonLd from "components/JsonLd";
import { orgSchema } from "@lib/seo/schema";
import logo from "../public/images/spoltec-logo-new.png";
import type { Metadata } from "next";

const chivo = Chivo({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap", // This helps with render blocking
  preload: true, // Preload the font
  fallback: ["Arial", "sans-serif"], // Add fallback
  adjustFontFallback: true, // Optimize layout shift
});

export const metadata: Metadata = {
  title: {
    default: "Spoltec funktionssäkrar ert avloppssystem",
    template: "%s",
  },
  description:
    "Professionell hjälp med avloppsproblem i hela Sverige. Spoltec utför spolning, reparationer och underhåll av avloppssystem för hem och företag.",

  // Add missing SEO metadata
  metadataBase: new URL("https://www.spoltec.se"),
  alternates: {
    canonical: "/",
  },

  // Add resource hints through metadata
  other: {
    // DNS prefetch
    "dns-prefetch":
      "https://fonts.googleapis.com https://www.googletagmanager.com https://consent.cookiebot.eu",
    // Preconnect
    preconnect: "https://fonts.gstatic.com https://media.spoltec.se",
  },

  // Add Open Graph for better social sharing
  openGraph: {
    type: "website",
    locale: "sv_SE",
    url: "https://www.spoltec.se",
    siteName: "Spoltec",
    title: "Spoltec funktionssäkrar ert avloppssystem",
    description:
      "Professionell hjälp med avloppsproblem i hela Sverige. Spoltec utför spolning, reparationer och underhåll av avloppssystem för hem och företag.",
    images: [
      {
        url: "/images/spoltec-logo-new.png",
        width: 1200,
        height: 630,
        alt: "Spoltec - Avloppstjänster i Sverige",
      },
    ],
  },

  // Add Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@spoltec", // Add if you have Twitter
    title: "Spoltec funktionssäkrar ert avloppssystem",
    description: "Professionell hjälp med avloppsproblem i hela Sverige.",
    images: ["/images/spoltec-logo-new.png"],
  },

  // Add missing keywords (but don't overdo it)
  keywords: [
    "avlopp",
    "spolning",
    "relining",
    "rörinspektion",
    "kvicksilversanering",
    "oljeavskiljare",
    "avloppsproblem",
    "avloppstjänster Sverige",
    "Spoltec",
  ],

  authors: [{ name: "Spoltec Södra AB" }],
  creator: "Spoltec Södra AB",
  publisher: "Spoltec Södra AB",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    title: "Spoltec.se",
  },
  verification: {
    google: "7Y3kGTLDtFMwKc8UwJusW3-UKm6PB1fhMglOi5UVwwI",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const org = orgSchema({
    name: "Spoltec Södra AB",
    legalName: "Spoltec Södra AB",
    alternateName: "Spoltec",
    description:
      "Spoltec Södra AB är ett svenskt företag grundat 1991 som erbjuder tjänster inom relining, avloppsspolning, kvicksilversanering, rörinspektion med filmning, oljeavskiljarrengöring, fettavskiljare, provtagning och förebyggande underhåll av avloppssystem.",
    telephone: "+46 40 47 40 12",
    email: "info@spoltec.se",
    foundingDate: "1991-01-01",
    url: "https://www.spoltec.se",
    logoUrl: `https://www.spoltec.se${logo.src}`,
    sameAs: [
      "https://www.linkedin.com/company/spoltec-södra-ab/",
      "https://www.facebook.com/spoltec",
    ],
    address: {
      streetAddress: "Grävmaskinsvägen 2",
      postalCode: "241 38",
      addressLocality: "Eslöv",
      addressRegion: "Skåne län",
      addressCountry: "SE",
    },
  });
  return (
    <html lang="sv">
      <GoogleTagManager
        gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID as string}
      />
      <body className={chivo.className}>
        <Nav />
        <JsonLd json={org} id="org-schema" />
        <Providers>{children}</Providers>

        <Footer />
      </body>
    </html>
  );
}
