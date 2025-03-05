import { useState, useEffect } from 'react';
import AnimatedElement from './AnimatedElement';

/**
 * BackToTop component that appears when user scrolls down
 * and allows them to smoothly scroll back to the top of the page
 * 
 * @returns {JSX.Element} Back to top button component
 */
const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when user scrolls down 300px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Announce to screen readers
    const announceElement = document.getElementById('a11y-announce');
    if (announceElement) {
      announceElement.textContent = 'Scrolled to top of page';
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <AnimatedElement
      animation="fade"
      duration={0.3}
      className="fixed bottom-6 right-6 z-40"
    >
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        title="Back to top"
        className="bg-discord-blue hover:bg-discord-blue-dark text-white p-3 rounded-full shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-discord-blue"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </AnimatedElement>
  );
};

export default BackToTop;