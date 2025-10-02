import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Your existing config is already good for Vercel
  compress: true, // Vercel handles this, but keeping it doesn't hurt
  poweredByHeader: false,

  // Enable source maps for production debugging
  productionBrowserSourceMaps: true,

  // Next.js 15: External packages configuration for better performance
  serverExternalPackages: [
    // Keep these external for better performance
    "sharp",
    "@sendgrid/mail",
  ],

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
      "html-react-parser",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
    ],

    // Better caching for static content
    staticGenerationRetryCount: 3,

    // Force modern JS compilation
    forceSwcTransforms: true,

    // Note: Removed optimizeCss as it causes critters module errors in Next.js 15.5.4
  },

  // Next.js 15 optimized webpack configuration
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Note: Removed react-dom alias as it breaks Next.js 15 client-side resolution
      // The duplicate React DOM issue should be resolved by proper chunk splitting instead

      // Modern bundle splitting strategy for Next.js 15
      config.optimization.splitChunks = {
        chunks: "all",
        minSize: 20000,
        maxSize: 244000,
        cacheGroups: {
          // React ecosystem in separate chunk
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: "react",
            chunks: "all",
            priority: 20,
            enforce: true,
          },
          // UI libraries
          ui: {
            test: /[\\/]node_modules[\\/](@radix-ui|lucide-react)[\\/]/,
            name: "ui",
            chunks: "all",
            priority: 15,
          },
          // Data fetching libraries
          data: {
            test: /[\\/]node_modules[\\/]@tanstack[\\/]/,
            name: "data",
            chunks: "all",
            priority: 15,
          },
          // Utility libraries
          utils: {
            test: /[\\/]node_modules[\\/](clsx|tailwind-merge|class-variance-authority)[\\/]/,
            name: "utils",
            chunks: "all",
            priority: 12,
          },
          // Other vendor libraries
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
            priority: 10,
            maxSize: 200000,
          },
          // Common chunks
          common: {
            name: "common",
            minChunks: 2,
            chunks: "all",
            priority: 5,
            enforce: true,
            maxSize: 100000,
          },
        },
      };

      // Enable modern tree shaking
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
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
