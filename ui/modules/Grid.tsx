'use client'

import Card from '../components/Card'
import ImageCard from '../components/ImageCard'
import Testimonial from '../components/Testimonial'
import type { GridProps } from '@/lib/contentful/types/fields'
import { isTypeComponentCard, isTypeComponentImageCard, isTypeComponentTestimonial } from '@/lib/contentful/types/generated'
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

  // Use all items together instead of separating by type
  const validItems = items?.filter(item => item && (
    isTypeComponentCard(item) || 
    isTypeComponentImageCard(item) || 
    isTypeComponentTestimonial(item)
  )) || []
  
  // Check if we have mixed types to determine grid behavior
  const hasTestimonials = validItems.some(item => item && isTypeComponentTestimonial(item))
  const hasImageCards = validItems.some(item => item && isTypeComponentImageCard(item))
  const hasCards = validItems.some(item => item && isTypeComponentCard(item))
  
  // If we have mixed types, use a flexible grid layout
  const isMixedGrid = (hasTestimonials ? 1 : 0) + (hasImageCards ? 1 : 0) + (hasCards ? 1 : 0) > 1
  const isTestimonialGrid = hasTestimonials && !isMixedGrid
  const isImageCardGrid = hasImageCards && !isMixedGrid
  
  // Determine grid layout based on number of items and type
  const getGridCols = (itemCount: number, isTestimonial: boolean = false, isImageCard: boolean = false, isMixed: boolean = false) => {
    // For mixed grids, use flexible layout that works for all card types
    if (isMixed) {
      if (itemCount === 1) return 'grid-cols-1 justify-items-center max-w-lg mx-auto';
      if (itemCount === 2) return 'grid-cols-1 md:grid-cols-2';
      if (itemCount === 3) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      // Mixed grids: max 4 per row, flexible for all card types
      return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
    }
    
    if (isTestimonial) {
      if (itemCount === 1) return 'grid-cols-1 justify-items-center max-w-2xl mx-auto';
      if (itemCount === 2) return 'grid-cols-1 lg:grid-cols-2';
      // For testimonials, max 3 per row for better readability
      return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
    
    if (isImageCard) {
      if (itemCount === 1) return 'grid-cols-1 justify-items-center max-w-sm mx-auto';
      if (itemCount === 2) return 'grid-cols-1 md:grid-cols-2';
      if (itemCount === 3) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      // Image cards: max 4 per row, auto-wraps to next row
      return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
    }
    
    // Regular cards: max 4 per row for all cases
    if (itemCount === 1) return 'grid-cols-1 justify-items-center max-w-md mx-auto';
    if (itemCount === 2) return 'grid-cols-1 md:grid-cols-2';
    if (itemCount === 3) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    // 4 or more items: max 4 per row, wraps automatically
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
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

        <div className={`grid gap-6 lg:gap-8 ${getGridCols(validItems.length, isTestimonialGrid, isImageCardGrid, isMixedGrid)}`}>
          {validItems.map((item) => {
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
            
            if (isTypeComponentImageCard(item)) {
              // Extract the fields, handling both localized and non-localized formats
              const fields = item.fields
              const imageCardProps = {
                heading: extractFieldValue(fields.heading) || '',
                description: extractFieldValue(fields.description) || '',
                image: fields.image,
                cta: fields.cta,
                backgroundColor: extractFieldValue(fields.backgroundColor) || 'white'
              }
              
              return (
                <ImageCard
                  key={item.sys.id}
                  {...imageCardProps}
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