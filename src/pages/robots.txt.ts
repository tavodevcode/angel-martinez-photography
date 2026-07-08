import type { APIRoute } from 'astro';

// robots.txt generado en build: usa la URL real del deploy (Astro.site) para
// apuntar al sitemap, sin hardcodear el dominio. Permite todo el rastreo.
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('sitemap-index.xml', site ?? 'https://photos.angelmartinez.local').href;
  const body = `User-agent: *
Allow: /

Sitemap: ${sitemap}
`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
