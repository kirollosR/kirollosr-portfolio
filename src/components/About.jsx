import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCode, FiMapPin, FiAward } from 'react-icons/fi';
import portfolioData from '../data/portfolioData';

const About = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const { personal, education } = portfolioData;

  return (
    <section id="about" className="py-20 sm:py-28 px-4">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Section Heading */}
        <motion.div
          className="section-heading text-xl sm:text-2xl mb-8 sm:mb-12"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="line-number">01</span>
          <span className="keyword">function</span>
          <span className="function-name">about</span>
          <span className="bracket">{'() {'}</span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* About Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-dot red" />
                <div className="terminal-dot yellow" />
                <div className="terminal-dot green" />
                <span className="terminal-title">about_me.sh</span>
              </div>
              <div className="terminal-body">
                <div className="mb-4">
                  <span className="terminal-prompt">$ </span>
                  <span className="terminal-command">cat about.md</span>
                </div>
                <p className="terminal-output leading-relaxed text-sm sm:text-base">
                  {personal.bio}
                </p>
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <FiMapPin className="text-primary flex-shrink-0" />
                    <span className="terminal-output text-sm">{personal.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiCode className="text-primary flex-shrink-0" />
                    <span className="terminal-output text-sm">{personal.title}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="font-mono text-primary text-sm mb-4">
              <span className="text-accent">const</span>{' '}
              <span className="text-secondary">education</span>{' '}
              <span className="text-[#8899a6]">=</span>{' '}
              <span className="text-primary">[</span>
            </h3>

            {education.map((edu, i) => (
              <motion.div
                key={i}
                className="glass rounded-lg p-4 sm:p-5"
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.2 }}
                whileHover={{ scale: 1.02, borderColor: 'rgba(237, 95, 30, 0.3)' }}
              >
                <div className="flex items-start gap-3">
                  <FiAward className="text-secondary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-medium text-sm sm:text-base">{edu.degree}</h4>
                    <p className="text-accent text-sm">{edu.school}</p>
                    <p className="text-[#8899a6] text-xs mt-1">{edu.period}</p>
                    <p className="text-[#94a3b8] text-xs mt-1">{edu.details}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            <p className="font-mono text-primary text-sm">
              <span className="text-primary">]</span>
              <span className="text-[#8899a6]">;</span>
            </p>
          </motion.div>
        </div>

        {/* Closing bracket */}
        <motion.div
          className="section-heading text-xl sm:text-2xl mt-8 sm:mt-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <span className="line-number" />
          <span className="bracket">{'}'}</span>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
