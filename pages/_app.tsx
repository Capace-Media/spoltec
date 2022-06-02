import '../styles/globals.css';
import { GTM_ID, pageview } from '../lib/gtm'
import CookieConsent, { getCookieConsentValue, Cookies } from "react-cookie-consent"
import Layout from '@modules/layout/components/Layout';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect } from 'react';
import * as gtag from '../lib/gtag'
import * as ReactGA from "react-ga";

function MyApp({ Component, pageProps }) {
  const router = useRouter()

   useEffect(() => {
     const handleRouteChange = (url:any) => {
       gtag.pageview(url)
     }

     router.events.on('routeChangeComplete', handleRouteChange)
     router.events.on('hashChangeComplete', handleRouteChange)
     return () => {
       router.events.off('routeChangeComplete', handleRouteChange)
       router.events.off('hashChangeComplete', handleRouteChange)
     }

   }, [router.events])

  useEffect(() => {
    router.events.on('routeChangeComplete', pageview)
    return () => {
      router.events.off('routeChangeComplete', pageview)
    }
  }, [router.events])

  const handleAcceptCookie = () => {
    if(process.env.REACT_APP_GA_ID){
      initGA(process.env.REACT_APP_GA_ID);
    }
  }

  const handleDeclineCookie = () => {
    //remove google analytics cookies
    Cookies.remove("_ga");
    Cookies.remove("_gat");
    Cookies.remove("_gid");
  };

  useEffect(() => {
    const isConsent = getCookieConsentValue();
    if (isConsent === "true") {
      handleAcceptCookie();
    }
  }, []);
  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script 
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script 
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      {/* Google Tag Manager - Global base code */}
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
      <Layout description={pageProps?.page?.gqlHeroFields?.introduktionstext || pageProps?.data?.gqlService?.gqlHeroFields?.introduktionstext} seoPage={pageProps?.page || pageProps?.data?.gqlService}>
        <Component {...pageProps} />
      </Layout>
      <CookieConsent 
        enableDeclineButton
        onAccept={handleAcceptCookie}
        onDecline={handleDeclineCookie}
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </>
  );
}



export const initGA = (id: string) => {
  if (process.env.NODE_ENV === "production") {
    ReactGA.initialize(id);
  }
};

export default MyApp;
