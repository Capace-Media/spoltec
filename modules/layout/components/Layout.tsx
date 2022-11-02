import Footer from './Footer';
import Header from './Header';
import { ReactChild } from 'react';
import Head from 'next/head';
import Seo from '@modules/seo';
import { handleSanitize } from '@lib/utils/miscellaneous';
import Script from 'next/script';

interface LayoutProps {
  children: ReactChild;
  seoPage: any;
  description: any;
}

const Layout = ({ children, seoPage, description }: LayoutProps) => {
  // console.log("seoPage ==>", seoPage)
  
  return (
    <>
      <Header />
      <Seo desc={description} img={seoPage?.gqlHeroFields?.bild?.mediaItemUrl} seo={seoPage?.seo} uri={seoPage?.uri ? `${seoPage?.uri}` : `/${seoPage?.slug}`} />
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
        <main className='relative'>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
