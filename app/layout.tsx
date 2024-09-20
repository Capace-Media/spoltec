import Footer from "@modules/layout/components/Footer";
import Header from "@modules/layout/components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
      <body>
        <Header />
        {/* Layout UI */}
        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
