import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { ArrowRight, BookOpen, GraduationCap, Users, Monitor, Menu, X } from 'lucide-react';
import { toast } from '../hooks/use-toast';
import { tutorsTranslations as t } from '../utils/tutorsTranslations';
import ImageReel from '../components/ImageReel';
import SchemaOrg from '../components/SchemaOrg';

// Giant Steps brand colors (matched to new logo)
const BLUE = '#2B4368';
const GOLD = '#C8A047';

const HomeTutors = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // SEO Meta Tags for Giant Steps Tutors
  useEffect(() => {
    document.title = 'Giant Steps Tutors | Personalized Academic Tutoring';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'One-on-one academic tutoring for all ages. SAT, ACT, LSAT, GRE, MCAT test prep. Specialized support for learning differences. Online and in-person tutoring available.');
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');

    if (ogTitle) {
      ogTitle.setAttribute('content', 'Giant Steps Tutors | Personalized Academic Tutoring');
    }
    if (ogDescription) {
      ogDescription.setAttribute('content', 'One-on-one academic tutoring for all ages. SAT, ACT, LSAT, GRE, MCAT test prep. Specialized support for learning differences.');
    }

    // Update favicon for Giant Steps Tutors
    const faviconPng = document.getElementById('dynamic-favicon');
    const faviconIco = document.getElementById('dynamic-favicon-ico');
    const appleIcon = document.getElementById('dynamic-apple-icon');
    if (faviconPng) faviconPng.href = '/favicon-tutors-32.png';
    if (faviconIco) faviconIco.href = '/favicon-tutors.ico';
    if (appleIcon) appleIcon.href = '/favicon-tutors.png';

    document.documentElement.lang = 'en';
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          language: 'tutors'
        })
      });
      if (!res.ok) throw new Error('Failed to submit');
      toast({
        title: t.contact.successTitle,
        description: t.contact.successDescription,
      });
      setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
    } catch {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'academics', label: 'Academics' },
    { id: 'testprep', label: 'Test Prep' },
    { id: 'specialized', label: 'Specialized' },
    { id: 'testimonials', label: 'Reviews' },
    { id: 'contact', label: 'Contact' },
  ];

  // Schema.org structured data for Giant Steps Tutors
  const schemas = useMemo(() => [
    {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "Giant Steps Tutors",
      "url": "https://giantstepstutors.com",
      "description": "One-on-one academic tutoring for all ages and abilities. SAT, ACT, LSAT, GRE, MCAT test preparation. Specialized support for learning differences.",
      "areaServed": {
        "@type": "Place",
        "name": "Quebec, Canada"
      },
      "knowsLanguage": ["en", "fr"]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Giant Steps Tutors",
      "url": "https://giantstepstutors.com",
      "inLanguage": "en"
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Academic Tutoring",
      "provider": {
        "@type": "EducationalOrganization",
        "name": "Giant Steps Tutors"
      },
      "areaServed": {
        "@type": "Place",
        "name": "Quebec, Canada"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Tutoring Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Course",
              "name": "Core Academics",
              "description": "Math, Science, English, French, and Social Studies tutoring for all grade levels."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Course",
              "name": "Standardized Test Preparation",
              "description": "Expert preparation for SAT, ACT, LSAT, GRE, and MCAT examinations."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Course",
              "name": "Specialized Support",
              "description": "Tailored tutoring for students with learning differences including ADHD, dyslexia, and autism spectrum."
            }
          }
        ]
      }
    }
  ], []);

  return (
    <div className="min-h-screen bg-white">
      <SchemaOrg schemas={schemas} />
      {/* HORIZONTAL HEADER - Logo left, nav center, CTA right */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo - Icon with Playfair Display text */}
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => scrollToSection('about')}
            >
              <img
                src="/giant-steps-icon-only.png"
                alt="Giant Steps Tutors Icon"
                className="h-12 md:h-14 w-auto object-contain"
              />
              <span 
                className="text-2xl md:text-3xl font-bold tracking-tight"
                style={{ 
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: BLUE,
                  marginLeft: '8px'
                }}
              >
                Giant Steps Tutors
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-sm font-medium text-gray-700 hover:text-[#2B4368] transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Desktop CTA Button */}
            <Button
              data-testid="header-cta-btn"
              onClick={() => scrollToSection('contact')}
              className="hidden lg:flex text-white font-semibold px-6"
              style={{ backgroundColor: GOLD }}
            >
              Get Started
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#2B4368]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
            <nav className="flex flex-col px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { scrollToSection(item.id); setMobileMenuOpen(false); }}
                  className="text-left text-base font-medium text-gray-700 hover:text-[#2B4368] transition-colors py-2"
                >
                  {item.label}
                </button>
              ))}
              <Button
                onClick={() => { scrollToSection('contact'); setMobileMenuOpen(false); }}
                className="text-white font-semibold w-full mt-2"
                style={{ backgroundColor: GOLD }}
              >
                Get Started
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero/About Section */}
      <section id="about" className="pt-16 md:pt-20" style={{ backgroundColor: BLUE }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-white/20 text-white text-xs font-semibold tracking-wider uppercase mb-4 md:mb-6 rounded">
                {t.about.title}
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 md:mb-8 leading-tight">
                {t.about.heading}
              </h1>
              <div className="space-y-4 md:space-y-6 text-base md:text-lg text-white/90 leading-relaxed">
                <p>{t.about.paragraph1}</p>
                <p>{t.about.paragraph2}</p>
              </div>
              <Button
                onClick={() => scrollToSection('contact')}
                className="mt-8 md:mt-10 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold"
                style={{ backgroundColor: GOLD, color: 'white' }}
              >
                Find a Tutor <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 inline" />
              </Button>
            </div>
            <div className="relative">
              <ImageReel className="rounded-2xl shadow-2xl ring-4 ring-white/20" aspectRatio="aspect-[4/3]" />
              <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 p-4 md:p-6 bg-white rounded-xl shadow-2xl" style={{ borderLeft: `4px solid ${GOLD}` }}>
                <p className="text-2xl md:text-4xl font-bold" style={{ color: BLUE }}>500+</p>
                <p className="text-gray-600 font-medium text-sm md:text-base">Students Helped</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Academics Section */}
      <section id="academics" className="py-16 md:py-24" style={{ backgroundColor: BLUE }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl mb-10 md:mb-16">
            <span className="inline-block px-4 py-2 bg-white/20 text-white text-xs font-semibold tracking-wider uppercase mb-4 md:mb-6 rounded">
              {t.coreAcademics.title}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 md:mb-8 leading-tight">
              {t.coreAcademics.heading}
            </h2>
            <p className="text-base md:text-lg text-white/85 leading-relaxed">{t.coreAcademics.intro}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
            {t.coreAcademics.subjects.map((subject, index) => (
              <div
                key={index}
                className="p-5 md:p-6 bg-white/10 backdrop-blur rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/10"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-4 md:mb-5" style={{ backgroundColor: GOLD }}>
                  <BookOpen className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">{subject.name}</h3>
                <p className="text-sm md:text-base text-white/70">{subject.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-base md:text-lg text-white/85 leading-relaxed max-w-3xl">{t.coreAcademics.outro}</p>
        </div>
      </section>

      {/* Test Prep Section - White accent */}
      <section id="testprep" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-2 text-white text-xs font-semibold tracking-wider uppercase mb-4 md:mb-6 rounded" style={{ backgroundColor: BLUE }}>
                {t.testPrep.title}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 md:mb-8 leading-tight" style={{ color: BLUE }}>
                {t.testPrep.heading}
              </h2>
              <div className="space-y-4 md:space-y-6 text-base md:text-lg text-gray-600 leading-relaxed">
                <p>{t.testPrep.paragraph1}</p>
                <p>{t.testPrep.paragraph2}</p>
              </div>
              <div className="mt-6 md:mt-8 flex flex-wrap gap-2 md:gap-3">
                {['SAT', 'ACT', 'LSAT', 'GRE', 'MCAT'].map((test) => (
                  <span
                    key={test}
                    className="px-4 py-2 md:px-5 md:py-2.5 rounded-full text-xs md:text-sm font-bold text-white"
                    style={{ backgroundColor: GOLD }}
                  >
                    {test}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative">
              <ImageReel className="rounded-2xl shadow-2xl" aspectRatio="aspect-square" />
            </div>
          </div>
        </div>
      </section>

      {/* All Ages Section */}
      <section id="allages" className="py-16 md:py-24" style={{ backgroundColor: BLUE }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
            <span className="inline-block px-4 py-2 bg-white/20 text-white text-xs font-semibold tracking-wider uppercase mb-4 md:mb-6 rounded">
              {t.allAges.title}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 md:mb-8 leading-tight">
              {t.allAges.heading}
            </h2>
            <p className="text-base md:text-lg text-white/85 leading-relaxed">{t.allAges.intro}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
            {t.allAges.levels.map((item, index) => (
              <div
                key={index}
                className="p-6 md:p-8 bg-white rounded-2xl shadow-xl text-center transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6" style={{ backgroundColor: `${BLUE}15` }}>
                  <GraduationCap className="w-8 h-8 md:w-10 md:h-10" style={{ color: BLUE }} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4" style={{ color: BLUE }}>{item.level}</h3>
                <p className="text-gray-600 text-base md:text-lg">{item.focus}</p>
                <div className="mt-4 md:mt-6 w-16 h-1 mx-auto rounded" style={{ backgroundColor: GOLD }}></div>
              </div>
            ))}
          </div>

          <p className="text-base md:text-lg text-white/85 leading-relaxed text-center max-w-3xl mx-auto">{t.allAges.outro}</p>
        </div>
      </section>

      {/* Specialized Support Section */}
      <section id="specialized" className="py-16 md:py-24" style={{ backgroundColor: BLUE }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl mb-10 md:mb-16">
            <span className="inline-block px-4 py-2 bg-white/20 text-white text-xs font-semibold tracking-wider uppercase mb-4 md:mb-6 rounded">
              {t.specialized.title}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 md:mb-8 leading-tight">
              {t.specialized.heading}
            </h2>
            <p className="text-base md:text-lg text-white/85 leading-relaxed">{t.specialized.intro}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
            {t.specialized.services.map((service, index) => (
              <div
                key={index}
                className="p-5 md:p-6 bg-white/10 backdrop-blur rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/10"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-4 md:mb-5" style={{ backgroundColor: GOLD }}>
                  <Users className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">{service.name}</h3>
                <p className="text-sm md:text-base text-white/70">{service.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-base md:text-lg text-white/85 leading-relaxed max-w-3xl">{t.specialized.outro}</p>
        </div>
      </section>

      {/* Online & Flexible Section - White accent */}
      <section id="online" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <ImageReel className="rounded-2xl shadow-2xl" aspectRatio="aspect-[4/3]" />
            </div>
            <div className="order-1 lg:order-2">
              <span className="inline-block px-4 py-2 text-white text-xs font-semibold tracking-wider uppercase mb-4 md:mb-6 rounded" style={{ backgroundColor: BLUE }}>
                {t.online.title}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 md:mb-8 leading-tight" style={{ color: BLUE }}>
                {t.online.heading}
              </h2>
              <div className="space-y-4 md:space-y-6 text-base md:text-lg text-gray-600 leading-relaxed">
                <p>{t.online.paragraph1}</p>
                <p>{t.online.paragraph2}</p>
              </div>
              <div className="mt-6 md:mt-8 flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl" style={{ backgroundColor: `${BLUE}10` }}>
                <Monitor className="w-8 h-8 md:w-10 md:h-10" style={{ color: GOLD }} />
                <span className="text-lg md:text-xl font-bold" style={{ color: BLUE }}>100% Online Available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 md:py-24" style={{ backgroundColor: BLUE }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl mb-10 md:mb-16">
            <span className="inline-block px-4 py-2 bg-white/20 text-white text-xs font-semibold tracking-wider uppercase mb-4 md:mb-6 rounded">
              {t.testimonials.title}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              {t.testimonials.heading}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[t.testimonials.quote1, t.testimonials.quote2, t.testimonials.quote3].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 md:p-8 rounded-2xl shadow-xl" style={{ borderTop: `4px solid ${GOLD}` }}>
                <p className="text-base md:text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white font-bold text-sm md:text-base" style={{ backgroundColor: BLUE }}>
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-sm md:text-base" style={{ color: BLUE }}>{testimonial.name}</p>
                    <p className="text-xs md:text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24" style={{ background: `linear-gradient(180deg, ${BLUE} 0%, #153d7a 100%)` }}>
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10 md:mb-16">
            <span className="inline-block px-4 py-2 bg-white/20 text-white text-xs font-semibold tracking-wider uppercase mb-4 md:mb-6 rounded">
              {t.contact.title}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              {t.contact.heading}
            </h2>
          </div>
          <form onSubmit={handleSubmit} data-testid="contact-form" className="space-y-4 md:space-y-6 bg-white/10 backdrop-blur p-6 md:p-10 rounded-2xl border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <Input
                data-testid="contact-firstname"
                type="text"
                name="firstName"
                placeholder={t.contact.firstName}
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className="bg-white/10 border-white/30 text-white placeholder:text-white/60 h-12 md:h-14 focus:bg-white/20 focus:border-white/50 transition-all rounded-xl"
              />
              <Input
                data-testid="contact-lastname"
                type="text"
                name="lastName"
                placeholder={t.contact.lastName}
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className="bg-white/10 border-white/30 text-white placeholder:text-white/60 h-12 md:h-14 focus:bg-white/20 focus:border-white/50 transition-all rounded-xl"
              />
            </div>
            <Input
              data-testid="contact-email"
              type="email"
              name="email"
              placeholder={t.contact.email}
              value={formData.email}
              onChange={handleInputChange}
              required
              className="bg-white/10 border-white/30 text-white placeholder:text-white/60 h-12 md:h-14 focus:bg-white/20 focus:border-white/50 transition-all rounded-xl"
            />
            <Input
              data-testid="contact-phone"
              type="tel"
              name="phone"
              placeholder={t.contact.phone}
              value={formData.phone}
              onChange={handleInputChange}
              className="bg-white/10 border-white/30 text-white placeholder:text-white/60 h-12 md:h-14 focus:bg-white/20 focus:border-white/50 transition-all rounded-xl"
            />
            <Textarea
              data-testid="contact-message"
              name="message"
              placeholder={t.contact.message}
              value={formData.message}
              onChange={handleInputChange}
              rows={5}
              className="bg-white/10 border-white/30 text-white placeholder:text-white/60 resize-none focus:bg-white/20 focus:border-white/50 transition-all rounded-xl"
            />
            <Button
              data-testid="contact-submit-btn"
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 md:h-14 text-base md:text-lg font-bold transition-all duration-300 disabled:opacity-60 rounded-xl"
              style={{ backgroundColor: GOLD, color: 'white' }}
            >
              {isSubmitting ? 'Sending...' : t.contact.send}
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 md:py-8" style={{ backgroundColor: BLUE }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <img
              src="/giant-steps-logo-cropped.png"
              alt="Giant Steps Tutors"
              className="h-8 md:h-10 w-auto brightness-0 invert"
            />
            <p className="text-xs md:text-sm text-white/60 text-center">{t.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeTutors;
