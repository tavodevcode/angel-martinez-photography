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
