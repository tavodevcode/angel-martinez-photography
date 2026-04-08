import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Instagram, Facebook, Linkedin } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#' },
  { name: 'About Us', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Contact', href: '#contact' },
];

const socialLinks = [
  { name: 'Instagram', href: '#', icon: Instagram },
  { name: 'Behance', href: '#', icon: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
    </svg>
  )},
  { name: 'Facebook', href: '#', icon: Facebook },
  { name: 'LinkedIn', href: '#', icon: Linkedin },
];

export default function Footer() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const titleScale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-black overflow-hidden"
    >
      {/* Background Image */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
        <img
          src="/images/cta-image.jpg"
          alt="Background"
          className="w-full h-full object-cover opacity-30"
        />
      </motion.div>

      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end min-h-[60vh]">
          {/* Left - Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3"
          >
            <h4 className="text-sm font-body text-white/50 uppercase tracking-wider mb-6">
              Navigation
            </h4>
            <nav className="space-y-3">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: 0.1 * (index + 2),
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="block text-lg font-body text-white/70 hover:text-white transition-colors duration-300 group"
                >
                  <span className="relative">
                    {link.name}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
                  </span>
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Center - CTA */}
          <motion.div
            style={{ scale: titleScale }}
            className="lg:col-span-6 flex flex-col items-center text-center"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm font-body text-white/50 mb-4"
            >
              Ready to create something extraordinary?
            </motion.p>

            <motion.h2
              initial={{ scale: 0.9, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[60px] sm:text-[80px] lg:text-[100px] leading-none mb-8"
            >
              Let's Talk
            </motion.h2>

            {/* CTA Image */}
            <motion.div
              initial={{ clipPath: 'circle(0%)' }}
              animate={isInView ? { clipPath: 'circle(100%)' } : {}}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden group cursor-pointer"
            >
              <motion.img
                src="/images/cta-image.jpg"
                alt="Contact"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-black/50 flex items-center justify-center"
              >
                <span className="text-sm font-body text-white">Start a Project</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right - Socials */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 lg:text-right"
          >
            <h4 className="text-sm font-body text-white/50 uppercase tracking-wider mb-6">
              Socials
            </h4>
            <nav className="space-y-3">
              {socialLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: 0.1 * (index + 2),
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="flex items-center lg:justify-end gap-3 text-lg font-body text-white/70 hover:text-white transition-colors duration-300 group"
                  >
                    <span className="relative">
                      {link.name}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
                    </span>
                    <Icon />
                  </motion.a>
                );
              })}
            </nav>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 1 }}
          className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm font-body text-white/40">
            © 2024 Möbiu Studio. All rights reserved.
          </p>
          <a
            href="#"
            className="text-sm font-body text-white/40 hover:text-white/70 transition-colors duration-300"
          >
            Privacy Policy
          </a>
        </motion.div>
      </div>
    </footer>
  );
}
