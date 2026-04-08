import type { ImageMetadata } from 'astro';

export interface NavItem {
  label: string;
  href: string;
}

export interface HeroContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  image: ImageMetadata;
  ctaLabel: string;
  ctaHref: string;
}

export interface AboutContent {
  title: string;
  paragraph: string;
  imageA: ImageMetadata;
  imageB: ImageMetadata;
}

export interface GalleryItem {
  title: string;
  alt: string;
  image: ImageMetadata;
}

export interface ServiceItem {
  title: string;
  description: string;
  image: ImageMetadata;
}

export interface PortfolioItem {
  title: string;
  category: string;
  image: ImageMetadata;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
}

export interface ContactContent {
  title: string;
  description: string;
  email: string;
  phone: string;
  location: string;
}

export interface MarketingContent {
  brand: string;
  nav: NavItem[];
  hero: HeroContent;
  about: AboutContent;
  gallery: GalleryItem[];
  services: ServiceItem[];
  portfolio: PortfolioItem[];
  testimonials: TestimonialItem[];
  brands: string[];
  contact: ContactContent;
}

export interface ContentProvider {
  getMarketingContent(): Promise<MarketingContent>;
}
