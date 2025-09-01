import Image from "next/image";
import CTA from "../components/CTA";
import { RichText } from "../components/RichText";
import SocialShare from "../components/SocialShare";
import type { HeroProps } from "@/lib/contentful/types/fields";
import type { Document } from "@contentful/rich-text-types";
import { getCTAVariantAndClasses, isDarkBackground } from "@/lib/utils/brandColors";

interface HeroSplitProps extends HeroProps {
  heightClasses: Record<string, string>;
  imageUrl: string | undefined;
  imageAlt: string;
  backgroundColorClass: string;
  headingTextClass: string;
  subheadingTextClass: string;
  copyTextClass: string;
}

export default function HeroSplit({
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
  imageAlt,
  backgroundColorClass,
  headingTextClass,
  subheadingTextClass,
  copyTextClass
}: HeroSplitProps) {
  const links = socialShare?.fields?.links;

  return (
    <section
      id="hero"
      className={`relative w-full ${heightClasses[height as keyof typeof heightClasses] || "min-h-screen"} overflow-hidden ${backgroundColorClass}`}
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full h-full flex items-center px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full min-h-[600px]">
          {/* Content Column - Left side */}
          <div className="space-y-8">
            {heading && (
              <h1 className={`font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-tight leading-[1.02] ${headingTextClass} font-bold`}>
                {heading}
              </h1>
            )}

            {subheading && (
              <div className={`text-lg sm:text-xl lg:text-2xl max-w-2xl leading-relaxed ${subheadingTextClass}`}>
                {typeof subheading === "string" ? (
                  <p>{subheading}</p>
                ) : (
                  <RichText
                    content={subheading as Document}
                    className={`[&_p]:${subheadingTextClass} [&_p]:leading-relaxed`}
                  />
                )}
              </div>
            )}

            {/* CTA Buttons */}
            {(primaryCta || secondaryCta) && (
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
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
              <div className={`max-w-xl ${copyTextClass}`}>
                <RichText content={copy} className={`[&_p]:${copyTextClass} [&_p]:text-base [&_p]:leading-relaxed`} />
              </div>
            )}

            {/* Social Share Links */}
            {socialShare && (
              <div className="pt-4">
                <SocialShare 
                  links={links}
                  variant={isDarkBackground(backgroundColor) ? 'dark' : 'light'}
                  size="medium"
                  className="justify-start"
                />
              </div>
            )}
          </div>

          {/* Image Column - Right side */}
          {imageUrl && (
            <div className="lg:flex justify-center items-center">
              <div className="relative w-full max-w-lg">
                <div className="relative aspect-square overflow-hidden rounded-3xl shadow-2xl">
                  <Image
                    src={imageUrl}
                    alt={imageAlt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
                    priority
                  />
                </div>
                {/* Subtle decorative element */}
                <div className={`absolute -bottom-4 -right-4 w-24 h-24 ${
                  isDarkBackground(backgroundColor) ? 'bg-white/10' : 'bg-black/10'
                } rounded-2xl -z-10`} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}