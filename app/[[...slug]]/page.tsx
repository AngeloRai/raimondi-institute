import { notFound } from "next/navigation";
import { ModuleRenderer } from "@/ui/components/ModuleRenderer";
import { contentfulModuleRegistry } from "@/lib/contentful/registry";
import {
  getPageBySlug,
  getAllPageSlugs,
} from "@/lib/contentful/fetchers/pageCms";
import { getLocale } from "@/lib/locale";
import { SUPPORTED_LOCALES } from "@/lib/locale-types";

export async function generateStaticParams() {
  const allSlugs: { slug: string[] }[] = [];

  // Generate static params for all supported locales
  for (const locale of Object.keys(
    SUPPORTED_LOCALES
  ) as (keyof typeof SUPPORTED_LOCALES)[]) {
    try {
      const slugs = await getAllPageSlugs(locale);

      slugs.forEach((slugPath: string) => {
        allSlugs.push({
          slug: slugPath.split("/").filter(Boolean),
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
  console.log("🚀 ~ Page ~ slug:", slug);
  
  const locale = await getLocale();
  
  // Default to "home" when no slug is provided
  const pageSlug = !slug || slug.length === 0 ? "home" : slug.join("/");

  const page = await getPageBySlug(pageSlug, locale);
  if (!page) {
    notFound();
  }
  const { contentModules } = page.fields;

  return (
    <div className="min-h-[70vh]">
      <ModuleRenderer
        modules={contentModules}
        registry={contentfulModuleRegistry}
      />
    </div>
  );
}
