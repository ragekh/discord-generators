import React from 'react';

/**
 * ErrorBoundary component for catching and handling React errors
 * Prevents the entire application from crashing when an error occurs in a component
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
    
    // You could also log to an error reporting service here
    // Example: logErrorToService(error, errorInfo);
  }

  render() {
    const { hasError, error, errorInfo } = this.state;
    const { fallback, children } = this.props;
    
    if (hasError) {
      // If a custom fallback is provided, use it
      if (fallback) {
        return fallback(error, errorInfo, this.resetError);
      }
      
      // Otherwise, use the default error UI
      return (
        <div className="p-6 bg-white dark:bg-discord-dark rounded-lg shadow-md border border-red-200 dark:border-red-900">
          <div className="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Something went wrong</h2>
          </div>
          
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            We're sorry, but an error occurred while rendering this component.
          </p>
          
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4">
              <details className="mb-4">
                <summary className="cursor-pointer text-discord-blue hover:underline">
                  View error details
                </summary>
                <div className="mt-2 p-4 bg-gray-100 dark:bg-gray-800 rounded overflow-auto text-sm">
                  <p className="font-mono text-red-600 dark:text-red-400 mb-2">
                    {error && error.toString()}
                  </p>
                  {errorInfo && (
                    <pre className="font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {errorInfo.componentStack}
                    </pre>
                  )}
                </div>
              </details>
            </div>
          )}
          
          <div className="mt-4">
            <button
              onClick={this.resetError}
              className="px-4 py-2 bg-discord-blue hover:bg-discord-blue-dark text-white rounded transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    // If there's no error, render children normally
    return children;
  }
  
  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  }
}

export default ErrorBoundary;

/**
 * withErrorBoundary HOC for wrapping components with ErrorBoundary
 * @param {React.Component} Component - Component to wrap
 * @param {Function} fallback - Optional custom fallback UI
 * @returns {React.Component} Wrapped component with error boundary
 */
export const withErrorBoundary = (Component, fallback) => {
  const WithErrorBoundary = (props) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  );
  
  // Set display name for debugging
  const displayName = Component.displayName || Component.name || 'Component';
  WithErrorBoundary.displayName = `withErrorBoundary(${displayName})`;
  
  return WithErrorBoundary;
};