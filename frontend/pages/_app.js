import '../styles/globals.css';
import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import Layout from '../components/Layout';

// NProgress styles
import 'nprogress/nprogress.css';

// Configure NProgress
NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 500,
  showSpinner: false,
});

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  
  // Base website information for structured data
  const websiteData = {
    name: 'Discord AI Generators',
    url: 'https://discord-ai-generators.com',
    description: 'Free AI tools to help Discord server owners optimize their servers with AI-generated content.',
    logo: 'https://discord-ai-generators.com/logo.png'
  };
  
  // Handle route change events for progress indicator
  useEffect(() => {
    const handleStart = () => {
      NProgress.start();
    };
    
    const handleStop = () => {
      NProgress.done();
    };
    
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);
    
    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);
  
  // Announce page changes to screen readers
  useEffect(() => {
    const pageTitle = document.title || 'Discord AI Generators';
    const announceElement = document.getElementById('a11y-announce');
    
    if (announceElement) {
      announceElement.textContent = `Navigated to ${pageTitle}`;
    }
  }, [router.pathname]);
  
  // Initialize dark mode from localStorage
  useEffect(() => {
    // Check for saved theme preference or respect OS preference
    const savedTheme = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'true' || (savedTheme === null && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
    
    // Add transition class after initial load to prevent flash
    setTimeout(() => {
      document.body.classList.add('dark-transition');
    }, 100);
  }, []);
  
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <meta name="theme-color" content="#5865F2" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Structured Data - Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: websiteData.name,
              url: websiteData.url,
              description: websiteData.description,
              potentialAction: {
                '@type': 'SearchAction',
                target: `${websiteData.url}/search?q={search_term_string}`,
                'query-input': 'required name=search_term_string'
              }
            })
          }}
        />
        
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: websiteData.name,
              url: websiteData.url,
              logo: websiteData.logo,
              description: websiteData.description,
              sameAs: [
                'https://twitter.com/discordaigenerators',
                'https://facebook.com/discordaigenerators'
              ]
            })
          }}
        />
      </Head>
      
      {/* Accessibility announcement region for screen readers */}
      <div 
        id="a11y-announce" 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
      ></div>
      
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;