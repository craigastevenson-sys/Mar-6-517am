import React from 'react';
import { AlertTriangle } from 'lucide-react';

const Bill96Banner = ({ t, scrollToSection }) => {
  return (
    <section className="py-4 md:py-6 bg-gradient-to-r from-[#EAB333] to-[#d4a020]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-base md:text-lg font-bold text-white">{t.bill96.banner.title}</h3>
              <p className="text-sm md:text-base text-white/90">{t.bill96.banner.subtitle}</p>
            </div>
          </div>
          <button
            onClick={() => scrollToSection('bill96')}
            className="px-5 py-2 md:px-6 md:py-3 bg-white text-[#1B3B5F] font-semibold text-sm rounded-sm hover:bg-gray-100 transition-all duration-300 whitespace-nowrap"
          >
            {t.bill96.banner.cta}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Bill96Banner;
