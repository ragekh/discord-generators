import React from 'react';
import Head from 'next/head';

/**
 * Security Headers Component
 * Adds important security-related HTTP headers as meta tags
 * Note: For production, these should be implemented as actual HTTP headers on the server
 *
 * @returns {JSX.Element} - Head component with security meta tags
 */
const SecurityHeaders = () => {
  return (
    <Head>
      {/* Referrer Policy - safe to use as meta tag */}
      <meta
        name="referrer"
        content="strict-origin-when-cross-origin"
      />
      
      {/* Note: The following headers should be implemented as actual HTTP headers on the server */}
      {/*
        Content Security Policy
        X-Content-Type-Options
        X-Frame-Options
        X-XSS-Protection
        Permissions Policy
      */}
    </Head>
  );
};

export default SecurityHeaders;