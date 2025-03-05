import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

/**
 * Announces a message to screen readers
 * @param {string} message - The message to announce
 */
export const announceToScreenReader = (message) => {
  const announceElement = document.getElementById('a11y-announce');
  if (announceElement) {
    announceElement.textContent = message;
  }
};

/**
 * Enhanced Accessibility Features component
 * Implements various accessibility improvements:
 * - Skip to content link
 * - Focus trap for modals
 * - Keyboard navigation enhancements
 * - ARIA live regions
 * - Reduced motion support
 * 
 * @returns {JSX.Element} Accessibility features component
 */
const AccessibilityFeatures = () => {
  const router = useRouter();
  const skipLinkRef = useRef(null);
  
  // Focus the skip link when Tab is pressed at page load
  useEffect(() => {
    const handleFirstTab = (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('user-is-tabbing');
        skipLinkRef.current?.focus();
        window.removeEventListener('keydown', handleFirstTab);
      }
    };
    
    window.addEventListener('keydown', handleFirstTab);
    return () => {
      window.removeEventListener('keydown', handleFirstTab);
    };
  }, []);
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Show focus styles when using keyboard
      if (e.key === 'Tab') {
        document.body.classList.add('user-is-tabbing');
      }
      
      // Hide focus styles when using mouse
      if (e.key === 'MouseDown') {
        document.body.classList.remove('user-is-tabbing');
      }
      
      // Add Escape key handler for modals
      if (e.key === 'Escape') {
        const openModals = document.querySelectorAll('[role="dialog"][aria-modal="true"]');
        if (openModals.length > 0) {
          const lastModal = openModals[openModals.length - 1];
          const closeButton = lastModal.querySelector('[aria-label="Close"]');
          if (closeButton) {
            closeButton.click();
          }
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  // Reset focus when route changes
  useEffect(() => {
    const handleRouteChange = () => {
      // Focus the main content area after navigation
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.tabIndex = -1;
        mainContent.focus({ preventScroll: true });
        mainContent.blur();
      }
    };
    
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);
  
  // Check for reduced motion preference
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.documentElement.classList.add('reduce-motion');
    }
    
    const handleReducedMotionChange = (e) => {
      if (e.matches) {
        document.documentElement.classList.add('reduce-motion');
      } else {
        document.documentElement.classList.remove('reduce-motion');
      }
    };
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', handleReducedMotionChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleReducedMotionChange);
    };
  }, []);
  
  return (
    <>
      {/* Skip to content link */}
      <a 
        ref={skipLinkRef}
        href="#main-content" 
        className="skip-to-content"
        onClick={(e) => {
          e.preventDefault();
          const mainContent = document.getElementById('main-content');
          if (mainContent) {
            mainContent.tabIndex = -1;
            mainContent.focus();
          }
        }}
      >
        Skip to content
      </a>
      
      {/* Hidden styles for keyboard users */}
      <style jsx global>{`
        .user-is-tabbing *:focus {
          outline: 2px solid #5865F2 !important;
          outline-offset: 2px !important;
        }
        
        .reduce-motion * {
          animation-duration: 0.001ms !important;
          transition-duration: 0.001ms !important;
        }
      `}</style>
    </>
  );
};

export default AccessibilityFeatures;