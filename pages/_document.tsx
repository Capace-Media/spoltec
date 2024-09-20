import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="sv">
      <Head></Head>
      <body>
        <Main />
        <NextScript />
        <Script
          src="https://app.weply.chat/widget/b5d42d3c9f06861839d9d189a3ae3db2"
          async
          strategy="beforeInteractive"
        />
      </body>
    </Html>
  );
}
