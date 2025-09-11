import { NextRequest, NextResponse } from 'next/server';
import { geolocation, ipAddress } from '@vercel/functions';

export async function GET(request: NextRequest) {
  try {
    const geo = geolocation(request);
    const ip = ipAddress(request);

    const manualHeaders = {
      'x-vercel-ip-country': request.headers.get('x-vercel-ip-country'),
      'x-vercel-ip-country-region': request.headers.get('x-vercel-ip-country-region'),
      'x-vercel-ip-city': request.headers.get('x-vercel-ip-city'),
      'x-forwarded-for': request.headers.get('x-forwarded-for'),
      'x-real-ip': request.headers.get('x-real-ip'),
      'cf-ipcountry': request.headers.get('cf-ipcountry'),
      'accept-language': request.headers.get('accept-language'),
    };

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      environment: {
        nodeEnv: process.env.NODE_ENV,
        isVercel: !!process.env.VERCEL,
        region: process.env.VERCEL_REGION || 'unknown',
      },
      vercelFunctions: {
        geolocation: geo,
        ipAddress: ip,
      },
      manualHeaders: Object.fromEntries(
        Object.entries(manualHeaders).filter(([, value]) => value !== null)
      ),
      comparison: {
        methodsMatch: geo.country === manualHeaders['x-vercel-ip-country'],
        geoCountry: geo.country,
        headerCountry: manualHeaders['x-vercel-ip-country'],
      }
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}