import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import portfolioData from '../data/portfolioData';
import logoSvg from '../assets/logo_red.svg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Terminal prompt */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 font-mono text-sm cursor-pointer bg-transparent border-none"
            whileHover={{ scale: 1.05 }}
          >
            <img src={logoSvg} alt="KR" className="w-7 h-7" />
            <span className="text-secondary">kirollos</span>
            <span className="text-accent">$</span>
            <span className="terminal-cursor" />
          </motion.button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {portfolioData.navLinks.map((link, i) => (
              <motion.button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="px-3 py-2 text-sm font-mono text-[#8899a6] hover:text-primary transition-colors rounded-md hover:bg-azure/20 cursor-pointer bg-transparent border-none"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <span className="text-accent">{'{'}</span>
                {' '}{link.label}{' '}
                <span className="text-accent">{'}'}</span>
              </motion.button>
            ))}
            <motion.a
              href={portfolioData.personal.resumeFile}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-4 py-2 text-sm font-mono bg-primary/10 text-primary border border-primary/30 rounded-md hover:bg-primary/20 transition-all no-underline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              resume.pdf
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#8899a6] hover:text-primary transition-colors bg-transparent border-none cursor-pointer p-2"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {portfolioData.navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="block w-full text-left px-3 py-2 font-mono text-sm text-[#8899a6] hover:text-primary transition-colors rounded-md hover:bg-azure/20 bg-transparent border-none cursor-pointer"
                >
                  <span className="text-primary">{'>'}</span> {link.label}
                </button>
              ))}
              <a
                href={portfolioData.personal.resumeFile}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 font-mono text-sm text-primary no-underline"
              >
                {'>'} download resume.pdf
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
