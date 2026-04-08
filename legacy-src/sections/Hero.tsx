import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const titleY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.15]);
  const imageY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const letterSpacing = useTransform(scrollYProgress, [0.3, 0.8], [0, 20]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Main Content */}
      <div className="relative z-10 w-full px-6 lg:px-12 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end min-h-[80vh]">
          {/* Left - Scroll Indicator */}
          <motion.div
            style={{ opacity: scrollIndicatorOpacity }}
            className="hidden lg:flex lg:col-span-2 items-end pb-12"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 -rotate-90 origin-left"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center"
              >
                <ArrowDown className="w-4 h-4 rotate-90" />
              </motion.div>
              <span className="text-sm font-body text-white/70 tracking-wide">
                scroll down
              </span>
            </motion.div>
          </motion.div>

          {/* Center - Main Title with Eye Image */}
          <motion.div
            style={{ y: titleY }}
            className="lg:col-span-6 flex flex-col items-center lg:items-start"
          >
            <div className="relative">
              {/* Title with masked image */}
              <motion.h1
                style={{ letterSpacing }}
                className="font-display text-[80px] sm:text-[100px] md:text-[120px] lg:text-[140px] leading-none tracking-tight flex items-center"
              >
                {/* M */}
                <motion.span
                  initial={{ clipPath: 'inset(0 100% 0 0)' }}
                  animate={{ clipPath: 'inset(0 0% 0 0)' }}
                  transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  M
                </motion.span>

                {/* ö with eye image */}
                <motion.span
                  initial={{ scale: 0.5, opacity: 0, filter: 'blur(20px)' }}
                  animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 0.8, delay: 0.6, ease: [0.175, 0.885, 0.32, 1.275] }}
                  className="relative inline-block mx-1"
                >
                  <span className="relative z-10">ö</span>
                  <motion.div
                    initial={{ clipPath: 'circle(0%)' }}
                    animate={{ clipPath: 'circle(100%)' }}
                    transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ scale: imageScale, y: imageY }}
                    className="absolute inset-0 flex items-center justify-center overflow-hidden"
                  >
                    <div className="w-[0.6em] h-[0.6em] rounded-full overflow-hidden">
                      <img
                        src="/images/hero-eye.jpg"
                        alt="Eye"
                        className="w-full h-full object-cover animate-pulse-slow"
                        style={{ animationDuration: '6s' }}
                      />
                    </div>
                  </motion.div>
                </motion.span>

                {/* b */}
                <motion.span
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                  b
                </motion.span>

                {/* i */}
                <motion.span
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.6, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: 'bottom' }}
                >
                  i
                </motion.span>

                {/* u */}
                <motion.span
                  initial={{ x: '100%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  u
                </motion.span>
              </motion.h1>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 text-lg font-body text-white/50 tracking-wide"
            >
              Photography Studio
            </motion.p>
          </motion.div>

          {/* Right - Description */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 flex flex-col items-start lg:items-end pb-8"
          >
            <div className="max-w-sm lg:text-right space-y-4">
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg font-display italic text-white/90"
              >
                Where creativity meets precision.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm font-body text-white/60 leading-relaxed"
              >
                Discover the artistry of professional photography tailored to your story.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile Scroll Indicator */}
      <motion.div
        style={{ opacity: scrollIndicatorOpacity }}
        className="lg:hidden absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center"
        >
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
