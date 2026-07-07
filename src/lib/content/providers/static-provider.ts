import { marketingContentByLocale } from '@/data/site-content';
import type { ContentProvider, Locale, MarketingContent } from '@/lib/content/types';

export class StaticContentProvider implements ContentProvider {
  async getMarketingContent(locale: Locale = 'es'): Promise<MarketingContent> {
    return marketingContentByLocale[locale] ?? marketingContentByLocale.es;
  }
}
