import React from 'react';

/**
 * Accessibility Features Component
 * Adds important accessibility features to improve user experience and SEO
 * 
 * @returns {JSX.Element} - Accessibility features like skip navigation
 */
const AccessibilityFeatures = () => {
  return (
    <>
      {/* Skip to main content link - helps keyboard users skip navigation */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-white focus:text-black focus:outline-none"
      >
        Skip to main content
      </a>
      
      {/* Accessibility announcement region for screen readers */}
      <div 
        id="accessibility-announcer" 
        className="sr-only" 
        aria-live="polite" 
        aria-atomic="true"
      ></div>
    </>
  );
};

/**
 * Utility function to announce messages to screen readers
 * @param {string} message - The message to announce
 */
export const announceToScreenReader = (message) => {
  if (typeof window !== 'undefined') {
    const announcer = document.getElementById('accessibility-announcer');
    if (announcer) {
      announcer.textContent = message;
    }
  }
};

export default AccessibilityFeatures;