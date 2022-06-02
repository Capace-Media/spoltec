import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';
export default function Document() {
  return (
    <Html lang='sv'>
      <Head>
        {/* Google Tag Manager  */}
      <Script 
        strategy='afterInteractive' 
        dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM}');`}}
      >
      </Script>

      {/* Global site tag (gtag.js) - Google Analytics */}
      <script 
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}  
      />
      <script 
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
            page_path: window.location.pathname,
          });
          `,
        }}
      />    
      </Head>
      <body>
        {/* Google Tag Manager (noscript)  */}
        <noscript 
          dangerouslySetInnerHTML={{
             __html: `
             <iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM}" height="0" width="0" style="display:none;visibility:hidden"></iframe>
          `}}
        ></noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}