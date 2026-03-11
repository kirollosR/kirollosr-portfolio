import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiBriefcase, FiCalendar, FiChevronRight } from 'react-icons/fi';
import portfolioData from '../data/portfolioData';

const Experience = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const { experience } = portfolioData;

  return (
    <section id="experience" className="py-20 sm:py-28 px-4">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Section Heading */}
        <motion.div
          className="section-heading text-xl sm:text-2xl mb-8 sm:mb-12"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="line-number">03</span>
          <span className="keyword">function</span>
          <span className="function-name">experience</span>
          <span className="bracket">{'() {'}</span>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-px bg-azure" />

          {experience.map((exp, i) => (
            <motion.div
              key={i}
              className="relative pl-12 sm:pl-20 mb-10 sm:mb-12"
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.2 }}
            >
              {/* Timeline dot */}
              <motion.div
                className="absolute left-2 sm:left-6 top-1 w-5 h-5 rounded-full bg-dark border-2 border-primary flex items-center justify-center"
                whileHover={{ scale: 1.3 }}
              >
                <div className="w-2 h-2 rounded-full bg-primary" />
              </motion.div>

              {/* Card */}
              <motion.div
                className="terminal-window"
                whileHover={{ borderColor: 'rgba(237, 95, 30, 0.5)' }}
              >
                <div className="terminal-header">
                  <div className="terminal-dot red" />
                  <div className="terminal-dot yellow" />
                  <div className="terminal-dot green" />
                  <span className="terminal-title">{exp.company}.sh</span>
                </div>
                <div className="terminal-body">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-1">
                    <div className="flex items-center gap-2">
                      <FiBriefcase className="text-primary flex-shrink-0" size={16} />
                      <span className="text-secondary font-medium text-sm sm:text-base">{exp.role}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#8899a6] text-xs sm:text-sm">
                      <FiCalendar size={14} />
                      {exp.period}
                    </div>
                  </div>
                  <div className="space-y-2">
                    {exp.description.map((desc, j) => (
                      <motion.div
                        key={j}
                        className="flex items-start gap-2 text-[#94a3b8] text-xs sm:text-sm"
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ delay: i * 0.2 + j * 0.1 + 0.3 }}
                      >
                        <FiChevronRight className="text-primary mt-0.5 flex-shrink-0" size={14} />
                        <span>{desc}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Closing bracket */}
        <motion.div
          className="section-heading text-xl sm:text-2xl mt-8 sm:mt-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <span className="line-number" />
          <span className="bracket">{'}'}</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
