import { NextSeo } from 'next-seo';
import PropTypes from 'prop-types';

const Seo = ({ seo, uri, img, desc }) => {
    const {
        title,
        metaDesc,
        metaRobotsNoindex,
        metaRobotsNofollow,
        opengraphDescription,
        opengraphTitle,
        opengraphImage,
        opengraphSiteName,
    } = seo;

    const noIndex = (index: any) => {
      if(index === 'index'){
        return false
      } else {
        return true
      }
    }

    const noFollow = (follow: any) => {
      if(follow === 'follow'){
        return false
      } else {
        return true
      }
    }

    const currentLocation = process.browser ? window.location.origin : null;

    const opengraphUrl =
    (process.env.NEXT_PUBLIC_MY_WEBSITE
      ? process.env.NEXT_PUBLIC_MY_WEBSITE
      : currentLocation) + uri;

    return (
        <NextSeo 
        title={title}
        description={opengraphDescription || metaDesc || desc}
        canonical={opengraphUrl}
        noindex={noIndex(metaRobotsNoindex)}
        nofollow={noFollow(metaRobotsNofollow)}
        openGraph={{
          type: 'website',
          locale: 'sv_SE',
          url: opengraphUrl,
          title: opengraphTitle,
          description: opengraphDescription ? opengraphDescription : desc,
          images: [
            {
              url: opengraphImage?.sourceUrl ? opengraphImage?.sourceUrl : img,
              width: 1280,
              height: 720,
            },
          ],
          /* eslint-disable */
          site_name: opengraphSiteName,
          /* eslint-enable */
        }}
        twitter={{
          handle: '@spoltec',
          site: '@spoltec',
          cardType: 'summary_large_image',
        }}
        />
    )
}

Seo.propTypes = {
    seo: PropTypes.object,
};
  
Seo.defaultProps = {
    seo: {
        canonical: '',
        title: '',
        metaDesc: '',
        metaRobotsNoindex: '',
        metaRobotsNofollow: '',
        opengraphDescription: '',
        opengraphTitle: '',
        opengraphImage: {
          sourceUrl: '',
        },
        opengraphUrl: '',
        opengraphSiteName: '',
    },
};

export default Seo;