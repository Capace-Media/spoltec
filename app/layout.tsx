import "../styles/global.scss";
import "../styles/globals.css";

import { Chivo } from "next/font/google";
import Nav from "components/header/nav";
import Footer from "components/footer";

const chivo = Chivo({ subsets: ["latin"], weight: ["400", "700", "900"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
      <body className={chivo.className}>
        <Nav />
        {/* Layout UI */}
        {children}

        {/* <Footer /> */}
        <Footer />
      </body>
    </html>
  );
}
