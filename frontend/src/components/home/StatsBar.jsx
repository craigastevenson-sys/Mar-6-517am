import React from 'react';
import { Clock, Users, Globe, Award } from 'lucide-react';

const StatsBar = ({ language }) => {
  const stats = [
    { num: '15+', label: language === 'en' ? 'Years Experience' : 'Années d\'expérience', icon: Clock },
    { num: '500+', label: language === 'en' ? 'Professionals Trained' : 'Professionnels formés', icon: Users },
    { num: '10+', label: language === 'en' ? 'Languages Offered' : 'Langues offertes', icon: Globe },
    { num: '98%', label: language === 'en' ? 'Client Satisfaction' : 'Satisfaction client', icon: Award },
  ];

  return (
    <section className="py-8 md:py-12 bg-[#1B3B5F]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-[#EAB333] mb-2 md:mb-3" />
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.num}</div>
              <div className="text-xs md:text-sm text-white/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
