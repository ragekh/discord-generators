const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

/** @type {import('next').NextConfig} */
module.exports = (phase, { defaultConfig }) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  
  // Check if bundle analysis is enabled
  const withBundleAnalyzer = process.env.ANALYZE === 'true'
    ? require('@next/bundle-analyzer')({ enabled: true })
    : (config) => config;
  
  const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    
    // Image optimization configuration
    images: {
      domains: ['discord.com', 'cdn.discordapp.com'],
      formats: ['image/avif', 'image/webp'],
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
      imageSizes: [16, 32, 48, 64, 96, 128, 256],
    },
    
    // Compression for production builds
    compress: !isDev,
    
    // Internationalization
    i18n: {
      locales: ['en'],
      defaultLocale: 'en',
    },
    
    // Trailing slashes configuration
    trailingSlash: false,
    
    // Disable x-powered-by header
    poweredByHeader: false,
    
    // Experimental features - disabled for now to ensure stability
    experimental: {
      // optimizeCss: true, // Disabled to avoid issues
      scrollRestoration: true,
    },
    
    // Webpack configuration
    webpack: (config, { dev, isServer }) => {
      // Optimize SVG imports
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });
      
      // Add performance hints in development
      if (dev) {
        config.performance = {
          hints: 'warning',
          maxEntrypointSize: 500000,
          maxAssetSize: 500000,
        };
      }
      
      // Optimize packages for client-side bundles
      if (!isServer) {
        config.resolve.alias = {
          ...config.resolve.alias,
          // Add any package optimizations here
        };
      }
      
      return config;
    },
    
    // Headers configuration for security and performance
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-DNS-Prefetch-Control',
              value: 'on',
            },
            {
              key: 'X-XSS-Protection',
              value: '1; mode=block',
            },
            {
              key: 'X-Frame-Options',
              value: 'SAMEORIGIN',
            },
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            {
              key: 'Referrer-Policy',
              value: 'strict-origin-when-cross-origin',
            },
            {
              key: 'Permissions-Policy',
              value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
            },
          ],
        },
      ];
    },
    
    // Redirects configuration
    async redirects() {
      return [
        // Add any redirects here
      ];
    },
    
    // Rewrites configuration
    async rewrites() {
      return {
        beforeFiles: [
          // Add any rewrites that should run before filesystem routes
        ],
        afterFiles: [
          // Add any rewrites that should run after filesystem routes
        ],
        fallback: [
          // Add any fallback rewrites
        ],
      };
    },
  };
  
  // Apply bundle analyzer wrapper
  return withBundleAnalyzer(nextConfig);
};