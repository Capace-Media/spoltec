import Footer from './Footer';
import Header from './Header';
import { ReactChild } from 'react';
import Head from 'next/head';
import Seo from '@modules/seo';
import { handleSanitize } from '@lib/utils/miscellaneous';

interface LayoutProps {
  children: ReactChild;
  seoPage: any;
}

const Layout = ({ children, seoPage }: LayoutProps) => {

  
  return (
    <>
      <Header />
      <Seo img={seoPage?.gqlHeroFields?.bild?.mediaItemUrl} seo={seoPage?.seo} uri={seoPage?.uri ? `${seoPage?.uri}` : `/${seoPage?.slug}`} />
      <Head>
        {seoPage?.seo?.schema?.raw && (
          <script 
            type='application/ld+json'
            className='yoast-schema-graph'
            key='yoastSchema'
            dangerouslySetInnerHTML={{
              __html: handleSanitize(seoPage?.seo?.schema?.raw),
            }}
          />
        )}
        <link rel='icon' href='/favicon.ico' sizes='32x32' />
      </Head>
        <main className='relative'>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
