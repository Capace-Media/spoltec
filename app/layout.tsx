import Footer from "@modules/layout/components/Footer";
import Header from "@modules/layout/components/Header";
import "../styles/global.scss";
import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
      <body>
        {/* <Header /> */}
        {/* Layout UI */}
        {children}

        {/* <Footer /> */}
      </body>
    </html>
  );
}
