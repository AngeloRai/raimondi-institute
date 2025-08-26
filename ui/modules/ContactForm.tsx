'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, ValidationError } from '@formspree/react'
import CTA from '../components/CTA'
import type { ContactFormProps } from '@/lib/contentful/types/fields'
import { generateGoogleMapsLink } from '@/lib/utils/maps'
import { getTranslation, type SupportedLocale } from '@/lib/translations/contact-form'

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

interface ComponentContactFormProps extends ContactFormProps {
  id?: string;
  formspreeId?: string;
}

// Helper to extract value from potentially localized field
function extractFieldValue<T>(field: T | { [locale: string]: T } | undefined, defaultValue?: T): T | undefined {
  if (field === undefined || field === null) return defaultValue;
  if (typeof field === 'object' && field !== null && !Array.isArray(field)) {
    // Check if it's a localized object
    const localized = field as { [locale: string]: T };
    if ('en-US' in localized) {
      return localized['en-US'];
    }
  }
  return field as T;
}

export default function ContactForm({
  id = 'contactform',
  heading,
  subheading,
  messagePlaceholder,
  subjects,
  buttonText,
  businessInfoHeading,
  addresses,
  phones,
  schedule,
  copy,
  redirectUrl,
  formspreeId,
  backgroundColor = 'white'
}: ComponentContactFormProps) {
  const router = useRouter();
  
  // Extract localized values first
  const successRedirectUrl = extractFieldValue(redirectUrl, "");
  
  // Extract formspree ID
  const formspreeFormId = extractFieldValue(formspreeId, 'xandypqa') || 'xandypqa';
  const [state, formspreeHandleSubmit] = useForm(formspreeFormId);
  
  // Custom submit handler to ensure validation runs
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    
    // Check if form is valid using HTML5 validation
    if (!form.checkValidity()) {
      // Prevent default and let browser show validation
      e.preventDefault();
      e.stopPropagation();
      
      // Find first invalid field and focus it
      const firstInvalid = form.querySelector(':invalid') as HTMLElement;
      if (firstInvalid) {
        firstInvalid.focus();
        // Trigger validation display
        form.reportValidity();
      }
      return;
    }
    
    // If valid, proceed with Formspree submission
    formspreeHandleSubmit(e);
  };
  
  
  // Handle redirect after successful submission
  useEffect(() => {
    if (state.succeeded && successRedirectUrl) {
      router.push(successRedirectUrl);
    }
  }, [state.succeeded, successRedirectUrl, router]);
  
  // Translation helper - get locale immediately from cookie
  const getCurrentLocale = (): SupportedLocale => {
    if (typeof document === 'undefined') return 'en-US';
    const cookies = document.cookie.split(';');
    const localeCookie = cookies.find(cookie => cookie.trim().startsWith('locale='));
    if (localeCookie) {
      const locale = localeCookie.split('=')[1].trim() as SupportedLocale;
      if (locale === 'pt-BR' || locale === 'en-US') {
        return locale;
      }
    }
    return 'en-US';
  };
  
  const t = (key: Parameters<typeof getTranslation>[0]) => getTranslation(key, getCurrentLocale());
  
  // Extract remaining localized values
  const title = extractFieldValue(heading, "Get in Touch");
  const subtitle = extractFieldValue(subheading, "Ready to find your perfect piano? We'd love to hear from you.");
  const messageText = extractFieldValue(messagePlaceholder, "Tell us about your piano needs, preferences, or any questions you have...");
  const submitButtonText = extractFieldValue(buttonText, "Send Message");
  const businessHeading = extractFieldValue(businessInfoHeading, "Visit Our Showroom");
  const formSubjects = extractFieldValue(subjects, []);
  const businessAddresses = extractFieldValue(addresses, []);
  const businessPhones = extractFieldValue(phones, []);
  const businessSchedule = extractFieldValue(schedule, "");
  const additionalCopy = extractFieldValue(copy, "");

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

  // Check if form succeeded and no redirect URL (show success message)
  if (state.succeeded && !successRedirectUrl) {
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
            {t('Thank You!')}
          </h2>
          
          <p className={`text-lg leading-relaxed mb-8 ${getSubtextClass()}`}>
            {t('We\'ve received your message and will get back to you within 24 hours. Our team is excited to help you find the perfect piano.')}
          </p>
          
          <CTA
            onClick={() => {
              // Reset Formspree form state
              window.location.reload();
            }}
            variant="primary"
          >
            {t('Send Another Message')}
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
                  {t('First Name *')}
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  required
                  className={getFormFieldClass()}
                  onInvalid={(e) => {
                    (e.target as HTMLInputElement).setCustomValidity(t('First name is required'));
                  }}
                  onChange={(e) => {
                    (e.target as HTMLInputElement).setCustomValidity('');
                  }}
                />
                <ValidationError 
                  prefix="First Name" 
                  field="firstName"
                  errors={state.errors}
                />
              </div>
              <div className="space-y-2">
                <Label 
                  htmlFor="lastName"
                  className={getTextClass()}
                >
                  {t('Last Name *')}
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  required
                  className={getFormFieldClass()}
                  onInvalid={(e) => {
                    (e.target as HTMLInputElement).setCustomValidity(t('Last name is required'));
                  }}
                  onChange={(e) => {
                    (e.target as HTMLInputElement).setCustomValidity('');
                  }}
                />
                <ValidationError 
                  prefix="Last Name" 
                  field="lastName"
                  errors={state.errors}
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label 
                htmlFor="email"
                className={getTextClass()}
              >
                {t('Email Address *')}
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className={getFormFieldClass()}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title={t('Please enter a valid email address')}
                onInvalid={(e) => {
                  const input = e.target as HTMLInputElement;
                  if (input.validity.valueMissing) {
                    input.setCustomValidity(t('Email is required'));
                  } else if (input.validity.patternMismatch || input.validity.typeMismatch) {
                    input.setCustomValidity(t('Please enter a valid email address'));
                  }
                }}
                onChange={(e) => {
                  (e.target as HTMLInputElement).setCustomValidity('');
                }}
              />
              <ValidationError 
                prefix="Email" 
                field="email"
                errors={state.errors}
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label 
                htmlFor="phone"
                className={getTextClass()}
              >
                {t('Phone Number')}
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                className={getFormFieldClass()}
                minLength={8}
              />
              <ValidationError 
                prefix="Phone" 
                field="phone"
                errors={state.errors}
              />
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <Label 
                htmlFor="subject"
                className={getTextClass()}
              >
                {t('Subject *')}
              </Label>
              <Select
                id="subject"
                name="subject"
                required
                className={getFormFieldClass()}
                onInvalid={(e) => {
                  (e.target as HTMLSelectElement).setCustomValidity(t('Subject is required'));
                }}
                onChange={(e) => {
                  (e.target as HTMLSelectElement).setCustomValidity('');
                }}
              >
                <option value="">{t('Please select a subject')}</option>
                {formSubjects?.map((subject, index) => (
                  <option key={index} value={subject.toLowerCase().replace(/\s+/g, '-')}>
                    {subject}
                  </option>
                ))}
              </Select>
              <ValidationError 
                prefix="Subject" 
                field="subject"
                errors={state.errors}
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label 
                htmlFor="message"
                className={getTextClass()}
              >
                {t('Message *')}
              </Label>
              <Textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder={messageText}
                className={getFormFieldClass()}
                onInvalid={(e) => {
                  (e.target as HTMLTextAreaElement).setCustomValidity(t('Message is required'));
                }}
                onChange={(e) => {
                  (e.target as HTMLTextAreaElement).setCustomValidity('');
                }}
              />
              <ValidationError 
                prefix="Message" 
                field="message"
                errors={state.errors}
              />
            </div>

            {/* Submit Button */}
            <CTA
              type="submit"
              disabled={state.submitting}
              variant="primary"
              className="w-full sm:w-auto"
            >
              {state.submitting ? t('Sending...') : submitButtonText}
            </CTA>
          </form>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className={`text-2xl tracking-tight mb-6 font-semibold ${getTextClass()}`}>
                {businessHeading}
              </h3>
              
              <div className="space-y-4">
                {/* Addresses */}
                {businessAddresses?.map((address, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div 
                      className="w-6 h-6 mt-0.5 rounded-full flex items-center justify-center bg-dark-forest-green"
                    >
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <a
                        href={generateGoogleMapsLink(address)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${getTextClass()} hover:underline transition-colors cursor-pointer`}
                      >
                        {address}
                      </a>
                    </div>
                  </div>
                ))}

                {/* Phone Numbers */}
                {businessPhones && businessPhones.length > 0 && (
                  <div className="flex items-start space-x-3">
                    <div 
                      className="w-6 h-6 mt-0.5 rounded-full flex items-center justify-center bg-dark-forest-green"
                    >
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <div className={getTextClass()}>
                        {businessPhones.map((phone, index) => (
                          <div key={index}>
                            <a 
                              href={`tel:${phone.replace(/\D/g, '')}`}
                              className="hover:underline transition-colors"
                            >
                              {phone}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Business Schedule */}
                {businessSchedule && (
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
                        {businessSchedule.split('\n').map((line, index) => (
                          <span key={index}>
                            {line}
                            {index < businessSchedule.split('\n').length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {additionalCopy && (
              <div className={`p-6 rounded-2xl ${getCardBackgroundClass()}`}>
                <p className={`text-sm leading-relaxed ${getSubtextClass()}`}>
                  {additionalCopy}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}