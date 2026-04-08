import type { Locale, MarketingContent } from '@/lib/content/types';

import about1 from '@/assets/images/about-1.jpg';
import about2 from '@/assets/images/about-2.jpg';
import gallery1 from '@/assets/images/gallery-1.jpg';
import gallery2 from '@/assets/images/gallery-2.jpg';
import gallery3 from '@/assets/images/gallery-3.jpg';
import gallery4 from '@/assets/images/gallery-4.jpg';
import gallery5 from '@/assets/images/gallery-5.jpg';
import heroEye from '@/assets/images/hero-eye.jpg';
import portfolio1 from '@/assets/images/portfolio-1.jpg';
import portfolio2 from '@/assets/images/portfolio-2.jpg';
import portfolio3 from '@/assets/images/portfolio-3.jpg';
import portfolio4 from '@/assets/images/portfolio-4.jpg';
import portfolio5 from '@/assets/images/portfolio-5.jpg';
import serviceCorporate from '@/assets/images/service-corporate.jpg';
import servicePortrait from '@/assets/images/service-portrait.jpg';
import serviceProduct from '@/assets/images/service-product.jpg';
import serviceTravel from '@/assets/images/service-travel.jpg';
import serviceWedding from '@/assets/images/service-wedding.jpg';

const sharedBrands = ['Adobe', 'Sony', 'Zara', 'Nike', 'H&M', 'Tiffany & Co', 'Rolex', 'Airbnb', 'Adidas'];

