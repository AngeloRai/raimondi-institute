/**
 * Normalize Contentful asset URLs to absolute HTTPS URLs for next/image.
 * Contentful often returns protocol-relative URLs like //images.ctfassets.net/...
 */
export function toAbsoluteCtfUrl(url?: string | null): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("//")) return `https:${url}`;
  return url;
}
