// Global Contentful image loader for Next.js Image
// Docs: https://www.contentful.com/developers/docs/references/images-api/
// Next.js Image loader API passes: { src, width, quality }

/**
 * @param {{ src: string; width: number; quality?: number }} params
 */
module.exports = function contentfulLoader({ src, width, quality }) {
  // Ensure absolute URL to Contentful Images API
  let absolute;
  if (src.startsWith("http")) {
    absolute = src;
  } else if (src.startsWith("//")) {
    absolute = `https:${src}`;
  } else if (src.startsWith("/")) {
    absolute = `https://images.ctfassets.net${src}`;
  } else {
    absolute = `https://images.ctfassets.net/${src}`;
  }

  const url = new URL(absolute);

  // Apply Contentful Images API parameters
  // Format: prefer webp by default (broad support); adjust if you prefer avif
  if (!url.searchParams.has("fm")) url.searchParams.set("fm", "webp");
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 75));

  return url.href;
};
