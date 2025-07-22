import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('FluidCanvas Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div className="w-full h-full bg-black flex items-center justify-center">
          <div className="text-white text-center">
            <h2 className="text-xl mb-2">Something went wrong with the fluid canvas</h2>
            <p className="text-sm opacity-70">The page will continue to work normally</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
