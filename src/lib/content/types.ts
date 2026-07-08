import type { ImageMetadata } from 'astro';

export type Locale = 'es' | 'en';

/** Clip corto en loop para el hero, estilo "artist spotlight" de Apple Music.
    La imagen del hero sigue siendo el poster/fallback (LCP); el video solo se
    carga en desktop con puntero fino y sin prefers-reduced-motion. */
export interface HeroVideo {
  /** Ruta pública al clip principal (H.264/MP4), ej. '/videos/hero.mp4'. */
  mp4: string;
  /** Ruta pública al clip alterno (VP9/AV1 WebM), opcional pero recomendado. */
  webm?: string;
}

export interface HeroContent {
  eyebrow: string;
  labelRight: string;
  title: string;
  description: string;
  image: ImageMetadata;
  imageAlt: string;
  ctaLabel: string;
  ctaHref: string;
  /** Si se define, el hero reproduce este clip en loop sobre la imagen poster. */
  video?: HeroVideo;
}

/** Strings de UI propios de la home "Monumental Nocturno". */
export interface HomeUiContent {
  archiveLabel: string;
  archiveLinkLabel: string;
  servicesLabel: string;
  servicesIndexLabel: string;
  workLabel: string;
  workTitle: string;
}

export interface AboutContent {
  sectionLabel: string;
  linkLabel: string;
  title: string;
  paragraph: string;
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
  href: string;
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

export interface SocialLink {
  label: string;
  href: string;
}

export interface ContactContent {
  talkAlt: string;
  socials: SocialLink[];
  title: string;
  description: string;
  emailLabel: string;
  email: string;
  phoneLabel: string;
  phone: string;
  locationLabel: string;
  location: string;
  frameImage: ImageMetadata;
  frameAlt: string;
}

export interface FooterContent {
  rights: string;
  privacyLabel: string;
}

export interface DetailUiContent {
  backToPortfolio: string;
  backToServices: string;
  packagesTitle: string;
}

/** Strings de UI de las vistas Portafolio y Detalle de Álbum "Monumental Nocturno". */
export interface PortfolioUiContent {
  eyebrowLeft: string;
  eyebrowRight: string;
  title: string;
  filters: string[];
  albumsCountLabel: string;
  nextAlbumLabel: string;
  dateKey: string;
  categoryKey: string;
  deliveryKey: string;
  directionKey: string;
  piecesUnit: string;
}

export interface ServicesUiProcessStep {
  title: string;
  description: string;
}

/** Strings de UI de las vistas "Servicios" y "Servicio (detalle)" del rediseño Monumental Nocturno. */
export interface ServicesUiContent {
  headerLabel: string;
  indexLabel: string;
  title: string;
  intro: string;
  /** Metadatos técnicos por servicio (SRV. 01 — 35MM · F/1.8 · ISO 200). */
  serviceMeta: string[];
  processLabel: string;
  processIndexLabel: string;
  processSteps: ServicesUiProcessStep[];
  closingEyebrow: string;
  closingTitle: string;
  detailPackagesTag: string;
  detailStudioTag: string;
  detailMetaLeft: string;
  detailMetaRight: string;
  packagesHeadline: string;
  packagesIntro: string;
  packagesNote: string;
  priceFromLabel: string;
  approachLabel: string;
  approachTitle: string;
  approachCopy: string;
  detailClosingEyebrow: string;
  detailClosingTitle: string;
  detailClosingCopy: string;
}

export interface AboutEditorialBlock {
  index: string;
  title: string;
  body: string;
  ctaLabel: string;
  caption: string;
  imageAlt: string;
}

export interface AboutListItem {
  num: string;
  title: string;
  text: string;
}

export interface AboutStat {
  value: string;
  label: string;
}

/** Strings de UI propios de la vista "Nosotros" (Monumental Nocturno). */
export interface AboutUiContent {
  title: string;
  sectionLabel: string;
  portfolioLinkLabel: string;
  historia: {
    eyebrow: string;
    titleLines: string[];
    body: string;
    ctaLabel: string;
    imageAlt: string;
  };
  blocks: AboutEditorialBlock[];
  principles: AboutListItem[];
  closingEditorial: {
    eyebrow: string;
    titleLines: string[];
    body: string;
    ctaLabel: string;
  };
  method: {
    label: string;
    title: string;
    intro: string;
    steps: AboutListItem[];
    imageAlt: string;
  };
  archive: {
    label: string;
    code: string;
    imageAlt: string;
  };
  proof: {
    label: string;
    intro: string;
    stats: AboutStat[];
    quote: string;
    quoteAuthor: string;
  };
  closing: {
    eyebrow: string;
    title: string;
    body: string;
    ctaPrimary: string;
    portfolioLink: string;
  };
}

/** Strings de UI propios de la vista "Contacto / Agenda" (Monumental Nocturno). */
export interface ContactUiContent {
  eyebrow: string;
  sectionLabel: string;
  directLinkLabel: string;
  nameLabel: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  projectTypeLabel: string;
  projectTypes: string[];
  dateLabel: string;
  datePlaceholder: string;
  locationFieldLabel: string;
  locationPlaceholder: string;
  storyLabel: string;
  storyPlaceholder: string;
  submitLabel: string;
  studioMeta: string;
  hoursLabel: string;
  hours: string;
  directEyebrow: string;
  mailSubjectPrefix: string;
}

/** Strings de UI propios de la vista 404 (Monumental Nocturno). */
export interface NotFoundUiContent {
  eyebrow: string;
  description: string;
  homeLabel: string;
  portfolioLabel: string;
}

export interface MarketingContent {
  brand: string;
  hero: HeroContent;
  about: AboutContent;
  gallery: GalleryItem[];
  services: ServiceItem[];
  portfolio: PortfolioItem[];
  testimonials: TestimonialItem[];
  contact: ContactContent;
  footer: FooterContent;
  detail: DetailUiContent;
  home: HomeUiContent;
  portfolioUi: PortfolioUiContent;
  servicesUi: ServicesUiContent;
  aboutUi: AboutUiContent;
  contactUi: ContactUiContent;
  notFound: NotFoundUiContent;
  // anchor:page-ui-types — los grupos de strings por vista se agregan encima de esta línea
}

export interface ContentProvider {
  getMarketingContent(locale?: Locale): Promise<MarketingContent>;
}
