import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useScrollReveal } from '../feature/home/hooks/use-scroll-reveal';

export const ContactPage = () => {
  const headerReveal = useScrollReveal();
  const contentReveal = useScrollReveal();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';
    
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    // TODO: Replace with real contact API endpoint
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-ivory pt-20 pb-20">
      {/* Hero Section */}
      <div ref={headerReveal.ref as React.RefObject<HTMLDivElement | null>} className="max-w-4xl mx-auto px-4 mb-20 text-center">
        <h1 className="font-playfair text-5xl lg:text-6xl text-charcoal mb-4">Get in Touch</h1>
        <p className="text-xl text-stone max-w-2xl mx-auto">
          Have questions about our products or services? We'd love to hear from you. Our team typically responds within 24 hours.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          {/* Contact Info Cards */}
          <div className="bg-white rounded-2xl p-8 border border-sand shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-terracotta/10 rounded-lg flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-terracotta" />
            </div>
            <h3 className="font-playfair text-xl text-charcoal mb-2">Email</h3>
            <p className="text-stone mb-4">For product inquiries and general support:</p>
            <a href="mailto:hello@Bijeshwori Mala Traders.com" className="text-terracotta font-medium hover:underline">
              hello@Bijeshwori Mala Traders.com
            </a>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-sand shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-terracotta/10 rounded-lg flex items-center justify-center mb-4">
              <Phone className="w-6 h-6 text-terracotta" />
            </div>
            <h3 className="font-playfair text-xl text-charcoal mb-2">Phone</h3>
            <p className="text-stone mb-4">Call us during business hours (EST):</p>
            <a href="tel:+1-555-123-4567" className="text-terracotta font-medium hover:underline">
              +1 (555) 123-4567
            </a>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-sand shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-terracotta/10 rounded-lg flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-terracotta" />
            </div>
            <h3 className="font-playfair text-xl text-charcoal mb-2">Visit Us</h3>
            <p className="text-stone mb-4">Our studio is located at:</p>
            <p className="text-charcoal font-medium">
              123 Craft Street<br />
              Kathmandu, Nepal
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div ref={contentReveal.ref as React.RefObject<HTMLDivElement | null>} className="max-w-2xl mx-auto bg-white rounded-3xl p-8 lg:p-12 border border-sand shadow-sm">
          <h2 className="font-playfair text-3xl text-charcoal mb-2 text-center">Send us a Message</h2>
          <p className="text-center text-stone mb-8">Fill out the form below and we'll get back to you as soon as possible.</p>

          {isSubmitted && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">Thank you for your message! We'll be in touch soon.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta transition ${
                    errors.name ? 'border-red-500' : 'border-sand'
                  }`}
                  placeholder="Your name"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta transition ${
                    errors.email ? 'border-red-500' : 'border-sand'
                  }`}
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta transition ${
                  errors.subject ? 'border-red-500' : 'border-sand'
                }`}
                placeholder="How can we help?"
              />
              {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta transition resize-none ${
                  errors.message ? 'border-red-500' : 'border-sand'
                }`}
                placeholder="Your message..."
              />
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-terracotta text-ivory py-3 rounded-lg font-medium hover:bg-opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              {isLoading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
