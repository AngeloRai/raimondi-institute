import { createClient } from 'contentful'

if (!process.env.CONTENTFUL_SPACE_ID) {
  throw new Error('CONTENTFUL_SPACE_ID is required')
}

if (!process.env.CONTENTFUL_API_KEY) {
  throw new Error('CONTENTFUL_API_KEY is required')
}

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
  accessToken: process.env.CONTENTFUL_API_KEY,
  host: 'cdn.contentful.com'
})

export const previewClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
  accessToken: process.env.CONTENTFUL_PREVIEW_API_KEY || '',
  host: 'preview.contentful.com'
})