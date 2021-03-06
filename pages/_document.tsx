import { Head, Html, Main, NextScript } from 'next/document';
import { GTM_ID } from '../lib/gtm'
export default function Document() {
  return (
    <Html lang='sv'>
      <Head>

      </Head>
      <body>
        {/* Google Tag Manager (noscript)  */}
        <noscript>
          <iframe 
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}