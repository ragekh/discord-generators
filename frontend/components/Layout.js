import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import AccessibilityFeatures, { announceToScreenReader } from './AccessibilityFeatures';
import SecurityHeaders from './SecurityHeaders';
import PerformanceOptimization from './PerformanceOptimization';

export default function Layout({ children }) {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#2C2F33] dark:text-gray-200">
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
      <header className="bg-[#5865F2] text-white shadow-md dark:bg-[#36393F]">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold hover:text-white/90 transition" aria-label="Discord AI Generators Home">
            Discord AI Generators
          </Link>
          
          <div className="flex items-center space-x-2">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md focus:outline-none"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md focus:outline-none"
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
              className={`text-sm hover:text-white/90 transition px-2 ${router.pathname === '/server-name' ? 'font-bold' : ''}`}
            >
              Server Names
            </Link>
            <Link
              href="/server-description"
              className={`text-sm hover:text-white/90 transition px-2 ${router.pathname === '/server-description' ? 'font-bold' : ''}`}
            >
              Descriptions
            </Link>
            <Link
              href="/channel-name"
              className={`text-sm hover:text-white/90 transition px-2 ${router.pathname === '/channel-name' ? 'font-bold' : ''}`}
            >
              Channel Names
            </Link>
            <Link
              href="/welcome-message"
              className={`text-sm hover:text-white/90 transition px-2 ${router.pathname === '/welcome-message' ? 'font-bold' : ''}`}
            >
              Welcome
            </Link>
            <Link
              href="/bot-command"
              className={`text-sm hover:text-white/90 transition px-2 ${router.pathname === '/bot-command' ? 'font-bold' : ''}`}
            >
              Bot Commands
            </Link>
            <Link
              href="/role-name"
              className={`text-sm hover:text-white/90 transition px-2 ${router.pathname === '/role-name' ? 'font-bold' : ''}`}
            >
              Roles
            </Link>
            <Link
              href="/server-rules"
              className={`text-sm hover:text-white/90 transition px-2 ${router.pathname === '/server-rules' ? 'font-bold' : ''}`}
            >
              Rules
            </Link>
            <Link
              href="/announcement"
              className={`text-sm hover:text-white/90 transition px-2 ${router.pathname === '/announcement' ? 'font-bold' : ''}`}
            >
              Announcements
            </Link>
            <Link
              href="/emoji"
              className={`text-sm hover:text-white/90 transition px-2 ${router.pathname === '/emoji' ? 'font-bold' : ''}`}
            >
              Emojis
            </Link>
            <Link
              href="/event"
              className={`text-sm hover:text-white/90 transition px-2 ${router.pathname === '/event' ? 'font-bold' : ''}`}
            >
              Events
            </Link>
            <Link
              href="/poll"
              className={`text-sm hover:text-white/90 transition px-2 ${router.pathname === '/poll' ? 'font-bold' : ''}`}
            >
              Polls
            </Link>
            <Link
              href="/webhook"
              className={`text-sm hover:text-white/90 transition px-2 ${router.pathname === '/webhook' ? 'font-bold' : ''}`}
            >
              Webhooks
            </Link>
            <Link
              href="/moderation"
              className={`text-sm hover:text-white/90 transition px-2 ${router.pathname === '/moderation' ? 'font-bold' : ''}`}
            >
              Moderation
            </Link>
          </nav>
        </div>
        
        {/* Mobile navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden bg-[#4752C4] dark:bg-[#2F3136] py-2">
            <div className="container mx-auto px-4 flex flex-col space-y-2">
              <Link
                href="/server-name"
                className={`block py-2 px-4 rounded hover:bg-[#5865F2] transition ${router.pathname === '/server-name' ? 'font-bold bg-[#5865F2]' : ''}`}
              >
                Server Names
              </Link>
              <Link
                href="/server-description"
                className={`block py-2 px-4 rounded hover:bg-[#5865F2] transition ${router.pathname === '/server-description' ? 'font-bold bg-[#5865F2]' : ''}`}
              >
                Descriptions
              </Link>
              <Link
                href="/channel-name"
                className={`block py-2 px-4 rounded hover:bg-[#5865F2] transition ${router.pathname === '/channel-name' ? 'font-bold bg-[#5865F2]' : ''}`}
              >
                Channel Names
              </Link>
              <Link
                href="/welcome-message"
                className={`block py-2 px-4 rounded hover:bg-[#5865F2] transition ${router.pathname === '/welcome-message' ? 'font-bold bg-[#5865F2]' : ''}`}
              >
                Welcome Messages
              </Link>
              <Link
                href="/bot-command"
                className={`block py-2 px-4 rounded hover:bg-[#5865F2] transition ${router.pathname === '/bot-command' ? 'font-bold bg-[#5865F2]' : ''}`}
              >
                Bot Commands
              </Link>
              <Link
                href="/role-name"
                className={`block py-2 px-4 rounded hover:bg-[#5865F2] transition ${router.pathname === '/role-name' ? 'font-bold bg-[#5865F2]' : ''}`}
              >
                Role Names
              </Link>
              <Link
                href="/server-rules"
                className={`block py-2 px-4 rounded hover:bg-[#5865F2] transition ${router.pathname === '/server-rules' ? 'font-bold bg-[#5865F2]' : ''}`}
              >
                Server Rules
              </Link>
              <Link
                href="/announcement"
                className={`block py-2 px-4 rounded hover:bg-[#5865F2] transition ${router.pathname === '/announcement' ? 'font-bold bg-[#5865F2]' : ''}`}
              >
                Announcements
              </Link>
              <Link
                href="/emoji"
                className={`block py-2 px-4 rounded hover:bg-[#5865F2] transition ${router.pathname === '/emoji' ? 'font-bold bg-[#5865F2]' : ''}`}
              >
                Emojis
              </Link>
              
              {/* New generators */}
              <Link
                href="/event"
                className={`block py-2 px-4 rounded hover:bg-[#5865F2] transition ${router.pathname === '/event' ? 'font-bold bg-[#5865F2]' : ''}`}
              >
                Events
              </Link>
              <Link
                href="/poll"
                className={`block py-2 px-4 rounded hover:bg-[#5865F2] transition ${router.pathname === '/poll' ? 'font-bold bg-[#5865F2]' : ''}`}
              >
                Polls
              </Link>
              <Link
                href="/webhook"
                className={`block py-2 px-4 rounded hover:bg-[#5865F2] transition ${router.pathname === '/webhook' ? 'font-bold bg-[#5865F2]' : ''}`}
              >
                Webhooks
              </Link>
              <Link
                href="/moderation"
                className={`block py-2 px-4 rounded hover:bg-[#5865F2] transition ${router.pathname === '/moderation' ? 'font-bold bg-[#5865F2]' : ''}`}
              >
                Moderation
              </Link>
            </div>
          </nav>
        )}
      </header>
      
      {/* Main content */}
      <main id="main-content" className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-[#2C2F33] dark:bg-[#202225] text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">© {new Date().getFullYear()} Discord AI Generators. All rights reserved.</p>
              <p className="text-sm mt-1">
                <a
                  href="https://github.com/ragekh/discord-generators"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5865F2] hover:underline"
                >
                  Open Source on GitHub
                </a>
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/" className="text-xs hover:text-[#5865F2] transition px-1">
                Home
              </Link>
              <Link href="/server-name" className="text-xs hover:text-[#5865F2] transition px-1">
                Server Names
              </Link>
              <Link href="/server-description" className="text-xs hover:text-[#5865F2] transition px-1">
                Descriptions
              </Link>
              <Link href="/channel-name" className="text-xs hover:text-[#5865F2] transition px-1">
                Channels
              </Link>
              <Link href="/welcome-message" className="text-xs hover:text-[#5865F2] transition px-1">
                Welcome
              </Link>
              <Link href="/bot-command" className="text-xs hover:text-[#5865F2] transition px-1">
                Bots
              </Link>
              <Link href="/role-name" className="text-xs hover:text-[#5865F2] transition px-1">
                Roles
              </Link>
              <Link href="/server-rules" className="text-xs hover:text-[#5865F2] transition px-1">
                Rules
              </Link>
              <Link href="/announcement" className="text-xs hover:text-[#5865F2] transition px-1">
                Announcements
              </Link>
              <Link href="/emoji" className="text-xs hover:text-[#5865F2] transition px-1">
                Emojis
              </Link>
              <Link href="/event" className="text-xs hover:text-[#5865F2] transition px-1">
                Events
              </Link>
              <Link href="/poll" className="text-xs hover:text-[#5865F2] transition px-1">
                Polls
              </Link>
              <Link href="/webhook" className="text-xs hover:text-[#5865F2] transition px-1">
                Webhooks
              </Link>
              <Link href="/moderation" className="text-xs hover:text-[#5865F2] transition px-1">
                Moderation
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}