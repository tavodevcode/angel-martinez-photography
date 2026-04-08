import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Star } from 'lucide-react';

const portfolioItems = [
  {
    title: 'Crimson Garden',
    image: '/images/portfolio-1.jpg',
    category: 'Fine Art',
  },
  {
    title: 'Urban Solitude',
    image: '/images/portfolio-2.jpg',
    category: 'Street',
  },
  {
    title: 'Golden Hour',
    image: '/images/portfolio-3.jpg',
    category: 'Portrait',
  },
  {
    title: 'Silent Echo',
    image: '/images/portfolio-4.jpg',
    category: 'Minimalist',
  },
  {
    title: 'Ethereal Dreams',
    image: '/images/portfolio-5.jpg',
    category: 'Fine Art',
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Different parallax speeds for each column
  const parallaxValues = [
    useTransform(scrollYProgress, [0, 1], [20, -20]),
    useTransform(scrollYProgress, [0, 1], [40, -40]),
    useTransform(scrollYProgress, [0, 1], [30, -30]),
    useTransform(scrollYProgress, [0, 1], [25, -25]),
    useTransform(scrollYProgress, [0, 1], [35, -35]),
  ];

  // Subtle rotation for each item
  const rotations = [-2, 1, -1, 2, -1.5];

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-black overflow-hidden"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2"
          >
            <Star className="w-4 h-4 text-white/70" />
            <span className="text-sm font-body text-white/70 tracking-wider uppercase">
              Portfolio
            </span>
          </motion.div>

          {/* Pagination Dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.8 }}
            className="flex items-center gap-2"
          >
            {portfolioItems.map((_, index) => (
              <motion.div
                key={index}
                animate={{
                  scale: hoveredIndex === index ? 1.5 : 1,
                  backgroundColor: hoveredIndex === index ? 'rgba(255,255,255,1)' : 'transparent',
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className="w-2 h-2 rounded-full border border-white/50"
              />
            ))}
          </motion.div>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {portfolioItems.map((item, index) => {
            const isTall = index === 1;
            
            return (
              <motion.div
                key={item.title}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.1 * (index + 1),
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  y: parallaxValues[index],
                  rotate: useTransform(scrollYProgress, [0, 1], [rotations[index], 0]),
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative overflow-hidden rounded-lg group cursor-pointer ${
                  isTall ? 'row-span-2' : 'row-span-1'
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full min-h-[300px] lg:min-h-[400px]"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                    <span className="text-xs font-body text-white/60 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <h3 className="font-display text-xl lg:text-2xl mt-1">
                      {item.title}
                    </h3>
                  </div>
                </motion.div>

                {/* Dim other items on hover */}
                {hoveredIndex !== null && hoveredIndex !== index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    className="absolute inset-0 bg-black pointer-events-none"
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
