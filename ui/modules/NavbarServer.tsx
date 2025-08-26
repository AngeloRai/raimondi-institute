import NavbarClient from "./NavbarClient";
import { NavbarProps } from "@/lib/contentful/types/fields";
import { preloadedLayoutData } from "@/lib/preload/layout-data";

async function fetchSVGContent(url: string): Promise<string | null> {
  try {
    const response = await fetch(url);
    if (response.ok) {
      return await response.text();
    }
  } catch (error) {
    console.warn('Failed to fetch SVG:', error);
  }
  return null;
}

export default async function NavbarServer({
  logo = preloadedLayoutData.navbar?.fields?.logo,
  navigationLinks = preloadedLayoutData.navbar?.fields?.navigationLinks || [],
  cta = preloadedLayoutData.navbar?.fields?.cta,
}: NavbarProps) {
  // Pre-process data server-side
  const menuItems = navigationLinks
    ?.filter((link): link is NonNullable<typeof link> => Boolean(link?.fields))
    ?.map((link) => ({
      label: link.fields?.label || "",
      href: link.fields?.url || "#",
    })) || [];

  // Process logo
  const logoUrl = logo?.fields?.file?.url ? `https:${logo.fields.file.url}` : null;
  const logoTitle = logo?.fields?.title || "Logo";
  const logoFileName = logo?.fields?.file?.fileName || "";
  const isLogoSvg = logoFileName.toLowerCase().endsWith(".svg");
  
  // Fetch SVG content server-side if needed
  let svgContent: string | null = null;
  if (logoUrl && isLogoSvg) {
    svgContent = await fetchSVGContent(logoUrl);
  }

  return (
    <NavbarClient
      logoUrl={logoUrl}
      logoTitle={logoTitle}
      svgContent={svgContent}
      isLogoSvg={isLogoSvg}
      menuItems={menuItems}
      cta={cta}
    />
  );
}