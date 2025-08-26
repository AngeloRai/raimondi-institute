import React from 'react'
import CTA from './CTA'
import IconRenderer from '../icons/IconRenderer'
import type { CardProps } from '@/lib/contentful/types/fields'

interface ComponentCardProps extends CardProps {
  id?: string;
}

export default function Card({
  backgroundColor = 'white',
  icon,
  heading,
  subheading,
  cta
}: ComponentCardProps) {
  const getCardBackgroundClass = () => {
    switch (backgroundColor) {
      case 'white': return 'bg-pure-white'
      case 'light': return 'bg-warm-cream'
      case 'dark': return 'bg-charcoal-gray'
      default: return 'bg-pure-white'
    }
  }

  const getTextClass = () => {
    switch (backgroundColor) {
      case 'white': return 'text-charcoal-gray'
      case 'light': return 'text-charcoal-gray'
      case 'dark': return 'text-white'
      default: return 'text-charcoal-gray'
    }
  }

  const getIconClass = () => {
    switch (backgroundColor) {
      case 'white': return 'text-dark-forest-green'
      case 'light': return 'text-dark-forest-green'
      case 'dark': return 'text-white'
      default: return 'text-dark-forest-green'
    }
  }

  return (
    <div
      className={`group p-6 sm:p-8 rounded-2xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-xl flex flex-col h-full ${getCardBackgroundClass()} ${
        backgroundColor === 'dark' 
          ? 'border-white/10 shadow-lg' 
          : 'border-dark-forest-green/10 shadow-md hover:border-dark-forest-green/20'
      }`}
    >
      {/* Icon */}
      <div className={`mb-6 ${getIconClass()}`}>
        <IconRenderer name={icon} />
      </div>

      {/* Content */}
      <div className="flex flex-col h-full">
        <div className="space-y-4 flex-grow">
          <h3 className={`text-xl sm:text-2xl tracking-tight font-semibold ${getTextClass()}`}>
            {heading}
          </h3>
          
          <p className={`leading-relaxed ${
            backgroundColor === 'dark' 
              ? 'text-white/80' 
              : 'text-light-forest-green'
          }`}>
            {subheading}
          </p>
        </div>

          {cta && (
            <div className="pt-6 mt-auto">
              <CTA 
                {...cta.fields}
              />
            </div>
          )}
      </div>
    </div>
  );
}