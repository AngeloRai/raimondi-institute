import React from 'react'
import LucideIcon from '../components/LucideIcon'
import ChevronLeft from './ChevronLeft'
import ChevronRight from './ChevronRight'
import Instagram from './Instagram'
import Facebook from './Facebook'
import YouTube from './YouTube'
import Twitter from './Twitter'
import Menu from './Menu'
import X from './X'

// Local custom icon mapping - these take priority over Lucide icons
const localIconMap = {
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  instagram: Instagram,
  facebook: Facebook,
  youtube: YouTube,
  twitter: Twitter,
  menu: Menu,
  x: X,
} as const

interface IconRendererProps {
  name: string
  className?: string
}

export default function IconRenderer({ name, className }: IconRendererProps) {
  // 1. First check if we have a local custom icon
  const localIcon = localIconMap[name as keyof typeof localIconMap]

  if (localIcon) {
    const LocalIconComponent = localIcon
    return <LocalIconComponent className={className} />
  }

  // 2. Fallback to Lucide icon (which has its own fallback to default)
  return <LucideIcon name={name} className={className} />
}

// Export available local icon names for type safety (optional)
export type LocalIconName = keyof typeof localIconMap