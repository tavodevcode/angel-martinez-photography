import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';

const services = [
  {
    title: 'Wedding Photography',
    image: '/images/service-wedding.jpg',
    description: 'Capturing the magic of your special day with timeless elegance.',
  },
  {
    title: 'Corporate & Events',
    image: '/images/service-corporate.jpg',
    description: 'Professional coverage for your business moments and celebrations.',
  },
  {
    title: 'Portrait Photography',
    image: '/images/service-portrait.jpg',
    description: 'Reveal your authentic self through artistic portraiture.',
  },
  {
    title: 'Product Photography',
    image: '/images/service-product.jpg',
    description: 'Showcase your products with stunning commercial imagery.',
  },
  {
    title: 'Travel & Landscape',
    image: '/images/service-travel.jpg',
    description: 'Documenting the beauty of the world, one frame at a time.',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-black overflow-hidden"
    >
      {/* Label */}
      <div className="w-full px-6 lg:px-12 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2"
        >
          <Star className="w-4 h-4 text-white/70" />
          <span className="text-sm font-body text-white/70 tracking-wider uppercase">
            Services
          </span>
        </motion.div>
      </div>

      {/* Horizontal Scroll Container */}
      <div ref={containerRef} className="h-[150vh]">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <motion.div
            style={{ x }}
            className="flex gap-6 lg:gap-8 px-6 lg:px-12"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, x: 100 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 1,
                  delay: 0.2 * index,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative flex-shrink-0 w-[80vw] md:w-[50vw] lg:w-[40vw] h-[70vh] group cursor-pointer"
                style={{ perspective: '1500px' }}
              >
                <motion.div
                  animate={{
                    rotateY: hoveredIndex === index ? 0 : hoveredIndex !== null ? -15 : 0,
                    scale: hoveredIndex === index ? 1 : hoveredIndex !== null ? 0.95 : 1,
                  }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full rounded-2xl overflow-hidden"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Image */}
                  <motion.img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: hoveredIndex === index ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                    <motion.h3
                      animate={{
                        letterSpacing: hoveredIndex === index ? '2px' : '0px',
                      }}
                      transition={{ duration: 0.4 }}
                      className="font-display text-3xl lg:text-4xl mb-3"
                    >
                      {service.title}
                    </motion.h3>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: hoveredIndex === index ? 1 : 0,
                        y: hoveredIndex === index ? 0 : 20,
                      }}
                      transition={{ duration: 0.4 }}
                      className="text-sm font-body text-white/70 mb-4"
                    >
                      {service.description}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{
                        opacity: hoveredIndex === index ? 1 : 0,
                        x: hoveredIndex === index ? 0 : -20,
                      }}
                      transition={{ duration: 0.4 }}
                      className="flex items-center gap-2 text-white/90"
                    >
                      <span className="text-sm font-body">Learn More</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="w-full px-6 lg:px-12 mt-8">
        <div className="h-px bg-white/10 overflow-hidden">
          <motion.div
            style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
            className="h-full bg-white/50"
          />
        </div>
      </div>
    </section>
  );
}
