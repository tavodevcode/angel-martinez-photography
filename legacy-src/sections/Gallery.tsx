import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const galleryImages = [
  { src: '/images/gallery-1.jpg', alt: 'Editorial fashion portrait', span: 'row-span-1' },
  { src: '/images/gallery-2.jpg', alt: 'Artistic portrait', span: 'row-span-2' },
  { src: '/images/gallery-3.jpg', alt: 'Natural light portrait', span: 'row-span-1' },
  { src: '/images/gallery-4.jpg', alt: 'Black and white portrait', span: 'row-span-1' },
  { src: '/images/gallery-5.jpg', alt: 'Environmental portrait', span: 'row-span-1' },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const parallaxValues = [
    useTransform(scrollYProgress, [0, 1], [30, -30]),
    useTransform(scrollYProgress, [0, 1], [50, -50]),
    useTransform(scrollYProgress, [0, 1], [20, -20]),
    useTransform(scrollYProgress, [0, 1], [40, -40]),
    useTransform(scrollYProgress, [0, 1], [25, -25]),
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-black overflow-hidden"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6 auto-rows-[200px] md:auto-rows-[250px]">
          {galleryImages.map((image, index) => {
            const isCenter = index === 1;
            const isLeft = index === 0 || index === 2;
            
            return (
              <motion.div
                key={image.src}
                initial={{
                  x: isLeft ? -100 : 100,
                  clipPath: isLeft
                    ? 'inset(0 100% 0 0)'
                    : 'inset(0 0 0 100%)',
                }}
                animate={
                  isInView
                    ? {
                        x: 0,
                        clipPath: 'inset(0 0% 0 0%)',
                      }
                    : {}
                }
                transition={{
                  duration: 1,
                  delay: index * 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ y: parallaxValues[index] }}
                className={`relative overflow-hidden rounded-lg group cursor-pointer ${
                  image.span
                } ${isCenter ? 'md:col-span-1' : ''}`}
              >
                <motion.div
                  className="w-full h-full"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-110"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  
                  {/* View Indicator */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/30">
                      <span className="text-sm font-body text-white">View</span>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
