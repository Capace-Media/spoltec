import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Add compression (though it's often default)
  compress: true,

  // Remove X-Powered-By header for security
  poweredByHeader: false,

  // Remove the experimental section that's causing issues
  // experimental: {
  //   optimizeCss: true,
  //   cssChunking: "strict",
  // },

  // Your existing config...
  async headers() {
    return [
      // Static assets
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Avoid long-lived caching for everything else (HTML, data, API)
      {
        source: "/(.*)",
        headers: [
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Cache-Control", value: "no-store" },
        ],
      },
    ];
  },
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
  reactStrictMode: true,
  env: {
    GRAPHQL_USER: process.env.GRAPHQL_USER,
    GRAPHQL_PASS: process.env.GRAPHQL_PASS,
    GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT,
  },

  async redirects() {
    return [
      // Core structure changes (KEEP)
      { source: "/nyheter", destination: "/kunskapsbank", permanent: true },
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

      // Important legacy pages (KEEP)
      {
        source: "/om-spoltec/historik",
        destination: "/om-spoltec",
        permanent: true,
      },
      {
        source: "/tjanster-foretag/akutspolning",
        destination: "/akut-hjalp",
        permanent: true,
      },
      {
        source: "/tjanster-foretag/filmning",
        destination: "/tjanster/rorinspektion",
        permanent: true,
      },
      { source: "/garantier", destination: "/garanti", permanent: true },

      // Security redirects (KEEP)
      { source: "/admin", destination: "/", permanent: true },
      { source: "/wp-admin", destination: "/", permanent: true },
      { source: "/spoltecdmin", destination: "/", permanent: true },
      { source: "/s0admin", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
