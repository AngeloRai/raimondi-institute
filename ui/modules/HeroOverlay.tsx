import Image from "next/image";
import CTA from "../components/CTA";
import { RichText } from "../components/RichText";
import SocialShare from "../components/SocialShare";
import type { HeroProps } from "@/lib/contentful/types/fields";
import type { Document } from "@contentful/rich-text-types";
import { getCTAVariantAndClasses } from "@/lib/utils/brandColors";

interface HeroOverlayProps extends HeroProps {
  heightClasses: Record<string, string>;
  imageUrl: string | undefined;
  imageAlt: string;
}

export default function HeroOverlay({
  heading,
  subheading,
  backgroundColor,
  primaryCta,
  secondaryCta,
  height,
  copy,
  socialShare,
  heightClasses,
  imageUrl,
  imageAlt
}: HeroOverlayProps) {
  const links = socialShare?.fields?.links;

  return (
    <section
      id="hero"
      className={`relative w-full ${heightClasses[height as keyof typeof heightClasses] || "min-h-screen"} overflow-hidden`}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl!}
          alt={imageAlt}
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="w-full flex flex-col items-center text-center space-y-8">
          {heading && (
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[1.05] text-white font-bold drop-shadow-lg">
              {heading}
            </h1>
          )}

          {subheading && (
            <div className="text-xl sm:text-2xl lg:text-3xl max-w-4xl mx-auto leading-relaxed">
              <RichText
                content={subheading as Document}
                className="[&_p]:text-white/90 [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white [&_h4]:text-white [&_h5]:text-white [&_h6]:text-white [&_li]:text-white/90"
              />
            </div>
          )}

          {/* CTA Buttons with clean styling */}
          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              {primaryCta && (
                <CTA
                  {...primaryCta.fields}
                  variant={getCTAVariantAndClasses(primaryCta, backgroundColor, "primary").variant}
                  size={primaryCta.fields?.size || "large"}
                />
              )}
              {secondaryCta && (
                <CTA
                  {...secondaryCta.fields}
                  variant={getCTAVariantAndClasses(secondaryCta, backgroundColor, "outline").variant}
                  size={secondaryCta.fields?.size || "large"}
                />
              )}
            </div>
          )}

          {copy && (
            <div className="mt-6">
              <RichText content={copy} className="[&_p]:text-white/80" />
            </div>
          )}

          {/* Social Share Links */}
          {socialShare && (
            <div className="mt-8">
              <SocialShare 
                links={links}
                variant="dark"
                size="medium"
                className="justify-center"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}