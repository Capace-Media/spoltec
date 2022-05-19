module.exports = {
  images: {
    domains: ['media.spoltec.se'],
  },
  swcMinify: true,
  reactStrictMode: true,
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      });
    }

    return config;
  },
  async redirects() {
    return [
      {
        source: '/nyheter',
        destination: '/',
        permanent: true,
      },
      {
        source: '/spoltec',
        destination: '/',
        permanent: true,
      },
      {
        source: '/spoltecdmin',
        destination: '/',
        permanent: true,
      },
      {
        source: '/test',
        destination: '/',
        permanent: true,
      },
      {
        source: '/ingemar-jspoltec-se',
        destination: '/',
        permanent: true,
      },
      {
        source: '/jorgen-jspoltec-se',
        destination: '/',
        permanent: true,
      },
      {
        source: '/s0admin',
        destination: '/',
        permanent: true,
      },
      {
        source: '/admin',
        destination: '/',
        permanent: true,
      },
      {
        source: '/relining-karlskrona',
        destination: '/relining/karlskrona',
        permanent: true,
      },
      {
        source: '/relining-kalmar',
        destination: '/relining/kalmar',
        permanent: true,
      },
      {
        source: '/garantier',
        destination: '/garanti',
        permanent: true,
      },
      {
        source: '/garantier/miljo',
        destination: '/garanti',
        permanent: true,
      },
      {
        source: '/garantier/garantier-underhallsspolning',
        destination: '/garanti',
        permanent: true,
      },
      {
        source: '/tatning-av-betong',
        destination: '/',
        permanent: true,
      },
      {
        source: '/om-spoltec/historik',
        destination: '/om-spoltec',
        permanent: true,
      },
      {
        source: '/tjanster-foretag',
        destination: '/',
        permanent: true,
      },
      {
        source: '/tjanster-foretag/akutspolning',
        destination: '/akut-hjalp',
        permanent: true,
      },
      {
        source: '/tjanster-privat',
        destination: '/',
        permanent: true,
      },
      {
        source: '/tjanster-foretag/besiktning-av-oljeavskiljare',
        destination: '/oljeavskiljare',
        permanent: true,
      },
      {
        source: '/tjanster-foretag/provtagning-av-vatten',
        destination: '/provtagning-av-vatten',
        permanent: true,
      },
      {
        source: '/tjanster-foretag/filmning',
        destination: '/rorinspektion',
        permanent: true,
      },
      {
        source: '/fastighetsservice',
        destination: '/',
        permanent: true,
      },
      {
        source: '/varfor-blir-det-stopp/vad-hittar-vi-i-avloppen',
        destination: '/varfor-blir-det-stopp',
        permanent: true,
      },
      {
        source: '/varfor-blir-det-stopp/avloppstips',
        destination: '/varfor-blir-det-stopp',
        permanent: true,
      },
      {
        source: '/tjanster-privat/villaspolning',
        destination: '/',
        permanent: true,
      },
      {
        source: '/tjanster-privat/filmning-rorinspektion',
        destination: '/rorinspektion',
        permanent: true,
      },
      {
        source: '/tjanster-foretag/underhallsspolning',
        destination: '/avloppsspolning',
        permanent: true,
      },
      {
        source: '/tjanster-foretag/rorinspektion',
        destination: '/rorinspektion',
        permanent: true,
      },
      {
        source: '/tjanster-foretag/rotskarning',
        destination: '/avloppsspolning',
        permanent: true,
      },
      {
        source: '/tjanster-privat/villastopp',
        destination: '/avloppsspolning',
        permanent: true,
      },
      {
        source: '/tjanster-privat/rot-avdrag',
        destination: '/rot-avdrag',
        permanent: true,
      },
      {
        source: '/avloppsspolning-helsingborg',
        destination: '/avloppsspolning/helsingborg',
        permanent: true,
      },
      {
        source: '/oljeavskiljare-malmo',
        destination: '/oljeavskiljare/malmo',
        permanent: true,
      },
      {
        source: '/tjanster-foretag/oljeavskiljare',
        destination: '/oljeavskiljare',
        permanent: true,
      },
      {
        source: '/om-spoltec/vara-tjanster',
        destination: '/om-spoltec',
        permanent: true,
      },
      {
        source: '/kund/cmadmin',
        destination: '/',
        permanent: true,
      },
      {
        source: '/kund',
        destination: '/',
        permanent: true,
      },
      {
        source: '/kvicksilversanering',
        destination: '/',
        permanent: true,
      },
    ]
  },
};
