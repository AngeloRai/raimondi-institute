# Raimondi Institute Website

This is a [Next.js](https://nextjs.org) project with Contentful CMS integration, featuring a semantic design system with customizable colors and fonts.

## Getting Started

First, install dependencies:

```bash
npm install
```

Set up environment variables (copy `.env.example` to `.env.local`):

```bash
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_API_KEY=your_api_key
CONTENTFUL_MANAGEMENT_TOKEN=your_management_token
CONTENTFUL_ENVIRONMENT=master
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Design System Customization

This project uses a semantic design system that separates visual styling from implementation details. Here's how to customize colors and fonts:

### 🎨 Changing Brand Colors

#### Step 1: Update CSS Custom Properties

Edit `app/globals.css` and modify the color values in the `:root` section:

```css
:root {
  /* Brand Colors - Update these hex values */
  --color-brand-primary: #3A5D4B;    /* Main brand color */
  --color-brand-secondary: #5A8D6B;  /* Secondary brand color */
  --color-brand-accent: #A8D5BA;     /* Accent/highlight color */
  --color-neutral-dark: #2D2D2D;     /* Dark text/backgrounds */
  --color-surface-soft: #F8F9FA;     /* Light background */
  --color-surface-pure: #FFFFFF;     /* Pure white */
}
```

#### Step 2: Update Contentful Content Types (if needed)

If you need to migrate existing content to use different color names, create a migration script in `scripts/migrations/update/`:

```bash
# Create migration file
npm run migrate:create update_brand_colors

# Edit the generated migration file to map old colors to new ones
# Then run the migration
npm run migrate
```

#### Available Semantic Color Classes:
- `bg-brand-primary`, `text-brand-primary`
- `bg-brand-secondary`, `text-brand-secondary` 
- `bg-brand-accent`, `text-brand-accent`
- `bg-neutral-dark`, `text-neutral-dark`
- `bg-surface-soft`, `text-surface-soft`
- `bg-surface-pure`, `text-surface-pure`

### 🔤 Changing Font Families

This project uses a **semantic font system** with three layers: Next.js localFont, Tailwind @theme directive, and semantic utility classes.

#### Step 1: Add New Font Files

Place your font files in the `public/fonts/` directory:
```
public/fonts/
  ├── YourHeading-Bold.woff2
  ├── YourBody-Regular.woff2
  ├── YourBody-Bold.woff2
  ├── YourBody-Light.woff2
  └── YourAccent-Medium.woff2
```

#### Step 2: Update Font Definitions in Next.js

Edit `app/layout.tsx` and update the font definitions:

```typescript
// Display font for headers and titles
const headingFont = localFont({
  src: "../public/fonts/YourHeading-Bold.woff2",
  variable: "--font-heading",        // Creates CSS variable
  display: "swap",
  weight: "700",
});

// Body font for regular text
const bodyFont = localFont({
  src: "../public/fonts/YourBody-Regular.woff2", 
  variable: "--font-body",
  display: "swap",
  weight: "500",
});

// Body font variations
const bodyFontBold = localFont({
  src: "../public/fonts/YourBody-Bold.woff2",
  variable: "--font-body-bold", 
  display: "swap",
  weight: "700",
});

const bodyFontLight = localFont({
  src: "../public/fonts/YourBody-Light.woff2",
  variable: "--font-body-light",
  display: "swap", 
  weight: "300",
});

// Accent font for special content
const accentFont = localFont({
  src: "../public/fonts/YourAccent-Medium.woff2",
  variable: "--font-accent",
  display: "swap",
  weight: "500",
});
```

#### Step 3: Update Body Classes

Update the `<body>` className in `app/layout.tsx`:

```tsx
<body className={`${headingFont.variable} ${accentFont.variable} ${bodyFontBold.variable} ${bodyFont.variable} ${bodyFontLight.variable} antialiased`}>
```

#### Step 4: Configure Tailwind Theme

The semantic font families are automatically configured in `app/globals.css` using the `@theme` directive:

```css
@theme inline {
  /* Semantic Font Families - Maps to Next.js localFont CSS variables */
  --font-heading: var(--font-heading);
  --font-accent: var(--font-accent);
  --font-body: var(--font-body);
  --font-body-bold: var(--font-body-bold);
  --font-body-light: var(--font-body-light);
}
```

**Note**: Do not add font configurations to `tailwind.config.ts` - the `@theme` directive handles the integration automatically.

#### Available Semantic Font Classes:
- `font-heading` - For page titles, hero headings
- `font-body` - For regular text content  
- `font-body-bold` - For emphasized text
- `font-body-light` - For subtle text
- `font-accent` - For testimonials, quotes, elegant content

#### Font System Architecture:
1. **Physical Layer**: Font files in `public/fonts/`
2. **Next.js Layer**: `localFont()` creates CSS variables (e.g., `--font-heading`)
3. **Tailwind Layer**: `@theme` directive maps variables to utility classes
4. **Component Layer**: Use semantic classes like `font-heading` in components

## Contentful Content Type Migrations

### Setting Up Migrations

Set environment variables:

```bash
export CONTENTFUL_SPACE_ID=your_space_id
export CONTENTFUL_ENVIRONMENT=master
export CONTENTFUL_MANAGEMENT_TOKEN=your_cma_token
```

### Creating New Content Types

1. **Create a migration file:**
```bash
npm run migrate:create create_your_content_type
```

2. **Edit the generated file** in `scripts/migrations/create/` following this pattern:
```javascript
module.exports = function (migration) {
  const contentType = migration
    .createContentType("yourContentType")
    .name("Your Content Type")
    .description("Description of your content type")
    .displayField("internalName");

  contentType
    .createField("internalName")
    .name("Internal Name")
    .type("Symbol")
    .required(true);

  contentType
    .createField("backgroundColor")
    .name("Background Color")
    .type("Symbol")
    .validations([{
      in: ["brand-primary", "brand-secondary", "brand-accent", "neutral-dark", "surface-soft", "surface-pure"]
    }]);
};
```

### Updating Existing Content Types

1. **Create an update migration:**
```bash
npm run migrate:create update_your_content_type
```

2. **Use migration methods:**
```javascript
module.exports = function (migration) {
  const contentType = migration.editContentType("yourContentType");
  
  // Add new field
  contentType
    .createField("newField")
    .name("New Field")
    .type("Symbol");
    
  // Edit existing field
  contentType
    .editField("existingField")
    .name("Updated Name");
    
  // Delete field
  contentType.deleteField("oldField");
};
```

### Migrating Content Data

For changing color names or other data transformations:

1. **Create a transformation migration:**
```javascript
module.exports = function (migration) {
  // Transform entries
  migration.transformEntries({
    contentType: 'yourContentType',
    from: ['backgroundColor'],
    to: ['backgroundColor'],
    transformEntryForLocale: function (fromFields, currentLocale) {
      const oldColor = fromFields.backgroundColor[currentLocale];
      const colorMap = {
        'old-color-name': 'brand-primary',
        'another-old-name': 'brand-secondary'
      };
      
      return {
        backgroundColor: colorMap[oldColor] || oldColor
      };
    }
  });
};
```

### Running Migrations

```bash
# Run a single migration
npm run migrate scripts/migrations/your-file.js

# Run all pending migrations  
npm run migrate:all

# Generate TypeScript types after migrations
npm run contentful:types
```

### Available Migration Commands

- `npm run migrate:create <name>` - Create new migration file
- `npm run migrate <file>` - Run specific migration
- `npm run migrate:all` - Run all pending migrations
- `npm run contentful:types` - Generate TypeScript types from Contentful schema

### Color Migration Example

To migrate from descriptive colors to semantic colors:

```bash
# 1. Create migration
npm run migrate:create migrate_to_semantic_colors

# 2. Edit the migration file with color mapping
# 3. Run migration  
npm run migrate scripts/migrations/update/migrate_to_semantic_colors.js

# 4. Update TypeScript types
npm run contentful:types
```

## Project Structure

```
/
├── app/                          # Next.js app directory
│   ├── globals.css              # Global styles & CSS custom properties
│   └── layout.tsx               # Font definitions & layout
├── ui/
│   ├── components/              # Reusable components  
│   └── modules/                 # Page-specific modules
├── lib/contentful/              # Contentful integration
│   └── types/generated/         # Auto-generated TypeScript types
├── scripts/migrations/          # Contentful migration scripts
│   ├── create/                 # New content type migrations
│   └── update/                 # Update/transform migrations
├── public/fonts/               # Font files
└── tailwind.config.ts          # Tailwind configuration
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
