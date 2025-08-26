import Image from "next/image";
import CTA from "../components/CTA";
import { RichText } from "../components/RichText";
import SocialShare from "../components/SocialShare";
import type { HeroProps } from "@/lib/contentful/types/fields";
import type { Document } from "@contentful/rich-text-types";

function Hero({
  heading,
  subheading,
  image,
  bgColor,
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

  const brandColorClasses = {
    "dark-forest-green": "bg-dark-forest-green",
    "medium-forest-green": "bg-medium-forest-green",
    "light-forest-green": "bg-light-forest-green",
    "charcoal-gray": "bg-charcoal-gray",
    "warm-cream": "bg-warm-cream",
    "pure-white": "bg-pure-white",
  };

  const imageUrl = image?.fields?.file?.url;
  const imageAlt = image?.fields?.title || heading || "Hero image";

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
                    label={primaryCta.fields?.label}
                    url={primaryCta.fields?.url}
                    variant={primaryCta.fields?.variant || "primary"}
                    size={primaryCta.fields?.size || "large"}
                    external={primaryCta.fields?.external}
                    disabled={primaryCta.fields?.disabled}
                  />
                )}
                {secondaryCta && (
                  <CTA
                    label={secondaryCta.fields?.label}
                    url={secondaryCta.fields?.url}
                    variant={secondaryCta.fields?.variant || "outline"}
                    size={secondaryCta.fields?.size || "large"}
                    external={secondaryCta.fields?.external}
                    disabled={secondaryCta.fields?.disabled}
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
                  links={socialShare.fields?.links as any}
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
  const bgColorClass =
    bgColor && brandColorClasses[bgColor as keyof typeof brandColorClasses]
      ? brandColorClasses[bgColor as keyof typeof brandColorClasses]
      : "bg-warm-cream"; // Default fallback

  // Determine text colors based on background
  const isDarkBackground = bgColor === 'dark-forest-green' || bgColor === 'medium-forest-green' || bgColor === 'charcoal-gray'
  const headingTextClass = isDarkBackground ? 'text-white' : 'text-charcoal-gray'
  const subheadingTextClass = isDarkBackground ? 'text-white/90' : 'text-gray-600'
  const copyTextClass = isDarkBackground ? 'text-white/80' : 'text-gray-600'

  return (
    <section
      id="hero"
      className={`relative w-full ${heightClasses[height as keyof typeof heightClasses] || "min-h-[700px]"} overflow-hidden ${bgColorClass}`}
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="w-full flex flex-col items-center text-center space-y-10">
          {/* Header Content */}
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
              {primaryCta && <CTA {...primaryCta.fields} />}
              {secondaryCta && <CTA {...secondaryCta.fields} />}
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
                links={socialShare.fields?.links as any}
                variant={isDarkBackground ? 'dark' : 'light'}
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
