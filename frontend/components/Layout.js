import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import AccessibilityFeatures, { announceToScreenReader } from './AccessibilityFeatures';
import SecurityHeaders from './SecurityHeaders';
import PerformanceOptimization from './PerformanceOptimization';

export default function Layout({ children }) {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [router.pathname]);
  
  // Announce page changes to screen readers
  useEffect(() => {
    const pageTitle = document.title || 'Discord AI Generators';
    announceToScreenReader(`Navigated to ${pageTitle}`);
  }, [router.pathname]);
  
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
    <div className="min-h-screen flex flex-col bg-gray-50">
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
      <header className="bg-[#5865F2] text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold hover:text-white/90 transition" aria-label="Discord AI Generators Home">
            Discord AI Generators
          </Link>
          
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
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-4">
            <Link
              href="/server-name"
              className={`hover:text-white/90 transition ${router.pathname === '/server-name' ? 'font-bold' : ''}`}
            >
              Server Names
            </Link>
            <Link
              href="/server-description"
              className={`hover:text-white/90 transition ${router.pathname === '/server-description' ? 'font-bold' : ''}`}
            >
              Descriptions
            </Link>
            <Link
              href="/channel-name"
              className={`hover:text-white/90 transition ${router.pathname === '/channel-name' ? 'font-bold' : ''}`}
            >
              Channel Names
            </Link>
            <Link
              href="/welcome-message"
              className={`hover:text-white/90 transition ${router.pathname === '/welcome-message' ? 'font-bold' : ''}`}
            >
              Welcome Messages
            </Link>
            <Link
              href="/bot-command"
              className={`hover:text-white/90 transition ${router.pathname === '/bot-command' ? 'font-bold' : ''}`}
            >
              Bot Commands
            </Link>
            <Link
              href="/role-name"
              className={`hover:text-white/90 transition ${router.pathname === '/role-name' ? 'font-bold' : ''}`}
            >
              Role Names
            </Link>
            <Link
              href="/server-rules"
              className={`hover:text-white/90 transition ${router.pathname === '/server-rules' ? 'font-bold' : ''}`}
            >
              Server Rules
            </Link>
            <Link
              href="/announcement"
              className={`hover:text-white/90 transition ${router.pathname === '/announcement' ? 'font-bold' : ''}`}
            >
              Announcements
            </Link>
          </nav>
        </div>
        
        {/* Mobile navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden bg-[#4752C4] py-2">
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
            </div>
          </nav>
        )}
      </header>
      
      {/* Main content */}
      <main id="main-content" className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-[#2C2F33] text-white py-6">
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
            <div className="flex flex-wrap gap-4">
              <Link href="/" className="text-sm hover:text-[#5865F2] transition">
                Home
              </Link>
              <Link href="/server-name" className="text-sm hover:text-[#5865F2] transition">
                Server Names
              </Link>
              <Link href="/server-description" className="text-sm hover:text-[#5865F2] transition">
                Descriptions
              </Link>
              <Link href="/channel-name" className="text-sm hover:text-[#5865F2] transition">
                Channel Names
              </Link>
              <Link href="/welcome-message" className="text-sm hover:text-[#5865F2] transition">
                Welcome Messages
              </Link>
              <Link href="/bot-command" className="text-sm hover:text-[#5865F2] transition">
                Bot Commands
              </Link>
              <Link href="/role-name" className="text-sm hover:text-[#5865F2] transition">
                Role Names
              </Link>
              <Link href="/server-rules" className="text-sm hover:text-[#5865F2] transition">
                Server Rules
              </Link>
              <Link href="/announcement" className="text-sm hover:text-[#5865F2] transition">
                Announcements
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}