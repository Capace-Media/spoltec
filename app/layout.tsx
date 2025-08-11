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
    name: "Spoltec",
    legalName: "Spoltec södra ab",
    alternateName: "Spoltec",
    description:
      "Spoltec södra ab är ett svenskt företag som erbjuder tjänster som kanaltätning, kvicksilversanering, relining, rörinspektion med filmning, oljeavskiljare och avloppsspolning.",
    telephone: "+46 70 123 45 67",
    email: "info@spoltec.se",
    foundingDate: "1990-01-01",
    url: "https://www.spoltec.se",
    logoUrl: `https://www.spoltec.se${logo.src}`,
    sameAs: [
      "https://www.linkedin.com/company/spoltec-södra-ab/",
      "https://www.facebook.com/spoltec",
    ],
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
