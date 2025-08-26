````markdown
# [Component] SEO - Contentful Content Type

## Content Type Name

**[Component] SEO**

## Content Type ID

`componentSeo`

## Description

SEO content type with common SEO fields for page metadata and social sharing.

## Fields

### 1. Internal Name

- **Field Name**: `internalName`
- **Field Type**: Short Text
- **Required**: Yes
- **Help Text**: Internal name for this hero section (not displayed on site)
- **Example**: "Harmony Grand Pianos | Crafted for Concert Stages"

### 1. Title

- **Field Name**: `title`
- **Field Type**: Long Text
- **Required**: No
- **Help Text**: Suggested 50–60 characters for search results
- **Example**: "Harmony Grand Pianos | Crafted for Concert Stages"

### 2. Description

- **Field Name**: `description`
- **Field Type**: Long Text
- **Required**: No
- **Help Text**: Suggested 150–160 characters for search snippets
- **Example**: "Discover Harmony grand pianos—precision craftsmanship, expressive tone, and timeless design."

### 3. Open Graph Title

- **Field Name**: `ogTitle`
- **Field Type**: Long Text
- **Required**: No
- **Help Text**: Social title for link previews (Facebook, LinkedIn, etc.)
- **Example**: "Harmony Grand Pianos"

### 4. Open Graph Description

- **Field Name**: `ogDescription`
- **Field Type**: Long Text
- **Required**: No
- **Help Text**: Social description for link previews
- **Example**: "A grand statement in sound and style. Explore Harmony pianos."

### 5. Open Graph Image

- **Field Name**: `ogImage`
- **Field Type**: Media (Single Asset)
- **Required**: No
- **Help Text**: Image used in social link previews (recommended 1200×630)

## Validation Rules

- No additional validations beyond field types.

## Sample Content Entry

```json
{
  "title": "Harmony Grand Pianos | Crafted for Concert Stages",
  "description": "Discover Harmony grand pianos—precision craftsmanship, expressive tone, and timeless design.",
  "ogTitle": "Harmony Grand Pianos",
  "ogDescription": "A grand statement in sound and style. Explore Harmony pianos.",
  "ogImage": {
    "sys": { "type": "Link", "linkType": "Asset", "id": "asset_og_image_id" }
  }
}
```

## Usage Notes

- Use `title` and `description` for SEO meta tags.
- Use `ogTitle`, `ogDescription`, and `ogImage` for social previews.
- Keep titles concise and descriptions informative; avoid keyword stuffing.
- Prefer high-quality, properly cropped images for `ogImage` (1200×630 or similar).
````
