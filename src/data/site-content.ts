import type { Locale, MarketingContent, SocialLink } from '@/lib/content/types';

import ctaImage from '@/assets/images/cta-image.jpg';
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

const sharedSocials: SocialLink[] = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Behance', href: 'https://behance.net' },
  { label: 'Facebook', href: 'https://facebook.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
];

export const marketingContentByLocale: Record<Locale, MarketingContent> = {
  es: {
    brand: 'Angel Martinez Photography',
    hero: {
      eyebrow: 'Estudio fotografico',
      labelRight: 'Ciudad de Mexico — Desde 2016',
      title: 'Angel Martinez',
      description:
        'Fotografia editorial y comercial pensada para contar tu historia con una direccion visual clara.',
      image: heroEye,
      imageAlt: 'Escena editorial nocturna',
      ctaLabel: 'Agendar sesion',
      ctaHref: '/contact/',
      // Clip del hero en public/videos/ (loop corto optimizado). WebM primero
      // por compresión, MP4 como respaldo universal. Regenerar con `pnpm optimize:video`.
      // OJO: el clip actual es un placeholder — reemplázalo por metraje propio o licenciado.
      video: {
        webm: '/videos/hero.webm',
        mp4: '/videos/hero.mp4',
      },
    },
    about: {
      sectionLabel: 'Nosotros — 01',
      linkLabel: 'Conoce el estudio',
      title: 'Capturamos significado',
      paragraph:
        'No solo tomamos fotos: construimos imagenes con narrativa, estilo y enfoque comercial para marcas y espacios que quieren contar algo.',
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
        href: '/services/bodas/',
      },
      {
        title: 'Corporativo y eventos',
        description: 'Cobertura profesional para equipos, conferencias y momentos clave de marca.',
        image: serviceCorporate,
        href: '/services/corporativo/',
      },
      {
        title: 'Retrato profesional',
        description: 'Sesiones de retrato con direccion creativa para marca personal o editorial.',
        image: servicePortrait,
        href: '/services/retrato/',
      },
      {
        title: 'Fotografia de producto',
        description: 'Imagen comercial para e-commerce, catalogo y campañas de performance.',
        image: serviceProduct,
        href: '/services/producto/',
      },
      {
        title: 'Viaje y paisaje',
        description: 'Produccion visual en exteriores para piezas de storytelling y branding.',
        image: serviceTravel,
        href: '/services/viaje/',
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
    contact: {
      talkAlt: 'Hablemos',
      socials: sharedSocials,
      title: 'Hablemos',
      emailLabel: 'Email',
      phoneLabel: 'Telefono',
      locationLabel: 'Ubicacion',
      description:
        'Cuentanos tu objetivo creativo y armamos una propuesta de alcance, tiempos y entregables.',
      email: 'hola@angelmartinez.photo',
      phone: '+52 55 0000 0000',
      location: 'Ciudad de Mexico',
      frameImage: ctaImage,
      frameAlt: 'Fotografia editorial en estudio',
    },
    footer: {
      rights: 'Todos los derechos reservados.',
      privacyLabel: 'Aviso de privacidad',
    },
    detail: {
      backToPortfolio: 'Volver al portafolio',
      backToServices: 'Volver a servicios',
      packagesTitle: 'Paquetes',
    },
    home: {
      archiveLabel: 'Archivo — Seleccion 2024/2026',
      archiveLinkLabel: 'Ver todo el archivo',
      servicesLabel: 'Servicios',
      servicesIndexLabel: '(01 — 05)',
      workLabel: 'Trabajo seleccionado — 2020 / 2026',
      workTitle: 'Trabajo seleccionado',
    },
    portfolioUi: {
      eyebrowLeft: 'Álbumes por evento',
      eyebrowRight: 'Archivo 2023 — 2026 · CDMX',
      title: 'Portafolio',
      filters: ['Todos', 'Bodas', 'Editorial', 'Comercial', 'Eventos'],
      albumsCountLabel: 'Álbumes registrados',
      nextAlbumLabel: 'Siguiente álbum',
      dateKey: 'Fecha',
      categoryKey: 'Categoría',
      deliveryKey: 'Entrega',
      directionKey: 'Dirección',
      piecesUnit: 'Piezas',
    },
    servicesUi: {
      headerLabel: 'Qué hacemos',
      indexLabel: '(01 — 05)',
      title: 'Servicios',
      intro:
        'Cinco disciplinas, una misma dirección: fotografía con intención editorial y producción cuidada de principio a fin.',
      serviceMeta: [
        'SRV. 01 — 35MM · F/1.8 · ISO 200',
        'SRV. 02 — 24MM · F/4.0 · ISO 640',
        'SRV. 03 — 85MM · F/2.0 · ISO 100',
        'SRV. 04 — 50MM · F/8.0 · ISO 100',
        'SRV. 05 — 16MM · F/11 · ISO 64',
      ],
      processLabel: 'Proceso',
      processIndexLabel: '(Brief — Entrega)',
      processSteps: [
        { title: '01 · Brief', description: 'Conversamos objetivos, referencias y alcance del proyecto.' },
        { title: '02 · Dirección', description: 'Definimos concepto, locaciones y guion visual de la sesión.' },
        { title: '03 · Sesión', description: 'Producción y captura con dirección creativa en el set.' },
        { title: '04 · Entrega', description: 'Selección, retoque fino y entrega en galería digital.' },
      ],
      closingEyebrow: '¿Listo para crear?',
      closingTitle: 'Agendemos',
      detailPackagesTag: 'Paquetes 2026',
      detailStudioTag: 'Estudio / 2026',
      detailMetaLeft: 'CDMX · MTY · Destino',
      detailMetaRight: 'Galería editorial + archivo completo',
      packagesHeadline: 'Tres formas de contar la misma historia',
      packagesIntro:
        'Cada propuesta se ajusta al ritmo del proyecto. La dirección visual se mantiene constante para que el archivo final se sienta como una historia completa, no como una lista de momentos.',
      packagesNote: 'Precios base · Fechas limitadas',
      priceFromLabel: 'Desde',
      approachLabel: 'Enfoque',
      approachTitle: 'Dirección sin fricción',
      approachCopy:
        'Trabajamos con pocos proyectos por mes para cuidar la edición y la presencia en cada sesión. El proceso deja claros horarios, entregables y equipo antes de empezar.',
      detailClosingEyebrow: 'Agenda abierta / 2026',
      detailClosingTitle: 'Aseguremos tu fecha',
      detailClosingCopy:
        'Cuéntanos dónde y cuándo será tu proyecto. Si la fecha está libre, armamos una propuesta precisa para reservarla esta semana.',
    },
    aboutUi: {
      title: 'El estudio',
      sectionLabel: 'Nosotros — 02',
      portfolioLinkLabel: 'Ver portafolio',
      historia: {
        eyebrow: 'Historia del estudio — CDMX / 2016—2026',
        titleLines: ['Una noche,', 'una historia,', 'una direccion'],
        body: 'Angel Martinez Photography crecio mirando como una celebracion cambia cuando la luz, el ritmo y la confianza encuentran su sitio. Desde entonces el estudio trabaja cada encargo como una pieza editorial: precisa, nocturna y profundamente humana.',
        ctaLabel: 'Manifiesto del estudio',
        imageAlt: 'Campo fotografico nocturno',
      },
      blocks: [
        {
          index: '01 / Historia',
          title: 'El estudio nacio en el borde entre documento y cine',
          body: 'Empezamos fotografiando bodas y retratos con una obsesion simple: que la imagen conservara el pulso de la noche sin volverla espectaculo. Hoy cada proyecto se prepara con referencias, scouting de luz y una edicion que respeta la memoria real de quienes estuvieron ahi.',
          ctaLabel: 'Ver archivo',
          caption: 'Archivo / Luz / Edicion',
          imageAlt: 'Mesa de edicion del estudio',
        },
        {
          index: '02 / Equipo',
          title: 'Presencia discreta, direccion clara',
          body: 'El equipo se mueve como una unidad pequena: direccion creativa, segunda camara, asistencia de luz y edicion final bajo una misma mirada. La prioridad es acompanar sin interrumpir, resolver sin hacer ruido y sostener una atmosfera donde las personas sigan siendo ellas mismas.',
          ctaLabel: 'Conocer ritmo',
          caption: 'Direccion / Segunda camara',
          imageAlt: 'El equipo en movimiento discreto',
        },
        {
          index: '03 / Principios',
          title: 'Tres ideas antes de disparar',
          body: 'No buscamos llenar una galeria; buscamos construir una memoria que todavia respire anos despues. Por eso cada decision se filtra por intencion, presencia y una edicion que conserve la temperatura emocional del dia.',
          ctaLabel: '',
          caption: 'Atmosfera / Memoria / Forma',
          imageAlt: 'Paisaje atmosferico',
        },
      ],
      principles: [
        { num: '01', title: 'Luz con intencion', text: 'Leemos el espacio antes de intervenirlo y usamos la luz disponible como punto de partida.' },
        { num: '02', title: 'Presencia discreta', text: 'La camara acompana la escena sin pedirle a nadie que abandone lo que esta viviendo.' },
        { num: '03', title: 'Edicion con memoria', text: 'Color, contraste y secuencia se trabajan para que la noche conserve su verdad.' },
      ],
      closingEditorial: {
        eyebrow: 'Angel Martinez Photography — Estudio editorial',
        titleLines: ['Lo que permanece', 'es la atmosfera'],
        body: 'Si tu celebracion necesita una mirada que entienda la noche, el gesto y el silencio entre los momentos importantes, el estudio puede construir contigo una cobertura precisa desde la primera conversacion.',
        ctaLabel: 'Hablemos de tu historia',
      },
      method: {
        label: 'Metodo — 03',
        title: 'Direccion antes del disparo.',
        intro: 'Cada sesion empieza con intencion: referencias, locacion, ritmo, luz y edicion. Asi evitamos improvisar la identidad visual en el dia de la toma y convertimos cada entrega en una historia coherente.',
        steps: [
          { num: '01', title: 'Brief visual', text: 'Alineamos intencion, referencias y entregables.' },
          { num: '02', title: 'Direccion de toma', text: 'Ordenamos luz, gestos y composicion en sitio.' },
          { num: '03', title: 'Edicion narrativa', text: 'Construimos una secuencia con ritmo y memoria.' },
        ],
        imageAlt: 'Direccion de toma en el estudio',
      },
      archive: {
        label: 'Archivo del estudio — direccion en campo',
        code: 'AMP / 2026',
        imageAlt: 'Archivo del estudio en campo',
      },
      proof: {
        label: 'Prueba — 04',
        intro: 'El estudio trabaja para parejas, marcas y espacios que necesitan imagenes con intencion: no solo cobertura, tambien lenguaje visual.',
        stats: [
          { value: '12+', label: 'anos construyendo archivos visuales' },
          { value: '180+', label: 'eventos y proyectos documentados' },
          { value: '24 h', label: 'respuesta inicial para agenda' },
        ],
        quote: 'La camara llega al final. Primero esta la mirada, el ritmo y la decision de que vale la pena recordar.',
        quoteAuthor: 'Angel Martinez — Director creativo',
      },
      closing: {
        eyebrow: 'Trabajemos con intencion',
        title: 'Hagamos visible la historia',
        body: 'Si necesitas una cobertura con direccion, archivo y criterio editorial, empecemos por entender la historia que quieres conservar.',
        ctaPrimary: 'Agenda una llamada',
        portfolioLink: 'Ver portafolio',
      },
    },
    contactUi: {
      eyebrow: 'Contacto — CDMX · MTY',
      sectionLabel: 'Agenda — 05',
      directLinkLabel: 'Agenda directa',
      nameLabel: 'Nombre',
      namePlaceholder: '¿Cómo te llamas?',
      emailPlaceholder: 'hola@tucorreo.com',
      projectTypeLabel: 'Tipo de proyecto',
      projectTypes: ['Boda', 'Corporativo', 'Retrato', 'Producto', 'Paisaje'],
      dateLabel: 'Fecha tentativa',
      datePlaceholder: '06 / 09 / 2026',
      locationFieldLabel: 'Locación',
      locationPlaceholder: 'Valle de Bravo, MX',
      storyLabel: 'Tu historia',
      storyPlaceholder: 'Cuéntanos qué vamos a contar: el evento, la marca, la idea…',
      submitLabel: 'Enviar brief',
      studioMeta: 'EST. 01 — ESTUDIO ROMA NORTE',
      hoursLabel: 'Horario',
      hours: 'LUN–VIE · 10:00–19:00',
      directEyebrow: 'Escríbenos directo',
      mailSubjectPrefix: 'Brief de sesión',
    },
    notFound: {
      eyebrow: 'PL. 404 — Cuadro no encontrado',
      description: 'Este cuadro no existe o fue movido del archivo del estudio.',
      homeLabel: 'Volver al inicio',
      portfolioLabel: 'Ver portafolio',
    },
    // anchor:page-ui-content-es — los grupos de strings por vista se agregan encima de esta línea
  },
  en: {
    brand: 'Angel Martinez Photography',
    hero: {
      eyebrow: 'Photography Studio',
      labelRight: 'Mexico City — Since 2016',
      title: 'Angel Martinez',
      description:
        'Editorial and commercial photography crafted to tell your story with intentional visual direction.',
      image: heroEye,
      imageAlt: 'Editorial night scene',
      ctaLabel: 'Book a Session',
      ctaHref: '/en/contact/',
      // Mismo clip que la home en español (public/videos/, loop optimizado).
      video: {
        webm: '/videos/hero.webm',
        mp4: '/videos/hero.mp4',
      },
    },
    about: {
      sectionLabel: 'About — 01',
      linkLabel: 'Meet the studio',
      title: 'We Capture Meaning',
      paragraph:
        'We do not just take photos: we build images with narrative, style, and commercial focus for brands and spaces with a story to tell.',
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
        href: '/en/services/bodas/',
      },
      {
        title: 'Corporate & Events',
        description: 'Professional coverage for teams, events, and branded moments that matter.',
        image: serviceCorporate,
        href: '/en/services/corporativo/',
      },
      {
        title: 'Portrait Photography',
        description: 'Creative portrait sessions for personal branding, editorial, and campaigns.',
        image: servicePortrait,
        href: '/en/services/retrato/',
      },
      {
        title: 'Product Photography',
        description: 'Commercial imagery designed for e-commerce, catalogs, and paid campaigns.',
        image: serviceProduct,
        href: '/en/services/producto/',
      },
      {
        title: 'Travel & Landscape',
        description: 'On-location visual production for storytelling and brand narratives.',
        image: serviceTravel,
        href: '/en/services/viaje/',
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
    contact: {
      talkAlt: "Let's talk",
      socials: sharedSocials,
      title: "Let's Talk",
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      locationLabel: 'Location',
      description:
        'Share your project goals and we will craft a clear proposal with scope, timeline, and deliverables.',
      email: 'hola@angelmartinez.photo',
      phone: '+52 55 0000 0000',
      location: 'Mexico City',
      frameImage: ctaImage,
      frameAlt: 'Editorial studio portrait',
    },
    footer: {
      rights: 'All rights reserved.',
      privacyLabel: 'Privacy Policy',
    },
    detail: {
      backToPortfolio: 'Back to portfolio',
      backToServices: 'Back to services',
      packagesTitle: 'Packages',
    },
    home: {
      archiveLabel: 'Archive — Selection 2024/2026',
      archiveLinkLabel: 'View full archive',
      servicesLabel: 'Services',
      servicesIndexLabel: '(01 — 05)',
      workLabel: 'Selected work — 2020 / 2026',
      workTitle: 'Selected work',
    },
    portfolioUi: {
      eyebrowLeft: 'Albums by event',
      eyebrowRight: 'Archive 2023 — 2026 · CDMX',
      title: 'Portfolio',
      filters: ['All', 'Weddings', 'Editorial', 'Commercial', 'Events'],
      albumsCountLabel: 'Albums on record',
      nextAlbumLabel: 'Next album',
      dateKey: 'Date',
      categoryKey: 'Category',
      deliveryKey: 'Delivery',
      directionKey: 'Direction',
      piecesUnit: 'Pieces',
    },
    servicesUi: {
      headerLabel: 'What we do',
      indexLabel: '(01 — 05)',
      title: 'Services',
      intro:
        'Five disciplines, one direction: photography with editorial intent and careful production from start to finish.',
      serviceMeta: [
        'SRV. 01 — 35MM · F/1.8 · ISO 200',
        'SRV. 02 — 24MM · F/4.0 · ISO 640',
        'SRV. 03 — 85MM · F/2.0 · ISO 100',
        'SRV. 04 — 50MM · F/8.0 · ISO 100',
        'SRV. 05 — 16MM · F/11 · ISO 64',
      ],
      processLabel: 'Process',
      processIndexLabel: '(Brief — Delivery)',
      processSteps: [
        { title: '01 · Brief', description: 'We align on goals, references, and the scope of the project.' },
        { title: '02 · Direction', description: 'We define concept, locations, and the visual script for the session.' },
        { title: '03 · Session', description: 'Production and capture with creative direction on set.' },
        { title: '04 · Delivery', description: 'Curation, fine retouching, and delivery in a digital gallery.' },
      ],
      closingEyebrow: 'Ready to create?',
      closingTitle: "Let's book",
      detailPackagesTag: 'Packages 2026',
      detailStudioTag: 'Studio / 2026',
      detailMetaLeft: 'CDMX · MTY · Destination',
      detailMetaRight: 'Editorial gallery + full archive',
      packagesHeadline: 'Three ways to tell the same story',
      packagesIntro:
        'Each proposal adapts to the rhythm of the project. The visual direction stays constant so the final archive feels like a complete story, not a list of moments.',
      packagesNote: 'Base prices · Limited dates',
      priceFromLabel: 'From',
      approachLabel: 'Approach',
      approachTitle: 'Direction without friction',
      approachCopy:
        'We take on a few projects per month to protect the edit and our presence on set. The process makes schedules, deliverables, and gear clear before we start.',
      detailClosingEyebrow: 'Open calendar / 2026',
      detailClosingTitle: "Let's secure your date",
      detailClosingCopy:
        'Tell us where and when your project takes place. If the date is open, we will send a precise proposal to lock it in this week.',
    },
    aboutUi: {
      title: 'The studio',
      sectionLabel: 'About — 02',
      portfolioLinkLabel: 'View portfolio',
      historia: {
        eyebrow: 'Studio history — Mexico City / 2016—2026',
        titleLines: ['One night,', 'one story,', 'one direction'],
        body: 'Angel Martinez Photography grew from watching how a celebration changes when light, rhythm, and trust find their place. Since then the studio treats every commission as an editorial piece: precise, nocturnal, and deeply human.',
        ctaLabel: 'Studio manifesto',
        imageAlt: 'Nocturnal photographic field',
      },
      blocks: [
        {
          index: '01 / History',
          title: 'The studio was born on the edge of document and cinema',
          body: 'We started shooting weddings and portraits with one simple obsession: that the image should keep the pulse of the night without turning it into spectacle. Today every project is prepared with references, light scouting, and an edit that respects the real memory of those who were there.',
          ctaLabel: 'View archive',
          caption: 'Archive / Light / Edit',
          imageAlt: 'Studio editing desk',
        },
        {
          index: '02 / Team',
          title: 'Discreet presence, clear direction',
          body: 'The team moves as a small unit: creative direction, second camera, lighting assistance, and final edit under one gaze. The priority is to accompany without interrupting, resolve without noise, and hold an atmosphere where people stay themselves.',
          ctaLabel: 'Learn the rhythm',
          caption: 'Direction / Second camera',
          imageAlt: 'The team in discreet movement',
        },
        {
          index: '03 / Principles',
          title: 'Three ideas before the shutter',
          body: 'We are not trying to fill a gallery; we are trying to build a memory that still breathes years later. That is why every decision is filtered through intention, presence, and an edit that preserves the emotional temperature of the day.',
          ctaLabel: '',
          caption: 'Atmosphere / Memory / Form',
          imageAlt: 'Atmospheric landscape',
        },
      ],
      principles: [
        { num: '01', title: 'Light with intention', text: 'We read the space before intervening and use available light as a starting point.' },
        { num: '02', title: 'Discreet presence', text: 'The camera accompanies the scene without asking anyone to abandon what they are living.' },
        { num: '03', title: 'Editing with memory', text: 'Color, contrast, and sequence are worked so the night keeps its truth.' },
      ],
      closingEditorial: {
        eyebrow: 'Angel Martinez Photography — Editorial studio',
        titleLines: ['What remains', 'is the atmosphere'],
        body: 'If your celebration needs an eye that understands the night, the gesture, and the silence between important moments, the studio can build a precise coverage with you from the first conversation.',
        ctaLabel: "Let's talk about your story",
      },
      method: {
        label: 'Method — 03',
        title: 'Direction before the shutter.',
        intro: 'Every session begins with intention: references, location, rhythm, light, and edit. This keeps us from improvising the visual identity on shoot day and turns every delivery into a coherent story.',
        steps: [
          { num: '01', title: 'Visual brief', text: 'We align intention, references, and deliverables.' },
          { num: '02', title: 'Shoot direction', text: 'We order light, gesture, and composition on site.' },
          { num: '03', title: 'Narrative edit', text: 'We build a sequence with rhythm and memory.' },
        ],
        imageAlt: 'Shoot direction at the studio',
      },
      archive: {
        label: 'Studio archive — direction in the field',
        code: 'AMP / 2026',
        imageAlt: 'Studio archive in the field',
      },
      proof: {
        label: 'Proof — 04',
        intro: 'The studio works for couples, brands, and spaces that need images with intention: not just coverage, but visual language.',
        stats: [
          { value: '12+', label: 'years building visual archives' },
          { value: '180+', label: 'events and projects documented' },
          { value: '24 h', label: 'initial response for booking' },
        ],
        quote: 'The camera comes last. First comes the gaze, the rhythm, and the decision of what is worth remembering.',
        quoteAuthor: 'Angel Martinez — Creative director',
      },
      closing: {
        eyebrow: 'Let us work with intention',
        title: 'Let us make the story visible',
        body: 'If you need coverage with direction, archive, and editorial judgment, let us start by understanding the story you want to keep.',
        ctaPrimary: 'Book a call',
        portfolioLink: 'View portfolio',
      },
    },
    contactUi: {
      eyebrow: 'Contact — CDMX · MTY',
      sectionLabel: 'Booking — 05',
      directLinkLabel: 'Direct booking',
      nameLabel: 'Name',
      namePlaceholder: 'What is your name?',
      emailPlaceholder: 'hello@yourmail.com',
      projectTypeLabel: 'Project type',
      projectTypes: ['Wedding', 'Corporate', 'Portrait', 'Product', 'Landscape'],
      dateLabel: 'Tentative date',
      datePlaceholder: '09 / 06 / 2026',
      locationFieldLabel: 'Location',
      locationPlaceholder: 'Valle de Bravo, MX',
      storyLabel: 'Your story',
      storyPlaceholder: 'Tell us the story to capture: the event, the brand, the idea…',
      submitLabel: 'Send brief',
      studioMeta: 'EST. 01 — ROMA NORTE STUDIO',
      hoursLabel: 'Hours',
      hours: 'MON–FRI · 10:00–19:00',
      directEyebrow: 'Write to us directly',
      mailSubjectPrefix: 'Session brief',
    },
    notFound: {
      eyebrow: 'PL. 404 — Frame not found',
      description: 'This frame does not exist or was moved from the studio archive.',
      homeLabel: 'Back to home',
      portfolioLabel: 'View portfolio',
    },
    // anchor:page-ui-content-en — los grupos de strings por vista se agregan encima de esta línea
  },
};
