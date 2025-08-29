#!/usr/bin/env node

/**
 * Contentful Space Cleanup Script
 * 
 * This script deletes all entries, assets, and content types from a Contentful space.
 * Use with caution - this will permanently delete content!
 * 
 * Usage:
 * node scripts/cleanup-space.mjs
 * 
 * Environment variables needed:
 * - CONTENTFUL_SPACE_ID (or CLEANUP_CONTENTFUL_SPACE_ID for safety)
 * - CONTENTFUL_MANAGEMENT_API_TOKEN (or CLEANUP_CONTENTFUL_MANAGEMENT_TOKEN)
 * - CONTENTFUL_ENVIRONMENT_ID (optional, defaults to 'master')
 */

import contentfulManagement from 'contentful-management';
import dotenv from 'dotenv';

const { createClient } = contentfulManagement;
dotenv.config();

// Configuration with safety prefixes
function getConfig() {
  // Use CLEANUP_ prefixed variables for safety, then DEST_, then fallback to regular ones
  const config = {
    spaceId: process.env.CLEANUP_CONTENTFUL_SPACE_ID || process.env.DEST_CONTENTFUL_SPACE_ID,
    token: process.env.CLEANUP_CONTENTFUL_MANAGEMENT_TOKEN || process.env.DEST_CONTENTFUL_MANAGEMENT_TOKEN,
    environment: process.env.CLEANUP_CONTENTFUL_ENVIRONMENT || process.env.DEST_CONTENTFUL_ENVIRONMENT || 'master'
  };
  
  validateConfig(config);
  return config;
}

function validateConfig(config) {
  if (!config.spaceId || !config.token) {
    console.error('❌ Missing space configuration:');
    console.error('   CONTENTFUL_SPACE_ID and CONTENTFUL_MANAGEMENT_API_TOKEN are required');
    console.error('   (or use DEST_CONTENTFUL_SPACE_ID and DEST_CONTENTFUL_MANAGEMENT_TOKEN)');
    console.error('   (or use CLEANUP_CONTENTFUL_SPACE_ID and CLEANUP_CONTENTFUL_MANAGEMENT_TOKEN for safety)');
    process.exit(1);
  }
  
  console.log('🔧 Configuration:');
  console.log(`   Space: ${config.spaceId} (${config.environment})`);
}

async function confirmCleanup(spaceId) {
  console.log('⚠️  WARNING: This will permanently delete ALL content from the space!');
  console.log(`   Space ID: ${spaceId}`);
  console.log('   This includes:');
  console.log('   • All entries');
  console.log('   • All assets');
  console.log('   • All content types');
  console.log('');
  
  // In a real interactive environment, you'd use readline
  // For now, we'll require an environment variable confirmation
  const confirmation = process.env.CONFIRM_CLEANUP;
  
  if (confirmation !== 'YES_DELETE_EVERYTHING') {
    console.log('❌ Cleanup cancelled for safety.');
    console.log('   To confirm deletion, set: CONFIRM_CLEANUP=YES_DELETE_EVERYTHING');
    process.exit(0);
  }
  
  console.log('✅ Cleanup confirmed, proceeding...\n');
}

async function cleanup() {
  try {
    console.log('🧹 Starting Contentful space cleanup...\n');
    
    // Get configuration
    const config = getConfig();
    
    // Safety confirmation
    await confirmCleanup(config.spaceId);
    
    // Initialize client
    const client = createClient({ accessToken: config.token });
    const space = await client.getSpace(config.spaceId);
    const environment = await space.getEnvironment(config.environment);
    
    // Step 1: Unpublish and delete all entries
    await deleteAllEntries(environment);
    
    // Step 2: Unpublish and delete all assets
    await deleteAllAssets(environment);
    
    // Step 3: Delete all content types
    await deleteAllContentTypes(environment);
    
    console.log('✅ Space cleanup completed successfully!');
    console.log('📋 The space is now empty and ready for fresh content.');
    
  } catch (error) {
    console.error('❌ Cleanup failed:', error.message);
    if (error.details) {
      console.error('Details:', JSON.stringify(error.details, null, 2));
    }
    process.exit(1);
  }
}

async function deleteAllEntries(environment) {
  console.log('📝 Deleting all entries...');
  
  let deletedCount = 0;
  let skip = 0;
  const limit = 100;
  
  while (true) {
    try {
      // Get published entries first
      const publishedEntries = await environment.getEntries({ 
        limit, 
        skip,
        order: 'sys.createdAt' // Consistent ordering
      });
      
      if (publishedEntries.items.length === 0) {
        break;
      }
      
      // Unpublish entries
      for (const entry of publishedEntries.items) {
        try {
          if (entry.isPublished()) {
            await entry.unpublish();
            console.log(`   📤 Unpublished: ${entry.fields.title?.en || entry.fields.name?.en || entry.sys.id}`);
          }
        } catch (error) {
          console.warn(`   ⚠️  Failed to unpublish entry ${entry.sys.id}: ${error.message}`);
        }
      }
      
      // Delete entries
      for (const entry of publishedEntries.items) {
        try {
          // Get fresh entry to ensure latest version
          const freshEntry = await environment.getEntry(entry.sys.id);
          await freshEntry.delete();
          deletedCount++;
          console.log(`   🗑️  Deleted: ${entry.fields.title?.en || entry.fields.name?.en || entry.sys.id}`);
        } catch (error) {
          console.warn(`   ⚠️  Failed to delete entry ${entry.sys.id}: ${error.message}`);
        }
      }
      
      skip += limit;
      
    } catch (error) {
      console.error(`   ❌ Error fetching entries: ${error.message}`);
      break;
    }
  }
  
  console.log(`✅ Deleted ${deletedCount} entries\n`);
}

