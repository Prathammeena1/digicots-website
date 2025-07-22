import React, { createContext, useContext, useRef } from 'react';

// Create context
const LogoContext = createContext();

// Context provider
export const LogoProvider = ({ children }) => {
  const navigationLogoRef = useRef(null);

  const value = {
    navigationLogoRef,
  };

  return <LogoContext.Provider value={value}>{children}</LogoContext.Provider>;
};

// Custom hook to use the logo context
export const useLogo = () => {
  const context = useContext(LogoContext);
  
  if (!context) {
    throw new Error('useLogo must be used within a LogoProvider');
  }
  
  return context;
};

export default LogoContext;
