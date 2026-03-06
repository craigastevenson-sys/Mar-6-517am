import React, { useEffect, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import logoEn from '../assets/logo-en.png';
import logoFr from '../assets/logo-fr-v3.png';

import SchemaOrg from '../components/SchemaOrg';
import Header from '../components/home/Header';
import HeroSection from '../components/home/HeroSection';
import StatsBar from '../components/home/StatsBar';
import Bill96Banner from '../components/home/Bill96Banner';
import ServiceSection from '../components/home/ServiceSection';
import Bill96Detail from '../components/home/Bill96Detail';
import Testimonials from '../components/home/Testimonials';
import ContactForm from '../components/home/ContactForm';
import Footer from '../components/home/Footer';

const Home = () => {
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  // SEO Meta Tags
  useEffect(() => {
    document.title = language === 'en'
      ? 'Advance Language | Professional Language Training'
      : 'Avance Langue | Formation linguistique professionnelle';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', language === 'en'
        ? 'Professional language training for businesses and individuals. English, French, TEFAQ preparation, Bill 96 compliance training, and foreign language courses in Quebec.'
        : 'Formation linguistique professionnelle pour entreprises et particuliers. Cours d\'anglais, français, préparation TEFAQ, conformité Loi 96 et langues étrangères au Québec.'
      );
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const ogLocale = document.querySelector('meta[property="og:locale"]');

    if (ogTitle) {
      ogTitle.setAttribute('content', language === 'en'
        ? 'Advance Language | Professional Language Training'
        : 'Avance Langue | Formation linguistique professionnelle'
      );
    }
    if (ogDescription) {
      ogDescription.setAttribute('content', language === 'en'
        ? 'Professional language training for businesses and individuals. English, French, TEFAQ preparation, and foreign language courses.'
        : 'Formation linguistique professionnelle pour entreprises et particuliers. Cours d\'anglais, français, préparation TEFAQ et langues étrangères.'
      );
    }
    if (ogLocale) {
      ogLocale.setAttribute('content', language === 'en' ? 'en_CA' : 'fr_CA');
    }

    let favicon = document.querySelector('link[rel="icon"]');
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.rel = 'icon';
      document.head.appendChild(favicon);
    }
    favicon.type = 'image/png';
    favicon.href = '/favicon-advance.png';
  }, [language]);

  useEffect(() => {
    const base = window.location.origin;
    const existing = document.querySelectorAll('link[hreflang]');
    existing.forEach(el => el.remove());

    const tags = [
      { hreflang: 'en', href: `${base}/en` },
      { hreflang: 'fr', href: `${base}/fr` },
      { hreflang: 'x-default', href: `${base}/en` },
    ];
    tags.forEach(({ hreflang, href }) => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = hreflang;
      link.href = href;
      document.head.appendChild(link);
    });

    document.documentElement.lang = language;
  }, [language]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const services = useMemo(() => {
    const s1 = {
      title: t.services.service1.title,
      features: [t.services.service1.feature1, t.services.service1.feature2, t.services.service1.feature3],
      link: t.services.service1.link,
      description: t.services.service1.description
    };
    const s2 = {
      title: t.services.service2.title,
      features: [t.services.service2.feature1, t.services.service2.feature2, t.services.service2.feature3, t.services.service2.feature4, t.services.service2.feature5],
      link: t.services.service2.link,
      description: t.services.service2.description
    };
    const s3 = {
      title: t.services.service3.title,
      features: [t.services.service3.feature1, t.services.service3.feature2, t.services.service3.feature3],
      link: t.services.service3.link,
      description: t.services.service3.description
    };
    return [s1, s3, s2];
  }, [t]);

  const sectionIds = language === 'fr'
    ? ['french-tefaq', 'english-esl', 'foreign-languages']
    : ['english-esl', 'french-tefaq', 'foreign-languages'];

  const testimonials = useMemo(() => [
    { text: t.testimonials.quote1.text, name: t.testimonials.quote1.name, role: t.testimonials.quote1.role },
    { text: t.testimonials.quote2.text, name: t.testimonials.quote2.name, role: t.testimonials.quote2.role },
    { text: t.testimonials.quote3.text, name: t.testimonials.quote3.name, role: t.testimonials.quote3.role },
  ], [t]);

  // Schema.org structured data
  const schemas = useMemo(() => {
    const orgName = language === 'en' ? 'Advance Language' : 'Avance Langue';
    const siteUrl = language === 'en' ? 'https://advancelanguage.com/en' : 'https://avance-langue.com/fr';
    const description = language === 'en'
      ? 'Professional language training for businesses and individuals. English, French, TEFAQ preparation, Bill 96 compliance training, and foreign language courses in Quebec.'
      : 'Formation linguistique professionnelle pour entreprises et particuliers. Cours d\'anglais, français, préparation TEFAQ, conformité Loi 96 et langues étrangères au Québec.';

    return [
      {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        "name": orgName,
        "url": siteUrl,
        "description": description,
        "areaServed": {
          "@type": "Place",
          "name": "Quebec, Canada"
        },
        "serviceArea": {
          "@type": "AdministrativeArea",
          "name": "Quebec"
        },
        "knowsLanguage": ["en", "fr", "es", "de", "zh", "ar"]
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": orgName,
        "url": "https://advancelanguage.com",
        "inLanguage": language === 'en' ? 'en-CA' : 'fr-CA'
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": language === 'en' ? "Language Training" : "Formation linguistique",
        "provider": {
          "@type": "EducationalOrganization",
          "name": orgName
        },
        "areaServed": {
          "@type": "Place",
          "name": "Quebec, Canada"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": language === 'en' ? "Language Courses" : "Cours de langues",
          "itemListElement": services.map((s, i) => ({
            "@type": "Offer",
            "itemOffered": {
              "@type": "Course",
              "name": s.title,
              "description": s.description
            }
          }))
        }
      }
    ];
  }, [language, services]);

  return (
    <div className="min-h-screen bg-white">
      <SchemaOrg schemas={schemas} />
      <Header language={language} toggleLanguage={toggleLanguage} scrollToSection={scrollToSection} t={t} logoEn={logoEn} logoFr={logoFr} />
      <HeroSection language={language} t={t} scrollToSection={scrollToSection} />
      <StatsBar language={language} />
      <Bill96Banner t={t} scrollToSection={scrollToSection} />

      {services.map((service, index) => (
        <ServiceSection
          key={index}
          service={service}
          sectionId={sectionIds[index]}
          index={index}
          language={language}
          scrollToSection={scrollToSection}
        />
      ))}

      <Bill96Detail language={language} t={t} scrollToSection={scrollToSection} />
      <Testimonials t={t} testimonials={testimonials} />
      <ContactForm language={language} t={t} />
      <Footer language={language} t={t} services={services} scrollToSection={scrollToSection} logoEn={logoEn} logoFr={logoFr} />
    </div>
  );
};

export default Home;
