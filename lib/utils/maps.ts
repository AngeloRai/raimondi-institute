/**
 * Generate a Google Maps search URL from an address
 * @param address - The address to search for
 * @returns Google Maps search URL or empty string if no address
 */
export function generateGoogleMapsLink(address: string): string {
  if (!address) return "";

  const query = encodeURIComponent(address);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

/**
 * Generate a Google Maps directions URL from an address
 * @param address - The destination address
 * @returns Google Maps directions URL or empty string if no address
 */
export function generateGoogleMapsDirectionsLink(address: string): string {
  if (!address) return "";

  const destination = encodeURIComponent(address);
  return `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
}