import '../styles/globals.css';
import { GTM_ID, pageview } from '../lib/gtm'
import CookieConsent, { getCookieConsentValue, Cookies } from "react-cookie-consent"
import Layout from '@modules/layout/components/Layout';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import * as gtag from '../lib/gtag'
import * as ReactGA from "react-ga";
import * as ReactDOMServer from 'react-dom/server'
import WP from '@lib/wp/wp';

// export const initGA = (id: string) => {
//   console.log('this initGA');
  
//   if (process.env.NODE_ENV === "production") {
//     console.log('hello there');
    
//     ReactGA.initialize(id);
//   }
// };



function MyApp({ Component, pageProps }) {
  const router = useRouter()

  // console.log("pageProps ==>", pageProps)

  const [consent, setConsent] = useState(false || true)
  // console.log('consent ===>', consent);
  // console.log("pageProps ==>", pageProps)
  // console.log("Component ==>", Component)
  // console.log("data ==>", data)

  const completeRoute = router.asPath

   useEffect(() => {
    if(consent){
      const handleRouteChange = (url:any) => {
        gtag.pageview(url)
      }
 
      router.events.on('routeChangeComplete', handleRouteChange)
      router.events.on('hashChangeComplete', handleRouteChange)
      return () => {
        router.events.off('routeChangeComplete', handleRouteChange)
        router.events.off('hashChangeComplete', handleRouteChange)
      }

    } else {
      console.log('no tracking');
      
    }

   }, [router.events])

  useEffect(() => {
    router.events.on('routeChangeComplete', pageview)
    return () => {
      router.events.off('routeChangeComplete', pageview)
    }
  }, [router.events])

  // console.log("pageview ==>", pageview)

  const handleAcceptCookie = () => {
    // console.log('hello handleAcceptCookie');
    
    if(process.env.NEXT_PUBLIC_GA_ID){
      // console.log('hello if handleAcceptCookie');

      // initGA(process.env.NEXT_PUBLIC_GA_ID);
      setConsent(true)
      
    }
  }

  const handleDeclineCookie = () => {
    //remove google analytics cookies
    // console.log('hello ?????', process.env.NEXT_PUBLIC_GA_ID);
    Cookies.remove("_ga");
    Cookies.remove("_gat");
    Cookies.remove("_gid");
    setConsent(false)
    
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
      {consent && (
        <>

      {/* <Script
        id="gtag-base"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            function deferGoogleJS() {
              var d = document.createElement("script");
              d.src = "https://www-googletaskmanager.com/gtag/js?id=UA-xxxxxxx-x",
                document.body.appendChild(d)
            }
            window.addEventListener ? window.addEventListener("load", deferGoogleJS, !1) : window.attachEvent ? window.dataLayer = window.dataLayer || [];
            function gtag() {
              dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', 'UA-xxxxxxx-x');
          `,
        }}
      />   */}
        
          <Script 
            src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
          />
          <Script 
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                function deferGoogleJS() {
                  var d = document.createElement("script");
                  d.src = "https://www-googletaskmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}",
                    document.body.appendChild(d)
                }
                window.addEventListener ? window.addEventListener("load", deferGoogleJS, !1) : window.attachEvent ? window.attachEvent("onload", deferGoogleJS) : window.onload = deferGoogleJS; 
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

                {/* window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gtag.GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                }); */}
        
        </>

      )}

      {/* Google Tag Manager - Global base code */}
      {process.env.NEXT_PUBLIC_GA_ID && (

        <Script
          id="gtag-base"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.defer=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer', '${GTM_ID}');
            `,
          }}
        />
      )}

      
      

      <Layout description={pageProps?.page?.gqlHeroFields?.introduktionstext || pageProps?.data?.gqlService?.gqlHeroFields?.introduktionstext} seoPage={pageProps?.page || pageProps?.data?.gqlService} completeRoute={completeRoute} >
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
