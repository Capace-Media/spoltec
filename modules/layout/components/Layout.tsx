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

  
  return (
    <>
      <Header />
      {/* {process.env.NEXT_PUBLIC_GTM && (
        <Script>
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM}');`}
        </Script>

      )} */}
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
