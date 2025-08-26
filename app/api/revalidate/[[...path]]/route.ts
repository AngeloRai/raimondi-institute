import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Common validation and revalidation logic
async function handleRevalidation(request: NextRequest) {
    try {
        // Extract token from query params or body
        let token: string | null = null
        
        if (request.method === 'GET') {
            token = request.nextUrl.searchParams.get('token')
        } else if (request.method === 'POST') {
            try {
                const body = await request.json()
                token = body.token || request.nextUrl.searchParams.get('token')
            } catch {
                // If JSON parsing fails, try query params as fallback
                token = request.nextUrl.searchParams.get('token')
            }
        }

        // Validate secret token
        const secret = process.env.REVALIDATION_SECRET_TOKEN

        if (!secret) {
            console.error(
                'REVALIDATION_SECRET_TOKEN is not defined in environment variables'
            )
            return NextResponse.json(
                {
                    revalidated: false,
                    now: Date.now(),
                    message: 'Server configuration error'
                },
                { status: 500 }
            )
        }

        if (!token || token !== secret) {
            console.warn('Invalid revalidation token attempt:', { 
                hasToken: !!token,
                timestamp: new Date().toISOString(),
                userAgent: request.headers.get('user-agent') || 'unknown',
                origin: request.headers.get('origin') || 'unknown'
            })
            return NextResponse.json(
                {
                    revalidated: false,
                    now: Date.now(),
                    message: 'Invalid token'
                },
                { status: 401 }
            )
        }

        // Extract path to revalidate from the URL
        const url = new URL(request.url)
        let pathToRevalidate = url.pathname.replace('/api/revalidate', '') || '/'
        
        // Handle the catch-all route structure
        if (pathToRevalidate === '' || pathToRevalidate === '/') {
            pathToRevalidate = '/' // This will revalidate the home page
        } else {
            // Normalize path (remove double slashes, ensure it starts with /)
            pathToRevalidate = pathToRevalidate.replace(/\/+/g, '/')
            if (!pathToRevalidate.startsWith('/')) {
                pathToRevalidate = '/' + pathToRevalidate
            }
        }

        console.log('Revalidating path:', pathToRevalidate)
        
        // Handle special cases for home page revalidation
        if (pathToRevalidate === '/' || pathToRevalidate === '/home') {
            console.log('Revalidating home page and layout')
            // Revalidate both the root path and ensure layout updates
            revalidatePath('/', 'layout')
            // Force revalidation of the entire app since home page is the entry point
            revalidatePath('/', 'page')
        } else {
            // Revalidate the specific path
            revalidatePath(pathToRevalidate, 'layout')
        }

        return NextResponse.json(
            {
                revalidated: true,
                path: pathToRevalidate,
                now: Date.now(),
                message: 'Successfully revalidated'
            },
            {
                headers: {
                    'Cache-Control': 'no-store, must-revalidate',
                    'X-Content-Type-Options': 'nosniff',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
                }
            }
        )
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : 'Unknown error'
        console.error('Error during revalidation:', {
            error: errorMessage,
            stack: error instanceof Error ? error.stack : undefined,
            timestamp: new Date().toISOString()
        })
        
        return NextResponse.json(
            {
                revalidated: false,
                now: Date.now(),
                message: 'Error during revalidation',
                error:
                    process.env.NODE_ENV === 'development'
                        ? errorMessage
                        : undefined
            },
            { status: 500 }
        )
    }
}

// Handle preflight requests
export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    })
}

// GET method for manual revalidation (e.g., from browser)
export async function GET(request: NextRequest) {
    return handleRevalidation(request)
}

// POST method for webhook revalidation (e.g., from Contentful)
export async function POST(request: NextRequest) {
    return handleRevalidation(request)
}