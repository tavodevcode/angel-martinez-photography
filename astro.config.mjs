import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  // URL canónica del deploy; se sobreescribe por entorno (Vercel/VPS) via SITE.
  // `||` y no `??`: un ARG de Docker sin valor llega como string vacío.
  site: process.env.SITE || 'https://photos.angelmartinez.local',
  output: 'static',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  vite: {
    build: {
      target: 'es2022',
    },
  },
});
