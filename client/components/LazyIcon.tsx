'use client';

import { Globe, Coffee, Leaf, Wheat, Flame, FileText, Package, Award, CheckCircle } from 'lucide-react';
import { ComponentType } from 'react';

// Common icons that are likely to be used - import only what we need
const commonIcons: Record<string, ComponentType<any>> = {
  Globe,
  Coffee,
  Leaf,
  Wheat,
  Flame,
  FileText,
  Package,
  Award,
  CheckCircle,
};

export function LazyIcon({ iconName, ...props }: { iconName?: string; [key: string]: any }) {
  if (!iconName) {
    const Icon = Globe;
    return <Icon {...props} />;
  }

  // Check common icons first (already imported)
  if (commonIcons[iconName]) {
    const Icon = commonIcons[iconName];
    return <Icon {...props} />;
  }

  // Dynamically import other icons only when needed
  try {
    const lucideReact = require('lucide-react');
    const Icon = (lucideReact as any)[iconName];
    if (Icon) {
      return <Icon {...props} />;
    }
  } catch (e) {
    // Fallback to Globe if icon not found
  }

  const Icon = Globe;
  return <Icon {...props} />;
}