export const marketingContentByLocale: Record<Locale, MarketingContent> = {
  es: {
    brand: 'Angel Martinez Photography',
    nav: [
      { label: 'Inicio', href: '/' },
      { label: 'Nosotros', href: '/about/' },
      { label: 'Servicios', href: '/services/' },
      { label: 'Portafolio', href: '/portfolio/' },
      { label: 'Contacto', href: '/contact/' },
    ],
    hero: {
      eyebrow: 'Estudio fotografico',
      title: 'Angel',
      subtitle: 'Creatividad y precision en cada toma.',
      description:
        'Fotografia editorial y comercial pensada para contar tu historia con una direccion visual clara.',
      image: heroEye,
      ctaLabel: 'Agendar sesion',
      ctaHref: '/contact/',
    },
    about: {
      title: 'Capturamos significado',
      paragraph:
        'En Angel Martinez Photography no solo tomamos fotos: construimos imagenes con narrativa, estilo y enfoque comercial.',
      imageA: about1,
      imageB: about2,
    },
    gallery: [
      { title: 'Retrato editorial', alt: 'Retrato editorial', image: gallery1 },
      { title: 'Luz natural', alt: 'Retrato en luz natural', image: gallery2 },
      { title: 'Contraste de estudio', alt: 'Retrato con contraste de estudio', image: gallery3 },
      { title: 'Mood monocromatico', alt: 'Retrato monocromatico', image: gallery4 },
      { title: 'Escena lifestyle', alt: 'Escena lifestyle', image: gallery5 },
    ],
    services: [
      {
        title: 'Fotografia de bodas',
        description: 'Capturamos tu dia especial con narrativa visual elegante y atemporal.',
        image: serviceWedding,
      },
      {
        title: 'Corporativo y eventos',
        description: 'Cobertura profesional para equipos, conferencias y momentos clave de marca.',
        image: serviceCorporate,
      },
      {
        title: 'Retrato profesional',
        description: 'Sesiones de retrato con direccion creativa para marca personal o editorial.',
        image: servicePortrait,
      },
      {
        title: 'Fotografia de producto',
        description: 'Imagen comercial para e-commerce, catalogo y campañas de performance.',
        image: serviceProduct,
      },
      {
        title: 'Viaje y paisaje',
        description: 'Produccion visual en exteriores para piezas de storytelling y branding.',
        image: serviceTravel,
      },
    ],
    portfolio: [
      { title: 'Jardin carmesi', category: 'Fine Art', image: portfolio1 },
      { title: 'Soledad urbana', category: 'Street', image: portfolio2 },
      { title: 'Hora dorada', category: 'Retrato', image: portfolio3 },
      { title: 'Eco silencioso', category: 'Minimal', image: portfolio4 },
      { title: 'Suenos etereos', category: 'Fine Art', image: portfolio5 },
    ],
    testimonials: [
      {
        quote: 'El resultado final elevo por completo nuestra marca personal.',
        author: 'Mariana Lopez',
        role: 'Founder, Casa Marea',
      },
      {
        quote: 'Trabajar con Angel fue como tener director creativo y fotografo en una sola persona.',
        author: 'Diego Santos',
        role: 'Marketing Lead, Brio Studio',
      },
      {
        quote: 'La sesion fue impecable y las entregas llegaron listas para lanzar campana.',
        author: 'Paula Herrera',
        role: 'Brand Manager, Onda Co.',
      },
    ],
    brands: sharedBrands,
    contact: {
      title: 'Hablemos',
      description:
        'Cuentanos tu objetivo creativo y armamos una propuesta de alcance, tiempos y entregables.',
      email: 'hola@angelmartinez.photo',
      phone: '+52 55 0000 0000',
      location: 'Ciudad de Mexico',
    },
  },
  en: {
    brand: 'Angel Martinez Photography',
    nav: [
      { label: 'Home', href: '/en/' },
      { label: 'About', href: '/en/about/' },
      { label: 'Services', href: '/en/services/' },
      { label: 'Portfolio', href: '/en/portfolio/' },
      { label: 'Contact', href: '/en/contact/' },
    ],
    hero: {
      eyebrow: 'Photography Studio',
      title: 'Angel',
      subtitle: 'Where creativity meets precision.',
      description:
        'Editorial and commercial photography crafted to tell your story with intentional visual direction.',
      image: heroEye,
      ctaLabel: 'Book a Session',
      ctaHref: '/en/contact/',
    },
    about: {
      title: 'We Capture Meaning',
      paragraph:
        'At Angel Martinez Photography, we create photographs with narrative depth, visual consistency, and commercial impact.',
      imageA: about1,
      imageB: about2,
    },
    gallery: [
      { title: 'Editorial Portrait', alt: 'Editorial portrait', image: gallery1 },
      { title: 'Natural Light', alt: 'Natural light portrait', image: gallery2 },
      { title: 'Studio Contrast', alt: 'Studio contrast portrait', image: gallery3 },
      { title: 'Monochrome Mood', alt: 'Monochrome portrait', image: gallery4 },
      { title: 'Lifestyle Scene', alt: 'Lifestyle portrait scene', image: gallery5 },
    ],
    services: [
      {
        title: 'Wedding Photography',
        description: 'Capturing your day with timeless elegance and emotional storytelling.',
        image: serviceWedding,
      },
      {
        title: 'Corporate & Events',
        description: 'Professional coverage for teams, events, and branded moments that matter.',
        image: serviceCorporate,
      },
      {
        title: 'Portrait Photography',
        description: 'Creative portrait sessions for personal branding, editorial, and campaigns.',
        image: servicePortrait,
      },
      {
        title: 'Product Photography',
        description: 'Commercial imagery designed for e-commerce, catalogs, and paid campaigns.',
        image: serviceProduct,
      },
      {
        title: 'Travel & Landscape',
        description: 'On-location visual production for storytelling and brand narratives.',
        image: serviceTravel,
      },
    ],
    portfolio: [
      { title: 'Crimson Garden', category: 'Fine Art', image: portfolio1 },
      { title: 'Urban Solitude', category: 'Street', image: portfolio2 },
      { title: 'Golden Hour', category: 'Portrait', image: portfolio3 },
      { title: 'Silent Echo', category: 'Minimal', image: portfolio4 },
      { title: 'Ethereal Dreams', category: 'Fine Art', image: portfolio5 },
    ],
    testimonials: [
      {
        quote: 'The final result elevated our personal brand instantly.',
        author: 'Mariana Lopez',
        role: 'Founder, Casa Marea',
      },
      {
        quote: 'Working with Angel felt like having a creative director and photographer in one person.',
        author: 'Diego Santos',
        role: 'Marketing Lead, Brio Studio',
      },
      {
        quote: 'The session was smooth and we received campaign-ready assets in record time.',
        author: 'Paula Herrera',
        role: 'Brand Manager, Onda Co.',
      },
    ],
    brands: sharedBrands,
    contact: {
      title: "Let's Talk",
      description:
        'Share your project goals and we will craft a clear proposal with scope, timeline, and deliverables.',
      email: 'hola@angelmartinez.photo',
      phone: '+52 55 0000 0000',
      location: 'Mexico City',
    },
  },
};
