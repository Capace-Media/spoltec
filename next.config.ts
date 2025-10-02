import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Your existing config is already good for Vercel
  compress: true, // Vercel handles this, but keeping it doesn't hurt
  poweredByHeader: false,

  // Transpile packages for modern ES modules
  transpilePackages: [
    "@radix-ui/react-accordion",
    "@radix-ui/react-collapsible",
    "@radix-ui/react-dialog",
    "@radix-ui/react-navigation-menu",
    "@radix-ui/react-separator",
    "@radix-ui/react-slot",
    "@radix-ui/react-tooltip",
    "@tanstack/react-query",
    "class-variance-authority",
    "clsx",
    "dompurify",
    "html-react-parser",
    "lucide-react",
    "tailwind-merge",
  ],

  // Next.js 15 optimizations
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

    // Force modern JS compilation
    forceSwcTransforms: true,
  },

  // Simplified webpack configuration for Next.js 15
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Optimize bundle splitting
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

  // Optimized headers for Next.js 15
  async headers() {
    return [
      // Static assets - covers all Next.js build assets including CSS
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Security headers for all pages
      {
        source: "/(.*)",
        headers: [
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none';",
          },
        ],
      },
    ];
  },

  images: {
    // Modern image optimization for 2025
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1024, 1200, 1920, 2048, 2560, 3840],
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
    // SVG support - consider removing if not needed for security
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
