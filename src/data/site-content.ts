import type { MarketingContent } from '@/lib/content/types';

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

export const marketingContent: MarketingContent = {
  brand: 'Angel Martínez Photography',
  nav: [
    { label: 'Inicio', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Contact', href: '/contact' },
  ],
  hero: {
    eyebrow: 'Photography Studio',
    title: 'Ángel',
    subtitle: 'Where creativity meets precision.',
    description:
      'Discover the artistry of professional photography tailored to your story.',
    image: heroEye,
    ctaLabel: 'Book a Session',
    ctaHref: '/contact',
  },
  about: {
    title: 'We Capture Meaning',
    paragraph:
      "At Angel Martínez Photography, photography is more than capturing images. It's about creating timeless art that reflects your unique story.",
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
      description: 'Capturing the magic of your special day with timeless elegance.',
      image: serviceWedding,
    },
    {
      title: 'Corporate & Events',
      description: 'Professional coverage for your business moments and celebrations.',
      image: serviceCorporate,
    },
    {
      title: 'Portrait Photography',
      description: 'Reveal your authentic self through artistic portraiture.',
      image: servicePortrait,
    },
    {
      title: 'Product Photography',
      description: 'Showcase your products with stunning commercial imagery.',
      image: serviceProduct,
    },
    {
      title: 'Travel & Landscape',
      description: 'Documenting the beauty of the world, one frame at a time.',
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
      quote: 'El resultado final elevó por completo nuestra marca personal.',
      author: 'Mariana López',
      role: 'Founder, Casa Marea',
    },
    {
      quote: 'Trabajar con Angel fue como tener un director creativo + fotógrafo en una sola persona.',
      author: 'Diego Santos',
      role: 'Marketing Lead, Brío Studio',
    },
    {
      quote: 'La sesión fue impecable y las entregas listas para campaña en tiempo récord.',
      author: 'Paula Herrera',
      role: 'Brand Manager, Onda Co.',
    },
  ],
  brands: ['Adobe', 'Sony', 'Zara', 'Nike', 'H&M', 'Tiffany & Co', 'Rolex', 'Airbnb', 'Adidas'],
  contact: {
    title: "Let's Talk",
    description:
      'Ready to create something extraordinary? Start your next photo project with us.',
    email: 'hola@angelmartinez.photo',
    phone: '+52 55 0000 0000',
    location: 'Ciudad de México',
  },
};
