import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

const Seo = ({ seo, uri, img, desc, serviceSeo }) => {
  const router = useRouter();
  const completeRoute = router.asPath;
  const serviceTitle = serviceSeo?.seo?.opengraphTitle;
  const serviceDesc = serviceSeo?.seo?.metaDesc;

  const {
    title,
    metaDesc,
    metaRobotsNoindex,
    metaRobotsNofollow,
    opengraphDescription,
    opengraphTitle,
    opengraphImage,
    opengraphSiteName,
    canonical,
  } = seo;

  const noIndex = (index: any) => {
    if (index === "index" || index === "") {
      return false;
    } else {
      return true;
    }
  };

  const noFollow = (follow: any) => {
    if (follow === "follow" || follow === "") {
      return false;
    } else {
      return true;
    }
  };

  const currentLocation = process.browser ? window.location.origin : null;

  let opengraphUrl =
    (process.env.NEXT_PUBLIC_MY_WEBSITE
      ? process.env.NEXT_PUBLIC_MY_WEBSITE
      : currentLocation) + uri;

  opengraphUrl = opengraphUrl.replace(/\/$/, "");

  let newOpengraphUrl = process.env.NEXT_PUBLIC_MY_WEBSITE + completeRoute;

  return (
    <NextSeo
      title={title || serviceTitle}
      description={opengraphDescription || metaDesc || desc || serviceDesc}
      canonical={newOpengraphUrl}
      noindex={noIndex(metaRobotsNoindex)}
      nofollow={noFollow(metaRobotsNofollow)}
      openGraph={{
        type: "website",
        locale: "sv_SE",
        url: newOpengraphUrl,
        title: opengraphTitle,
        description: opengraphDescription ? opengraphDescription : desc,
        images: [
          {
            url: opengraphImage?.sourceUrl
              ? opengraphImage?.sourceUrl
              : router.asPath === "/"
              ? "/images/font-page-meta.png"
              : img,
            width: 1280,
            height: 720,
          },
        ],
        /* eslint-disable */
        site_name: opengraphSiteName,
        /* eslint-enable */
      }}
      twitter={{
        handle: "@spoltec",
        site: "@spoltec",
        cardType: "summary_large_image",
      }}
    />
  );
};

Seo.propTypes = {
  seo: PropTypes.object,
};

Seo.defaultProps = {
  seo: {
    canonical: "",
    title: "",
    metaDesc: "",
    metaRobotsNoindex: "",
    metaRobotsNofollow: "",
    opengraphDescription: "",
    opengraphTitle: "",
    opengraphImage: {
      sourceUrl: "",
    },
    newOpengraphUrl: "",
    opengraphSiteName: "",
  },
};

export default Seo;
