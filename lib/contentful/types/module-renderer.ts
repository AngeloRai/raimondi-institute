import type { ComponentType } from 'react'
import type { Entry, EntrySkeletonType } from 'contentful'
import type { DefaultChainModifiers, SupportedLocales } from './fields'

// Any Contentful entry that can be rendered as a module (single locale)
export type ContentfulModule = Entry<EntrySkeletonType, DefaultChainModifiers, SupportedLocales>

// Registry mapping content type IDs to React components
export type ModuleRegistry = Record<string, ComponentType<Record<string, unknown>>>