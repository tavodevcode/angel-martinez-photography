# Angel Martínez Photography (Astro Hybrid)

Sitio marketing migrado a **Astro híbrido** (SSG-first + islas React mínimas) con enfoque en:

- Bundle ligero
- View Transitions nativas cross-document
- Optimización de imágenes con `astro:assets`
- Base extensible para CMS/portal futuro sin inflar el marketing bundle

## Stack

- Astro 5
- React 19 (solo islas)
- Tailwind CSS
- pnpm

## Estructura

- `src/pages/`: rutas estáticas (`/`, `/about`, `/services`, `/portfolio`, `/contact`)
- `src/components/sections/`: secciones de contenido
- `src/components/aceternity/`: componentes visuales estilo Aceternity (selectivos)
- `src/lib/content/`: contrato de proveedor de contenido (estático hoy, extensible a CMS)
- `src/assets/images/`: imágenes fuente para optimización
- `scripts/`: reportes de bundle e image budget
- `deploy/`: configuraciones para Nginx/Caddy
- `legacy-src/`: implementación React/Vite previa (resguardo)

## Comandos

```bash
pnpm install
ASTRO_TELEMETRY_DISABLED=1 pnpm check
ASTRO_TELEMETRY_DISABLED=1 pnpm build
pnpm analyze:bundle
pnpm analyze:images
pnpm dev
```

## Estrategia de Rendimiento

- SSG por defecto para todas las páginas de marketing.
- Islas React solo en interacción real (`client:idle` / `client:visible`).
- View Transitions nativas con `@view-transition { navigation: auto; }`.
- Imágenes críticas con `loading="eager"` + `fetchpriority="high"`.
- Imágenes no críticas en `lazy` + formatos modernos (`avif`, `webp`).
- Script de control de presupuesto de imagen (`220 KB` por archivo fuente).

## Componentes visuales selectivos (Aceternity-like)

Se integraron de forma local para evitar lock-in de framework y mantener control de bundle:

- `BackgroundBeams`
- `Spotlight` (isla React)
- `TextGenerateEffect` (isla React)
- `HoverBorderGradient`
- `CardSpotlight`
- `InfiniteMovingCards`

## Compatibilidad y roadmap

- Estado de compatibilidad y decisiones: `docs/aceternity-compatibility.md`
- Diseño arquitectónico y evolución hacia CMS/portal: `docs/architecture.md`

## Deploy en Dockploy

Se deja imagen Docker para servir estático con Nginx:

```bash
docker build -t angel-photo .
docker run -p 8080:80 angel-photo
```

También se incluye `deploy/Caddyfile` como alternativa.
