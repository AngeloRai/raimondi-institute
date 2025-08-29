import Image from "next/image";
import CTA from "../components/CTA";
import { RichText } from "../components/RichText";
import SocialShare from "../components/SocialShare";
import type { HeroProps } from "@/lib/contentful/types/fields";
import type { Document } from "@contentful/rich-text-types";
import { getBrandBgClass, getCTAVariantAndClasses, getContrastTextClass, getContrastSubtextClass, isDarkBackground } from "@/lib/utils/brandColors";

function Hero({
  heading,
  subheading,
  image,
  backgroundColor,
  primaryCta,
  secondaryCta,
  height,
  copy,
  imagePosition,
  socialShare
}: HeroProps) {
  const heightClasses = {
    small: "min-h-[500px]",
    medium: "min-h-[600px]",
    large: "min-h-[700px]",
    "full screen": "min-h-screen",
  };


  const imageUrl = image?.fields?.file?.url;
  const imageAlt = image?.fields?.title || heading || "Hero image";
  const links = socialShare?.fields?.links;

  // Overlay variation - full background image
  if (imagePosition === "overlay" && imageUrl) {
    return (
      <section
        id="hero"
        className={`relative w-full ${heightClasses[height as keyof typeof heightClasses] || "min-h-screen"} overflow-hidden`}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={imageUrl}
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

            {/* CTA Buttons with improved contrast */}
            {(primaryCta || secondaryCta) && (
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center [&_button]:!bg-white [&_button]:!text-charcoal-gray [&_button]:!border-white [&_button:hover]:!bg-white/90 [&_a]:!bg-white [&_a]:!text-charcoal-gray [&_a]:!border-white [&_a:hover]:!bg-white/90">
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

  // Default center variation - improved design
  const backgroundColorClass = getBrandBgClass(backgroundColor, "bg-warm-cream");

  // Determine text colors using brand color utilities
  const headingTextClass = getContrastTextClass(backgroundColor, 'text-charcoal-gray')
  const subheadingTextClass = getContrastSubtextClass(backgroundColor, 'text-gray-600')
  const copyTextClass = getContrastSubtextClass(backgroundColor, 'text-gray-600')

  return (
    <section
      id="hero"
      className={`relative w-full ${heightClasses[height as keyof typeof heightClasses] || "min-h-[700px]"} overflow-hidden ${backgroundColorClass}`}
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="w-full flex flex-col items-center text-center space-y-10">
          {/* Heading Content */}
          <div className="space-y-6 max-w-5xl">
            {heading && (
              <h1 className={`font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[1.05] ${headingTextClass} font-bold`}>
                {heading}
              </h1>
            )}

            {subheading && (
              <div className={`text-xl sm:text-2xl lg:text-2xl max-w-4xl mx-auto leading-relaxed ${subheadingTextClass}`}>
                {typeof subheading === "string" ? (
                  <p>{subheading}</p>
                ) : (
                  <RichText
                    content={subheading as Document}
                    className={`[&_p]:${subheadingTextClass}`}
                  />
                )}
              </div>
            )}
          </div>

          {/* Product Image - Cleaner design */}
          {imageUrl && (
            <div className="relative w-full max-w-4xl">
              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl shadow-2xl">
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  className="object-cover object-center hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  priority
                />
              </div>
            </div>
          )}

          {/* CTA Buttons */}
          {(primaryCta || secondaryCta) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {primaryCta && (
                <CTA 
                  {...primaryCta.fields} 
                  variant={getCTAVariantAndClasses(primaryCta, backgroundColor, "primary").variant}
                />
              )}
              {secondaryCta && (
                <CTA 
                  {...secondaryCta.fields}
                  variant={getCTAVariantAndClasses(secondaryCta, backgroundColor, "outline").variant}
                />
              )}
            </div>
          )}

          {copy && (
            <div className={`mt-4 italic ${copyTextClass}`}>
              <RichText content={copy} className={`[&_p]:${copyTextClass}`} />
            </div>
          )}

          {/* Social Share Links */}
          {socialShare && (
            <div className="mt-8">
              <SocialShare 
                links={socialShare.fields?.links}
                variant={isDarkBackground(backgroundColor) ? 'dark' : 'light'}
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

export default Hero;
