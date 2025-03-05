import React from 'react';
import Head from 'next/head';

/**
 * Performance Optimization Component
 * Adds resource hints and other performance optimizations
 * 
 * @param {Object} props - Component props
 * @param {Array} props.preconnect - Array of URLs to preconnect to
 * @param {Array} props.prefetch - Array of URLs to prefetch
 * @param {Array} props.preload - Array of objects with href, as, and type properties
 * @param {string} props.criticalCSS - Critical CSS to be inlined
 * @returns {JSX.Element} - Head component with performance optimizations
 */
const PerformanceOptimization = ({ 
  preconnect = [], 
  prefetch = [], 
  preload = [],
  criticalCSS = ''
}) => {
  return (
    <Head>
      {/* Preconnect to important domains */}
      {preconnect.map((url, index) => (
        <link 
          key={`preconnect-${index}`} 
          rel="preconnect" 
          href={url} 
          crossOrigin="anonymous" 
        />
      ))}
      
      {/* Prefetch important resources */}
      {prefetch.map((url, index) => (
        <link 
          key={`prefetch-${index}`} 
          rel="prefetch" 
          href={url} 
        />
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
      
      {/* Inline critical CSS */}
      {criticalCSS && (
        <style 
          dangerouslySetInnerHTML={{ 
            __html: criticalCSS 
          }} 
        />
      )}
      
      {/* Add fetchpriority to important resources */}
      <meta name="fetchpriority" content="high" />
    </Head>
  );
};

export default PerformanceOptimization;