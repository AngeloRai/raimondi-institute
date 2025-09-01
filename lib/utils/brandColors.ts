// Brand color mappings for Tailwind CSS classes
export type BrandColor = 
  | "dark-forest-green"
  | "medium-forest-green" 
  | "light-forest-green"
  | "charcoal-gray"
  | "warm-cream"
  | "pure-white";

// Theme color aliases (used by some components)
export type ThemeColor = "dark" | "light" | "white";

// Background color class mappings for brand colors
export const brandColorClasses: Record<BrandColor, string> = {
  "dark-forest-green": "bg-dark-forest-green",
  "medium-forest-green": "bg-medium-forest-green", 
  "light-forest-green": "bg-light-forest-green",
  "charcoal-gray": "bg-charcoal-gray",
  "warm-cream": "bg-warm-cream",
  "pure-white": "bg-pure-white",
} as const;

// Brand colors array
export const brandColors = [
  "dark-forest-green",
  "medium-forest-green",
  "light-forest-green",
  "charcoal-gray",
  "warm-cream",
  "pure-white",
];

// Background color class mappings for theme colors  
export const themeColorClasses: Record<ThemeColor, string> = {
  "dark": "bg-charcoal-gray",
  "light": "bg-warm-cream",
  "white": "bg-pure-white",
} as const;

// Text color class mappings
export const brandTextColorClasses: Record<BrandColor, string> = {
  "dark-forest-green": "text-dark-forest-green",
  "medium-forest-green": "text-medium-forest-green",
  "light-forest-green": "text-light-forest-green", 
  "charcoal-gray": "text-charcoal-gray",
  "warm-cream": "text-warm-cream",
  "pure-white": "text-pure-white",
} as const;

// Border color class mappings
export const brandBorderColorClasses: Record<BrandColor, string> = {
  "dark-forest-green": "border-dark-forest-green",
  "medium-forest-green": "border-medium-forest-green",
  "light-forest-green": "border-light-forest-green",
  "charcoal-gray": "border-charcoal-gray", 
  "warm-cream": "border-warm-cream",
  "pure-white": "border-pure-white",
} as const;

/**
 * Get the background CSS class for a brand color or theme color
 * @param color - The brand color name or theme color name
 * @param fallback - Fallback class if color is not found (default: "bg-warm-cream")
 * @returns The Tailwind CSS background class
 */
export function getBrandBgClass(color: string | undefined | null, fallback: string = "bg-warm-cream"): string {
  if (!color) {
    return fallback;
  }
  
  // Check brand colors first
  if (isBrandColor(color)) {
    return brandColorClasses[color];
  }
  
  // Check theme colors
  if (isThemeColor(color)) {
    return themeColorClasses[color];
  }
  
  return fallback;
}

/**
 * Get the text CSS class for a brand color
 * @param color - The brand color name
 * @param fallback - Fallback class if color is not found (default: "text-charcoal-gray")
 * @returns The Tailwind CSS text class
 */
export function getBrandTextClass(color: string | undefined | null, fallback: string = "text-charcoal-gray"): string {
  if (!color || !isBrandColor(color)) {
    return fallback;
  }
  return brandTextColorClasses[color];
}

/**
 * Get the border CSS class for a brand color
 * @param color - The brand color name  
 * @param fallback - Fallback class if color is not found (default: "border-charcoal-gray")
 * @returns The Tailwind CSS border class
 */
export function getBrandBorderClass(color: string | undefined | null, fallback: string = "border-charcoal-gray"): string {
  if (!color || !isBrandColor(color)) {
    return fallback;
  }
  return brandBorderColorClasses[color];
}

/**
 * Type guard to check if a string is a valid brand color
 * @param color - The color string to check
 * @returns True if the color is a valid brand color
 */
export function isBrandColor(color: string): color is BrandColor {
  return color in brandColorClasses;
}

/**
 * Type guard to check if a string is a valid theme color
 * @param color - The color string to check
 * @returns True if the color is a valid theme color
 */
export function isThemeColor(color: string): color is ThemeColor {
  return color in themeColorClasses;
}

/**
 * Get all available brand colors
 * @returns Array of all brand color names
 */
export function getBrandColors(): BrandColor[] {
  return Object.keys(brandColorClasses) as BrandColor[];
}

// Contrast color mappings for text on different backgrounds
export const contrastTextClasses = {
  // Dark backgrounds need light text
  "dark-forest-green": "text-white",
  "medium-forest-green": "text-white", 
  "charcoal-gray": "text-white",
  
  // Light backgrounds need dark text
  "light-forest-green": "text-charcoal-gray",
  "warm-cream": "text-charcoal-gray",
  "pure-white": "text-charcoal-gray",
  
  // Theme color aliases
  "dark": "text-white",
  "light": "text-charcoal-gray", 
  "white": "text-charcoal-gray",
} as const;

// Subtext/secondary text color mappings
export const contrastSubtextClasses = {
  // Dark backgrounds
  "dark-forest-green": "text-white/80",
  "medium-forest-green": "text-white/80",
  "charcoal-gray": "text-white/80",
  
  // Light backgrounds
  "light-forest-green": "text-charcoal-gray/70",
  "warm-cream": "text-light-forest-green", 
  "pure-white": "text-light-forest-green",
  
  // Theme color aliases
  "dark": "text-white/80",
  "light": "text-light-forest-green",
  "white": "text-light-forest-green",
} as const;

