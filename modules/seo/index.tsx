import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import WP from '@lib/wp/wp';
//import frontImg  from '/images/font-page-meta.png'

const Seo = ({ seo, uri, img, desc, serviceSeo }) => {
  //console.log('front page img ===>', frontImg);
  const router = useRouter()
  //console.log('router ===>, ', router);
  // console.log("seo ==>", seo)
  // console.log("uri ==>", uri)
  // console.log("desc ==>", desc)
  // console.log("router ==>", router.asPath)

  // console.log("data ==>", data)

  const completeRoute = router.asPath

  console.log("serviceSeo in index ==>", serviceSeo)

  const serviceTitle = serviceSeo?.seo?.opengraphTitle
  console.log("serviceTitle ==>", serviceTitle)

  const serviceDesc = serviceSeo?.seo?.metaDesc
  console.log("serviceDesc ==>", serviceDesc)

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

    console.log("title in Seo ==>", title)
    console.log("opengraphDescription in Seo ==>", opengraphDescription)

    const noIndex = (index: any) => {
      if(index === 'index' || index === ''){
        return false
      } else {
        return true
      }
    }

    const noFollow = (follow: any) => {
      if(follow === 'follow' || follow === ''){
        return false
      } else {
        return true
      }
    }

    const currentLocation = process.browser ? window.location.origin : null;
    // console.log("currentLocation ==>", currentLocation)

    let opengraphUrl =
    (process.env.NEXT_PUBLIC_MY_WEBSITE
      ? process.env.NEXT_PUBLIC_MY_WEBSITE
      : currentLocation) + uri;

    // console.log("opengraphUrl before .replace ==>", opengraphUrl)

    opengraphUrl = opengraphUrl.replace(/\/$/, "");

    // console.log("opengraphUrl after .replace ==>", opengraphUrl)

    const newOpengraphUrl = process.env.NEXT_PUBLIC_MY_WEBSITE + completeRoute
        
    // console.log("newOpengraphUrl ==>", newOpengraphUrl)
    // console.log("router.asPath ==>", completeRoute)

    // console.log("seo title ==>", title)

    // console.log("seo description 1 ==>", opengraphDescription)
    // console.log("data.seo.metaDesc ==>", data?.seo?.metaDesc)
    // console.log("seo description 2 ==>", metaDesc)
    // console.log("seo description 3 ==>", desc)

    // console.log("opengraphTitle ==>", opengraphTitle)
    // console.log("data.seo.opengraphTitle ==>", data?.seo?.opengraphTitle)
  
    return (
      <NextSeo 
      title={title || serviceTitle}
      description={opengraphDescription || metaDesc || desc || serviceDesc}
      canonical={newOpengraphUrl}
      noindex={noIndex(metaRobotsNoindex)}
      nofollow={noFollow(metaRobotsNofollow)}
      openGraph={{
        type: 'website',
        locale: 'sv_SE',
        url: newOpengraphUrl,
        title: opengraphTitle,
        description: opengraphDescription ? opengraphDescription : desc,
        images: [
          {
            url: opengraphImage?.sourceUrl ? opengraphImage?.sourceUrl : router.asPath === "/" ? "/images/font-page-meta.png" : img,
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
