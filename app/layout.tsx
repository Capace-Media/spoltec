import Footer from "@modules/layout/components/Footer";
import Header from "@modules/layout/components/Header";
import "../styles/global.scss";
import "../styles/globals.css";

import { Chivo } from "next/font/google";

const chivo = Chivo({ subsets: ["latin"], weight: ["400", "700", "900"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
      <body className={chivo.className}>
        {/* <Header /> */}
        {/* Layout UI */}
        {children}

        {/* <Footer /> */}
      </body>
    </html>
  );
}
