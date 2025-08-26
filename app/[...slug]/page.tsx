import { ModuleRenderer } from "@/ui/components/ModuleRenderer";
import { contentfulModuleRegistry } from "@/lib/contentful/registry";
import { getPageBySlug, getAllPageSlugs } from "@/lib/contentful/fetchers/pageCms";
import { getLocale } from "@/lib/locale";
import { SUPPORTED_LOCALES } from "@/lib/locale-types";

export async function generateStaticParams() {
  const allSlugs: { slug: string[] }[] = [];
  
  // Generate static params for all supported locales
  for (const locale of Object.keys(SUPPORTED_LOCALES) as (keyof typeof SUPPORTED_LOCALES)[]) {
    try {
      const slugs = await getAllPageSlugs(locale);
      
      slugs.forEach((slugPath: string) => {
        allSlugs.push({
          slug: slugPath.split('/').filter(Boolean)
        });
      });
    } catch (error) {
      console.warn(`Failed to fetch slugs for locale ${locale}:`, error);
    }
  }
  
  return allSlugs;
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();

  const page = await getPageBySlug(slug.join("/"), locale);

  if (!page) {
    return <h1>Blog Post Not Found</h1>;
  }

  return (
    <div className="min-h-[70vh]">
      <ModuleRenderer 
        modules={page.fields.contentModules}
        registry={contentfulModuleRegistry}
      />
    </div>
  );
}
