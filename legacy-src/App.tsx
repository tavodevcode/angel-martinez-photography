import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Gallery from './sections/Gallery';
import BrandLogos from './sections/BrandLogos';
import Services from './sections/Services';
import Portfolio from './sections/Portfolio';
import Footer from './sections/Footer';

function App() {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="min-h-screen bg-black text-white overflow-x-hidden"
      >
        <Navbar />
        <main>
          <Hero />
          <About />
          <Gallery />
          <BrandLogos />
          <Services />
          <Portfolio />
        </main>
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
