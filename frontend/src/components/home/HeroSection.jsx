import React from 'react';
import { ArrowRight } from 'lucide-react';
import ImageCarousel from '../ImageCarousel';

const HeroSection = ({ language, t, scrollToSection }) => {
  return (
    <section id="about" className="pt-28 md:pt-36 pb-16 md:pb-24 bg-gradient-to-br from-[#f8f6f1] via-[#f0ede6] to-[#e8e4db] relative overflow-hidden">
      <div className="absolute top-20 right-0 w-72 h-72 bg-[#1B3B5F]/[0.03] rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#EAB333]/[0.05] rounded-full blur-3xl"></div>
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <div>
            <div className="inline-block px-4 py-2 bg-[#1B3B5F] text-white text-xs font-semibold tracking-wider uppercase mb-6 rounded-sm">
              {t.about.title}
            </div>
            <h2 className="text-3xl md:text-5xl font-normal text-[#1B3B5F] mb-6 md:mb-8 leading-tight">
              {t.about.heading}
            </h2>
            <div className="space-y-4 md:space-y-6 text-base md:text-lg text-gray-600 leading-relaxed">
              <p>{t.about.paragraph1}</p>
              <p>{t.about.paragraph2}</p>
            </div>
            <button
              onClick={() => scrollToSection('contact')}
              className="mt-8 md:mt-10 inline-flex items-center px-6 md:px-8 py-3 md:py-4 text-white font-semibold text-sm tracking-wide transition-all duration-300 rounded-sm hover:shadow-lg hover:translate-y-[-2px]"
              style={{background: 'linear-gradient(135deg, #1B3B5F 0%, #2C5F8D 100%)'}}
            >
              <span>{language === 'en' ? 'Get Started' : 'Commencer'}</span>
              <ArrowRight className="w-4 h-4 ml-3" />
            </button>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-[#EAB333]/20 to-[#1B3B5F]/10 rounded-2xl blur-xl"></div>
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <ImageCarousel aspectClass="aspect-[4/3]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
