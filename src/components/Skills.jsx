import { useRef, useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  SiPython, SiJavascript, SiPhp, SiScala, SiHtml5, SiCss,
  SiReact, SiNodedotjs, SiExpress, SiFastapi, SiSpringboot,
  SiMysql, SiMongodb, SiDocker, SiGit, SiTensorflow,
  SiTailwindcss, SiLinux, SiJest, SiJunit5,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { TbApi, TbBrain } from 'react-icons/tb';
import { VscServerProcess } from 'react-icons/vsc';
import portfolioData from '../data/portfolioData';

const skillIconMap = {
  Python: SiPython,
  JavaScript: SiJavascript,
  PHP: SiPhp,
  Java: FaJava,
  Scala: SiScala,
  HTML: SiHtml5,
  CSS: SiCss,
  'React.js': SiReact,
  'Node.js': SiNodedotjs,
  'Express.js': SiExpress,
  FastAPI: SiFastapi,
  'Spring Boot': SiSpringboot,
  'REST APIs': TbApi,
  MySQL: SiMysql,
  MongoDB: SiMongodb,
  Docker: SiDocker,
  Microservices: VscServerProcess,
  Git: SiGit,
  TensorFlow: SiTensorflow,
  GANs: TbBrain,
  Linux: SiLinux,
  'Tailwind CSS': SiTailwindcss,
  Jest: SiJest,
  JUnit5: SiJunit5,
};

// Rotating 3D globe with tech icons
const SkillsGlobe = () => {
  const { allSkills } = portfolioData;
  const [rotation, setRotation] = useState(0);
  const animRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // Distribute points on a sphere using Fibonacci sphere
  const basePositions = useMemo(() => {
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    return allSkills.map((_, i) => {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / allSkills.length);
      return { theta, phi };
    });
  }, [allSkills]);

  useEffect(() => {
    let lastTime = performance.now();
    const animate = (now) => {
      if (!isPaused) {
        const dt = (now - lastTime) / 1000;
        setRotation((prev) => prev + dt * 0.4);
      }
      lastTime = now;
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [isPaused]);

  const getRotatedPositions = () => {
    return allSkills.map((skill, i) => {
      const { theta, phi } = basePositions[i];
      const sinPhi = Math.sin(phi);
      const cosPhi = Math.cos(phi);
      // Original cartesian
      const x0 = sinPhi * Math.cos(theta);
      const z0 = sinPhi * Math.sin(theta);
      const y0 = cosPhi;
      // Rotate around Y axis
      const x = x0 * Math.cos(rotation) - z0 * Math.sin(rotation);
      const z = x0 * Math.sin(rotation) + z0 * Math.cos(rotation);
      const y = y0;
      return { skill, x, y, z };
    });
  };

  const items = getRotatedPositions().sort((a, b) => a.z - b.z);

  return (
    <div
      className="relative w-full aspect-square max-w-[420px] mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Globe wireframe rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[85%] h-[85%] rounded-full border border-azure/20" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[85%] h-[42%] rounded-[50%] border border-azure/15" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[42%] h-[85%] rounded-[50%] border border-azure/15" />
      </div>
      {/* Equator */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[85%] h-[85%] rounded-full border border-azure/10" style={{ transform: 'rotateX(60deg)' }} />
      </div>

      {items.map(({ skill, x, y, z }) => {
        const scale = 0.6 + (z + 1) * 0.25;
        const opacity = 0.2 + (z + 1) * 0.4;
        const Icon = skillIconMap[skill];
        const screenX = 50 + x * 38;
        const screenY = 50 - y * 38;

        return (
          <motion.div
            key={skill}
            className="absolute flex flex-col items-center gap-1 cursor-default"
            style={{
              left: `${screenX}%`,
              top: `${screenY}%`,
              transform: `translate(-50%, -50%) scale(${scale})`,
              opacity,
              zIndex: Math.round((z + 1) * 10),
            }}
            whileHover={{ scale: scale * 1.5, opacity: 1 }}
          >
            {Icon ? (
              <Icon
                size={22}
                style={{
                  color: z > 0.3 ? '#ed5f1e' : z > -0.3 ? '#febf00' : '#0167a4',
                  filter: z > 0 ? 'drop-shadow(0 0 6px rgba(237,95,30,0.3))' : 'none',
                }}
              />
            ) : (
              <span
                className="font-mono text-xs"
                style={{ color: z > 0.3 ? '#ed5f1e' : z > -0.3 ? '#febf00' : '#0167a4' }}
              >
                {skill}
              </span>
            )}
            <span
              className="font-mono text-[9px] text-[#8899a6] whitespace-nowrap"
              style={{ opacity: z > 0 ? 1 : 0 }}
            >
              {skill}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
};

const Skills = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const { skills } = portfolioData;

  const categoryColors = {
    languages: 'text-primary border-primary/30',
    webDev: 'text-secondary border-secondary/30',
    backend: 'text-accent border-accent/30',
    databases: 'text-primary border-primary/30',
    devops: 'text-secondary border-secondary/30',
    ai: 'text-accent border-accent/30',
  };

  return (
    <section id="skills" className="py-20 sm:py-28 px-4">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Section Heading */}
        <motion.div
          className="section-heading text-xl sm:text-2xl mb-8 sm:mb-12"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="line-number">02</span>
          <span className="keyword">function</span>
          <span className="function-name">skills</span>
          <span className="bracket">{'() {'}</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Skills Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="hidden sm:block"
          >
            <SkillsGlobe />
          </motion.div>

          {/* Skills List */}
          <div className="space-y-5">
            {Object.entries(skills).map(([key, category], i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <h3 className="font-mono text-sm text-[#8899a6] mb-2">
                  <span className="text-accent">{'// '}</span>
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill, j) => (
                    <motion.span
                      key={skill}
                      className={`skill-tag ${categoryColors[key] || ''}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: i * 0.1 + j * 0.05 }}
                      whileHover={{ scale: 1.08, y: -2 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile skills globe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="sm:hidden mt-8"
        >
          <SkillsGlobe />
        </motion.div>

        {/* Closing bracket */}
        <motion.div
          className="section-heading text-xl sm:text-2xl mt-8 sm:mt-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <span className="line-number" />
          <span className="bracket">{'}'}</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
