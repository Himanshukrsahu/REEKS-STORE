'use client';

import { useEffect } from 'react';
import { useThemeStore } from '../store/useThemeStore';

export default function ThemeHandler() {
  const { theme } = useThemeStore();

  useEffect(() => {
    // Apply correct theme class on initial mount
    document.documentElement.className = theme;

    // Register PWA Service Worker
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((reg) => console.log('Reeks Store SW registered:', reg.scope))
        .catch((err) => console.error('Reeks Store SW fail:', err));
    }
  }, [theme]);

  return null;
}
