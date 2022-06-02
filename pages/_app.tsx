import '../styles/globals.css';

import * as ga from '../lib/ga'

import Layout from '@modules/layout/components/Layout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { GTMPageView } from '../lib/utils/gtm';

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url:string) => {
      ga.pageview(url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  useEffect(() => {
    const handleRouteChange = (url: string) => GTMPageView(url)
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    }
  }, [])
  return (
    <Layout description={pageProps?.page?.gqlHeroFields?.introduktionstext || pageProps?.data?.gqlService?.gqlHeroFields?.introduktionstext} seoPage={pageProps?.page || pageProps?.data?.gqlService}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
