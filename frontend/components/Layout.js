import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import AccessibilityFeatures, { announceToScreenReader } from './AccessibilityFeatures';
import SecurityHeaders from './SecurityHeaders';
import PerformanceOptimization from './PerformanceOptimization';
import ErrorBoundary from './ErrorBoundary';
import BackToTop from './BackToTop';
import { AnimatePresence, motion } from 'framer-motion';

export default function Layout({ children }) {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [router.pathname]);
  
  // Announce page changes to screen readers
  useEffect(() => {
    const pageTitle = document.title || 'Discord AI Generators';
    announceToScreenReader(`Navigated to ${pageTitle}`);
  }, [router.pathname]);
  
  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);
  
  // Add keyboard shortcut for dark mode toggle (Alt+Shift+D)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && e.shiftKey && e.key === 'D') {
        toggleDarkMode();
        // Announce to screen readers
        announceToScreenReader(`${!darkMode ? 'Dark' : 'Light'} mode enabled with keyboard shortcut`);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [darkMode]);
  
  // Handle scroll events for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Announce to screen readers
    announceToScreenReader(`${newDarkMode ? 'Dark' : 'Light'} mode enabled`);
  };
  
  // Performance optimization resources
  const preconnectUrls = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://www.google-analytics.com'
  ];
  
  const preloadResources = [
    // Only include resources that actually exist
    // {
    //   href: '/fonts/inter-var.woff2',
    //   as: 'font',
    //   type: 'font/woff2'
    // },
    // {
    //   href: '/images/logo.svg',
    //   as: 'image',
    //   type: 'image/svg+xml'
    // }
  ];

  // Page transition variants
  const pageTransitionVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: 'easeInOut' }
    },
    exit: { 
      opacity: 0,
      y: -10,
      transition: { duration: 0.2, ease: 'easeInOut' }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-discord-dark dark:text-gray-200">
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="skip-to-content"
        onClick={() => announceToScreenReader("Skipped to main content")}
      >
        Skip to content
      </a>
      
      {/* Security Headers */}
      <SecurityHeaders />
      
      {/* Performance Optimization */}
      <PerformanceOptimization
        preconnect={preconnectUrls}
        preload={preloadResources}
        criticalCSS={`
          .skip-to-content {
            position: absolute;
            left: -9999px;
            top: auto;
            width: 1px;
            height: 1px;
            overflow: hidden;
          }
          .skip-to-content:focus {
            position: fixed;
            top: 0;
            left: 0;
            width: auto;
            height: auto;
            padding: 0.5rem 1rem;
            background: white;
            color: black;
            z-index: 9999;
            outline: 2px solid #5865F2;
          }
        `}
      />
      
      {/* Accessibility Features */}
      <AccessibilityFeatures />
      
      {/* Header */}
      <header 
        className={`sticky top-0 z-50 bg-discord-blue text-white shadow-md dark:bg-discord-menu-gray transition-shadow duration-200 ${
          isScrolled ? 'shadow-lg' : ''
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold hover:text-white/90 transition" aria-label="Discord AI Generators Home">
            Discord AI Generators
          </Link>
          
          <div className="flex items-center space-x-2">
            {/* Dark mode toggle with enhanced feedback */}
            <button
              onClick={toggleDarkMode}
              className="flex items-center space-x-1 p-2 rounded-md hover:bg-discord-blue-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-discord-blue dark:focus:ring-offset-discord-menu-gray"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span className="text-xs hidden md:inline">Light</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  <span className="text-xs hidden md:inline">Dark</span>
                </>
              )}
            </button>
            
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-discord-blue dark:focus:ring-offset-discord-menu-gray"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-2 items-center">
            <Link
              href="/server-name"
              className={`nav-link ${router.pathname === '/server-name' ? 'nav-link-active' : ''}`}
            >
              Server Names
            </Link>
            <Link
              href="/server-description"
              className={`nav-link ${router.pathname === '/server-description' ? 'nav-link-active' : ''}`}
            >
              Descriptions
            </Link>
            <Link
              href="/channel-name"
              className={`nav-link ${router.pathname === '/channel-name' ? 'nav-link-active' : ''}`}
            >
              Channel Names
            </Link>
            <Link
              href="/welcome-message"
              className={`nav-link ${router.pathname === '/welcome-message' ? 'nav-link-active' : ''}`}
            >
              Welcome
            </Link>
            <Link
              href="/bot-command"
              className={`nav-link ${router.pathname === '/bot-command' ? 'nav-link-active' : ''}`}
            >
              Bot Commands
            </Link>
            <Link
              href="/role-name"
              className={`nav-link ${router.pathname === '/role-name' ? 'nav-link-active' : ''}`}
            >
              Roles
            </Link>
            <Link
              href="/server-rules"
              className={`nav-link ${router.pathname === '/server-rules' ? 'nav-link-active' : ''}`}
            >
              Rules
            </Link>
            <Link
              href="/announcement"
              className={`nav-link ${router.pathname === '/announcement' ? 'nav-link-active' : ''}`}
            >
              Announcements
            </Link>
            <Link
              href="/emoji"
              className={`nav-link ${router.pathname === '/emoji' ? 'nav-link-active' : ''}`}
            >
              Emojis
            </Link>
            <Link
              href="/event"
              className={`nav-link ${router.pathname === '/event' ? 'nav-link-active' : ''}`}
            >
              Events
            </Link>
            <Link
              href="/poll"
              className={`nav-link ${router.pathname === '/poll' ? 'nav-link-active' : ''}`}
            >
              Polls
            </Link>
            <Link
              href="/webhook"
              className={`nav-link ${router.pathname === '/webhook' ? 'nav-link-active' : ''}`}
            >
              Webhooks
            </Link>
            <Link
              href="/moderation"
              className={`nav-link ${router.pathname === '/moderation' ? 'nav-link-active' : ''}`}
            >
              Moderation
            </Link>
          </nav>
        </div>
        
        {/* Mobile navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav 
              className="md:hidden bg-discord-blue-dark dark:bg-discord-menu-gray py-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="container mx-auto px-4 flex flex-col space-y-2">
                <Link
                  href="/server-name"
                  className={`block py-2 px-4 rounded hover:bg-discord-blue transition ${router.pathname === '/server-name' ? 'font-bold bg-discord-blue' : ''}`}
                >
                  Server Names
                </Link>
                <Link
                  href="/server-description"
                  className={`block py-2 px-4 rounded hover:bg-discord-blue transition ${router.pathname === '/server-description' ? 'font-bold bg-discord-blue' : ''}`}
                >
                  Descriptions
                </Link>
                <Link
                  href="/channel-name"
                  className={`block py-2 px-4 rounded hover:bg-discord-blue transition ${router.pathname === '/channel-name' ? 'font-bold bg-discord-blue' : ''}`}
                >
                  Channel Names
                </Link>
                <Link
                  href="/welcome-message"
                  className={`block py-2 px-4 rounded hover:bg-discord-blue transition ${router.pathname === '/welcome-message' ? 'font-bold bg-discord-blue' : ''}`}
                >
                  Welcome Messages
                </Link>
                <Link
                  href="/bot-command"
                  className={`block py-2 px-4 rounded hover:bg-discord-blue transition ${router.pathname === '/bot-command' ? 'font-bold bg-discord-blue' : ''}`}
                >
                  Bot Commands
                </Link>
                <Link
                  href="/role-name"
                  className={`block py-2 px-4 rounded hover:bg-discord-blue transition ${router.pathname === '/role-name' ? 'font-bold bg-discord-blue' : ''}`}
                >
                  Role Names
                </Link>
                <Link
                  href="/server-rules"
                  className={`block py-2 px-4 rounded hover:bg-discord-blue transition ${router.pathname === '/server-rules' ? 'font-bold bg-discord-blue' : ''}`}
                >
                  Server Rules
                </Link>
                <Link
                  href="/announcement"
                  className={`block py-2 px-4 rounded hover:bg-discord-blue transition ${router.pathname === '/announcement' ? 'font-bold bg-discord-blue' : ''}`}
                >
                  Announcements
                </Link>
                <Link
                  href="/emoji"
                  className={`block py-2 px-4 rounded hover:bg-discord-blue transition ${router.pathname === '/emoji' ? 'font-bold bg-discord-blue' : ''}`}
                >
                  Emojis
                </Link>
                
                {/* New generators */}
                <Link
                  href="/event"
                  className={`block py-2 px-4 rounded hover:bg-discord-blue transition ${router.pathname === '/event' ? 'font-bold bg-discord-blue' : ''}`}
                >
                  Events
                </Link>
                <Link
                  href="/poll"
                  className={`block py-2 px-4 rounded hover:bg-discord-blue transition ${router.pathname === '/poll' ? 'font-bold bg-discord-blue' : ''}`}
                >
                  Polls
                </Link>
                <Link
                  href="/webhook"
                  className={`block py-2 px-4 rounded hover:bg-discord-blue transition ${router.pathname === '/webhook' ? 'font-bold bg-discord-blue' : ''}`}
                >
                  Webhooks
                </Link>
                <Link
                  href="/moderation"
                  className={`block py-2 px-4 rounded hover:bg-discord-blue transition ${router.pathname === '/moderation' ? 'font-bold bg-discord-blue' : ''}`}
                >
                  Moderation
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
      
      {/* Main content with page transitions */}
      <ErrorBoundary>
        <main id="main-content" className="flex-grow container mx-auto px-4 py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={router.pathname}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={pageTransitionVariants}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </ErrorBoundary>
      
      {/* Footer */}
      {/* Back to Top Button */}
      <BackToTop />
      
      <footer className="bg-discord-dark dark:bg-discord-darker text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">© {new Date().getFullYear()} Discord AI Generators. All rights reserved.</p>
              <p className="text-sm mt-1">
                <a
                  href="https://github.com/ragekh/discord-generators"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-discord-blue hover:underline"
                >
                  Open Source on GitHub
                </a>
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/" className="text-xs hover:text-discord-blue transition px-1">
                Home
              </Link>
              <Link href="/server-name" className="text-xs hover:text-discord-blue transition px-1">
                Server Names
              </Link>
              <Link href="/server-description" className="text-xs hover:text-discord-blue transition px-1">
                Descriptions
              </Link>
              <Link href="/channel-name" className="text-xs hover:text-discord-blue transition px-1">
                Channels
              </Link>
              <Link href="/welcome-message" className="text-xs hover:text-discord-blue transition px-1">
                Welcome
              </Link>
              <Link href="/bot-command" className="text-xs hover:text-discord-blue transition px-1">
                Bots
              </Link>
              <Link href="/role-name" className="text-xs hover:text-discord-blue transition px-1">
                Roles
              </Link>
              <Link href="/server-rules" className="text-xs hover:text-discord-blue transition px-1">
                Rules
              </Link>
              <Link href="/announcement" className="text-xs hover:text-discord-blue transition px-1">
                Announcements
              </Link>
              <Link href="/emoji" className="text-xs hover:text-discord-blue transition px-1">
                Emojis
              </Link>
              <Link href="/event" className="text-xs hover:text-discord-blue transition px-1">
                Events
              </Link>
              <Link href="/poll" className="text-xs hover:text-discord-blue transition px-1">
                Polls
              </Link>
              <Link href="/webhook" className="text-xs hover:text-discord-blue transition px-1">
                Webhooks
              </Link>
              <Link href="/moderation" className="text-xs hover:text-discord-blue transition px-1">
                Moderation
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}