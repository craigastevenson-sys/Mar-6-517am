import React, { useState } from 'react';
import { ArrowRight, FileText, Building2, Users, Scale, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

const Bill96Detail = ({ language, t, scrollToSection }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="bill96" className="py-12 md:py-16 bg-gradient-to-br from-[#f8f6f1] to-[#f0ede6] scroll-mt-20 md:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="max-w-4xl mb-6 md:mb-8">
          <div className="inline-block px-4 py-2 bg-[#EAB333] text-white text-xs font-semibold tracking-wider uppercase mb-4 md:mb-6 rounded-sm">
            {t.bill96.section.label}
          </div>
          <h2 className="text-2xl md:text-4xl font-normal text-[#1B3B5F] mb-4 md:mb-6 leading-tight">
            {t.bill96.section.title}
          </h2>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            {t.bill96.section.intro}
          </p>
        </div>

        {/* Expand/Collapse Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-[#1B3B5F] text-white rounded-xl hover:bg-[#2C5F8D] transition-all duration-300 mb-6"
        >
          <span className="font-semibold">
            {expanded
              ? (language === 'en' ? 'Hide Details' : 'Masquer les détails')
              : (language === 'en' ? 'View Full Requirements & How We Can Help' : 'Voir les exigences complètes et comment nous pouvons vous aider')
            }
          </span>
          {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>

        {/* Collapsible Content */}
        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${expanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}`}>
          {/* What This Means */}
          <div className="mb-10 md:mb-16">
            <h3 className="text-xl md:text-2xl font-semibold text-[#1B3B5F] mb-6 md:mb-8">{t.bill96.section.whatItMeans}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {[
                { data: t.bill96.section.threshold1, Icon: Building2 },
                { data: t.bill96.section.threshold2, Icon: Users },
                { data: t.bill96.section.threshold3, Icon: FileText },
                { data: t.bill96.section.threshold4, Icon: Scale },
              ].map(({ data, Icon }, idx) => (
                <div key={idx} className="bg-white p-5 md:p-8 rounded-xl shadow-lg border-t-4 border-[#EAB333]">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#1B3B5F] flex items-center justify-center mb-4 md:mb-6">
                    <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  <h4 className="text-lg md:text-xl font-bold text-[#1B3B5F] mb-2">{data.title}</h4>
                  {data.subtitle && <p className="text-sm text-[#EAB333] font-semibold mb-3 md:mb-4">{data.subtitle}</p>}
                  <ul className="space-y-2 md:space-y-3">
                    {data.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 md:gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#EAB333]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-[#EAB333]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <span className="text-gray-600 text-xs md:text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Key Compliance Areas */}
          <div className="mb-10 md:mb-16">
            <h3 className="text-xl md:text-2xl font-semibold text-[#1B3B5F] mb-6 md:mb-8">{t.bill96.section.keyAreas}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {t.bill96.section.areas.map((area, idx) => (
                <div key={idx} className="bg-white p-5 md:p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-[#1B3B5F]/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-4 h-4 md:w-5 md:h-5 text-[#1B3B5F]" />
                    </div>
                    <div>
                      <h4 className="text-base md:text-lg font-bold text-[#1B3B5F] mb-2 md:mb-3">{area.title}</h4>
                      <p className="text-gray-600 text-xs md:text-sm leading-relaxed">{area.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How We Help */}
          <div className="bg-[#1B3B5F] rounded-2xl p-6 md:p-10 lg:p-12">
            <div className="max-w-3xl">
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 md:mb-4">{t.bill96.section.howWeHelp}</h3>
              <p className="text-sm md:text-base text-white/80 mb-6 md:mb-8">{t.bill96.section.helpIntro}</p>
              <ul className="space-y-3 md:space-y-4 mb-8 md:mb-10">
                {t.bill96.section.helpItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#EAB333] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 md:w-3.5 md:h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-sm md:text-base text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-[#EAB333] text-white font-semibold text-sm tracking-wide transition-all duration-300 rounded-sm hover:bg-[#d4a020] hover:shadow-lg"
              >
                <span>{t.bill96.section.cta}</span>
                <ArrowRight className="w-4 h-4 ml-3" />
              </button>
            </div>
          </div>

          {/* Sources */}
          <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-200">
            <h4 className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 md:mb-4">{t.bill96.section.sourcesTitle}</h4>
            <div className="flex flex-wrap gap-3 md:gap-4">
              {t.bill96.section.sources.map((source, idx) => (
                <a
                  key={idx}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-[#1B3B5F] hover:text-[#EAB333] transition-colors"
                >
                  <span>{source.name}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bill96Detail;
