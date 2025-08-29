````markdown
# [Module] Image Text - Contentful Content Type

## Content Type Name

**[Module] Image Text**

## Content Type ID

`moduleImageText`

## Description

Image + text module with localized heading and subheading, image asset, background color, and optional CTAs.

## Fields

### 1. Internal Name

- **Field Name**: `internalName`
- **Field Type**: Short Text
- **Required**: Yes
- **Help Text**: Internal name for content managers; used as the displayField.

### 2. Heading

- **Field Name**: `heading`
- **Field Type**: Short Text
- **Required**: No
- **Localized**: Yes

### 3. Subheading

- **Field Name**: `subheading`
- **Field Type**: Rich Text
- **Required**: No
- **Localized**: Yes
- **Allowed Nodes**: heading-1..6, ordered-list, unordered-list, hr, blockquote, embedded-entry-block, embedded-asset-block, hyperlink, entry-hyperlink, asset-hyperlink, embedded-entry-inline
- **Allowed Marks**: bold, italic, underline, code

### 4. Image

- **Field Name**: `image`
- **Field Type**: Media (Single Asset)
- **Required**: No

### 5. Image Position

- **Field Name**: `imagePosition`
- **Field Type**: Short Text
- **Required**: No
- **Default Value**: `left`
- **Options**: `left`, `right`, `overlay`

### 6. Background Color

- **Field Name**: `backgroundColor`
- **Field Type**: Short Text
- **Required**: No

### 7. Primary CTA

- **Field Name**: `primaryCta`
- **Field Type**: Reference (Single Entry)
- **Required**: No
- **Reference Content Type**: CTA

### 8. Secondary CTA

- **Field Name**: `secondaryCta`
- **Field Type**: Reference (Single Entry)
- **Required**: No
- **Reference Content Type**: CTA

## Sample Content Entry

```json
{
  "internalName": "ImageText - Feature",
  "heading": "Craftsmanship Meets Design",
  "subheading": { "content": [...] },
  "image": { "sys": { "type": "Link", "linkType": "Asset", "id": "image_asset_id" } },
  "imagePosition": "left",
  "backgroundColor": "warm-cream",
  "primaryCta": { "sys": { "type": "Link", "linkType": "Entry", "id": "cta_primary" } }
}
```

## Notes

- The `internalName` field is required for all component content types per project conventions.
- CTAs reference the `cta` content type.
````
