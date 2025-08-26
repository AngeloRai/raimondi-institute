const fs = require('fs');
const path = require('path');
const https = require('https');
const { createClient } = require('contentful');

// Initialize Contentful client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_API_KEY,
  host: process.env.CONTENTFUL_PREVIEW === 'true' ? 'preview.contentful.com' : 'cdn.contentful.com',
});

// Simple function to fetch SVG content
function fetchSVG(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', () => resolve(null));
    }).on('error', () => resolve(null));
  });
}

async function fetchLayoutData() {
  try {
    console.log('🚀 Fetching layout data from Contentful...');
    
    // Fetch the layout
    const response = await client.getEntries({
      content_type: 'layout',
      limit: 1,
      include: 4,
    });

    if (response.items.length === 0) {
      throw new Error('No layout found in Contentful');
    }

    const layout = response.items[0];
    
    // Extract data
    const preloadData = {
      navbar: layout.fields?.navbar || null,
      footer: layout.fields?.footer || null,
      lastUpdated: new Date().toISOString(),
      contentfulId: layout.sys.id,
    };

    // Save to file
    const outputPath = path.join(process.cwd(), 'lib', 'preload', 'layout-data.ts');
    const outputDir = path.dirname(outputPath);
    
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const content = `// Auto-generated file - do not edit manually
// Generated on: ${preloadData.lastUpdated}
/* eslint-disable @typescript-eslint/no-explicit-any */

export const preloadedLayoutData = ${JSON.stringify(preloadData, null, 2)} as any;

export default preloadedLayoutData;
`;
    
    fs.writeFileSync(outputPath, content);
    
    console.log('✅ Layout data preloaded successfully');
    console.log(`📅 Last updated: ${preloadData.lastUpdated}`);
    
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