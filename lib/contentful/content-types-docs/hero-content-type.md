# [Module] Hero - Contentful Content Type

## Content Type Name

**[Module] Hero**

## Content Type ID

`hero`

## Description

Configurable page-header hero: headline, subheader, image, CTA refs; brand bgColor tokens, height presets; responsive and accessible.

**Use Cases:**

- Homepage hero sections
- Product feature announcements
- Landing page headers
- Campaign introductions
- Brand showcases

**Visual Layout:**

- Large headline with supporting text
- Prominent hero image with hover effects
- Primary and optional secondary CTA buttons
- Customizable background colors from brand palette
- Responsive design that works on all devices

## Fields

### 1. Internal Name

- **Field Name**: `internalName`
- **Field Type**: Short Text
- **Required**: Yes
- **Help Text**: Internal name for this hero section (not displayed on site)
- **Example**: "Homepage Hero - Harmony Piano"

### 2. Header

- **Field Name**: `header`
- **Field Type**: Short Text
- **Required**: No
- **Character Limit**: 100
- **Help Text**: The main headline displayed prominently at the top
- **Example**: "Harmony Grand Piano"

### 3. Subheader

- **Field Name**: `subheader`
- **Field Type**: Rich Text
- **Required**: No
- **Allowed Nodes**: heading-1, heading-2, heading-3, heading-4, heading-5, heading-6, ordered-list, unordered-list, hr, blockquote, embedded-entry-block, embedded-asset-block, hyperlink, entry-hyperlink, asset-hyperlink, embedded-entry-inline
- **Allowed Marks**: bold, italic, underline, code
- **Example**: "Forest green elegance. Where craftsmanship meets musical excellence."

### 4. Image

- **Field Name**: `image`
- **Field Type**: Media (Single Asset)
- **Required**: No
- **Help Text**: Main hero image displayed prominently in the section
- **File Types**: JPEG, PNG, WebP
- **Recommended Size**: 1200x750px (16:10 aspect ratio)

### 5. Background Color

- **Field Name**: `bgColor`
- **Field Type**: Short Text
- **Required**: No

### 6. Primary CTA

- **Field Name**: `primaryCta`
- **Field Type**: Reference (Single Entry)
- **Required**: No
- **Reference Content Type**: CTA
- **Help Text**: Primary call-to-action button

### 7. Secondary CTA

- **Field Name**: `secondaryCta`
- **Field Type**: Reference (Single Entry)
- **Required**: No
- **Reference Content Type**: CTA
- **Help Text**: Optional secondary call-to-action button

### 8. Height

- **Field Name**: `height`
- **Field Type**: Dropdown
- **Required**: No
- **Default Value**: "medium"
- **Options**: `small`, `medium`, `large`, `full screen`
- **Help Text**: Controls the overall height of the hero section

## Content Model Relationships

- **Primary CTA**: References CTA content type
- **Secondary CTA**: References CTA content type (optional)

## Validation Rules

- `internalName` must not be empty
- `height` must be one of the allowed options

## Sample Content Entry

```json
{
  "internalName": "Homepage Hero - Harmony Piano",
  "header": "Harmony Grand Piano",
  "subheader": "Forest green elegance. Where craftsmanship meets musical excellence.",
  "image": {
    "url": "https://images.ctfassets.net/...",
    "title": "Harmony Grand Piano Hero Image",
    "description": "Elegant forest green Harmony grand piano in luxurious setting"
  },
  "bgColor": "warm-cream",
  "primaryCta": {
    "sys": {
      "type": "Link",
      "linkType": "Entry",
      "id": "primary-cta-explore"
    }
  },
  "secondaryCta": {
    "sys": {
      "type": "Link",
      "linkType": "Entry",
      "id": "secondary-cta-listen"
    }
  },
  "height": "large"
}
```

## Referenced CTA Entries

### Primary CTA Example

```json
{
  "internalName": "Hero Primary CTA - Explore Collection",
  "label": "Explore Collection",
  "url": "/collection",
  "variant": "primary",
  "size": "lg",
  "target": "_self",
  "external": false,
  "disabled": false
}
```

### Secondary CTA Example

```json
{
  "internalName": "Hero Secondary CTA - Listen",
  "label": "Listen",
  "url": "/audio-samples",
  "variant": "outline",
  "size": "lg",
  "target": "_self",
  "external": false,
  "disabled": false
}
```

## Notes for Developers

- The `height` field maps to CSS classes in the component
- CTAs are managed as separate entries for reusability
- The `bgColor` field uses design system color tokens
- Image optimization should be handled through Contentful's Image API
- CTA references will need to be resolved when fetching hero data
- Consider implementing responsive image sizes for different screen sizes
