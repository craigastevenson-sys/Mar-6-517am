import React, { useState } from 'react';
import { Languages, Menu, X } from 'lucide-react';

const Header = ({ language, toggleLanguage, scrollToSection, t, logoEn, logoFr }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Brand colors
  const BLUE = '#1B3B5F';
  const GOLD = '#D4A84B';

  return (
    <header className="fixed top-0 left-0 right-0 bg-white backdrop-blur-md border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-[72px] md:h-[92px]">
          {/* Logo with Montserrat text */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => scrollToSection('about')}
          >
            <img
              src="/advance-language-icon.png"
              alt={language === 'en' ? 'Advance Language' : 'Avance Langue'}
              className="h-12 md:h-14 w-auto object-contain"
            />
            <span 
              className="text-xl md:text-2xl font-semibold tracking-tight"
              style={{ 
                fontFamily: "'Montserrat', sans-serif",
                color: BLUE,
                marginLeft: '4px'
              }}
            >
              {language === 'en' ? 'Advance' : 'Avance'}{' '}
              <span style={{ fontWeight: 500 }}>
                {language === 'en' ? 'Language' : 'Langue'}
              </span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {language === 'fr' ? (
              <>
                <button onClick={() => scrollToSection('about')} className="text-sm font-medium text-[#1B3B5F] hover:text-[#4A90E2] transition-colors whitespace-nowrap">{t.nav.home}</button>
                <button onClick={() => scrollToSection('french-tefaq')} className="text-sm font-medium text-[#1B3B5F] hover:text-[#4A90E2] transition-colors whitespace-nowrap">Français</button>
                <button onClick={() => scrollToSection('english-esl')} className="text-sm font-medium text-[#1B3B5F] hover:text-[#4A90E2] transition-colors whitespace-nowrap">Anglais</button>
                <button onClick={() => scrollToSection('foreign-languages')} className="text-sm font-medium text-[#1B3B5F] hover:text-[#4A90E2] transition-colors whitespace-nowrap">Langues étrangères</button>
                <button onClick={() => scrollToSection('contact')} className="text-sm font-medium text-[#1B3B5F] hover:text-[#4A90E2] transition-colors whitespace-nowrap">{t.nav.contact}</button>
              </>
            ) : (
              <>
                <button onClick={() => scrollToSection('about')} className="text-sm font-medium text-[#1B3B5F] hover:text-[#4A90E2] transition-colors whitespace-nowrap">{t.nav.home}</button>
                <button onClick={() => scrollToSection('english-esl')} className="text-sm font-medium text-[#1B3B5F] hover:text-[#4A90E2] transition-colors whitespace-nowrap">English</button>
                <button onClick={() => scrollToSection('french-tefaq')} className="text-sm font-medium text-[#1B3B5F] hover:text-[#4A90E2] transition-colors whitespace-nowrap">French</button>
                <button onClick={() => scrollToSection('foreign-languages')} className="text-sm font-medium text-[#1B3B5F] hover:text-[#4A90E2] transition-colors whitespace-nowrap">Foreign Languages</button>
                <button onClick={() => scrollToSection('contact')} className="text-sm font-medium text-[#1B3B5F] hover:text-[#4A90E2] transition-colors whitespace-nowrap">{t.nav.contact}</button>
              </>
            )}
          </nav>

          {/* Desktop Language Toggle */}
          <button
            data-testid="language-toggle-btn"
            onClick={toggleLanguage}
            className="hidden lg:flex items-center space-x-2 px-6 py-2.5 bg-[#1B3B5F] text-white hover:bg-[#2C5F8D] transition-all duration-300 font-medium text-sm flex-shrink-0"
          >
            <Languages className="w-4 h-4" />
            <span>{language === 'en' ? 'FR' : 'EN'}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#1B3B5F]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav className="flex flex-col px-4 py-4 space-y-4">
            {language === 'fr' ? (
              <>
                <button onClick={() => { scrollToSection('about'); setMobileMenuOpen(false); }} className="text-left text-base font-medium text-[#1B3B5F] hover:text-[#4A90E2] transition-colors py-2">{t.nav.home}</button>
                <button onClick={() => { scrollToSection('french-tefaq'); setMobileMenuOpen(false); }} className="text-left text-base font-medium text-[#1B3B5F] hover:text-[#4A90E2] transition-colors py-2">Français</button>
                <button onClick={() => { scrollToSection('english-esl'); setMobileMenuOpen(false); }} className="text-left text-base font-medium text-[#1B3B5F] hover:text-[#4A90E2] transition-colors py-2">Anglais</button>
                <button onClick={() => { scrollToSection('foreign-languages'); setMobileMenuOpen(false); }} className="text-left text-base font-medium text-[#1B3B5F] hover:text-[#4A90E2] transition-colors py-2">Langues étrangères</button>
                <button onClick={() => { scrollToSection('bill96'); setMobileMenuOpen(false); }} className="text-left text-base font-medium text-[#1B3B5F] hover:text-[#4A90E2] transition-colors py-2">Loi 96</button>
                <button onClick={() => { scrollToSection('contact'); setMobileMenuOpen(false); }} className="text-left text-base font-medium text-[#1B3B5F] hover:text-[#4A90E2] transition-colors py-2">{t.nav.contact}</button>
              </>
            ) : (
              <>
                <button onClick={() => { scrollToSection('about'); setMobileMenuOpen(false); }} className="text-left text-base font-medium text-[#1B3B5F] hover:text-[#4A90E2] transition-colors py-2">{t.nav.home}</button>
                <button onClick={() => { scrollToSection('english-esl'); setMobileMenuOpen(false); }} className="text-left text-base font-medium text-[#1B3B5F] hover:text-[#4A90E2] transition-colors py-2">English</button>
                <button onClick={() => { scrollToSection('french-tefaq'); setMobileMenuOpen(false); }} className="text-left text-base font-medium text-[#1B3B5F] hover:text-[#4A90E2] transition-colors py-2">French</button>
                <button onClick={() => { scrollToSection('foreign-languages'); setMobileMenuOpen(false); }} className="text-left text-base font-medium text-[#1B3B5F] hover:text-[#4A90E2] transition-colors py-2">Foreign Languages</button>
                <button onClick={() => { scrollToSection('bill96'); setMobileMenuOpen(false); }} className="text-left text-base font-medium text-[#1B3B5F] hover:text-[#4A90E2] transition-colors py-2">Bill 96</button>
                <button onClick={() => { scrollToSection('contact'); setMobileMenuOpen(false); }} className="text-left text-base font-medium text-[#1B3B5F] hover:text-[#4A90E2] transition-colors py-2">{t.nav.contact}</button>
              </>
            )}
            <button
              onClick={() => { toggleLanguage(); setMobileMenuOpen(false); }}
              className="flex items-center space-x-2 px-6 py-3 bg-[#1B3B5F] text-white hover:bg-[#2C5F8D] transition-all duration-300 font-medium text-sm w-full justify-center mt-2"
            >
              <Languages className="w-4 h-4" />
              <span>{language === 'en' ? 'Français' : 'English'}</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