// Icon color mappings for different backgrounds
export const contrastIconClasses = {
  // Dark backgrounds
  "dark-forest-green": "text-white",
  "medium-forest-green": "text-white",
  "charcoal-gray": "text-white",
  
  // Light backgrounds  
  "light-forest-green": "text-dark-forest-green",
  "warm-cream": "text-dark-forest-green",
  "pure-white": "text-dark-forest-green",
  
  // Theme color aliases
  "dark": "text-white",
  "light": "text-dark-forest-green",
  "white": "text-dark-forest-green",
} as const;

// Form field styling for different backgrounds
export const contrastFormFieldClasses = {
  // Dark backgrounds
  "dark-forest-green": "bg-white/10 border-white/20 text-white placeholder:text-white/60",
  "medium-forest-green": "bg-white/10 border-white/20 text-white placeholder:text-white/60",
  "charcoal-gray": "bg-white/10 border-white/20 text-white placeholder:text-white/60",
  
  // Light backgrounds
  "light-forest-green": "bg-pure-white border-charcoal-gray/20 text-charcoal-gray",
  "warm-cream": "bg-pure-white border-charcoal-gray/20 text-charcoal-gray",
  "pure-white": "bg-pure-white border-charcoal-gray/20 text-charcoal-gray",
  
  // Theme color aliases
  "dark": "bg-white/10 border-white/20 text-white placeholder:text-white/60",
  "light": "bg-pure-white border-charcoal-gray/20 text-charcoal-gray",
  "white": "bg-pure-white border-charcoal-gray/20 text-charcoal-gray",
} as const;

/**
 * Get contrast-appropriate text color for a background color
 * @param backgroundColor - The background color
 * @param fallback - Fallback class (default: "text-charcoal-gray")
 * @returns Tailwind CSS text class
 */
export function getContrastTextClass(backgroundColor: string | undefined | null, fallback: string = "text-charcoal-gray"): string {
  if (!backgroundColor) return fallback;
  
  const key = backgroundColor as keyof typeof contrastTextClasses;
  return contrastTextClasses[key] || fallback;
}

/**
 * Get contrast-appropriate subtext color for a background color
 * @param backgroundColor - The background color
 * @param fallback - Fallback class (default: "text-light-forest-green")
 * @returns Tailwind CSS text class
 */
export function getContrastSubtextClass(backgroundColor: string | undefined | null, fallback: string = "text-light-forest-green"): string {
  if (!backgroundColor) return fallback;
  
  const key = backgroundColor as keyof typeof contrastSubtextClasses;
  return contrastSubtextClasses[key] || fallback;
}

/**
 * Get contrast-appropriate icon color for a background color
 * @param backgroundColor - The background color
 * @param fallback - Fallback class (default: "text-dark-forest-green")
 * @returns Tailwind CSS text class for icons
 */
export function getContrastIconClass(backgroundColor: string | undefined | null, fallback: string = "text-dark-forest-green"): string {
  if (!backgroundColor) return fallback;
  
  const key = backgroundColor as keyof typeof contrastIconClasses;
  return contrastIconClasses[key] || fallback;
}

/**
 * Get form field styling for a background color
 * @param backgroundColor - The background color
 * @param fallback - Fallback class (default: "bg-pure-white border-charcoal-gray/20 text-charcoal-gray")
 * @returns Tailwind CSS classes for form fields
 */
export function getContrastFormFieldClass(backgroundColor: string | undefined | null, fallback: string = "bg-pure-white border-charcoal-gray/20 text-charcoal-gray"): string {
  if (!backgroundColor) return fallback;
  
  const key = backgroundColor as keyof typeof contrastFormFieldClasses;
  return contrastFormFieldClasses[key] || fallback;
}

/**
 * Check if a background color is considered dark
 * @param backgroundColor - The background color to check
 * @returns True if the background is dark
 */
export function isDarkBackground(backgroundColor: string | undefined | null): boolean {
  if (!backgroundColor) return false;
  
  const darkColors = ["dark-forest-green", "medium-forest-green", "charcoal-gray", "dark"];
  return darkColors.includes(backgroundColor);
}

// CTA variant type (matching Contentful CTA types)
export type CTAVariant = "ghost" | "ghost-dark" | "icon-rounded" | "icon" | "outline" | "outline-dark" | "primary" | "secondary";

/**
 * Get CTA variant and styling based on author preference with smart fallbacks
 * @param cta - The CTA object from Contentful
 * @param backgroundColor - The background color context
 * @param defaultVariant - Fallback variant if none specified
 * @returns Object with variant and className
 */
export function getCTAVariantAndClasses(
  cta: { fields?: { variant?: CTAVariant } } | null | undefined,
  backgroundColor?: string | null,
  defaultVariant: CTAVariant = "primary"
): { variant: CTAVariant; className: string } {
  // Priority 1: Author-specified variant in Contentful
  if (cta?.fields?.variant) {
    return {
      variant: cta.fields.variant,
      className: "w-full",
    };
  }

  // Priority 2: Smart fallback based on background color
  if (backgroundColor) {
    switch (backgroundColor) {
      case "pure-white":
        return {
          variant: "outline" as const,
          className: "w-full !border-dark-forest-green !text-dark-forest-green hover:!bg-dark-forest-green hover:!text-white",
        };
      case "warm-cream":
      case "light-forest-green":
        return {
          variant: "primary" as const,
          className: "w-full",
        };
      case "charcoal-gray":
      case "dark-forest-green":
      case "medium-forest-green":
        return {
          variant: "outline-dark" as const,
          className: "w-full",
        };
    }
  }

  // Priority 3: Default fallback
  return {
    variant: defaultVariant,
    className: "w-full",
  };
}