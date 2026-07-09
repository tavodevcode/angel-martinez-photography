import type { Locale } from '@/lib/content/types';

export const DEFAULT_LOCALE: Locale = 'es';

export function getLocaleFromPath(pathname: string): Locale {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'es';
}

export function withLocalePath(locale: Locale, path: string): string {
  if (locale === 'en') {
    return path === '/' ? '/en/' : `/en${path}`;
  }
  return path;
}

// Devuelve la ruta canónica en español (sin el prefijo /en) de cualquier ruta.
// Base para calcular los alternates hreflang: '/en/portfolio/' → '/portfolio/'.
export function stripLocalePath(pathname: string): string {
  if (pathname === '/en' || pathname === '/en/') return '/';
  if (pathname.startsWith('/en/')) return pathname.slice(3);
  return pathname;
}

// Alternates es/en de una ruta, para <link rel="alternate" hreflang>.
export function getLocaleAlternates(pathname: string): Record<Locale, string> {
  const base = stripLocalePath(pathname);
  return { es: base, en: withLocalePath('en', base) };
}
