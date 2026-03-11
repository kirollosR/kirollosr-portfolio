import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiSend, FiCheck, FiAlertCircle, FiFile, FiX } from 'react-icons/fi';
import { SiTypescript } from 'react-icons/si';
import emailjs from '@emailjs/browser';
import portfolioData from '../data/portfolioData';

const Contact = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const [activeField, setActiveField] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await emailjs.send(
        portfolioData.emailjs.serviceId,
        portfolioData.emailjs.templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_name: 'Kirollos',
        },
        portfolioData.emailjs.publicKey
      );
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const lineNumbers = Array.from({ length: 22 }, (_, i) => i + 1);

  return (
    <section id="contact" className="py-20 sm:py-28 px-4">
      <div className="max-w-4xl mx-auto" ref={ref}>
        {/* Section Heading */}
        <motion.div
          className="section-heading text-xl sm:text-2xl mb-8 sm:mb-12"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="line-number">05</span>
          <span className="keyword">function</span>
          <span className="function-name">contact</span>
          <span className="bracket">{'() {'}</span>
        </motion.div>

        {/* IDE-style Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="ide-window glow-primary">
            {/* Tab bar */}
            <div className="ide-tab-bar overflow-x-auto">
              <div className="ide-tab active">
                <SiTypescript className="text-[#3178c6]" size={14} />
                <span className="whitespace-nowrap">sendMessage.ts</span>
                <FiX size={12} className="ml-2 opacity-50" />
              </div>
              <div className="ide-tab">
                <FiFile size={14} />
                <span className="whitespace-nowrap">README.md</span>
              </div>
            </div>

            {/* Editor Content */}
            <form ref={formRef} onSubmit={handleSubmit} className="flex">
              {/* Line Numbers */}
              <div className="ide-line-numbers hidden sm:block py-4 pl-4">
                {lineNumbers.map((n) => (
                  <div key={n}>{n}</div>
                ))}
              </div>

              {/* Code Content */}
              <div className="ide-code-area flex-1 py-4 pr-4 min-w-0">
                {/* Import statement */}
                <div>
                  <span className="text-accent">import</span>{' '}
                  <span className="text-[#8899a6]">{'{ '}</span>
                  <span className="text-secondary">sendEmail</span>
                  <span className="text-[#8899a6]">{' }'}</span>{' '}
                  <span className="text-accent">from</span>{' '}
                  <span className="text-primary">&quot;@portfolio/mailer&quot;</span>
                  <span className="text-[#8899a6]">;</span>
                </div>

                {/* Empty line */}
                <div>&nbsp;</div>

                {/* Interface */}
                <div>
                  <span className="text-accent">interface</span>{' '}
                  <span className="text-secondary">ContactMessage</span>{' '}
                  <span className="text-[#8899a6]">{'{'}</span>
                </div>

                {/* Name field */}
                <div className="flex items-center flex-wrap gap-1">
                  <span className="text-[#8899a6] pl-4">name:</span>{' '}
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setActiveField('name')}
                    onBlur={() => setActiveField(null)}
                    placeholder="string"
                    required
                    className={`bg-transparent border-b ${
                      activeField === 'name' ? 'border-primary' : 'border-azure/50'
                    } outline-none text-white font-mono text-sm px-2 py-0.5 w-40 sm:w-48 transition-colors placeholder:text-azure/60`}
                  />
                  <span className="text-[#8899a6]">;</span>
                </div>

                {/* Email field */}
                <div className="flex items-center flex-wrap gap-1">
                  <span className="text-[#8899a6] pl-4">email:</span>{' '}
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setActiveField('email')}
                    onBlur={() => setActiveField(null)}
                    placeholder="string"
                    required
                    className={`bg-transparent border-b ${
                      activeField === 'email' ? 'border-primary' : 'border-azure/50'
                    } outline-none text-white font-mono text-sm px-2 py-0.5 w-40 sm:w-48 transition-colors placeholder:text-azure/60`}
                  />
                  <span className="text-[#8899a6]">;</span>
                </div>

                {/* Subject field */}
                <div className="flex items-center flex-wrap gap-1">
                  <span className="text-[#8899a6] pl-4">subject:</span>{' '}
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setActiveField('subject')}
                    onBlur={() => setActiveField(null)}
                    placeholder="string"
                    required
                    className={`bg-transparent border-b ${
                      activeField === 'subject' ? 'border-primary' : 'border-azure/50'
                    } outline-none text-white font-mono text-sm px-2 py-0.5 w-40 sm:w-56 transition-colors placeholder:text-azure/60`}
                  />
                  <span className="text-[#8899a6]">;</span>
                </div>

                {/* Message field */}
                <div className="flex items-start flex-wrap gap-1">
                  <span className="text-[#8899a6] pl-4 mt-1">message:</span>{' '}
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setActiveField('message')}
                    onBlur={() => setActiveField(null)}
                    placeholder="string"
                    required
                    rows={3}
                    className={`bg-transparent border-b ${
                      activeField === 'message' ? 'border-primary' : 'border-azure/50'
                    } outline-none text-white font-mono text-sm px-2 py-0.5 w-full sm:flex-1 resize-none transition-colors placeholder:text-azure/60`}
                  />
                  <span className="text-[#8899a6]">;</span>
                </div>

                {/* Close interface */}
                <div>
                  <span className="text-[#8899a6]">{'}'}</span>
                </div>

                {/* Empty line */}
                <div>&nbsp;</div>

                {/* Function call */}
                <div>
                  <span className="text-accent">const</span>{' '}
                  <span className="text-secondary">result</span>{' '}
                  <span className="text-[#8899a6]">=</span>{' '}
                  <span className="text-accent">await</span>{' '}
                  <span className="text-secondary">sendEmail</span>
                  <span className="text-[#8899a6]">(</span>
                  <span className="text-primary">message</span>
                  <span className="text-[#8899a6]">)</span>
                  <span className="text-[#8899a6]">;</span>
                </div>

                {/* Empty line */}
                <div>&nbsp;</div>

                {/* Console output */}
                <div>
                  <span className="text-accent">console</span>
                  <span className="text-[#8899a6]">.</span>
                  <span className="text-secondary">log</span>
                  <span className="text-[#8899a6]">(</span>
                  <span className="text-primary">result</span>
                  <span className="text-[#8899a6]">)</span>
                  <span className="text-[#8899a6]">;</span>
                </div>

                {/* Status output */}
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 mt-2 text-green-400 text-sm"
                  >
                    <FiCheck /> {`// ✓ Message sent successfully!`}
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 mt-2 text-red-400 text-sm"
                  >
                    <FiAlertCircle /> {`// ✗ Error: Failed to send. Please try again.`}
                  </motion.div>
                )}

                {/* Empty lines */}
                <div>&nbsp;</div>
                <div>&nbsp;</div>

                {/* Run button */}
                <div className="mt-2">
                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    className="flex items-center gap-2 px-5 py-2.5 bg-primary/20 text-primary border border-primary/40 rounded-md font-mono text-sm hover:bg-primary/30 transition-all disabled:opacity-50 cursor-pointer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <FiSend size={14} />
                    {status === 'sending' ? 'sending...' : 'npm run send-message'}
                  </motion.button>
                </div>
              </div>
            </form>
          </div>
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

export default Contact;
