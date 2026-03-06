import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { toast } from '../../hooks/use-toast';

const ContactForm = ({ language, t }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          language: language
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
        title: language === 'en' ? 'Error' : 'Erreur',
        description: language === 'en' ? 'Something went wrong. Please try again.' : 'Une erreur est survenue. Veuillez réessayer.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-20 bg-gradient-to-br from-[#1B3B5F] to-[#142d47]">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-block px-4 py-2 bg-white/10 text-white text-xs font-semibold tracking-wider uppercase mb-4 md:mb-6">
            {t.contact.title}
          </div>
          <h2 className="text-2xl md:text-4xl font-normal text-white leading-tight">
            {t.contact.heading}
          </h2>
        </div>
        <form onSubmit={handleSubmit} data-testid="contact-form" className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Input
              data-testid="contact-firstname"
              type="text" name="firstName"
              placeholder={t.contact.firstName}
              value={formData.firstName} onChange={handleInputChange} required
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60 h-12 md:h-14 focus:bg-white/20 focus:border-white/40 transition-all"
            />
            <Input
              data-testid="contact-lastname"
              type="text" name="lastName"
              placeholder={t.contact.lastName}
              value={formData.lastName} onChange={handleInputChange} required
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60 h-12 md:h-14 focus:bg-white/20 focus:border-white/40 transition-all"
            />
          </div>
          <Input
            data-testid="contact-email"
            type="email" name="email"
            placeholder={t.contact.email}
            value={formData.email} onChange={handleInputChange} required
            className="bg-white/10 border-white/20 text-white placeholder:text-white/60 h-12 md:h-14 focus:bg-white/20 focus:border-white/40 transition-all"
          />
          <Input
            data-testid="contact-phone"
            type="tel" name="phone"
            placeholder={t.contact.phone}
            value={formData.phone} onChange={handleInputChange}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/60 h-12 md:h-14 focus:bg-white/20 focus:border-white/40 transition-all"
          />
          <Textarea
            data-testid="contact-message"
            name="message"
            placeholder={t.contact.message}
            value={formData.message} onChange={handleInputChange} rows={5}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/60 resize-none focus:bg-white/20 focus:border-white/40 transition-all"
          />
          <Button data-testid="contact-submit-btn" type="submit" disabled={isSubmitting} className="w-full bg-white text-[#1B3B5F] hover:bg-gray-100 h-12 md:h-14 text-base font-semibold transition-all duration-300 disabled:opacity-60">
            {isSubmitting ? (language === 'en' ? 'Sending...' : 'Envoi en cours...') : t.contact.send}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
