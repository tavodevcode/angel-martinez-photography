import { useEffect, useMemo, useState, type MouseEvent } from 'react';

import type { Locale } from '@/lib/content/types';

interface LinkItem {
  label: string;
  href: string;
}

interface Props {
  brand: string;
  links: LinkItem[];
  locale: Locale;
  homeHref: string;
  ctaLabel: string;
  ctaHref: string;
}

interface NavDefinition {
  path: string;
  label: Record<Locale, string>;
}

const NAV_DEFINITIONS: NavDefinition[] = [
  { path: '/', label: { es: 'Inicio', en: 'Home' } },
  { path: '/about/', label: { es: 'Nosotros', en: 'About' } },
  { path: '/services/', label: { es: 'Servicios', en: 'Services' } },
  { path: '/portfolio/', label: { es: 'Portafolio', en: 'Portfolio' } },
  { path: '/contact/', label: { es: 'Contacto', en: 'Contact' } },
];

function normalizePath(path: string): string {
  if (!path) return '/';
  const normalized = path.replace(/\/+$/, '');
  return normalized.length === 0 ? '/' : normalized;
}

function getPathnameFromHref(href: string): string {
  if (typeof window === 'undefined') return href;
  try {
    return normalizePath(new URL(href, window.location.origin).pathname);
  } catch {
    return normalizePath(href);
  }
}

function getLocaleFromPath(path: string): Locale {
  return path === '/en' || path.startsWith('/en/') ? 'en' : 'es';
}

function withLocalePath(locale: Locale, path: string): string {
  if (locale === 'en') {
    return path === '/' ? '/en/' : `/en${path}`;
  }
  return path;
}

export default function FloatingNav({ brand, homeHref }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [pathname, setPathname] = useState(() => {
    if (typeof window === 'undefined') return normalizePath(homeHref);
    return normalizePath(window.location.pathname);
  });
  const currentLocale = useMemo(() => getLocaleFromPath(pathname), [pathname]);
  const languageHref = useMemo(() => (currentLocale === 'en' ? '/' : '/en/'), [currentLocale]);
  const languageLabel = currentLocale === 'en' ? 'ES' : 'EN';
  const menuLabel = 'Menu';
  const menuAriaLabel = currentLocale === 'en' ? 'Open menu' : 'Abrir menu';
  const localizedCtaLabel = currentLocale === 'en' ? 'Book a Session' : 'Agendar sesion';
  const localizedCtaHref = withLocalePath(currentLocale, '/contact/');
  const localizedHomeHref = withLocalePath(currentLocale, '/');
  const localizedLinks = useMemo(
    () =>
      NAV_DEFINITIONS.map((item) => ({
        label: item.label[currentLocale],
        href: withLocalePath(currentLocale, item.path),
      })),
    [currentLocale],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const onPath = () => setPathname(normalizePath(window.location.pathname));
    onScroll();
    onPath();
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('astro:after-swap', onPath as EventListener);

    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('astro:after-swap', onPath as EventListener);
    };
  }, []);

  useEffect(() => {
    const onBeforeSwap = () => setScrolled(true);
    const onAfterSwap = () => {
      setOpen(false);
      setScrolled(window.scrollY > 24);
    };

    document.addEventListener('astro:before-swap', onBeforeSwap as EventListener);
    document.addEventListener('astro:after-swap', onAfterSwap as EventListener);

    return () => {
      document.removeEventListener('astro:before-swap', onBeforeSwap as EventListener);
      document.removeEventListener('astro:after-swap', onAfterSwap as EventListener);
    };
  }, []);

  const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>, href: string, closeMenu = false) => {
    const currentPath = normalizePath(window.location.pathname);
    const targetPath = getPathnameFromHref(href);

    if (targetPath === currentPath) {
      event.preventDefault();
      if (closeMenu) setOpen(false);
      return;
    }

    if (closeMenu) setOpen(false);
  };

  const isActive = (href: string) => getPathnameFromHref(href) === pathname;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter,box-shadow] duration-300 ${
        scrolled
          ? 'border-white/15 bg-black/82 shadow-[0_8px_24px_rgba(0,0,0,0.28)] backdrop-blur-xl'
          : 'border-white/10 bg-black/52 backdrop-blur-lg'
      }`}
    >
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-4 py-4 lg:px-10">
        <a
          href={localizedHomeHref}
          data-astro-prefetch="viewport"
          onClick={(event) => handleLinkClick(event, localizedHomeHref)}
          className="flex items-center gap-4"
        >
          <span className="h-7 w-7 rounded-full border border-white/80" />
          <span className="h-7 w-7 rounded-full bg-white/90" />
          <span className="hidden text-[10px] uppercase tracking-[0.2em] text-white/45 xl:inline">{brand}</span>
        </a>

        <nav className="hidden items-center justify-center gap-7 md:flex">
          {localizedLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-astro-prefetch="viewport"
              onClick={(event) => handleLinkClick(event, link.href)}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className={`text-[11px] uppercase tracking-[0.18em] transition ${
                isActive(link.href) ? 'text-white' : 'text-white/75 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-4">
          <a
            href={localizedCtaHref}
            data-astro-prefetch="viewport"
            onClick={(event) => handleLinkClick(event, localizedCtaHref)}
            className="hidden text-[11px] uppercase tracking-[0.16em] text-white/85 underline underline-offset-4 transition hover:text-white md:inline-flex"
          >
            {localizedCtaLabel}
          </a>
          <a
            href={languageHref}
            data-astro-prefetch="viewport"
            onClick={(event) => handleLinkClick(event, languageHref)}
            className="hidden text-[11px] uppercase tracking-[0.16em] text-white/70 transition hover:text-white md:inline-flex"
          >
            {languageLabel}
          </a>
          <span className="hidden h-7 w-7 rounded-full border border-white/80 md:inline-block" />
          <button
            type="button"
            aria-label={menuAriaLabel}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.12em] md:hidden"
          >
            {menuLabel}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-black/90 px-5 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {localizedLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-astro-prefetch="viewport"
                onClick={(event) => handleLinkClick(event, link.href, true)}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={`text-sm transition ${isActive(link.href) ? 'text-white' : 'text-white/80 hover:text-white'}`}
              >
                {link.label}
              </a>
            ))}
            <a
              href={languageHref}
              data-astro-prefetch="viewport"
              onClick={(event) => handleLinkClick(event, languageHref, true)}
              className="pt-2 text-xs uppercase tracking-[0.16em] text-white/60 transition hover:text-white"
            >
              {languageLabel}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
