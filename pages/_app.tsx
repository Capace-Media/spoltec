import '../styles/globals.css';

import Layout from '@modules/layout/components/Layout';

function MyApp({ Component, pageProps }) {
  
  return (
    <Layout seoPage={pageProps?.page} >
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
