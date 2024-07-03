import Layout from "@modules/layout/components/Layout";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect, useState } from "react";

import * as gtag from "../lib/gtag";
import { GTM_ID, pageview } from "../lib/gtm";
import "../styles/global.scss";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const completeRoute = router.asPath;

  useEffect(() => {
    const handleRouteChange = (url: any) => {
      gtag.pageview(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("hashChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("hashChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    router.events.on("routeChangeComplete", pageview);
    return () => {
      router.events.off("routeChangeComplete", pageview);
    };
  }, [router.events]);

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}

      <>
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag() {
                  dataLayer.push(arguments);
                }
                gtag('js', new Date());
                gtag('config', '${gtag.GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
          }}
        />
      </>

      {/* Google Tag Manager - Global base code */}
      {process.env.NEXT_PUBLIC_GA_ID && (
        <>
          <Script
            id="gtag-base"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer', '${GTM_ID}');
              `,
            }}
          />
          <link
            href={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
            rel="preload"
            as="script"
          ></link>
        </>
      )}

      <Layout
        description={
          pageProps?.page?.gqlHeroFields?.introduktionstext ||
          pageProps?.data?.gqlService?.gqlHeroFields?.introduktionstext ||
          pageProps?.post?.gqlHeroFields?.introduktionstext
        }
        seoPage={
          pageProps?.page || pageProps?.data?.gqlService || pageProps?.post
        }
        completeRoute={completeRoute}
      >
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
