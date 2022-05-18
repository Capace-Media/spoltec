import '../styles/globals.css';

import Layout from '@modules/layout/components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <Layout description={pageProps?.page?.gqlHeroFields?.introduktionstext || pageProps?.data?.gqlService?.gqlHeroFields?.introduktionstext} seoPage={pageProps?.page || pageProps?.data?.gqlService}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
