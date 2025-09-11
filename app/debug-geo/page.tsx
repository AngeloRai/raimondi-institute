import { headers, cookies } from 'next/headers';
import { LOCALE_COOKIE_NAME } from '@/lib/locale-types';

export default async function DebugGeoPage() {
  const headersList = await headers();
  const cookieStore = await cookies();

  const geoHeaders = {
    'x-vercel-ip-country': headersList.get('x-vercel-ip-country'),
    'x-vercel-ip-country-region': headersList.get('x-vercel-ip-country-region'),
    'x-vercel-ip-city': headersList.get('x-vercel-ip-city'),
    'x-forwarded-for': headersList.get('x-forwarded-for'),
    'x-real-ip': headersList.get('x-real-ip'),
    'cf-ipcountry': headersList.get('cf-ipcountry'), // Cloudflare
    'accept-language': headersList.get('accept-language'),
    'user-agent': headersList.get('user-agent'),
  };
  
  const middlewareHeaders = {
    'x-middleware-locale': headersList.get('x-middleware-locale'),
    'x-middleware-source': headersList.get('x-middleware-source'),
    'x-middleware-country': headersList.get('x-middleware-country'),
  };

  const localeCookie = cookieStore.get(LOCALE_COOKIE_NAME);

  const availableHeaders = Object.entries(geoHeaders)
    .filter(([, value]) => value !== null)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

  return (
    <div className="max-w-4xl mx-auto p-8 font-mono">
      <h1 className="text-3xl font-bold mb-8 text-brand-primary">
        🌍 Geolocation Debug Page
      </h1>
      
      <div className="space-y-8">
        {/* Geolocation Headers */}
        <section className="bg-surface-soft p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-brand-primary">
            📍 Geolocation Headers
          </h2>
          {Object.keys(availableHeaders).length > 0 ? (
            <div className="space-y-2">
              {Object.entries(availableHeaders).map(([key, value]) => (
                <div key={key} className="flex flex-col sm:flex-row gap-2">
                  <span className="font-semibold text-brand-secondary min-w-64">
                    {key}:
                  </span>
                  <span className="text-neutral-dark bg-white px-2 py-1 rounded break-all">
                    {String(value)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-orange-600 bg-orange-100 p-4 rounded">
              ⚠️ No geolocation headers detected. This is normal in local development.
            </p>
          )}
        </section>

        {/* Middleware Debug Headers */}
        <section className="bg-surface-soft p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-brand-primary">
            🔧 Middleware Debug Info
          </h2>
          {Object.keys(middlewareHeaders).some(key => middlewareHeaders[key as keyof typeof middlewareHeaders] !== null) ? (
            <div className="space-y-2">
              {Object.entries(middlewareHeaders).map(([key, value]) => (
                value && (
                  <div key={key} className="flex flex-col sm:flex-row gap-2">
                    <span className="font-semibold text-brand-secondary min-w-64">
                      {key}:
                    </span>
                    <span className="text-neutral-dark bg-white px-2 py-1 rounded">
                      {String(value)}
                    </span>
                  </div>
                )
              ))}
            </div>
          ) : (
            <p className="text-orange-600 bg-orange-100 p-4 rounded">
              ⚠️ No middleware debug headers detected. Middleware may not be running.
            </p>
          )}
        </section>

        {/* Locale Cookie */}
        <section className="bg-surface-soft p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-brand-primary">
            🍪 Locale Cookie
          </h2>
          {localeCookie ? (
            <div className="flex flex-col sm:flex-row gap-2">
              <span className="font-semibold text-brand-secondary">
                {LOCALE_COOKIE_NAME}:
              </span>
              <span className="text-neutral-dark bg-white px-2 py-1 rounded">
                {localeCookie.value}
              </span>
            </div>
          ) : (
            <p className="text-orange-600 bg-orange-100 p-4 rounded">
              ⚠️ No locale cookie found
            </p>
          )}
        </section>

        {/* Environment Info */}
        <section className="bg-surface-soft p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-brand-primary">
            ⚙️ Environment Info
          </h2>
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row gap-2">
              <span className="font-semibold text-brand-secondary min-w-32">
                Environment:
              </span>
              <span className="text-neutral-dark bg-white px-2 py-1 rounded">
                {process.env.NODE_ENV}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <span className="font-semibold text-brand-secondary min-w-32">
                Vercel:
              </span>
              <span className="text-neutral-dark bg-white px-2 py-1 rounded">
                {process.env.VERCEL ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <span className="font-semibold text-brand-secondary min-w-32">
                Region:
              </span>
              <span className="text-neutral-dark bg-white px-2 py-1 rounded">
                {process.env.VERCEL_REGION || 'Unknown'}
              </span>
            </div>
          </div>
        </section>

        {/* Instructions */}
        <section className="bg-blue-50 border-l-4 border-blue-400 p-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">
            📝 Testing Instructions
          </h2>
          <div className="text-blue-700 space-y-2">
            <p><strong>Local Development:</strong> Geolocation headers will be missing (normal)</p>
            <p><strong>Vercel Production:</strong> Should show x-vercel-ip-country and related headers</p>
            <p><strong>Expected Headers:</strong></p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li><code>x-vercel-ip-country</code> - Country code (e.g., {`"US", "BR"`})</li>
              <li><code>x-vercel-ip-country-region</code> - Region/state</li>
              <li><code>x-vercel-ip-city</code> - City name</li>
              <li><code>accept-language</code> - Browser language preferences</li>
            </ul>
          </div>
        </section>

        {/* Test Locale Switching */}
        <section className="bg-surface-soft p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-brand-primary">
            🔄 Test Locale Detection
          </h2>
          <p className="mb-4 text-neutral-dark">
            Clear your locale cookie to test geo-based detection. Open browser dev tools and run:
          </p>
          <code className="block bg-neutral-dark text-white p-3 rounded mb-4 text-sm">
            {`document.cookie = "${LOCALE_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"; location.reload();`}
          </code>
          <p className="text-sm text-brand-accent">
            This will clear the locale cookie and reload the page to trigger geo-based detection.
          </p>
        </section>
      </div>
    </div>
  );
}