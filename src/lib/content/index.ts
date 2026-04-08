import { StaticContentProvider } from '@/lib/content/providers/static-provider';
import type { ContentProvider } from '@/lib/content/types';

export type ContentSource = 'static';

export function createContentProvider(source: ContentSource = 'static'): ContentProvider {
  if (source === 'static') return new StaticContentProvider();
  return new StaticContentProvider();
}
