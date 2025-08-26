import Image from "next/image";
import Link from "next/link";
import LogoLight from "../icons/LogoLight";
import { FooterProps } from "@/lib/contentful/types/fields";
import { getPreloadedLayoutForLocale } from "@/lib/preload/layout-data";
import SocialShare, { CTAEntry } from "../components/SocialShare";
import LocaleSelector from "../components/LocaleSelector";
import { getLocale } from "@/lib/locale";
import type { TypeComponentLinks, TypeLinkSkeleton, TypeCtaSkeleton } from "@/lib/contentful/types/generated";
import type { DefaultChainModifiers, SupportedLocales } from "@/lib/contentful/types/fields";
import type { Entry } from "contentful";

async function fetchSVGContent(url: string): Promise<string | null> {
  try {
    const response = await fetch(url);
    if (response.ok) {
      return await response.text();
    }
  } catch (error) {
    console.warn("Failed to fetch SVG:", error);
  }
  return null;
}

export default async function Footer(props: FooterProps) {
  // Get current locale and fetch appropriate preloaded data
  const currentLocale = await getLocale();
  const localizedLayout = getPreloadedLayoutForLocale(currentLocale);
  const footerDefaults = localizedLayout?.footer?.fields || {};
  
  // Use provided props or fall back to locale-specific preloaded data
  const {
    logo = footerDefaults?.logo,
    slogan = footerDefaults?.slogan,
    links = footerDefaults?.links || [],
    copyrightPhrase = footerDefaults?.copyrightPhrase,
    copyrightLinks = footerDefaults?.copyrightLinks || [],
    socialShare = footerDefaults?.socialShare,
  } = props;
  const logoUrl = logo?.fields?.file?.url
    ? `https:${logo.fields.file.url}`
    : null;
  const logoTitle = logo?.fields?.title || "Logo";
  const logoFileName = logo?.fields?.file?.fileName || "";
  const isLogoSvg = logoFileName.toLowerCase().endsWith(".svg");

  let svgContent: string | null = null;

  if (logoUrl && isLogoSvg) {
    svgContent = await fetchSVGContent(logoUrl);
  }

  const LogoComponent = () => {
    if (!logoUrl) {
      return <LogoLight className="h-12 w-auto" />;
    }

    if (isLogoSvg && svgContent) {
      const styledSvg = svgContent.replace(
        "<svg",
        '<svg class="h-12 w-auto brightness-0 invert" style="height: 48px; width: auto;"'
      );
      return (
        <div
          className="h-12 w-auto [&>svg]:h-12 [&>svg]:w-auto [&>svg]:brightness-0 [&>svg]:invert"
          dangerouslySetInnerHTML={{ __html: styledSvg }}
          role="img"
          aria-label={logoTitle}
        />
      );
    }

    return (
      <Image
        src={logoUrl}
        alt={logoTitle}
        width={112}
        height={48}
        className="h-12 w-auto brightness-0 invert"
      />
    );
  };

  return (
    <footer
      id="footer"
      className="w-full pt-16 pb-8 px-4 sm:px-6 lg:px-8 bg-charcoal-gray"
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <LogoComponent />

            {slogan && (
              <div className="text-sm leading-relaxed max-w-xs text-white/70">
                {slogan}
              </div>
            )}

            {/* Social Links */}
            {socialShare?.fields?.links && (
              <SocialShare
                links={socialShare.fields.links as CTAEntry[]}
                variant="dark"
                size="medium"
                className="pt-2"
              />
            )}
          </div>

          {/* Footer Links Sections */}
          {links?.map((section: TypeComponentLinks<DefaultChainModifiers, SupportedLocales> | undefined, index: number) => {
            if (!section?.fields) return null;

            return (
              <div key={index} className="space-y-4">
                {section.fields.title && (
                  <h3 className="tracking-wide text-white font-semibold">
                    {section.fields.title}
                  </h3>
                )}
                <ul className="space-y-2">
                  {section.fields.links?.map((link: Entry<TypeCtaSkeleton | TypeLinkSkeleton, DefaultChainModifiers, SupportedLocales> | undefined, linkIndex: number) => {
                    if (!link?.fields) return null;

                    return (
                      <li key={linkIndex}>
                        <Link
                          href={link.fields.url || "#"}
                          className="text-sm transition-colors duration-200 hover:opacity-70 text-white/70"
                        >
                          {link.fields.label || ""}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Bottom Border */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-white/50">
              {copyrightPhrase || "© 2025 All rights reserved."}
            </p>

            <div className="flex items-center space-x-6">
              {/* Locale Selector */}
              <LocaleSelector currentLocale={currentLocale} variant="footer" />
              
              {/* Copyright Links */}
              <div className="flex space-x-6">
                {copyrightLinks?.map((link: Entry<TypeLinkSkeleton, DefaultChainModifiers, SupportedLocales> | undefined, index: number) => {
                  if (!link?.fields) return null;

                  return (
                    <Link
                      key={index}
                      href={link.fields.url || "#"}
                      className="text-sm transition-colors duration-200 hover:opacity-70 text-white/50"
                    >
                      {link.fields.label || ""}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
