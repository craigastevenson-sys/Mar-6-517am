import React from 'react';
import { Quote } from 'lucide-react';

const Testimonials = ({ t, testimonials }) => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="max-w-3xl mb-12 md:mb-20">
          <div className="inline-block px-4 py-2 bg-[#1B3B5F] text-white text-xs font-semibold tracking-wider uppercase mb-4 md:mb-6 rounded-sm">
            {t.testimonials.title}
          </div>
          <h2 className="text-3xl md:text-5xl font-normal text-[#1B3B5F] leading-tight">
            {t.testimonials.heading}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gradient-to-br from-[#f8f6f1] to-[#f3f0e8] p-6 md:p-8 rounded-xl relative">
              <Quote className="w-8 h-8 md:w-10 md:h-10 text-[#EAB333]/30 mb-3 md:mb-4" />
              <p className="text-sm md:text-base text-gray-700 mb-6 md:mb-8 leading-relaxed italic">"{testimonial.text}"</p>
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#1B3B5F] flex items-center justify-center text-white font-bold text-xs md:text-sm">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm md:text-base">{testimonial.name}</p>
                  <p className="text-xs md:text-sm text-gray-500 mt-0.5">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
