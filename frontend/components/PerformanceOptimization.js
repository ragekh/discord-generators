import Head from 'next/head';

/**
 * Enhanced Performance Optimization component
 * Implements various performance best practices:
 * - DNS prefetching
 * - Preconnect for external resources
 * - Preloading critical assets
 * - Critical CSS injection
 * - Resource hints
 * 
 * @param {Object} props Component props
 * @param {Array} props.preconnect Array of URLs to preconnect to
 * @param {Array} props.preload Array of resources to preload
 * @param {string} props.criticalCSS Critical CSS to inline
 * @returns {JSX.Element} Head component with performance optimizations
 */
const PerformanceOptimization = ({ 
  preconnect = [], 
  preload = [], 
  criticalCSS = '' 
}) => {
  return (
    <Head>
      {/* DNS Prefetching */}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      
      {/* Preconnect to critical origins */}
      {preconnect.map((url, index) => (
        <link key={`preconnect-${index}`} rel="preconnect" href={url} crossOrigin="anonymous" />
      ))}
      
      {/* Preload critical resources */}
      {preload.map((resource, index) => (
        <link 
          key={`preload-${index}`} 
          rel="preload" 
          href={resource.href} 
          as={resource.as} 
          type={resource.type} 
          crossOrigin={resource.crossOrigin || 'anonymous'} 
        />
      ))}
      
      {/* Font display optimization */}
      <link
        rel="preload"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        as="style"
        onLoad="this.onload=null;this.rel='stylesheet'"
      />
      <noscript>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
          type="text/css"
        />
      </noscript>
      
      {/* Inline critical CSS */}
      {criticalCSS && (
        <style 
          dangerouslySetInnerHTML={{ 
            __html: criticalCSS 
          }} 
        />
      )}
      
      {/* Resource hints */}
      <link rel="prefetch" href="/server-name" />
      <link rel="prefetch" href="/server-description" />
      
      {/* Core Web Vitals optimization meta tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta httpEquiv="x-dns-prefetch-control" content="on" />
    </Head>
  );
};

export default PerformanceOptimization;