import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // URL canónica del deploy; se sobreescribe por entorno (Vercel/VPS) via SITE.
  // `||` y no `??`: un ARG de Docker sin valor llega como string vacío.
  site: process.env.SITE || 'https://photos.angelmartinez.local',
  output: 'static',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    // Genera /sitemap-index.xml + /sitemap-0.xml. La config i18n emite los
    // alternates hreflang en el sitemap: ES en la raíz, EN bajo /en/.
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: { es: 'es-MX', en: 'en-US' },
      },
    }),
  ],
  vite: {
    build: {
      target: 'es2022',
    },
  },
});
