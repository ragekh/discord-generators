import Image from 'next/image';
import { useState } from 'react';

/**
 * OptimizedImage component for optimized image loading
 * Uses Next.js Image component with additional features:
 * - Lazy loading
 * - Blur-up placeholder
 * - Loading state
 * - Error handling
 * - Accessibility improvements
 * 
 * @param {Object} props Component props
 * @param {string} props.src Image source URL
 * @param {number} props.width Image width
 * @param {number} props.height Image height
 * @param {string} props.alt Image alt text (required for accessibility)
 * @param {string} props.className Additional CSS classes
 * @param {Object} props.style Additional inline styles
 * @param {string} props.objectFit CSS object-fit property
 * @param {string} props.objectPosition CSS object-position property
 * @param {boolean} props.priority Whether to prioritize loading this image
 * @param {string} props.placeholder Placeholder type ('blur' or 'empty')
 * @param {string} props.blurDataURL Base64 data URL for blur placeholder
 * @returns {JSX.Element} Optimized image component
 */
const OptimizedImage = ({
  src,
  width,
  height,
  alt = '',
  className = '',
  style = {},
  objectFit = 'cover',
  objectPosition = 'center',
  priority = false,
  placeholder = 'empty',
  blurDataURL,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  
  // Default blur placeholder if not provided
  const defaultBlurDataURL = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjFmMWYxIiAvPjwvc3ZnPg==';
  
  // Handle loading complete
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };
  
  // Handle loading error
  const handleError = () => {
    setIsError(true);
    setIsLoading(false);
  };
  
  // Fallback for error state
  if (isError) {
    return (
      <div 
        className={`relative overflow-hidden bg-gray-200 dark:bg-gray-700 ${className}`}
        style={{ 
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height,
          ...style 
        }}
        role="img"
        aria-label={alt || 'Image failed to load'}
      >
        <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700 animate-pulse">
          <span className="sr-only">Loading image...</span>
        </div>
      )}
      
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={blurDataURL || defaultBlurDataURL}
        onLoadingComplete={handleLoadingComplete}
        onError={handleError}
        style={{
          objectFit,
          objectPosition,
        }}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;