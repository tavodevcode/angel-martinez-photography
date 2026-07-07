# Arquitectura de Migración (Fase 1 completada)

## Objetivo

Migrar a Astro híbrido para mantener alta calidad visual con mínimo JavaScript en cliente.

## Decisiones clave

1. Renderizado
- Marketing en SSG por defecto.
- Islas React solo para interacción real.

2. Navegación y transiciones
- View Transitions nativas cross-document.
- Se evita `ClientRouter` por ahora para preservar bajo JS.

3. Contenido desacoplado
- Se creó `ContentProvider` como contrato.
- Implementación actual: `StaticContentProvider`.
- Próxima implementación: `CMSContentProvider` (sin romper componentes).

4. Imágenes
- Fuentes en `src/assets/images`.
- Render con `Image`/`Picture` de `astro:assets`.
- Política: LCP eager, resto lazy.

5. Bundle governance
- `scripts/report-bundle.mjs` para peso por tipo de archivo.
- `scripts/check-image-budget.mjs` para control de presupuesto por imagen.

## Integración futura (Fase 2+)

1. CMS
- Implementar `CMSContentProvider` y feature flag por entorno.
- Mantener fallback estático para alta disponibilidad.

2. Portal autenticado de clientes
- Recomendado como app separada para no inflar marketing bundle.
- Auth + librería de fotos + descargas sobre backend dedicado.

3. Evolución visual
- Integrar más bloques visuales de forma selectiva y medible.
- Cada nuevo componente debe pasar presupuesto de JS y test de accesibilidad.
