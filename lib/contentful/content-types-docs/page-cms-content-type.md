````markdown
# [Page] CMS - Contentful Content Type

## Content Type Name

**[Page] CMS**

## Content Type ID

`pageCms`

## Description

Top-level CMS page entity with slug and a list of content modules.

## Fields

### 1. Internal Name

- **Field Name**: `internalName`
- **Field Type**: Short Text
- **Required**: Yes
- **Help Text**: Internal reference label for editors; not shown on the site.

### 2. Slug

- **Field Name**: `slug`
- **Field Type**: Short Text
- **Required**: Yes
- **Help Text**: URL path segment for the page (e.g., `about`, `contact`).

### 3. Content Modules

- **Field Name**: `contentModules`
- **Field Type**: References (Many Entries)
- **Required**: No
- **Help Text**: Ordered list of content modules that compose the page.

## Sample Content Entry

```json
{
  "internalName": "About Page",
  "slug": "about",
  "contentModules": [
    { "sys": { "type": "Link", "linkType": "Entry", "id": "moduleHero_123" } },
    { "sys": { "type": "Link", "linkType": "Entry", "id": "moduleGrid_456" } }
  ]
}
```

## Notes

- `contentModules` is an array of Entry references (many references). Add validations to restrict allowed module types if needed.
````
