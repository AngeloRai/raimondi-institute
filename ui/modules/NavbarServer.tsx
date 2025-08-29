import NavbarClient from "./NavbarClient";
import { NavbarProps } from "@/lib/contentful/types/fields";
import { getPreloadedLayoutForLocale } from "@/lib/preload/layout-data";
import { getLocale } from "@/lib/locale";
import type { TypeLinkSkeleton } from "@/lib/contentful/types/generated";
import type { DefaultChainModifiers, SupportedLocales } from "@/lib/contentful/types/fields";
import type { Entry } from "contentful";

async function fetchSVGContent(url: string): Promise<string | null> {
  try {
    const urlWithTimestamp = `${url}?t=${Date.now()}`;
    const response = await fetch(urlWithTimestamp, { 
      cache: 'no-store',
      next: { revalidate: 0 },
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });
    if (response.ok) {
      return await response.text();
    }
  } catch (error) {
    console.warn('Failed to fetch SVG:', error);
  }
  return null;
}

export default async function NavbarServer(props: NavbarProps) {
  // Get current locale and fetch appropriate preloaded data
  const locale = await getLocale();
  const localizedLayout = getPreloadedLayoutForLocale(locale);
  const navbarDefaults = localizedLayout?.navbar?.fields || {};
  
  
  // Use provided props or fall back to locale-specific preloaded data
  const {
    logo = navbarDefaults?.logo,
    navigationLinks = navbarDefaults?.navigationLinks || [],
    cta = navbarDefaults?.cta,
    backgroundColor = navbarDefaults?.backgroundColor
  } = props;
  // Pre-process data server-side
  const menuItems = navigationLinks
    ?.filter((link: Entry<TypeLinkSkeleton, DefaultChainModifiers, SupportedLocales> | undefined): link is NonNullable<typeof link> => Boolean(link?.fields))
    ?.map((link: Entry<TypeLinkSkeleton, DefaultChainModifiers, SupportedLocales>) => ({
      label: link.fields?.label || "",
      href: link.fields?.url || "#",
    })) || [];

  // Process logo
  const logoUrl = logo?.fields?.file?.url ? `https:${logo.fields.file.url}` : null;
  const logoTitle = logo?.fields?.title || "Logo";
  const logoFileName = logo?.fields?.file?.fileName || "";
  const isLogoSvg = logoFileName.toLowerCase().endsWith(".svg");
  
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
      backgroundColor={backgroundColor}
    />
  );
}