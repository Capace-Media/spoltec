const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "spoltec-staging.h.capacedev.se",
        port: "",
        pathname: "/wp-content/**",
      },
      {
        protocol: "https",
        hostname: "media.spoltec.se",
        port: "",
        pathname: "/wp-content/**",
      },
      {
        protocol: "https",
        hostname: "www.uc.se",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "/**",
      },
    ],

    // formats: ['image/jpeg', 'image/svg+xml']
    dangerouslyAllowSVG: true,
  },
  swcMinify: true,
  reactStrictMode: true,
  env: {
    GRAPHQL_USER: process.env.GRAPHQL_USER,
    GRAPHQL_PASS: process.env.GRAPHQL_PASS,
    GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT,
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat",
      });
    }

    return config;
  },
  async redirects() {
    return [
      {
        source: "/nyheter",
        destination: "/kunskapsbank",
        permanent: true,
      },
      {
        source: "/spoltec",
        destination: "/",
        permanent: true,
      },
      {
        source: "/spoltecdmin",
        destination: "/",
        permanent: true,
      },
      {
        source: "/test",
        destination: "/",
        permanent: true,
      },
      {
        source: "/ingemar-jspoltec-se",
        destination: "/",
        permanent: true,
      },
      {
        source: "/jorgen-jspoltec-se",
        destination: "/",
        permanent: true,
      },
      {
        source: "/s0admin",
        destination: "/",
        permanent: true,
      },
      {
        source: "/admin",
        destination: "/",
        permanent: true,
      },
      {
        source: "/relining-karlskrona",
        destination: "/relining/karlskrona",
        permanent: true,
      },
      {
        source: "/relining-kalmar",
        destination: "/relining/kalmar",
        permanent: true,
      },
      {
        source: "/garantier",
        destination: "/garanti",
        permanent: true,
      },
      {
        source: "/garantier/miljo",
        destination: "/garanti",
        permanent: true,
      },
      {
        source: "/garantier/garantier-underhallsspolning",
        destination: "/garanti",
        permanent: true,
      },
      {
        source: "/tatning-av-betong",
        destination: "/",
        permanent: true,
      },
      {
        source: "/om-spoltec/historik",
        destination: "/om-spoltec",
        permanent: true,
      },
      {
        source: "/tjanster-foretag",
        destination: "/",
        permanent: true,
      },
      {
        source: "/tjanster-foretag/akutspolning",
        destination: "/akut-hjalp",
        permanent: true,
      },
      {
        source: "/tjanster-privat",
        destination: "/",
        permanent: true,
      },
      {
        source: "/tjanster-foretag/besiktning-av-oljeavskiljare",
        destination: "/oljeavskiljare",
        permanent: true,
      },
      {
        source: "/tjanster-foretag/provtagning-av-vatten",
        destination: "/provtagning-av-vatten",
        permanent: true,
      },
      {
        source: "/tjanster-foretag/filmning",
        destination: "/rorinspektion",
        permanent: true,
      },
      {
        source: "/fastighetsservice",
        destination: "/",
        permanent: true,
      },
      {
        source: "/varfor-blir-det-stopp/vad-hittar-vi-i-avloppen",
        destination: "/varfor-blir-det-stopp",
        permanent: true,
      },
      {
        source: "/varfor-blir-det-stopp/avloppstips",
        destination: "/varfor-blir-det-stopp",
        permanent: true,
      },
      {
        source: "/tjanster-privat/villaspolning",
        destination: "/",
        permanent: true,
      },
      {
        source: "/tjanster-privat/filmning-rorinspektion",
        destination: "/rorinspektion",
        permanent: true,
      },
      {
        source: "/tjanster-foretag/underhallsspolning",
        destination: "/avloppsspolning",
        permanent: true,
      },
      {
        source: "/tjanster-foretag/rorinspektion",
        destination: "/rorinspektion",
        permanent: true,
      },
      {
        source: "/tjanster-foretag/rotskarning",
        destination: "/avloppsspolning",
        permanent: true,
      },
      {
        source: "/tjanster-privat/villastopp",
        destination: "/avloppsspolning",
        permanent: true,
      },
      {
        source: "/tjanster-privat/rot-avdrag",
        destination: "/rot-avdrag",
        permanent: true,
      },
      {
        source: "/avloppsspolning-helsingborg",
        destination: "/avloppsspolning/helsingborg",
        permanent: true,
      },
      {
        source: "/oljeavskiljare-malmo",
        destination: "/oljeavskiljare/malmo",
        permanent: true,
      },
      {
        source: "/tjanster-foretag/oljeavskiljare",
        destination: "/oljeavskiljare",
        permanent: true,
      },
      {
        source: "/om-spoltec/vara-tjanster",
        destination: "/om-spoltec",
        permanent: true,
      },
      {
        source: "/kund/cmadmin",
        destination: "/",
        permanent: true,
      },
      {
        source: "/kund",
        destination: "/",
        permanent: true,
      },
      {
        source: "/relining",
        destination: "/tjanster/relining",
        permanent: true,
      },
      {
        source: "/rorinspektion",
        destination: "/tjanster/rorinspektion",
        permanent: true,
      },
      {
        source: "/avloppsspolning",
        destination: "/tjanster/avloppsspolning",
        permanent: true,
      },
      {
        source: "/oljeavskiljare",
        destination: "/tjanster/oljeavskiljare",
        permanent: true,
      },
      {
        source: "/provtagning-av-vatten",
        destination: "/tjanster/provtagning-av-vatten",
        permanent: true,
      },
      {
        source: "/avloppsspolning/boras",
        destination: "/avloppsspolning-boras",
        permanent: true,
      },
      {
        source: "/avloppsspolning/goteborg",
        destination: "/avloppsspolning-goteborg",
        permanent: true,
      },

      {
        source: "/avloppsspolning/halmstad",
        destination: "/avloppsspolning-halmstad",
        permanent: true,
      },
      {
        source: "/avloppsspolning/helsingborg",
        destination: "/avloppsspolning-helsingborg",
        permanent: true,
      },

      {
        source: "/avloppsspolning/jonkoping",
        destination: "/avloppsspolning-jonkoping",
        permanent: true,
      },
      {
        source: "/avloppsspolning/kalmar",
        destination: "/avloppsspolning-kalmar",
        permanent: true,
      },

      {
        source: "/avloppsspolning/karlskrona",
        destination: "/avloppsspolning-karlskrona",
        permanent: true,
      },
      {
        source: "/avloppsspolning/kristianstad",
        destination: "/avloppsspolning-kristianstad",
        permanent: true,
      },

      {
        source: "/avloppsspolning/malmo",
        destination: "/avloppsspolning-malmo",
        permanent: true,
      },
      {
        source: "/avloppsspolning/varberg",
        destination: "/avloppsspolning-varberg",
        permanent: true,
      },

      {
        source: "/avloppsspolning/vaxjo",
        destination: "/avloppsspolning-vaxjo",
        permanent: true,
      },
      {
        source: "/oljeavskiljare/boras",
        destination: "/oljeavskiljare-boras",
        permanent: true,
      },
      {
        source: "/oljeavskiljare/goteborg",
        destination: "/oljeavskiljare-goteborg",
        permanent: true,
      },

      {
        source: "/oljeavskiljare/halmstad",
        destination: "/oljeavskiljare-halmstad",
        permanent: true,
      },
      {
        source: "/oljeavskiljare/helsingborg",
        destination: "/oljeavskiljare-helsingborg",
        permanent: true,
      },

      {
        source: "/oljeavskiljare/jonkoping",
        destination: "/oljeavskiljare-jonkoping",
        permanent: true,
      },
      {
        source: "/oljeavskiljare/kalmar",
        destination: "/oljeavskiljare-kalmar",
        permanent: true,
      },

      {
        source: "/oljeavskiljare/karlskrona",
        destination: "/oljeavskiljare-karlskrona",
        permanent: true,
      },
      {
        source: "/oljeavskiljare/kristianstad",
        destination: "/oljeavskiljare-kristianstad",
        permanent: true,
      },

      {
        source: "/oljeavskiljare/malmo",
        destination: "/oljeavskiljare-malmo",
        permanent: true,
      },
      {
        source: "/oljeavskiljare/varberg",
        destination: "/oljeavskiljare-varberg",
        permanent: true,
      },

      {
        source: "/oljeavskiljare/vaxjo",
        destination: "/oljeavskiljare-vaxjo",
        permanent: true,
      },
      {
        source: "/relining/boras",
        destination: "/relining-boras",
        permanent: true,
      },
      {
        source: "/relining/goteborg",
        destination: "/relining-goteborg",
        permanent: true,
      },

      {
        source: "/relining/halmstad",
        destination: "/relining-halmstad",
        permanent: true,
      },
      {
        source: "//relining/helsingborg",
        destination: "/relining-helsingborg",
        permanent: true,
      },

      {
        source: "/relining/jonkoping",
        destination: "/relining-jonkoping",
        permanent: true,
      },
      {
        source: "/relining/kalmar",
        destination: "/relining-kalmar",
        permanent: true,
      },

      {
        source: "/relining/karlskrona",
        destination: "/relining-karlskrona",
        permanent: true,
      },
      {
        source: "/relining/kristianstad",
        destination: "/relining-kristianstad",
        permanent: true,
      },

      {
        source: "/relining/malmo",
        destination: "/relining-malmo",
        permanent: true,
      },
      {
        source: "/relining/varberg",
        destination: "/relining-varberg",
        permanent: true,
      },

      {
        source: "/relining/vaxjo",
        destination: "/relining-vaxjo",
        permanent: true,
      },
      {
        source: "/provtagning-av-vatten",
        destination: "/tjanster/provtagning-av-vatten",
        permanent: true,
      },
      {
        source: "/tjanster-malmo",
        destination: "/tjanster",
        permanent: true,
      },
    ];
  },
});
