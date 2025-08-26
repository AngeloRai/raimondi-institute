'use client'

import { useState } from 'react'
import CTA from '../components/CTA'

// Styled UI components
function Input({ className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full px-4 py-3 rounded-lg border border-gray-300 transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none ${className}`}
      {...props}
    />
  )
}

function Label({ children, htmlFor, className = '', ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label 
      htmlFor={htmlFor} 
      className={`block text-sm font-medium mb-1 ${className}`}
      {...props}
    >
      {children}
    </label>
  )
}

function Textarea({ className = '', ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`w-full px-4 py-3 rounded-lg border border-gray-300 transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-vertical min-h-[120px] ${className}`}
      {...props}
    />
  )
}

function Select({ children, className = '', ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={`w-full px-4 py-3 rounded-lg border border-gray-300 transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none appearance-none bg-white ${className}`}
      {...props}
    >
      {children}
    </select>
  )
}

interface ContactFormProps {
  id?: string;
  title?: string;
  subtitle?: string;
  backgroundColor?: 'white' | 'light' | 'dark';
}

export default function ContactForm({
  id = 'contactform',
  title = "Get in Touch",
  subtitle = "Ready to find your perfect piano? We'd love to hear from you.",
  backgroundColor = 'white'
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const getBackgroundClass = () => {
    switch (backgroundColor) {
      case 'white': return 'bg-pure-white'
      case 'light': return 'bg-warm-cream'
      case 'dark': return 'bg-charcoal-gray'
      default: return 'bg-pure-white'
    }
  }

  const getTextClass = () => {
    switch (backgroundColor) {
      case 'white': return 'text-text-primary'
      case 'light': return 'text-text-primary'
      case 'dark': return 'text-white'
      default: return 'text-text-primary'
    }
  }

  const getSubtextClass = () => {
    switch (backgroundColor) {
      case 'white': return 'text-light-forest-green'
      case 'light': return 'text-light-forest-green'
      case 'dark': return 'text-white/80'
      default: return 'text-light-forest-green'
    }
  }

  const getFormFieldClass = () => {
    switch (backgroundColor) {
      case 'white': return 'bg-pure-white border-text-primary/20'
      case 'light': return 'bg-pure-white border-text-primary/20'
      case 'dark': return 'bg-white/10 border-white/20 text-white placeholder:text-white/60'
      default: return 'bg-pure-white border-text-primary/20'
    }
  }

  const getCardBackgroundClass = () => {
    switch (backgroundColor) {
      case 'white': return 'bg-warm-cream'
      case 'light': return 'bg-warm-cream'
      case 'dark': return 'bg-white/5'
      default: return 'bg-warm-cream'
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      subject: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <section 
        id={`${id}-success`}
        className={`w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 ${getBackgroundClass()}`}
      >
        <div className="max-w-2xl mx-auto text-center">
          <div 
            className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center bg-dark-forest-green"
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h2 className={`text-3xl sm:text-4xl tracking-tight mb-4 font-semibold ${getTextClass()}`}>
            Thank You!
          </h2>
          
          <p className={`text-lg leading-relaxed mb-8 ${getSubtextClass()}`}>
            We&apos;ve received your message and will get back to you within 24 hours. 
            Our team is excited to help you find the perfect piano.
          </p>
          
          <CTA
            onClick={() => {
              setSubmitted(false);
              setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
              });
            }}
            variant="outline"
          >
            Send Another Message
          </CTA>
        </div>
      </section>
    );
  }

  return (
    <section 
      id={id}
      className={`w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 ${getBackgroundClass()}`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4 font-semibold ${getTextClass()}`}>
            {title}
          </h2>
          <p className={`text-lg sm:text-xl max-w-2xl mx-auto ${getSubtextClass()}`}>
            {subtitle}
          </p>
        </div>

        {/* Contact Form */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label 
                  htmlFor="firstName"
                  className={getTextClass()}
                >
                  First Name *
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className={getFormFieldClass()}
                />
              </div>
              <div className="space-y-2">
                <Label 
                  htmlFor="lastName"
                  className={getTextClass()}
                >
                  Last Name *
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className={getFormFieldClass()}
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label 
                htmlFor="email"
                className={getTextClass()}
              >
                Email Address *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className={getFormFieldClass()}
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label 
                htmlFor="phone"
                className={getTextClass()}
              >
                Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                className={getFormFieldClass()}
              />
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <Label 
                htmlFor="subject"
                className={getTextClass()}
              >
                Subject *
              </Label>
              <Select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={(e) => handleSelectChange(e.target.value)}
                required
                className={getFormFieldClass()}
              >
                <option value="">Please select a subject</option>
                <option value="piano-inquiry">Piano Inquiry</option>
                <option value="pricing">Pricing Information</option>
                <option value="showroom-visit">Showroom Visit</option>
                <option value="maintenance">Maintenance & Tuning</option>
                <option value="financing">Financing Options</option>
                <option value="other">Other</option>
              </Select>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label 
                htmlFor="message"
                className={getTextClass()}
              >
                Message *
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                placeholder="Tell us about your piano needs, preferences, or any questions you have..."
                className={getFormFieldClass()}
              />
            </div>

            {/* Submit Button */}
            <CTA
              type="submit"
              disabled={isSubmitting}
              variant="primary"
              className="w-full sm:w-auto"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </CTA>
          </form>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className={`text-2xl tracking-tight mb-6 font-semibold ${getTextClass()}`}>
                Visit Our Showroom
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div 
                    className="w-6 h-6 mt-0.5 rounded-full flex items-center justify-center bg-dark-forest-green"
                  >
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className={getTextClass()}>
                      123 Harmony Avenue<br />
                      Music District, NY 10001
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div 
                    className="w-6 h-6 mt-0.5 rounded-full flex items-center justify-center bg-dark-forest-green"
                  >
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className={getTextClass()}>
                      (555) 123-PIANO<br />
                      (555) 123-7426
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div 
                    className="w-6 h-6 mt-0.5 rounded-full flex items-center justify-center bg-dark-forest-green"
                  >
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className={getTextClass()}>
                      Monday - Friday: 9AM - 7PM<br />
                      Saturday: 10AM - 6PM<br />
                      Sunday: 12PM - 5PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-2xl ${getCardBackgroundClass()}`}>
              <h4 className={`tracking-tight mb-3 font-semibold ${getTextClass()}`}>
                Schedule a Private Consultation
              </h4>
              <p className={`text-sm leading-relaxed ${getSubtextClass()}`}>
                Book a one-on-one session with our piano specialists to explore our collection and find the perfect instrument for your needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}