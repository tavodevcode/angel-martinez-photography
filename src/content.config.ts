import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Texto localizado: cada entrada declara ambos idiomas para que Zod garantice
// que ninguna traducción falte al agregar álbumes o servicios nuevos.
const localizedText = z.object({ es: z.string(), en: z.string() });
const localizedList = z.object({ es: z.array(z.string()), en: z.array(z.string()) });

const albums = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/albums' }),
  schema: ({ image }) =>
    z.object({
      title: localizedText,
      description: localizedText,
      category: localizedText,
      dateLabel: localizedText,
      cover: image(),
      coverAlt: localizedText,
      order: z.number().default(0),
      photos: z
        .array(
          z.object({
            src: image(),
            alt: localizedText,
          }),
        )
        .default([]),
    }),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/services' }),
  schema: ({ image }) =>
    z.object({
      title: localizedText,
      description: localizedText,
      image: image(),
      imageAlt: localizedText,
      order: z.number().default(0),
      packages: z
        .array(
          z.object({
            name: localizedText,
            price: z.string(),
            features: localizedList,
          }),
        )
        .default([]),
    }),
});

export const collections = { albums, services };
