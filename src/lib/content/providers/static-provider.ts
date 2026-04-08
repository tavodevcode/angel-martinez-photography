import { marketingContent } from '@/data/site-content';
import type { ContentProvider, MarketingContent } from '@/lib/content/types';

export class StaticContentProvider implements ContentProvider {
  async getMarketingContent(): Promise<MarketingContent> {
    return marketingContent;
  }
}
