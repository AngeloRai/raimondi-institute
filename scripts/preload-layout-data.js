const fs = require('fs');
const path = require('path');
const { createClient } = require('contentful');

// Define supported locales (must match lib/locale-types.ts)
const SUPPORTED_LOCALES = {
  'en-US': 'English',
  'pt-BR': 'Portuguese',
};

// Initialize Contentful client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_API_KEY,
  host: process.env.CONTENTFUL_PREVIEW === 'true' ? 'preview.contentful.com' : 'cdn.contentful.com',
});

// Supported locales
const supportedLocales = Object.keys(SUPPORTED_LOCALES);

async function fetchLayoutData() {
  try {
    console.log('🚀 Fetching layout data from Contentful for all locales...');
    
    const preloadData = {
      locales: {},
      lastUpdated: new Date().toISOString(),
    };

    // Fetch layout data for each locale
    for (const locale of supportedLocales) {
      console.log(`📍 Fetching data for locale: ${locale}`);
      
      // Fetch the layout for this locale
      const response = await client.getEntries({
        content_type: 'layout',
        limit: 1,
        include: 4,
        locale: locale,
      });

      if (response.items.length === 0) {
        console.warn(`⚠️  No layout found for locale: ${locale}`);
        continue;
      }

      const layout = response.items[0];
      
      // Store data for this locale
      preloadData.locales[locale] = {
        navbar: layout.fields?.navbar || null,
        footer: layout.fields?.footer || null,
        contentfulId: layout.sys.id,
      };
    }

    // Save to file
    const outputPath = path.join(process.cwd(), 'lib', 'preload', 'layout-data.ts');
    const outputDir = path.dirname(outputPath);
    
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const content = `// Auto-generated file - do not edit manually
// Generated on: ${preloadData.lastUpdated}
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { SupportedLocale } from '@/lib/locale-types';

export const preloadedLayoutData = ${JSON.stringify(preloadData, null, 2)} as any;

// Helper function to get layout data for a specific locale
export function getPreloadedLayoutForLocale(locale: SupportedLocale) {
  return preloadedLayoutData.locales[locale] || preloadedLayoutData.locales['en-US'];
}

export default preloadedLayoutData;
`;
    
    fs.writeFileSync(outputPath, content);
    
    console.log('✅ Layout data preloaded successfully for all locales');
    console.log(`📅 Last updated: ${preloadData.lastUpdated}`);
    console.log(`🌐 Locales included: ${supportedLocales.join(', ')}`);
    
    return preloadData;
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  fetchLayoutData();
}

module.exports = { fetchLayoutData };