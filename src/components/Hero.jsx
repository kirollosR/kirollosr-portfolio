import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiGithub, FiLinkedin, FiPhone, FiArrowDown } from 'react-icons/fi';
import portfolioData from '../data/portfolioData';

const Hero = () => {
  const [terminalLines, setTerminalLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const terminalRef = useRef(null);
  const { personal, terminalCommands } = portfolioData;

  useEffect(() => {
    if (currentLine < terminalCommands.length) {
      const timer = setTimeout(() => {
        setTerminalLines((prev) => [...prev, terminalCommands[currentLine]]);
        setCurrentLine((prev) => prev + 1);
      }, currentLine === 0 ? 800 : 1500);
      return () => clearTimeout(timer);
    }
  }, [currentLine, terminalCommands]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalLines]);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(1,103,164,0.15)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(237,95,30,0.08)_0%,_transparent_50%)]" />

      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10 pt-20">
        {/* Left - Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-mono text-primary text-sm mb-4">
            <span className="text-accent">const</span>{' '}
            <span className="text-secondary">greeting</span>{' '}
            <span className="text-[#8899a6]">=</span>{' '}
            <span className="text-primary">&quot;Hi, I&#39;m&quot;</span>
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            <TypeAnimation
              sequence={[personal.name, 2000]}
              wrapper="span"
              speed={50}
              className="text-gradient"
              repeat={0}
              cursor={false}
            />
          </h1>

          <h2 className="text-xl sm:text-2xl md:text-3xl text-[#8899a6] font-light mb-6">
            <TypeAnimation
              sequence={[
                500,
                personal.title,
                2000,
                personal.subtitle,
                2000,
                'Problem Solver',
                2000,
                personal.title,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h2>

          <p className="text-[#94a3b8] max-w-lg mb-8 leading-relaxed text-sm sm:text-base">
            {personal.bio}
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mb-8">
            {[
              { icon: FiGithub, href: personal.github, label: 'GitHub' },
              { icon: FiLinkedin, href: personal.linkedin, label: 'LinkedIn' },
              { icon: FiPhone, href: `tel:${personal.phone}`, label: 'Phone' },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target={label !== 'Phone' ? '_blank' : undefined}
                rel={label !== 'Phone' ? 'noopener noreferrer' : undefined}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center border border-azure text-[#8899a6] hover:text-primary hover:border-primary transition-all no-underline"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={label}
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>

          <motion.button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-2 font-mono text-sm text-primary hover:text-secondary transition-colors cursor-pointer bg-transparent border-none"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <FiArrowDown /> scroll_down()
          </motion.button>
        </motion.div>

        {/* Right - Terminal */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="terminal-window glow-primary">
            <div className="terminal-header">
              <div className="terminal-dot red" />
              <div className="terminal-dot yellow" />
              <div className="terminal-dot green" />
              <span className="terminal-title">kirollos@portfolio: ~</span>
            </div>
            <div className="terminal-body" ref={terminalRef} style={{ minHeight: '250px' }}>
              {terminalLines.map((line, i) => (
                <div key={i} className="mb-2">
                  <div>
                    <span className="terminal-prompt">kirollos@dev</span>
                    <span className="text-[#8899a6]">:</span>
                    <span className="text-accent">~</span>
                    <span className="text-[#8899a6]">$ </span>
                    <span className="terminal-command">{line.command}</span>
                  </div>
                  <div className="terminal-output pl-0 sm:pl-2">{line.output}</div>
                </div>
              ))}
              {currentLine < terminalCommands.length && (
                <div>
                  <span className="terminal-prompt">kirollos@dev</span>
                  <span className="text-[#8899a6]">:</span>
                  <span className="text-accent">~</span>
                  <span className="text-[#8899a6]">$ </span>
                  <span className="terminal-cursor" />
                </div>
              )}
              {currentLine >= terminalCommands.length && (
                <div>
                  <span className="terminal-prompt">kirollos@dev</span>
                  <span className="text-[#8899a6]">:</span>
                  <span className="text-accent">~</span>
                  <span className="text-[#8899a6]">$ </span>
                  <span className="terminal-cursor" />
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
