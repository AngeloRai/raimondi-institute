# Contentful Space Migration (CLI-based)

This script uses the official Contentful CLI tools for reliable space migration between different Contentful accounts. It's simpler and more robust than custom API approaches.

## Why Use the CLI Approach?

✅ **Official Contentful Tool**: Uses tested and maintained CLI tools
✅ **Handles All Assets**: Automatically downloads and re-uploads assets
✅ **Preserves Relationships**: Maintains all entry and asset references
✅ **Built-in Retry Logic**: Handles rate limits and network issues
✅ **Comprehensive Export**: Includes all content types, entries, and assets
✅ **No Custom Code**: Less maintenance and fewer bugs

## Prerequisites

1. **Install Contentful CLI**:
   ```bash
   npm install -g contentful-cli
   ```

2. **Management Tokens**: You need management API tokens for both accounts:
   - Source account (where content comes FROM)
   - Destination account (where content goes TO)

3. **Empty Destination Space**: The destination space should be empty to avoid conflicts

## Quick Start

1. **Set environment variables**:
   ```bash
   # Source space configuration
   SOURCE_CONTENTFUL_SPACE_ID="your_source_space_id"
   SOURCE_CONTENTFUL_MANAGEMENT_TOKEN="CFPAT-your_source_token"
   
   # Destination space configuration  
   DEST_CONTENTFUL_SPACE_ID="your_dest_space_id"
   DEST_CONTENTFUL_MANAGEMENT_TOKEN="CFPAT-your_dest_token"
   ```

2. **Run migration**:
   ```bash
   ./scripts/migrate-space-cli.sh
   ```

## Usage Options

### Basic Migration
```bash
./scripts/migrate-space-cli.sh
```

### Dry Run (Check Configuration)
```bash
./scripts/migrate-space-cli.sh --dry-run
```

### Keep Export File
```bash
./scripts/migrate-space-cli.sh --keep-export
```

### Show Help
```bash
./scripts/migrate-space-cli.sh --help
```

## Environment Variables

### Required for Source Space
```bash
SOURCE_CONTENTFUL_SPACE_ID=abc123def456
SOURCE_CONTENTFUL_MANAGEMENT_TOKEN=CFPAT-your_source_token_here
SOURCE_CONTENTFUL_ENVIRONMENT=master  # optional, defaults to 'master'
```

### Required for Destination Space
```bash
DEST_CONTENTFUL_SPACE_ID=xyz789uvw012
DEST_CONTENTFUL_MANAGEMENT_TOKEN=CFPAT-your_dest_token_here  
DEST_CONTENTFUL_ENVIRONMENT=master  # optional, defaults to 'master'
```

### Fallback to Project Variables
If destination variables aren't set, the script will use your current project's variables:
- `CONTENTFUL_SPACE_ID`
- `CONTENTFUL_MANAGEMENT_API_TOKEN`
- `CONTENTFUL_ENVIRONMENT_ID`

## Migration Process

The script performs these steps automatically:

1. **Validation**: Checks all required environment variables
2. **CLI Check**: Verifies Contentful CLI is installed
3. **Authentication**: Sets up authentication aliases for both accounts
4. **Export**: Exports entire source space to JSON file with assets
5. **Import**: Imports everything to destination space
6. **Verification**: Provides next steps and cleanup options

## What Gets Migrated

✅ **Content Types**: All field definitions and validation rules
✅ **Entries**: All content with proper relationships
✅ **Assets**: Images, videos, documents (downloaded and re-uploaded)
✅ **Locales**: Multi-language content
✅ **Rich Text**: Embedded entries and assets in rich text
✅ **References**: All entry-to-entry and entry-to-asset links

## What Doesn't Get Migrated

❌ **User Permissions**: Space memberships need manual setup
❌ **Webhooks**: Need to be recreated in destination space
❌ **UI Extensions**: Custom field editors need manual setup
❌ **App Installations**: Marketplace apps need reinstallation

## Example Workflow

```bash
# 1. Check configuration
./scripts/migrate-space-cli.sh --dry-run

# 2. Run migration
./scripts/migrate-space-cli.sh

# 3. Verify in Contentful web interface
# 4. Set up webhooks and extensions
# 5. Configure user permissions
```

## Comparison with Custom Script

| Feature | CLI Script | Custom Script |
|---------|------------|---------------|
| **Reliability** | ✅ Official tools | ⚠️ Custom implementation |
| **Asset Handling** | ✅ Automatic | ⚠️ Manual processing |
| **Rate Limiting** | ✅ Built-in retry | ⚠️ Custom handling |
| **Maintenance** | ✅ Contentful maintains | ❌ We maintain |
| **Complexity** | ✅ Simple | ❌ Complex |
| **Custom Logic** | ❌ Limited | ✅ Full control |

## Troubleshooting

### "contentful: command not found"
Install the CLI:
```bash
npm install -g contentful-cli
```

### Rate Limit Errors
The CLI handles these automatically with built-in retry logic. Large spaces may take longer.

### Asset Upload Failures
The CLI will retry failed asset uploads. Check your network connection for large assets.

### Authentication Issues
Verify your management tokens have proper permissions:
- Source: Read access
- Destination: Read/Write access

### Import Conflicts
Use a completely empty destination space to avoid conflicts with existing content.

## Security Notes

- Management tokens have full access to your Contentful space
- Store tokens securely and never commit them to version control
- Consider using temporary tokens for one-time migrations
- Revoke tokens after migration is complete

## Support

This approach uses official Contentful tools, so you can:
- Check [Contentful CLI documentation](https://github.com/contentful/contentful-cli)
- Use `contentful --help` for CLI help
- Contact Contentful support for CLI issues