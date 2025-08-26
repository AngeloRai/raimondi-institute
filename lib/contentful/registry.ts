import type { ModuleRegistry } from './types/module-renderer'

// Import all module components
import Hero from '@/ui/modules/Hero'
import ImageText from '@/ui/modules/ImageText'
import Grid from '@/ui/modules/Grid'
import ImageCarousel from '@/ui/modules/ImageCarousel'
import RichTextBlock from '@/ui/modules/RichTextBlock'
import ContactForm from '@/ui/modules/ContactForm'
// Add more imports here as you create modules

/**
 * Registry mapping Contentful content type IDs to React components.
 * 
 * IMPORTANT: The key must exactly match the content type ID in Contentful.
 * Update these keys to match your actual content type IDs from Contentful.
 * 
 * To add a new module:
 * 1. Create your component in /ui/modules/ or /ui/components/
 * 2. Import it above
 * 3. Add it to the registry below with the correct content type ID
 */
export const contentfulModuleRegistry: ModuleRegistry = {
  // Core content modules (update these to match your Contentful content type IDs)
  moduleHero: Hero,
  moduleImageText: ImageText,
  moduleGrid: Grid,
  moduleImageCarousel: ImageCarousel,
  moduleContactForm: ContactForm,
  richTextBlock: RichTextBlock,

  // Note: CTA is a child component used within other modules, not a standalone module
  // If you need CTA as a standalone module, create a wrapper component
  
  // Add new modules here...
  // For example:
  // textBlock: TextBlock,
  // imageGallery: ImageGallery,
  // testimonial: Testimonial,
}

/**
 * Helper to validate that a content type has a registered component
 */
export function isRegisteredModule(contentTypeId: string): boolean {
  return contentTypeId in contentfulModuleRegistry
}

/**
 * Helper to get all registered content type IDs
 */
export function getRegisteredContentTypes(): string[] {
  return Object.keys(contentfulModuleRegistry)
}