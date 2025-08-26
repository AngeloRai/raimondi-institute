import { ModuleRenderer } from "@/ui/components/ModuleRenderer";
import { contentfulModuleRegistry } from "@/lib/contentful/registry";
import { getPageBySlug } from "@/lib/contentful/fetchers/pageCms";
import { getLocale } from "@/lib/locale";

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
    <div>
      <ModuleRenderer 
        modules={page.fields.contentModules}
        registry={contentfulModuleRegistry}
      />
    </div>
  );
}
