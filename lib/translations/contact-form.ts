// Translation map for ContactForm non-Contentful text
// Only includes text that doesn't come from Contentful fields

import type { SupportedLocale } from '@/lib/locale-types';

export const contactFormTranslations = {
  // Form labels
  'First Name *': {
    'en-US': 'First Name *',
    'pt-BR': 'Nome *'
  },
  'Last Name *': {
    'en-US': 'Last Name *',
    'pt-BR': 'Sobrenome *'
  },
  'Email Address *': {
    'en-US': 'Email Address *',
    'pt-BR': 'Email *'
  },
  'Phone Number': {
    'en-US': 'Phone Number',
    'pt-BR': 'Telefone'
  },
  'Subject *': {
    'en-US': 'Subject *',
    'pt-BR': 'Assunto *'
  },
  'Message *': {
    'en-US': 'Message *',
    'pt-BR': 'Mensagem *'
  },
  
  // Form options and placeholders
  'Please select a subject': {
    'en-US': 'Please select a subject',
    'pt-BR': 'Selecione um assunto'
  },
  
  // Button states
  'Sending...': {
    'en-US': 'Sending...',
    'pt-BR': 'Enviando...'
  },
  
  // Success page
  'Thank You!': {
    'en-US': 'Thank You!',
    'pt-BR': 'Obrigado!'
  },
  'We\'ve received your message and will get back to you within 24 hours. Our team is excited to help you find the perfect piano.': {
    'en-US': 'We\'ve received your message and will get back to you within 24 hours. Our team is excited to help you find the perfect piano.',
    'pt-BR': 'Recebemos sua mensagem e entraremos em contato em até 24 horas. Nossa equipe está animada para ajudá-lo a encontrar o piano perfeito.'
  },
  'Send Another Message': {
    'en-US': 'Send Another Message',
    'pt-BR': 'Enviar Outra Mensagem'
  },
  
  // Validation messages
  'Please enter a valid email address': {
    'en-US': 'Please enter a valid email address',
    'pt-BR': 'Por favor, insira um endereço de email válido'
  },
  'Please fill out this field': {
    'en-US': 'Please fill out this field',
    'pt-BR': 'Por favor, preencha este campo'
  },
  'First name is required': {
    'en-US': 'First name is required',
    'pt-BR': 'Nome é obrigatório'
  },
  'Last name is required': {
    'en-US': 'Last name is required', 
    'pt-BR': 'Sobrenome é obrigatório'
  },
  'Email is required': {
    'en-US': 'Email is required',
    'pt-BR': 'Email é obrigatório'
  },
  'Subject is required': {
    'en-US': 'Subject is required',
    'pt-BR': 'Assunto é obrigatório'
  },
  'Message is required': {
    'en-US': 'Message is required',
    'pt-BR': 'Mensagem é obrigatória'
  }
} as const;

// Helper function to get translated text
export function getTranslation(
  key: keyof typeof contactFormTranslations,
  locale: SupportedLocale = 'en-US'
): string {
  return contactFormTranslations[key]?.[locale] || contactFormTranslations[key]?.['en-US'] || key;
}

// Type for translation keys
export type TranslationKey = keyof typeof contactFormTranslations;