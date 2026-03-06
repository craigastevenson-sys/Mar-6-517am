import React from 'react';

const Footer = ({ language, t, services, scrollToSection, logoEn, logoFr }) => {
  const sectionIds = language === 'fr'
    ? ['french-tefaq', 'english-esl', 'foreign-languages']
    : ['english-esl', 'french-tefaq', 'foreign-languages'];

  return (
    <footer className="py-10 md:py-16 bg-[#0f2136] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12">
          <div className="text-center md:text-left">
            <img
              src={language === 'en' ? logoEn : logoFr}
              alt={language === 'en' ? 'Advance Language' : 'Avance Langues'}
              className="h-10 md:h-12 w-auto object-contain mb-4 brightness-0 invert mx-auto md:mx-0"
            />
            <p className="text-xs md:text-sm text-white/50 leading-relaxed">
              {language === 'en'
                ? 'Premier corporate language and professional skills training.'
                : 'Formation linguistique et professionnelle de premier plan.'}
            </p>
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-xs md:text-sm font-semibold text-white/80 uppercase tracking-wider mb-3 md:mb-4">
              {language === 'en' ? 'Services' : 'Services'}
            </h4>
            <div className="space-y-2">
              {services.map((s, i) => (
                <button key={i} onClick={() => scrollToSection(sectionIds[i])} className="block text-xs md:text-sm text-white/50 hover:text-white/80 transition-colors mx-auto md:mx-0">
                  {s.title}
                </button>
              ))}
            </div>
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-xs md:text-sm font-semibold text-white/80 uppercase tracking-wider mb-3 md:mb-4">
              {language === 'en' ? 'Contact' : 'Contact'}
            </h4>
            <button onClick={() => scrollToSection('contact')} className="text-xs md:text-sm text-white/50 hover:text-white/80 transition-colors">
              {language === 'en' ? 'Get in Touch' : 'Nous contacter'}
            </button>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 md:pt-8">
          <p className="text-xs md:text-sm text-white/40 text-center">{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
