# Contentful Space Migration Script

This script allows you to migrate content from one Contentful space to another, including content types, entries, and assets while maintaining all relationships.

## Features

- ✅ Migrates content types (creates or updates)
- ✅ Migrates assets with proper processing
- ✅ **Smart Entry Migration**: Handles nested entries and dependencies
- ✅ **Shared Content Handling**: Reuses existing shared entries (CTAs, components)
- ✅ **Dependency Resolution**: Migrates referenced entries first
- ✅ Preserves rich text embedded content and hyperlinks
- ✅ Handles multiple locales
- ✅ Maintains entry and asset relationships
- ✅ Auto-publishes migrated content
- ✅ **Migration Verification**: Checks for broken references after migration
- ✅ Provides detailed progress logging

## Setup

1. Copy the example environment file:
   ```bash
   cp scripts/.env.migration.example scripts/.env.migration
   ```

2. Configure your source and destination spaces in `.env.migration`:
   ```bash
   # Required: Source space (where content comes FROM)
   SOURCE_CONTENTFUL_SPACE_ID=abc123def456
   SOURCE_CONTENTFUL_MANAGEMENT_TOKEN=CFPAT-your_source_token_here
   SOURCE_CONTENTFUL_ENVIRONMENT=master
   
   # Optional: Destination space (where content goes TO)
   # If not specified, uses current project's space
   DEST_CONTENTFUL_SPACE_ID=xyz789uvw012  
   DEST_CONTENTFUL_MANAGEMENT_TOKEN=CFPAT-your_dest_token_here
   DEST_CONTENTFUL_ENVIRONMENT=master
   ```

## Usage

### Option 1: Migrate to Current Project Space (Recommended)
```bash
# Only set source space variables, destination will use current .env
node scripts/migrate-space.mjs
```

### Option 2: Migrate Between Two Different Spaces
```bash
# Set both source and destination variables
node scripts/migrate-space.mjs
```

### Option 3: Using Environment Variables Directly
```bash
SOURCE_CONTENTFUL_SPACE_ID=abc123 \
SOURCE_CONTENTFUL_MANAGEMENT_TOKEN=CFPAT-token \
node scripts/migrate-space.mjs
```

## What Gets Migrated

### Content Types
- ✅ All field definitions
- ✅ Validation rules
- ✅ Display field settings
- ✅ Content type metadata

### Assets
- ✅ Images, videos, documents
- ✅ Asset metadata and descriptions
- ✅ Multiple locales
- ✅ Asset processing and optimization

### Entries
- ✅ All field values
- ✅ Multiple locales
- ✅ Rich text content
- ✅ Entry-to-entry references
- ✅ Entry-to-asset references
- ✅ Embedded entries in rich text

## Migration Process

1. **Content Types**: Creates or updates content types in destination
2. **Assets**: Migrates assets with processing and publishing
3. **Entries**: Migrates entries with reference mapping
4. **Publishing**: Publishes all migrated content

## Important Notes

### Pre-Migration Checklist
- [ ] Backup your destination space
- [ ] Ensure you have management tokens for both spaces
- [ ] Verify content type compatibility
- [ ] Test with a small subset first

### Limitations
- Only migrates published content from source
- Limited to 1000 items per content type (can be modified)
- Asset processing may take time for large files
- Rich text embedded entries must exist in destination

### Troubleshooting

**"Content type already exists" warnings**
- This is normal - the script updates existing content types

**Asset processing timeouts**
- Large assets may need more processing time
- The script waits up to 20 seconds per asset

**Reference errors**
- Ensure all referenced content is migrated first
- Check that content type IDs match between spaces

**Rate limiting**
- The script includes basic rate limiting
- For large migrations, consider running in smaller batches

## Advanced Usage

### Batch Migration
For large spaces, you might want to migrate content types individually:

```javascript
// Modify the script to filter by content type
const entries = await sourceEnv.getEntries({ 
  content_type: 'specific-content-type',
  limit: 1000 
});
```

### Custom Field Processing
The script can be extended to handle custom field transformations:

```javascript
processFieldValue(fieldValue) {
  // Add custom field processing logic here
  return processedValue;
}
```

### Environment-Specific Migration
You can specify different source and destination environments:

```bash
SOURCE_CONTENTFUL_ENVIRONMENT=staging \
DEST_CONTENTFUL_ENVIRONMENT=production \
node scripts/migrate-space.js
```

## Security

- Never commit `.env.migration` files to version control
- Use management tokens with appropriate permissions
- Consider using temporary tokens for one-time migrations
- Revoke tokens after migration is complete

## Support

If you encounter issues:
1. Check the console output for detailed error messages
2. Verify your environment variables are correct
3. Ensure both spaces are accessible with your tokens
4. Try migrating a single content type first to test connectivity