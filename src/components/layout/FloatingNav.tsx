import { useEffect, useMemo, useState, type MouseEvent } from 'react';

import { NAV_DEFINITIONS, NAV_UI } from '@/lib/content/nav';
import { getLocaleFromPath, withLocalePath } from '@/lib/i18n';

// El nav es transition:persist, así que sobrevive a navegaciones entre locales;
// por eso deriva locale y labels del pathname en vez de recibirlos por props.
// initialPath es el pathname de la página que lo renderiza en servidor: evita
// hydration mismatch y deja aria-current correcto en el HTML estático.
interface Props {
  brand: string;
  initialPath: string;
}

function normalizePath(path: string): string {
  if (!path) return '/';
  const normalized = path.replace(/\/+$/, '');
  return normalized.length === 0 ? '/' : normalized;
}

function getPathnameFromHref(href: string): string {
  if (typeof window === 'undefined') return normalizePath(href);
  try {
    return normalizePath(new URL(href, window.location.origin).pathname);
  } catch {
    return normalizePath(href);
  }
}

export default function FloatingNav({ brand, initialPath }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [pathname, setPathname] = useState(() => normalizePath(initialPath));
  const currentLocale = useMemo(() => getLocaleFromPath(pathname), [pathname]);
  const languageHref = useMemo(() => (currentLocale === 'en' ? '/' : '/en/'), [currentLocale]);
  const languageLabel = currentLocale === 'en' ? 'ES' : 'EN';
  const { menuLabel, menuAriaLabel } = NAV_UI[currentLocale];
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
    let ticking = false;
    const updateScrolled = () => {
      const isScrolled = window.scrollY > 24;
      setScrolled((prev) => (prev === isScrolled ? prev : isScrolled));
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateScrolled);
    };
    const onPath = () => setPathname(normalizePath(window.location.pathname));
    updateScrolled();
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
      className={`nav-glass fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${
        scrolled ? 'border-white/12 bg-black/85 backdrop-blur-xl' : 'border-transparent bg-black/40 backdrop-blur-md'
      }`}
    >
      <div className="flex w-full items-center justify-between px-6 py-5 lg:px-12 lg:py-[26px]">
        <a
          href={localizedHomeHref}
          data-astro-prefetch="viewport"
          onClick={(event) => handleLinkClick(event, localizedHomeHref)}
          className="font-caption text-[12px] font-semibold uppercase tracking-[0.2em] text-white"
        >
          {brand}
        </a>

        <div className="flex items-center gap-9">
          <nav className="hidden items-center gap-9 md:flex">
            {localizedLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-astro-prefetch="viewport"
                onClick={(event) => handleLinkClick(event, link.href)}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={`link-underline font-caption text-[11px] uppercase tracking-[0.2em] transition-colors ${
                  isActive(link.href) ? 'font-semibold text-white' : 'text-muted hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href={languageHref}
            data-astro-prefetch="viewport"
            onClick={(event) => handleLinkClick(event, languageHref)}
            className="hidden font-caption text-[11px] uppercase tracking-[0.2em] text-muted transition hover:text-white md:inline-flex"
          >
            {languageLabel}
          </a>
          <button
            type="button"
            aria-label={menuAriaLabel}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="font-caption text-[11px] uppercase tracking-[0.2em] text-white md:hidden"
          >
            {menuLabel}
          </button>
        </div>
      </div>

      <div className={`mobile-menu-panel md:hidden ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <nav className="border-t border-white/10 bg-black/95 px-6 py-5">
          <div className="flex flex-col gap-4">
            {localizedLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-astro-prefetch="viewport"
                onClick={(event) => handleLinkClick(event, link.href, true)}
                aria-current={isActive(link.href) ? 'page' : undefined}
                tabIndex={open ? undefined : -1}
                className={`font-caption text-[12px] uppercase tracking-[0.2em] transition ${
                  isActive(link.href) ? 'font-semibold text-white' : 'text-muted hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href={languageHref}
              data-astro-prefetch="viewport"
              onClick={(event) => handleLinkClick(event, languageHref, true)}
              tabIndex={open ? undefined : -1}
              className="pt-1 font-caption text-[11px] uppercase tracking-[0.2em] text-muted transition hover:text-white"
            >
              {languageLabel}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
