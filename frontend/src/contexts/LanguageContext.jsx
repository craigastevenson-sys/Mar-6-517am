import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Helper to detect language from domain
const getLanguageFromDomain = () => {
  const hostname = window.location.hostname.toLowerCase();
  if (hostname.includes('avance-langue') || hostname.includes('avancelangue')) {
    return 'fr';
  }
  if (hostname.includes('advancelanguage')) {
    return 'en';
  }
  return null; // No domain preference
};

// Helper to get the correct domain for language switching
const getDomainForLanguage = (lang) => {
  const hostname = window.location.hostname.toLowerCase();
  
  // Only redirect to different domain in production
  if (hostname.includes('advancelanguage') && lang === 'fr') {
    return 'https://avance-langue.com/fr';
  }
  if ((hostname.includes('avance-langue') || hostname.includes('avancelangue')) && lang === 'en') {
    return 'https://advancelanguage.com/en';
  }
  
  return null; // Stay on same domain
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // First check domain
    const domainLang = getLanguageFromDomain();
    if (domainLang) {
      setLanguage(domainLang);
      return;
    }
    
    // Then check URL path for language preference
    const path = window.location.pathname;
    if (path.startsWith('/fr')) {
      setLanguage('fr');
    } else if (path.startsWith('/en')) {
      setLanguage('en');
    } else {
      // Check browser language or default to English
      const browserLang = navigator.language || navigator.userLanguage;
      if (browserLang.startsWith('fr')) {
        setLanguage('fr');
      }
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'fr' : 'en';
    
    // Check if we should redirect to a different domain
    const newDomainUrl = getDomainForLanguage(newLang);
    if (newDomainUrl) {
      window.location.href = newDomainUrl;
      return;
    }
    
    // Same domain - just update language and URL
    setLanguage(newLang);
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(/^\/(en|fr)/, `/${newLang}`);
    window.history.pushState({}, '', newPath === currentPath ? `/${newLang}` : newPath);
  };

  const setLanguageAndNavigate = (lang) => {
    // Check if we should redirect to a different domain
    const newDomainUrl = getDomainForLanguage(lang);
    if (newDomainUrl) {
      window.location.href = newDomainUrl;
      return;
    }
    
    setLanguage(lang);
    window.history.pushState({}, '', `/${lang}`);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage: setLanguageAndNavigate }}>
      {children}
    </LanguageContext.Provider>
  );
};
