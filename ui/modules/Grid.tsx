'use client'

import Card from '../components/Card'
import Testimonial from '../components/Testimonial'
import type { GridProps } from '@/lib/contentful/types/fields'
import { isTypeComponentCard, isTypeComponentTestimonial } from '@/lib/contentful/types/generated'
import type { IconName } from '../icons/IconRenderer'

interface ComponentGridProps extends GridProps {
  id?: string;
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

export default function Grid({
  id = 'grid',
  heading,
  subheading,
  items = [],
  backgroundColor = 'white',
}: ComponentGridProps) {
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
      case 'dark': return 'text-text-inverse'
      default: return 'text-text-primary'
    }
  }

  // Separate cards and testimonials
  const cards = items?.filter(item => item && isTypeComponentCard(item)) || []
  const testimonials = items?.filter(item => item && isTypeComponentTestimonial(item)) || []
  
  // Determine if we're showing cards or testimonials based on what's in the items array
  const hasTestimonials = testimonials.length > 0
  const currentItems = hasTestimonials ? testimonials : cards
  const isTestimonialGrid = hasTestimonials
  
  // Determine grid layout based on number of items
  const getGridCols = (itemCount: number, isTestimonial: boolean = false) => {
    if (isTestimonial) {
      if (itemCount === 1) return 'grid-cols-1 justify-items-center max-w-2xl mx-auto';
      if (itemCount === 2) return 'grid-cols-1 lg:grid-cols-2';
      return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
    
    if (itemCount === 1) return 'grid-cols-1 justify-items-center max-w-md mx-auto';
    if (itemCount === 2) return 'grid-cols-1 md:grid-cols-2';
    if (itemCount === 3) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
  };

  return (
    <section id={`${id}-${heading ? '-heading' : ''}`} className={`w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 ${getBackgroundClass()}`}>
      <div className="max-w-7xl mx-auto">
        {(heading || subheading) && (
          <div className="text-center mb-12">
            {heading && (
              <h2 className={`font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4 font-bold ${getTextClass()}`}>
                {heading}
              </h2>
            )}
            {subheading && (
              <p 
                className={`text-lg sm:text-xl max-w-2xl mx-auto ${
                  backgroundColor === 'dark' 
                    ? 'text-white/70' 
                    : 'text-light-forest-green'
                }`}
              >
                {subheading}
              </p>
            )}
          </div>
        )}

        <div className={`grid gap-6 lg:gap-8 ${getGridCols(currentItems.length, isTestimonialGrid)}`}>
          {currentItems.map((item) => {
            if (!item) return null;
            
            if (isTypeComponentCard(item)) {
              // Extract the fields, handling both localized and non-localized formats
              const fields = item.fields
              const cardProps = {
                heading: extractFieldValue((fields as any).heading)  || '',
                subheading: extractFieldValue((fields as any).subheading) || '',
                icon: (extractFieldValue(fields.icon) || 'music') as IconName,
                cta: fields.cta,
                backgroundColor: extractFieldValue(fields.backgroundColor) || 'white'
              }
              
              return (
                <Card
                  key={item.sys.id}
                  id={item.sys.id}
                  {...cardProps}
                />
              )
            }
            
            if (isTypeComponentTestimonial(item)) {
              // Extract the fields, handling both localized and non-localized formats
              const fields = item.fields
              const testimonialProps = {
                name: extractFieldValue(fields.name) || '',
                role: extractFieldValue(fields.role),
                testimonial: extractFieldValue(fields.testimonial) || '',
                showRating: extractFieldValue(fields.showRating),
                backgroundColor: extractFieldValue(fields.backgroundColor) || 'white'
              }
              
              return (
                <Testimonial
                  key={item.sys.id}
                  id={item.sys.id}
                  {...testimonialProps}
                />
              )
            }
            
            return null
          })}
        </div>
      </div>
    </section>
  );
}