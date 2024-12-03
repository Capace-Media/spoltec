import Layout from "@modules/layout/components/Layout";
import { GoogleTagManager } from "@next/third-parties/google";
import { useRouter } from "next/router";
import Script from "next/script";
import "../styles/global.scss";
import "../styles/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const [queryClient] = useState(() => new QueryClient());
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
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </Layout>

      <GoogleTagManager
        gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID as string}
      />
    </>
  );
}

export default MyApp;
