import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Your existing config is already good for Vercel
  compress: true, // Vercel handles this, but keeping it doesn't hurt
  poweredByHeader: false,

  // Vercel-specific optimizations
  experimental: {
    // Enable optimized package imports
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-accordion",
      "@radix-ui/react-dialog",
      "@radix-ui/react-navigation-menu",
      "@radix-ui/react-tooltip",
      "@tanstack/react-query",
    ],

    // Better caching for static content
    staticGenerationRetryCount: 3,

    // Improved performance for large apps
    webpackMemoryOptimizations: true,

    // Force modern JS compilation
    forceSwcTransforms: true,

    // Remove problematic CSS optimization features that require critters
    // optimizeCss: true, // REMOVED - causes build failures
    // cssChunking: "strict", // REMOVED - causes build failures
  },

  // Optimize webpack bundle
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Enable bundle analyzer in production
      config.optimization.splitChunks = {
        chunks: "all",
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
          common: {
            name: "common",
            minChunks: 2,
            chunks: "all",
            enforce: true,
          },
        },
      };
    }
    return config;
  },

  // Your existing headers, images, redirects are perfect for Vercel
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
      // CSS files - optimize loading
      {
        source: "/_next/static/css/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "Content-Type",
            value: "text/css",
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
      // Privacy and security headers for all pages
      {
        source: "/(.*)",
        headers: [
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Privacy-focused headers
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          // Cookie policy for first-party cookies
          {
            key: "Set-Cookie",
            value: "SameSite=Lax; Secure; HttpOnly",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=0, s-maxage=600, stale-while-revalidate=60",
          },
        ],
      },
      // Specific headers for media domain to prevent third-party cookie issues
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cross-Origin-Resource-Policy",
            value: "cross-origin",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "https://www.spoltec.se",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  images: {
    // Optimize image loading and compression
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [25, 50, 75, 80, 85, 90, 100],
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
