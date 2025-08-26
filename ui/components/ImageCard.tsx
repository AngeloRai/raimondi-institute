import Image from "next/image";
import CTA from "./CTA";
import { toAbsoluteCtfUrl } from "@/lib/contentful/utils/image";
import { ImageCardProps } from "@/lib/contentful/types/fields";

type ComponentImageCardProps = ImageCardProps & {
  className?: string;
};

export default function ImageCard({
  image,
  heading,
  cta,
  backgroundColor,
  description,
  className = "",
}: ComponentImageCardProps) {
  const hasContentfulImage = image?.fields?.file?.url;
  const imageUrl = toAbsoluteCtfUrl(image?.fields?.file?.url);
  const imageAlt = image?.fields?.title || heading;

  const getBackgroundClass = () => {
    switch (backgroundColor) {
      case 'white': return 'bg-pure-white'
      case 'light': return 'bg-warm-cream'
      case 'dark': return 'bg-charcoal-gray'
      default: return 'bg-pure-white'
    }
  }

  const getTextClass = () => {
    switch (backgroundColor) {
      case 'white': return 'text-dark-forest-green'
      case 'light': return 'text-dark-forest-green'
      case 'dark': return 'text-white'
      default: return 'text-dark-forest-green'
    }
  }

  const getCTAVariantAndClasses = () => {
    switch (backgroundColor) {
      case 'white': 
        return { 
          variant: 'outline' as const, 
          className: 'w-full !border-dark-forest-green !text-dark-forest-green hover:!bg-dark-forest-green hover:!text-white' 
        }
      case 'light': 
        return { 
          variant: 'primary' as const, 
          className: 'w-full' 
        }
      case 'dark': 
        return { 
          variant: 'secondary' as const, 
          className: 'w-full' 
        }
      default: 
        return { 
          variant: 'outline' as const, 
          className: 'w-full !border-dark-forest-green !text-dark-forest-green hover:!bg-dark-forest-green hover:!text-white' 
        }
    }
  }

  return (
    <div
      className={`group relative overflow-hidden rounded-xl shadow-sm 
                  transition-all duration-300 hover:shadow-xl hover:-translate-y-1 
                  ${getBackgroundClass()} ${className}`}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-warm-cream/20">
        {hasContentfulImage && imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {/* <img
              src="/logo-140.svg"
              alt={heading}
              className="w-32 h-32 transition-transform duration-500 group-hover:scale-105 opacity-60"
            /> */}
             <Image
           src="/logo-110.svg"
              alt={heading}
            width={120} // Optional: specify width
            height={120} // Optional: specify height
            unoptimized // Optional: if you don't need Next.js image optimization for this SVG
          />
          </div>
        )}

        {/* Overlay that appears on hover */}
        <div className="absolute inset-0 bg-dark-forest-green/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Description overlay - slides up on hover */}
        <div
          className="absolute inset-0 flex items-center justify-center p-6 
                        opacity-0 translate-y-4 transition-all duration-300 ease-out
                        group-hover:opacity-100 group-hover:translate-y-0"
        >
          <p className="text-white text-center text-sm leading-relaxed font-medium">
            {description}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className={`p-6 space-y-4 ${getBackgroundClass()}`}>
        <h3 className={`font-bold text-xl leading-tight ${getTextClass()}`}>
          {heading}
        </h3>

        {cta && (
          <div className="transition-transform duration-200 group-hover:scale-105">
            <CTA
              {...cta.fields}
              variant={getCTAVariantAndClasses().variant}
              className={getCTAVariantAndClasses().className}
            />
          </div>
        )}
      </div>
    </div>
  );
}
