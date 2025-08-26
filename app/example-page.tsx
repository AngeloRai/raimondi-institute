import { notFound } from 'next/navigation'
import { ModuleRenderer } from '@/ui/components/ModuleRenderer'
import { contentfulModuleRegistry } from '@/lib/contentful/registry'
import { getLocale } from '@/lib/locale'
import { getPageBySlug } from '@/lib/contentful/fetchers/pageCms'

interface PageProps {
  params: { slug: string }
  searchParams: { locale?: string }
}

export default async function DynamicPage({ params, searchParams }: PageProps) {
  // Build slug from array (e.g., ['about', 'team'] -> 'about/team')
  const slug = params.slug || 'home'
  
  // Get locale from cookies/geolocation
  const locale = await getLocale()

  // Fetch page with content already localized for the specified locale
  const page = await getPageBySlug(slug, locale)

  if (!page) {
    notFound()
  }

  const { contentModules } = page.fields

  return (
    <div>
      {/* Render all content modules - content is already localized */}
      <ModuleRenderer
        modules={contentModules}
        registry={contentfulModuleRegistry}
      />
    </div>
  )
}