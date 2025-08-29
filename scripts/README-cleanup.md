# Contentful Space Cleanup Script

This script allows you to delete content from a Contentful space. Use with **extreme caution** as this will permanently delete content!

## ⚠️ **WARNING**

This script will **permanently delete** content from your Contentful space. There is no undo functionality. Always backup your space before running cleanup operations.

## Features

- 🗑️ **Full Cleanup**: Delete all entries, assets, and content types
- 📝 **Entries Only**: Delete only entries, keep content types and assets
- 📋 **Content Types Only**: Delete only content types (requires empty entries)
- 🔐 **Safety Confirmations**: Requires explicit confirmation to prevent accidents
- 📊 **Progress Tracking**: Shows detailed progress during deletion
- 🔄 **Proper Order**: Unpublishes before deletion to avoid conflicts

## Safety Features

1. **Environment Variable Confirmation**: Requires `CONFIRM_CLEANUP=YES_DELETE_EVERYTHING`
2. **Safety Prefixes**: Can use `CLEANUP_*` prefixed environment variables
3. **Clear Warnings**: Shows exactly what will be deleted before proceeding
4. **Detailed Logging**: Reports success/failure for each operation

## Usage

### Method 1: Delete Everything (Full Cleanup)

⚠️ **This deletes ALL content, assets, and content types**

```bash
# Set confirmation (REQUIRED for safety)
export CONFIRM_CLEANUP=YES_DELETE_EVERYTHING

# Run full cleanup
npm run cleanup:space
```

### Method 2: Delete Only Entries

✅ **Safer option - keeps content types and assets**

```bash
export CONFIRM_CLEANUP=YES_DELETE_EVERYTHING
npm run cleanup:entries
```

### Method 3: Delete Only Content Types

⚠️ **Only works if entries are deleted first**

```bash
export CONFIRM_CLEANUP=YES_DELETE_EVERYTHING
npm run cleanup:content-types
```

### Method 4: Direct Script Usage

```bash
# Full cleanup
CONFIRM_CLEANUP=YES_DELETE_EVERYTHING node scripts/cleanup-space.mjs

# Entries only
CONFIRM_CLEANUP=YES_DELETE_EVERYTHING node scripts/cleanup-space.mjs --entries-only

# Content types only
CONFIRM_CLEANUP=YES_DELETE_EVERYTHING node scripts/cleanup-space.mjs --content-types-only

# Show help
node scripts/cleanup-space.mjs --help
```

## Environment Variables

### Standard Variables
```bash
CONTENTFUL_SPACE_ID=your_space_id_here
CONTENTFUL_MANAGEMENT_API_TOKEN=CFPAT-your_management_token
CONTENTFUL_ENVIRONMENT_ID=master  # optional, defaults to 'master'
CONFIRM_CLEANUP=YES_DELETE_EVERYTHING  # REQUIRED for safety
```

### Safety Variables (Recommended)
```bash
# Use these to avoid accidentally using production space
CLEANUP_CONTENTFUL_SPACE_ID=your_space_id_here
CLEANUP_CONTENTFUL_MANAGEMENT_TOKEN=CFPAT-your_management_token
CLEANUP_CONTENTFUL_ENVIRONMENT=master
CONFIRM_CLEANUP=YES_DELETE_EVERYTHING
```

## Cleanup Process

The script follows this order to avoid reference conflicts:

1. **📝 Entries**: Unpublish → Delete all entries
2. **🖼️ Assets**: Unpublish → Delete all assets  
3. **📋 Content Types**: Unpublish → Delete all content types

## Common Use Cases

### After Failed Migration
```bash
# Clean up failed migration attempt
export CONFIRM_CLEANUP=YES_DELETE_EVERYTHING
npm run cleanup:entries
```

### Reset Space for Fresh Start
```bash
# Complete reset
export CONFIRM_CLEANUP=YES_DELETE_EVERYTHING
npm run cleanup:space
```

### Clean Up Test Content
```bash
# Remove test entries, keep structure
export CONFIRM_CLEANUP=YES_DELETE_EVERYTHING
npm run cleanup:entries
```

## Error Handling

The script continues processing even if individual items fail to delete. Common errors:

- **Reference Conflicts**: Some entries might reference others, causing deletion failures
- **Publishing State**: Items must be unpublished before deletion
- **Rate Limits**: Script includes basic error handling for API limits

## Best Practices

### 1. Always Test First
```bash
# Test on a development/staging space first
CLEANUP_CONTENTFUL_SPACE_ID=your_test_space \
CONFIRM_CLEANUP=YES_DELETE_EVERYTHING \
npm run cleanup:space
```

### 2. Backup Before Cleanup
```bash
# Export space before cleanup (if using CLI tools)
contentful space export --space-id your_space_id
```

### 3. Use Safety Variables
```bash
# Use CLEANUP_ prefixed variables to avoid accidents
export CLEANUP_CONTENTFUL_SPACE_ID=test_space_id
export CLEANUP_CONTENTFUL_MANAGEMENT_TOKEN=test_token
```

### 4. Incremental Cleanup
```bash
# Delete in stages for better control
npm run cleanup:entries
# Verify in Contentful web interface
npm run cleanup:content-types
```

## Troubleshooting

### Script Won't Run
- **Missing Confirmation**: Set `CONFIRM_CLEANUP=YES_DELETE_EVERYTHING`
- **Wrong Environment Variables**: Check space ID and management token
- **Permission Issues**: Ensure management token has delete permissions

### Deletion Failures
- **Reference Conflicts**: Some entries might reference each other
- **Publishing State**: Items might still be published
- **Rate Limits**: API might be rate limiting requests

### Recovery
- **No Undo**: Once deleted, content cannot be recovered
- **Restore from Backup**: Import from previously exported space
- **Recreate Manually**: Rebuild content types and entries

## Example Workflow

```bash
# 1. Export current space (backup)
contentful space export --space-id abc123 --download-assets

# 2. Set up cleanup variables
export CLEANUP_CONTENTFUL_SPACE_ID=abc123
export CLEANUP_CONTENTFUL_MANAGEMENT_TOKEN=CFPAT-token
export CONFIRM_CLEANUP=YES_DELETE_EVERYTHING

# 3. Clean up in stages
npm run cleanup:entries     # Remove content
npm run cleanup:content-types  # Remove structure

# 4. Verify in Contentful web interface

# 5. Run fresh migration
npm run migrate:space:cli
```

## Security

- **Management Token**: Has full access to your space - store securely
- **Confirmation Required**: Script requires explicit confirmation to run
- **No Production**: Never run cleanup on production spaces without careful consideration
- **Token Rotation**: Consider rotating tokens after cleanup operations

## Support

This script uses the Contentful Management API. For issues:
- Check [Contentful Management API documentation](https://www.contentful.com/developers/docs/references/content-management-api/)
- Verify your management token permissions
- Test on a development space first