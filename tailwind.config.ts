import type { Config } from "tailwindcss";

export default {
  important: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors from CSS custom properties - Semantic Names
        "dark-forest-green": "var(--color-dark-forest-green)",
        "medium-forest-green": "var(--color-medium-forest-green)",
        "light-forest-green": "var(--color-light-forest-green)",
        "charcoal-gray": "var(--color-charcoal-gray)",
        "warm-cream": "var(--color-warm-cream)",
        "pure-white": "var(--color-pure-white)",
        // Text colors
        text: {
          primary: "var(--color-text-primary)",
          inverse: "var(--color-text-inverse)",
        },
        // Shadcn/ui colors
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        card: {
          DEFAULT: "var(--color-card)",
          foreground: "var(--color-card-foreground)",
        },
        popover: {
          DEFAULT: "var(--color-popover)",
          foreground: "var(--color-popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--color-primary)",
          foreground: "var(--color-primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          foreground: "var(--color-secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--color-muted)",
          foreground: "var(--color-muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          foreground: "var(--color-accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--color-destructive)",
          foreground: "var(--color-destructive-foreground)",
        },
        border: "var(--color-border)",
        input: "var(--color-input)",
        ring: "var(--color-ring)",
      },
      spacing: {
        // Custom spacing from CSS variables
        xs: "var(--spacing-xs)",
        sm: "var(--spacing-sm)",
        md: "var(--spacing-md)",
        lg: "var(--spacing-lg)",
        xl: "var(--spacing-xl)",
        "2xl": "var(--spacing-2xl)",
        "3xl": "var(--spacing-3xl)",
        "4xl": "var(--spacing-4xl)",
      },
      fontSize: {
        // Custom font sizes from CSS variables
        xs: "var(--text-xs)",
        sm: "var(--text-sm)",
        base: "var(--text-base)",
        lg: "var(--text-lg)",
        xl: "var(--text-xl)",
        "2xl": "var(--text-2xl)",
        "3xl": "var(--text-3xl)",
        "4xl": "var(--text-4xl)",
        "5xl": "var(--text-5xl)",
        "6xl": "var(--text-6xl)",
      },
      borderRadius: {
        // Custom border radius from CSS variables
        none: "var(--radius-none)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        full: "var(--radius-full)",
      },
      boxShadow: {
        // Custom shadows from CSS variables
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },
      fontWeight: {
        normal: "var(--font-weight-normal)",
        medium: "var(--font-weight-medium)",
      },
      fontFamily: {
        // Display font for headers and titles
        display: ["var(--font-caliburn-bold)", "ui-serif", "serif"],
        // Serif font for testimonials and elegant content  
        serif: ["var(--font-freight-neo)", "ui-serif", "serif"],
        // Sans-serif fonts (replace default Tailwind fonts)
        sans: ["var(--font-visby-medium)", "ui-sans-serif", "sans-serif"],
        "sans-bold": ["var(--font-visby-bold)", "ui-sans-serif", "sans-serif"],
        "sans-light": ["var(--font-visby-light)", "ui-sans-serif", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;