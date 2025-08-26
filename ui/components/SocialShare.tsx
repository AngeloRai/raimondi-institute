"use client";

import Link from "next/link";
import Instagram from "../icons/Instagram";
import Facebook from "../icons/Facebook";
import YouTube from "../icons/YouTube";
import Twitter from "../icons/Twitter";
import type { TypeCtaSkeleton, TypeLinkSkeleton } from "@/lib/contentful/types/generated";
import type { Entry, ChainModifiers, LocaleCode } from "contentful";

// Type for CTA entries (only CTAs have icon fields needed for social links)
export type CTAEntry = Entry<TypeCtaSkeleton, ChainModifiers, LocaleCode>;
export type LinkEntry = Entry<TypeLinkSkeleton, ChainModifiers, LocaleCode>;

interface SocialShareProps {
  links?: (CTAEntry | LinkEntry | undefined)[] | null;
  variant?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const socialIcons = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: YouTube,
  twitter: Twitter,
};

const platformColors = {
  instagram: '#E4405F',
  facebook: '#1877F2', 
  youtube: '#FF0000',
  twitter: '#1DA1F2',
};

export default function SocialShare({ 
  links, 
  variant = 'light', 
  size = 'medium',
  className = '' 
}: SocialShareProps) {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-10 h-10', 
    large: 'w-12 h-12'
  };

  const iconSizes = {
    small: 'w-4 h-4',
    medium: 'w-5 h-5',
    large: 'w-6 h-6'
  };

  if (!links || links.length === 0) return null;

  // Helper to extract string value from potentially localized fields
  const getFieldValue = (field: unknown): string | undefined => {
    if (typeof field === 'string') return field;
    if (typeof field === 'object' && field && !Array.isArray(field)) {
      const fieldObj = field as Record<string, unknown>;
      const values = Object.values(fieldObj);
      return typeof values[0] === 'string' ? values[0] : undefined;
    }
    return undefined;
  };

  const socialLinks = links
    .filter((link): link is CTAEntry => {
      if (!link?.fields) return false;
      
      // Only process entries that have icon field (CTAs only)
      const hasIcon = 'icon' in link.fields;
      if (!hasIcon) return false;
      
      // Get the icon and url values - cast to any since we checked for icon presence above
      const iconValue = getFieldValue((link.fields as any).icon);
      const urlValue = getFieldValue(link.fields.url);
            
      return !!iconValue && !!urlValue && Object.keys(socialIcons).includes(iconValue);
    })
    .map(link => {
      // Extract string values from fields - cast to any since we filtered for entries with icon field above
      const fields = link.fields as any;
      const iconValue = getFieldValue(fields.icon) || '';
      const urlValue = getFieldValue(fields.url) || '';
      const labelValue = getFieldValue(fields.label);
      
      return {
        platform: iconValue as 'instagram' | 'facebook' | 'youtube' | 'twitter',
        url: urlValue,
        label: labelValue || `Visit our ${iconValue}`
      };
    });
  
  if (socialLinks.length === 0) {
    console.log('No valid social links found');
    return null;
  }

  return (
    <div className={`flex gap-3 ${className}`}>
      {socialLinks.map((link, index) => {
        const IconComponent = socialIcons[link.platform];
        const brandColor = platformColors[link.platform];
        
        if (!IconComponent) return null;

        return (
          <Link
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              ${sizeClasses[size]} 
              inline-flex items-center justify-center 
              rounded-full transition-all duration-200 
              hover:scale-110 active:scale-95
              focus:outline-none focus:ring-2 focus:ring-offset-2
              ${variant === 'light' 
                ? 'bg-white text-gray-600 hover:text-white shadow-md hover:shadow-lg focus:ring-gray-300' 
                : 'bg-white/20 text-white hover:bg-white/30 focus:ring-white/50'
              }
            `}
            style={{
              '--hover-bg': brandColor,
            } as React.CSSProperties}
            onMouseEnter={(e) => {
              if (variant === 'light') {
                e.currentTarget.style.backgroundColor = brandColor;
                e.currentTarget.style.color = 'white';
              }
            }}
            onMouseLeave={(e) => {
              if (variant === 'light') {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = '#4B5563';
              }
            }}
            aria-label={link.label || `Visit our ${link.platform}`}
          >
            <IconComponent className={iconSizes[size]} />
          </Link>
        );
      })}
    </div>
  );
}