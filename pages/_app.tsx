import WP from "@lib/wp/wp";
import Layout from "@modules/layout/components/Layout";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect, useState } from "react";
import CookieConsent, {
  Cookies,
  getCookieConsentValue,
} from "react-cookie-consent";
import * as ReactDOMServer from "react-dom/server";
import * as ReactGA from "react-ga";
import * as gtag from "../lib/gtag";
import { GTM_ID, pageview } from "../lib/gtm";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const [consent, setConsent] = useState(false || true);

  const completeRoute = router.asPath;

  useEffect(() => {
    if (consent) {
      const handleRouteChange = (url: any) => {
        gtag.pageview(url);
      };

      router.events.on("routeChangeComplete", handleRouteChange);
      router.events.on("hashChangeComplete", handleRouteChange);
      return () => {
        router.events.off("routeChangeComplete", handleRouteChange);
        router.events.off("hashChangeComplete", handleRouteChange);
      };
    } else {
      console.log("no tracking");
    }
  }, [router.events]);

  useEffect(() => {
    router.events.on("routeChangeComplete", pageview);
    return () => {
      router.events.off("routeChangeComplete", pageview);
    };
  }, [router.events]);

  const handleAcceptCookie = () => {
    if (process.env.NEXT_PUBLIC_GA_ID) {
      setConsent(true);
    }
  };

  const handleDeclineCookie = () => {
    Cookies.remove("_ga");
    Cookies.remove("_gat");
    Cookies.remove("_gid");
    setConsent(false);
  };

  useEffect(() => {
    // used for removing potential wbraid query parameters
    // if (router.asPath.includes('wbraid')) router.replace('/', undefined, { shallow: true });

    const isConsent = getCookieConsentValue();
    if (isConsent === "true") {
      handleAcceptCookie();
    }
  }, []);
  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      {consent && (
        <>
          <link
            href={`https://www.googletagmanager.com/gtm.js?id=${gtag.GA_TRACKING_ID}`}
            rel="preload"
            as="script"
          ></link>

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
      )}

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
          pageProps?.data?.gqlService?.gqlHeroFields?.introduktionstext
        }
        seoPage={pageProps?.page || pageProps?.data?.gqlService}
        completeRoute={completeRoute}
      >
        <Component {...pageProps} />
      </Layout>
      <CookieConsent
        enableDeclineButton
        onAccept={handleAcceptCookie}
        onDecline={() => handleDeclineCookie}
        expires={7}
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </>
  );
}

export default MyApp;