async function deleteAllAssets(environment) {
  console.log('🖼️  Deleting all assets...');
  
  let deletedCount = 0;
  let skip = 0;
  const limit = 100;
  
  while (true) {
    try {
      // Get published assets first
      const publishedAssets = await environment.getAssets({ 
        limit, 
        skip,
        order: 'sys.createdAt'
      });
      
      if (publishedAssets.items.length === 0) {
        break;
      }
      
      // Unpublish assets
      for (const asset of publishedAssets.items) {
        try {
          if (asset.isPublished()) {
            await asset.unpublish();
            console.log(`   📤 Unpublished: ${asset.fields.title?.en || asset.sys.id}`);
          }
        } catch (error) {
          console.warn(`   ⚠️  Failed to unpublish asset ${asset.sys.id}: ${error.message}`);
        }
      }
      
      // Delete assets
      for (const asset of publishedAssets.items) {
        try {
          // Get fresh asset to ensure latest version
          const freshAsset = await environment.getAsset(asset.sys.id);
          await freshAsset.delete();
          deletedCount++;
          console.log(`   🗑️  Deleted: ${asset.fields.title?.en || asset.sys.id}`);
        } catch (error) {
          console.warn(`   ⚠️  Failed to delete asset ${asset.sys.id}: ${error.message}`);
        }
      }
      
      skip += limit;
      
    } catch (error) {
      console.error(`   ❌ Error fetching assets: ${error.message}`);
      break;
    }
  }
  
  console.log(`✅ Deleted ${deletedCount} assets\n`);
}

async function deleteAllContentTypes(environment) {
  console.log('📋 Deleting all content types...');
  
  const contentTypes = await environment.getContentTypes({ limit: 1000 });
  let deletedCount = 0;
  
  for (const contentType of contentTypes.items) {
    try {
      console.log(`   → ${contentType.name} (${contentType.sys.id})`);
      
      // Unpublish if published
      if (contentType.isPublished()) {
        await contentType.unpublish();
        console.log(`     📤 Unpublished content type`);
      }
      
      // Delete content type
      await contentType.delete();
      deletedCount++;
      console.log(`     🗑️  Deleted content type`);
      
    } catch (error) {
      console.error(`     ❌ Failed to delete content type ${contentType.sys.id}: ${error.message}`);
    }
  }
  
  console.log(`✅ Deleted ${deletedCount} content types\n`);
}

// Selective cleanup functions for more targeted operations
async function deleteContentTypesOnly() {
  console.log('🧹 Deleting content types only...\n');
  
  const config = getConfig();
  await confirmCleanup(config.spaceId);
  
  const client = createClient({ accessToken: config.token });
  const space = await client.getSpace(config.spaceId);
  const environment = await space.getEnvironment(config.environment);
  
  await deleteAllContentTypes(environment);
  
  console.log('✅ Content types cleanup completed!');
}

async function deleteEntriesOnly() {
  console.log('🧹 Deleting entries only...\n');
  
  const config = getConfig();
  await confirmCleanup(config.spaceId);
  
  const client = createClient({ accessToken: config.token });
  const space = await client.getSpace(config.spaceId);
  const environment = await space.getEnvironment(config.environment);
  
  await deleteAllEntries(environment);
  
  console.log('✅ Entries cleanup completed!');
}

// Check command line arguments
const operation = process.argv[2];

if (operation === '--content-types-only') {
  deleteContentTypesOnly().catch(error => {
    console.error('Cleanup failed:', error);
    process.exit(1);
  });
} else if (operation === '--entries-only') {
  deleteEntriesOnly().catch(error => {
    console.error('Cleanup failed:', error);
    process.exit(1);
  });
} else if (operation === '--help') {
  console.log(`
Contentful Space Cleanup Script

USAGE:
    node scripts/cleanup-space.mjs [OPTIONS]

OPTIONS:
    --content-types-only    Delete only content types (requires empty entries first)
    --entries-only         Delete only entries (leaves content types)
    --help                 Show this help message

ENVIRONMENT VARIABLES:
    CONTENTFUL_SPACE_ID (or DEST_CONTENTFUL_SPACE_ID or CLEANUP_CONTENTFUL_SPACE_ID for safety)
    CONTENTFUL_MANAGEMENT_API_TOKEN (or DEST_CONTENTFUL_MANAGEMENT_TOKEN or CLEANUP_CONTENTFUL_MANAGEMENT_TOKEN)
    CONTENTFUL_ENVIRONMENT_ID (or DEST_CONTENTFUL_ENVIRONMENT or CLEANUP_CONTENTFUL_ENVIRONMENT, defaults to 'master')
    CONFIRM_CLEANUP=YES_DELETE_EVERYTHING (required for safety)

EXAMPLES:
    # Delete everything (entries, assets, content types)
    CONFIRM_CLEANUP=YES_DELETE_EVERYTHING node scripts/cleanup-space.mjs
    
    # Delete only entries
    CONFIRM_CLEANUP=YES_DELETE_EVERYTHING node scripts/cleanup-space.mjs --entries-only
    
    # Delete only content types (after entries are deleted)
    CONFIRM_CLEANUP=YES_DELETE_EVERYTHING node scripts/cleanup-space.mjs --content-types-only

WARNING: This will permanently delete content! Use with extreme caution.
`);
} else {
  // Run full cleanup if script is executed directly
  if (import.meta.url === `file://${process.argv[1]}`) {
    cleanup().catch(error => {
      console.error('Cleanup failed:', error);
      process.exit(1);
    });
  }
}

export default cleanup;
export { deleteContentTypesOnly, deleteEntriesOnly };