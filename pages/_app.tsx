import Layout from "@modules/layout/components/Layout";
import { GoogleTagManager } from "@next/third-parties/google";
import { useRouter } from "next/router";
import Script from "next/script";
import "../styles/global.scss";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const completeRoute = router.asPath;

  return (
    <>
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

      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID} />
    </>
  );
}

export default MyApp;
