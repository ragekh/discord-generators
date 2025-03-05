import { useState, useEffect } from 'react';

/**
 * A button component that copies text to clipboard
 * @param {Object} props - Component props
 * @param {string} props.text - Text to copy to clipboard
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} - Copy button component
 */
const CopyButton = ({ text, className = '' }) => {
  const [copied, setCopied] = useState(false);
  
  // Reset copied state after 2 seconds
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [copied]);
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };
  
  return (
    <button
      onClick={handleCopy}
      className={`px-3 py-1 rounded-md text-sm font-medium transition ${
        copied
          ? 'bg-green-500 text-white'
          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
      } ${className}`}
      aria-label={copied ? 'Copied to clipboard' : 'Copy to clipboard'}
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
};

export default CopyButton;