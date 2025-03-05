import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Basic Meta Tags */}
        <meta charSet="UTF-8" />
        {/* Viewport meta tag moved to _app.js */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#5865F2" />
        <meta name="application-name" content="Discord AI Generators" />
        <meta name="apple-mobile-web-app-title" content="Discord AI Generators" />
        
        {/* Favicon and PWA */}
        <link rel="icon" href="/favicon.ico" />
        {/* Removed references to non-existent icon files */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-status-bar" content="#5865F2" />
        
        {/* Removed preload for non-existent font */}
        
        {/* Preconnect to domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Font */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        
        {/* SEO verification */}
        <meta name="google-site-verification" content="your-google-verification-code" />
        <meta name="msvalidate.01" content="your-bing-verification-code" />
        <meta name="yandex-verification" content="your-yandex-verification-code" />
        <meta name="norton-safeweb-site-verification" content="your-norton-verification-code" />
        
        {/* Open Graph / Facebook - Basic properties that will be overridden by page-specific ones */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Discord AI Generators" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter - Basic properties that will be overridden by page-specific ones */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@discordaigenerators" />
        
        {/* DNS Prefetch for Performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}