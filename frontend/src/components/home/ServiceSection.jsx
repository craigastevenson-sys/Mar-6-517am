import React from 'react';
import { ArrowRight } from 'lucide-react';
import ImageCarousel from '../ImageCarousel';

const ServiceSection = ({ service, sectionId, index, language, scrollToSection }) => {
  const isEven = index % 2 === 0;

  return (
    <section
      id={sectionId}
      className={`py-16 md:py-24 scroll-mt-20 md:scroll-mt-24 ${isEven ? 'bg-gradient-to-br from-[#f8f6f1] to-[#f0ede6]' : 'bg-white'}`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${!isEven ? 'lg:direction-rtl' : ''}`}>
          <div className={!isEven ? 'lg:order-2' : ''}>
            <div className="inline-block px-4 py-2 bg-[#1B3B5F] text-white text-xs font-semibold tracking-wider uppercase mb-4 md:mb-6 rounded-sm">
              {language === 'en' ? 'Our Services' : 'Nos services'}
            </div>
            <h2 className="text-2xl md:text-3xl font-normal text-[#1B3B5F] mb-4 md:mb-6 leading-tight">
              {service.title}
            </h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6 md:mb-8">
              {service.description}
            </p>
            <div className="space-y-3 md:space-y-4 mb-8 md:mb-10">
              {service.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{background: 'linear-gradient(135deg, #F0D078 0%, #EAB333 100%)'}}>
                    <svg className="w-3 h-3 md:w-3.5 md:h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <p className="text-sm md:text-base text-gray-700">{feature}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 text-white font-semibold text-sm tracking-wide transition-all duration-300 rounded-sm hover:shadow-lg hover:translate-y-[-2px]"
              style={{background: 'linear-gradient(135deg, #1B3B5F 0%, #2C5F8D 100%)'}}
            >
              <span>{language === 'en' ? 'Get Started' : 'Commencer'}</span>
              <ArrowRight className="w-4 h-4 ml-3" />
            </button>
          </div>
          <div className={`${!isEven ? 'lg:order-1' : ''}`}>
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-br from-[#EAB333]/15 to-[#1B3B5F]/10 rounded-2xl blur-lg"></div>
              <div className="relative rounded-xl overflow-hidden shadow-xl">
                <ImageCarousel aspectClass="aspect-[4/3]" startIndex={index * 2} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
