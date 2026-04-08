import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Star } from 'lucide-react';

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const image1Y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const image1Rotate = useTransform(scrollYProgress, [0, 1], [-5, -8]);
  const image2Y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const image2Rotate = useTransform(scrollYProgress, [0, 1], [3, 6]);
  const headingScale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);

  const words = ['We', 'Capture', 'Meaning'];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen py-24 lg:py-32 bg-black overflow-hidden"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 mb-12"
        >
          <Star className="w-4 h-4 text-white/70" />
          <span className="text-sm font-body text-white/70 tracking-wider uppercase">
            About Us
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left - Heading */}
          <motion.div style={{ scale: headingScale }} className="space-y-8">
            <h2 className="font-display text-[48px] sm:text-[60px] md:text-[80px] leading-none">
              {words.map((word, index) => (
                <motion.span
                  key={word}
                  initial={{ y: 60, opacity: 0, rotateX: 45 }}
                  animate={isInView ? { y: 0, opacity: 1, rotateX: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.1 * (index + 1),
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block mr-[0.3em]"
                  style={{ transformOrigin: 'bottom' }}
                >
                  {word}
                </motion.span>
              ))}
            </h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="text-base font-body text-white/60 leading-relaxed max-w-lg"
            >
              At Möbiu, photography is more than capturing images—it's about creating
              timeless art that reflects your unique story. With over a decade of experience,
              we specialize in turning fleeting moments into lifelong memories. Our passion
              lies in every frame, and our mission is simple: to bring your vision to life.
            </motion.p>
          </motion.div>

          {/* Right - Images */}
          <div className="relative h-[500px] lg:h-[600px]" style={{ perspective: '1000px' }}>
            {/* Image 1 */}
            <motion.div
              initial={{ rotateY: -90, opacity: 0 }}
              animate={isInView ? { rotateY: -5, opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ y: image1Y, rotate: image1Rotate }}
              className="absolute top-0 left-0 w-[60%] lg:w-[55%] z-10 group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:z-20">
                <img
                  src="/images/about-1.jpg"
                  alt="Artistic portrait"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              </div>
            </motion.div>

            {/* Image 2 */}
            <motion.div
              initial={{ rotateY: 90, opacity: 0 }}
              animate={isInView ? { rotateY: 3, opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ y: image2Y, rotate: image2Rotate }}
              className="absolute top-20 right-0 w-[60%] lg:w-[55%] z-20 group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:z-30">
                <img
                  src="/images/about-2.jpg"
                  alt="Cinematic portrait"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
