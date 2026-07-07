import type { Locale } from '@/lib/content/types';

// Fuente única de la navegación principal. Este módulo se importa también desde
// islands de React, así que no debe importar imágenes ni contenido pesado.
export interface NavDefinition {
  path: string;
  label: Record<Locale, string>;
}

export const NAV_DEFINITIONS: NavDefinition[] = [
  { path: '/', label: { es: 'Inicio', en: 'Home' } },
  { path: '/about/', label: { es: 'Nosotros', en: 'About' } },
  { path: '/services/', label: { es: 'Servicios', en: 'Services' } },
  { path: '/portfolio/', label: { es: 'Portafolio', en: 'Portfolio' } },
  { path: '/contact/', label: { es: 'Contacto', en: 'Contact' } },
];

export interface NavUiStrings {
  ctaLabel: string;
  menuLabel: string;
  menuAriaLabel: string;
}

export const NAV_UI: Record<Locale, NavUiStrings> = {
  es: { ctaLabel: 'Agendar sesion', menuLabel: 'Menu', menuAriaLabel: 'Abrir menu' },
  en: { ctaLabel: 'Book a Session', menuLabel: 'Menu', menuAriaLabel: 'Open menu' },
};
