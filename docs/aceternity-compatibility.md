# Compatibilidad Aceternity / Astro / Next

## Resumen ejecutivo

- Aceternity está orientado a React/Next.
- En Astro, funciona bien mediante islas React cuando el componente no depende de APIs específicas de Next.
- Si un bloque usa `next/image`, `next/link` o hooks del router, se adapta con wrappers o se descarta.

## Criterio aplicado en este proyecto

- Integración selectiva local (componentes copiados/adaptados).
- Se evita instalar catálogos completos para no cargar dependencias innecesarias.
- Se mantiene una única estrategia de motion por componente (evitar duplicaciones de runtime).

## Matriz rápida

- Componente React puro + Tailwind: Compatible en Astro React island.
- Componente con `next/link`: Adaptar a `<a>` / navegación Astro.
- Componente con `next/image`: Reemplazar por `astro:assets` o wrapper.
- Componente con dependencias pesadas no críticas: Evitar o lazy-hydration estricta.

## Reglas de aceptación de nuevos componentes

1. Aporta valor visual real al storytelling.
2. No rompe accesibilidad (keyboard/touch/reduced-motion).
3. No excede presupuesto de bundle del route donde vive.
4. No introduce dependencia de framework innecesaria.
