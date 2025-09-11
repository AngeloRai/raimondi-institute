// Brand color mappings for Tailwind CSS classes
export type BrandColor = 
  | "brand-primary"
  | "brand-secondary" 
  | "brand-accent"
  | "neutral-dark"
  | "surface-soft"
  | "surface-pure";

// Theme color aliases (used by some components)
export type ThemeColor = "dark" | "light" | "white";

// Background color class mappings for brand colors
export const brandColorClasses: Record<BrandColor, string> = {
  "brand-primary": "bg-brand-primary",
  "brand-secondary": "bg-brand-secondary", 
  "brand-accent": "bg-brand-accent",
  "neutral-dark": "bg-neutral-dark",
  "surface-soft": "bg-surface-soft",
  "surface-pure": "bg-surface-pure",
} as const;

// Brand colors array
export const brandColors = [
  "brand-primary",
  "brand-secondary",
  "brand-accent",
  "neutral-dark",
  "surface-soft",
  "surface-pure",
];

// Background color class mappings for theme colors  
export const themeColorClasses: Record<ThemeColor, string> = {
  "dark": "bg-neutral-dark",
  "light": "bg-surface-soft",
  "white": "bg-surface-pure",
} as const;

// Text color class mappings
export const brandTextColorClasses: Record<BrandColor, string> = {
  "brand-primary": "text-brand-primary",
  "brand-secondary": "text-brand-secondary",
  "brand-accent": "text-brand-accent", 
  "neutral-dark": "text-neutral-dark",
  "surface-soft": "text-surface-soft",
  "surface-pure": "text-surface-pure",
} as const;

// Border color class mappings
export const brandBorderColorClasses: Record<BrandColor, string> = {
  "brand-primary": "border-brand-primary",
  "brand-secondary": "border-brand-secondary",
  "brand-accent": "border-brand-accent",
  "neutral-dark": "border-neutral-dark", 
  "surface-soft": "border-surface-soft",
  "surface-pure": "border-surface-pure",
} as const;

/**
 * Get the background CSS class for a brand color or theme color
 * @param color - The brand color name or theme color name
 * @param fallback - Fallback class if color is not found (default: "bg-surface-soft")
 * @returns The Tailwind CSS background class
 */
