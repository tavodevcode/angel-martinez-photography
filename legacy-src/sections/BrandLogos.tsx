import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const brands = [
  'Adobe',
  'Sony',
  'Zara',
  'Nike',
  'H&M',
  'Tiffany & Co',
  'Rolex',
  'Airbnb',
  'Adidas',
];

export default function BrandLogos() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

  // Duplicate brands for seamless loop
  const duplicatedBrands = [...brands, ...brands];
  const duplicatedBrandsReverse = [...brands.reverse(), ...brands];

  return (
    <section
      ref={sectionRef}
      className="relative py-16 lg:py-24 bg-black overflow-hidden"
    >
      <div className="space-y-8">
        {/* Row 1 - Left to Right */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="flex animate-marquee hover:[animation-play-state:paused]">
            {duplicatedBrands.map((brand, index) => (
              <div
                key={`row1-${index}`}
                className="flex-shrink-0 px-8 lg:px-12 group cursor-default"
              >
                <span className="font-display text-3xl lg:text-5xl text-white/40 group-hover:text-white group-hover:scale-110 transition-all duration-300 inline-block">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Row 2 - Right to Left (Semi-transparent) */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 0.4, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="flex animate-marquee-reverse hover:[animation-play-state:paused]">
            {duplicatedBrandsReverse.map((brand, index) => (
              <div
                key={`row2-${index}`}
                className="flex-shrink-0 px-8 lg:px-12 group cursor-default"
              >
                <span className="font-display text-3xl lg:text-5xl text-white/20 group-hover:text-white/60 group-hover:scale-110 transition-all duration-300 inline-block">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
    </section>
  );
}
