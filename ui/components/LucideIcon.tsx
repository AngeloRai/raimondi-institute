'use client';

import dynamic from 'next/dynamic';
import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

interface LucideIconProps extends Omit<LucideProps, 'ref'> {
  name: string;
}

export default function LucideIcon({ name, ...props }: LucideIconProps) {
  // Normalize icon name (handle various cases: "Music", "music", "Music-Note", etc.)
  const normalizedName = name
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-') // Replace non-alphanumeric chars with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens

  // Check if icon exists in dynamicIconImports
  if (!(normalizedName in dynamicIconImports)) {
    console.warn(`Lucide icon "${name}" (normalized: "${normalizedName}") not found. Falling back to default.`);
    // Return a default icon or null
    const Circle = dynamic(dynamicIconImports['circle']);
    return <Circle {...props} />;
  }

  const LucideIcon = dynamic(dynamicIconImports[normalizedName as keyof typeof dynamicIconImports]);

  return <LucideIcon {...props} />;
}
