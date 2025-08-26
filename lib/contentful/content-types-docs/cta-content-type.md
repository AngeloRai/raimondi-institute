# CTA (Call-to-Action) - Contentful Content Type

## Content Type Name

**CTA**

## Content Type ID

`cta`
**Required**: No

## Fields

**Required**: No

- **Required**: Yes
- **Help Text**: Internal name is not displayed on site

### 6. External

- **Field Name**: `external`
- **Field Type**: Boolean
- **Required**: No
- **Default Value**: `false`
- **Help Text**: Whether the link is external
- **Help Text**: The text displayed on the button
- **Example**: "Explore Collection"
- **Help Text**: URL for the button. Use relative URLs for internal links (/about) or absolute URLs for external links (https://example.com). Leave empty for click handler actions.
- **Example**: "/collection" or "https://spotify.com"
- `variant` must be one of the allowed options
- **Default Value**: `primary`
- **Options**:
  - `primary`
  - `secondary`
  - `outline`
  - `ghost`
  - `icon`
- **Help Text**: Visual style of the button

### 5. Size

- **Field Name**: `size`
- **Field Type**: Dropdown
- **Required**: Yes
- **Default Value**: `md`
- **Options**:
  - `sm`
  - `md`
  - `lg`
- **Help Text**: Size of the button

### 6. Target

- **Field Name**: `target`
- **Field Type**: Dropdown
- **Required**: No
- **Options**:
  - `_self`
  - `_blank`
- **Help Text**: How the link should open (only applies if URL is provided)

### 7. Disabled

- **Field Name**: `disabled`
- **Field Type**: Boolean
- **Required**: No
- **Default Value**: `false`
- **Help Text**: Whether the button should be disabled

## Validation Rules

- `internalName` must not be empty
- `label` must not be empty
- `variant` must be one of the allowed options
- `size` must be one of the allowed options
- Use `target: "_blank"` for external links (absolute URLs)

## Sample Content Entry

```json
{
  "internalName": "Hero Primary CTA - Explore Collection",
  "label": "Explore Collection",
  "url": "/collection",
  "variant": "primary",
  "size": "lg",
  "target": "_self",
  "disabled": false
}
```

## Usage Notes

- This content type is designed to be referenced by other content types
- The `url` field is optional to support both navigation and action buttons
- External links are automatically detected from absolute URLs (starting with http:// or https://)
- Use relative URLs for internal navigation (e.g., "/about") and absolute URLs for external links (e.g., "https://spotify.com")
- External links should typically use `target: "_blank"` to open in a new tab
