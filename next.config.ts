import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,

  // Next.js 15: External packages configuration for better performance
  serverExternalPackages: ["sharp"],

  async headers() {
    return [
      // API routes - keep these
      {
        source: "/api/:path*",
        headers: [
          // Note: Cache-Control here is fine for API routes
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
      // Security headers for all pages
      {
        source: "/(.*)",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          // REMOVE: Strict-Transport-Security - Vercel handles this
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
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
        hostname: "img.youtube.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media.spoltec.se",
        port: "",
        pathname: "/wp-content/**",
      },
      {
        protocol: "https",
        hostname: "media.spoltec.se",
        port: "",
        pathname: "/**",
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
  },

  reactStrictMode: true,

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
