import Header from "@/components/globals/layout/header";
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
        <Header />
        {/* Layout UI */}
        {children}

        {/* <Footer /> */}
      </body>
    </html>
  );
}