export function getBrandBgClass(color: string | undefined | null, fallback: string = "bg-surface-soft"): string {
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
 * @param fallback - Fallback class if color is not found (default: "text-neutral-dark")
 * @returns The Tailwind CSS text class
 */
export function getBrandTextClass(color: string | undefined | null, fallback: string = "text-neutral-dark"): string {
  if (!color || !isBrandColor(color)) {
    return fallback;
  }
  return brandTextColorClasses[color];
}

/**
 * Get the border CSS class for a brand color
 * @param color - The brand color name  
 * @param fallback - Fallback class if color is not found (default: "border-neutral-dark")
 * @returns The Tailwind CSS border class
 */
export function getBrandBorderClass(color: string | undefined | null, fallback: string = "border-neutral-dark"): string {
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
  "brand-primary": "text-white",
  "brand-secondary": "text-white", 
  "neutral-dark": "text-white",
  
  // Light backgrounds need dark text
  "brand-accent": "text-neutral-dark",
  "surface-soft": "text-neutral-dark",
  "surface-pure": "text-neutral-dark",
  
  // Theme color aliases
  "dark": "text-white",
  "light": "text-neutral-dark", 
  "white": "text-neutral-dark",
} as const;

// Subtext/secondary text color mappings
export const contrastSubtextClasses = {
  // Dark backgrounds
  "brand-primary": "text-white/80",
  "brand-secondary": "text-white/80",
  "neutral-dark": "text-white/80",
  
  // Light backgrounds
  "brand-accent": "text-neutral-dark/70",
  "surface-soft": "text-brand-accent", 
  "surface-pure": "text-brand-accent",
  
  // Theme color aliases
  "dark": "text-white/80",
  "light": "text-brand-accent",
  "white": "text-brand-accent",
} as const;

// Icon color mappings for different backgrounds
export const contrastIconClasses = {
  // Dark backgrounds
  "brand-primary": "text-white",
  "brand-secondary": "text-white",
  "neutral-dark": "text-white",
  
  // Light backgrounds  
  "brand-accent": "text-brand-primary",
  "surface-soft": "text-brand-primary",
  "surface-pure": "text-brand-primary",
  
  // Theme color aliases
  "dark": "text-white",
  "light": "text-brand-primary",
  "white": "text-brand-primary",
} as const;

// Form field styling for different backgrounds
export const contrastFormFieldClasses = {
  // Dark backgrounds
  "brand-primary": "bg-white/10 border-white/20 text-white placeholder:text-white/60",
  "brand-secondary": "bg-white/10 border-white/20 text-white placeholder:text-white/60",
  "neutral-dark": "bg-white/10 border-white/20 text-white placeholder:text-white/60",
  
  // Light backgrounds
  "brand-accent": "bg-surface-pure border-neutral-dark/20 text-neutral-dark",
  "surface-soft": "bg-surface-pure border-neutral-dark/20 text-neutral-dark",
  "surface-pure": "bg-surface-pure border-neutral-dark/20 text-neutral-dark",
  
  // Theme color aliases
  "dark": "bg-white/10 border-white/20 text-white placeholder:text-white/60",
  "light": "bg-surface-pure border-neutral-dark/20 text-neutral-dark",
  "white": "bg-surface-pure border-neutral-dark/20 text-neutral-dark",
} as const;

/**
 * Get contrast-appropriate text color for a background color
 * @param backgroundColor - The background color
 * @param fallback - Fallback class (default: "text-neutral-dark")
 * @returns Tailwind CSS text class
 */
export function getContrastTextClass(backgroundColor: string | undefined | null, fallback: string = "text-neutral-dark"): string {
  if (!backgroundColor) return fallback;
  
  const key = backgroundColor as keyof typeof contrastTextClasses;
  return contrastTextClasses[key] || fallback;
}

/**
 * Get contrast-appropriate subtext color for a background color
 * @param backgroundColor - The background color
 * @param fallback - Fallback class (default: "text-brand-accent")
 * @returns Tailwind CSS text class
 */
export function getContrastSubtextClass(backgroundColor: string | undefined | null, fallback: string = "text-brand-accent"): string {
  if (!backgroundColor) return fallback;
  
  const key = backgroundColor as keyof typeof contrastSubtextClasses;
  return contrastSubtextClasses[key] || fallback;
}

/**
 * Get contrast-appropriate icon color for a background color
 * @param backgroundColor - The background color
 * @param fallback - Fallback class (default: "text-brand-primary")
 * @returns Tailwind CSS text class for icons
 */
export function getContrastIconClass(backgroundColor: string | undefined | null, fallback: string = "text-brand-primary"): string {
  if (!backgroundColor) return fallback;
  
  const key = backgroundColor as keyof typeof contrastIconClasses;
  return contrastIconClasses[key] || fallback;
}

/**
 * Get form field styling for a background color
 * @param backgroundColor - The background color
 * @param fallback - Fallback class (default: "bg-surface-pure border-neutral-dark/20 text-neutral-dark")
 * @returns Tailwind CSS classes for form fields
 */
export function getContrastFormFieldClass(backgroundColor: string | undefined | null, fallback: string = "bg-surface-pure border-neutral-dark/20 text-neutral-dark"): string {
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
  
  const darkColors = ["brand-primary", "brand-secondary", "neutral-dark", "dark"];
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
      case "surface-pure":
        return {
          variant: "outline" as const,
          className: "w-full !border-brand-primary !text-brand-primary hover:!bg-brand-primary hover:!text-white",
        };
      case "surface-soft":
      case "brand-accent":
        return {
          variant: "primary" as const,
          className: "w-full",
        };
      case "neutral-dark":
      case "brand-primary":
      case "brand-secondary":
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