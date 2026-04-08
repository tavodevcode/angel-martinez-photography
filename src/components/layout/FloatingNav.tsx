import { useEffect, useState } from 'react';

interface LinkItem {
  label: string;
  href: string;
}

interface Props {
  brand: string;
  links: LinkItem[];
}

export default function FloatingNav({ brand, links }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled ? 'border-white/15 bg-black/82 backdrop-blur-xl' : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-4 py-4 lg:px-10">
        <a href="/" className="flex items-center gap-4">
          <span className="h-7 w-7 rounded-full border border-white/80" />
          <span className="h-7 w-7 rounded-full bg-white/90" />
          <span className="hidden text-[10px] uppercase tracking-[0.2em] text-white/45 xl:inline">{brand}</span>
        </a>

        <nav className="hidden items-center justify-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[11px] uppercase tracking-[0.18em] text-white/75 transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-4">
          <a
            href="/contact"
            className="hidden text-[11px] uppercase tracking-[0.16em] text-white/85 underline underline-offset-4 transition hover:text-white md:inline-flex"
          >
            Book a Session
          </a>
          <span className="hidden h-7 w-7 rounded-full border border-white/80 md:inline-block" />
          <button
            type="button"
            aria-label="Abrir menú"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.12em] md:hidden"
          >
            Menú
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-black/90 px-5 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm text-white/80 transition hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
