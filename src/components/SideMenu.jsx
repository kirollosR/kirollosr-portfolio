import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiHome, FiUser, FiCode, FiBriefcase, FiFolder, FiMail,
} from 'react-icons/fi';

const sections = [
  { id: 'top', icon: FiHome, label: 'Home' },
  { id: 'about', icon: FiUser, label: 'About' },
  { id: 'skills', icon: FiCode, label: 'Skills' },
  { id: 'experience', icon: FiBriefcase, label: 'Experience' },
  { id: 'projects', icon: FiFolder, label: 'Projects' },
  { id: 'contact', icon: FiMail, label: 'Contact' },
];

const SideMenu = () => {
  const [hoveredId, setHoveredId] = useState(null);

  const scrollTo = (id) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="side-menu">
      {sections.map(({ id, icon: Icon, label }) => (
        <div key={id} className="relative">
          <motion.button
            className="side-menu-item"
            onClick={() => scrollTo(id)}
            onMouseEnter={() => setHoveredId(id)}
            onMouseLeave={() => setHoveredId(null)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={label}
          >
            <Icon size={18} />
          </motion.button>

          {/* Tooltip */}
          <AnimatePresence>
            {hoveredId === id && (
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 rounded bg-dark-secondary border border-azure text-xs font-mono whitespace-nowrap text-[#8899a6] hidden md:block"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default SideMenu;
