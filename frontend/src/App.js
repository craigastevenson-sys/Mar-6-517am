import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import GiantStepsTutors from './pages/GiantStepsTutors';
import { Toaster } from './components/ui/toaster';
import { LanguageProvider } from './contexts/LanguageContext';

// Domain detection for multi-site routing
const getDomainTarget = () => {
  const hostname = window.location.hostname.toLowerCase();
  
  // Giant Steps Tutors domain
  if (hostname.includes('giantstepstutors')) {
    return '/tutors';
  }
  
  // French domain (avance-langue)
  if (hostname.includes('avance-langue') || hostname.includes('avancelangue')) {
    return '/fr';
  }
  
  // English domain (advancelanguage) or default
  if (hostname.includes('advancelanguage')) {
    return '/en';
  }
  
  // For preview/development - use browser language
  const browserLang = navigator.language || navigator.userLanguage || 'en';
  return browserLang.startsWith('fr') ? '/fr' : '/en';
};

const DomainRedirect = () => {
  const target = getDomainTarget();
  return <Navigate to={target} replace />;
};

// For tutors domain, redirect root to /tutors content but keep clean URL
const TutorsWrapper = () => {
  const hostname = window.location.hostname.toLowerCase();
  if (hostname.includes('giantstepstutors')) {
    return <GiantStepsTutors />;
  }
  return <DomainRedirect />;
};

function App() {
  const hostname = window.location.hostname.toLowerCase();
  const isTutorsDomain = hostname.includes('giantstepstutors');
  const isFrenchDomain = hostname.includes('avance-langue') || hostname.includes('avancelangue');
  const isEnglishDomain = hostname.includes('advancelanguage');

  return (
    <div className="App">
      <BrowserRouter>
        <LanguageProvider>
          <Routes>
            {/* Root path - domain-based routing */}
            <Route path="/" element={
              isTutorsDomain ? <GiantStepsTutors /> :
              isFrenchDomain ? <Navigate to="/fr" replace /> :
              isEnglishDomain ? <Navigate to="/en" replace /> :
              <DomainRedirect />
            } />
            
            {/* Language routes for Advance Language */}
            <Route path="/en" element={<Home />} />
            <Route path="/fr" element={<Home />} />
            
            {/* Tutors route */}
            <Route path="/tutors" element={<GiantStepsTutors />} />
            
            {/* Catch-all - redirect based on domain */}
            <Route path="*" element={
              isTutorsDomain ? <GiantStepsTutors /> : <DomainRedirect />
            } />
          </Routes>
          <Toaster />
        </LanguageProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
