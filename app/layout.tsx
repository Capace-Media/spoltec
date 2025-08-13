import "../styles/global.scss";
import "../styles/globals.css";

import { Chivo } from "next/font/google";
import Nav from "components/header/nav";
import Footer from "components/footer";
import { GoogleTagManager } from "@next/third-parties/google";
import Providers from "./providers";
import JsonLd from "components/JsonLd";
import { orgSchema } from "@lib/seo/schema";
import logo from "../public/images/spoltec-logo-new.png";

const chivo = Chivo({ subsets: ["latin"], weight: ["400", "700", "900"] });

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
