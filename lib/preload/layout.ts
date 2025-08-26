let preloadedData: unknown = null;

export function getPreloadedLayoutData() {
  // Return cached data if available
  if (preloadedData) {
    return preloadedData;
  }

  try {
    // Import the bundled TypeScript module - this is synchronous and immediate
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { preloadedLayoutData } = require('./layout-data');
    preloadedData = preloadedLayoutData;
    console.log('✅ Preloaded layout data loaded from bundle');
    return preloadedData;
  } catch {
    console.warn('⚠️ Preloaded layout data not found. Run preload script.');
    return null;
  }
}

export function clearPreloadedDataCache() {
  preloadedData = null;
}