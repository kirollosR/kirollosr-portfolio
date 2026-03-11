// ============================================
// Portfolio Data - Edit all your info here
// ============================================

const portfolioData = {
  // Personal Info
  personal: {
    name: 'Kirollos Rafik',
    title: 'Software Engineer',
    subtitle: 'Backend Developer',
    email: 'kirollosrafik93@gmail.com',
    phone: '+20 128 846 4506',
    location: 'Cairo, Egypt',
    github: 'https://github.com/kirollosR',
    githubUsername: 'kirollosR',
    linkedin: 'https://www.linkedin.com/in/kirollos-rafik-01926323a',
    resumeFile: '/Kirollos_Rafik_Backend_CV.pdf',
    bio: `Passionate software engineer with a strong interest in learning and applying new technologies and frameworks. Skilled in problem-solving, writing efficient, high-quality code, and contributing to innovative projects. Seeking opportunities to enhance my professional development within a dynamic, collaborative team environment.`,
  },

  // Navigation Links
  navLinks: [
    { id: 'about', label: 'about()' },
    { id: 'skills', label: 'skills()' },
    { id: 'experience', label: 'experience()' },
    { id: 'projects', label: 'projects()' },
    { id: 'contact', label: 'contact()' },
  ],

  // Skills
  skills: {
    languages: {
      title: 'Languages',
      items: ['Python', 'JavaScript', 'TypeScript', 'PHP', 'Java', 'Scala'],
    },
    webDev: {
      title: 'Web Development',
      items: ['HTML', 'CSS', 'React.js', 'Node.js', 'Express.js'],
    },
    backend: {
      title: 'Backend',
      items: ['FastAPI', 'Java Spring Boot', 'RESTful APIs'],
    },
    databases: {
      title: 'Databases',
      items: ['MySQL', 'MongoDB', 'NoSQL'],
    },
    devops: {
      title: 'DevOps & Tools',
      items: ['Docker', 'Microservices', 'Git'],
    },
    ai: {
      title: 'AI & ML',
      items: ['GANs', 'TensorFlow', 'Squeeze Attention U-Net'],
    },
    testing: {
        title: 'Testing',
        items: ['JUnit5', 'Jest', 'Supertest'],
    }
  },

  // All skill names for the globe visualization
  allSkills: [
    'Python', 'JavaScript', 'TypeScript', 'PHP', 'Java', 'Scala',
    'HTML', 'CSS', 'React.js', 'Node.js', 'Express.js',
    'FastAPI', 'Spring Boot', 'REST APIs',
    'MySQL', 'MongoDB', 'Docker',
    'Microservices', 'Git', 'TensorFlow',
    'GANs', 'Linux', 'Tailwind CSS', 'Jest', 'JUnit5',
  ],

  // Experience
  experience: [
    {
      company: 'Freelancer',
      role: 'Full Stack Developer',
      period: '2021 – Present',
      description: [
        'A kids\' doctor system that automatically sends reminders for vaccination appointment times.',
        'A reservation system and admin dashboard for a hotel.',
        'A school system managing financial aspects and student data.',
      ],
    },
    {
      company: 'Vodafone (VOIS Explore Intern)',
      role: 'Backend Engineer',
      period: 'Aug 2023 – Sep 2023',
      description: [
        'Participated in sessions on Agile methodologies and Scrum practices.',
        'Shadowed teams in sprint planning, sprint review, and daily standups.',
        'Collaborated on "Learning Hub" using Scrum framework and Spring Boot.',
      ],
    },
  ],

  // Education
  education: [
    {
      school: 'Helwan University, Cairo, Egypt',
      degree: 'Bachelor of Computer Science and Artificial Intelligence',
      period: '2020 – 2024',
      details: 'GPA: 3.55 | Grade: Excellent with Honor | Major: CS | Minor: IS',
    },
    {
      school: 'College De La Salle School, Cairo, Egypt',
      degree: 'French High School Diploma',
      period: '2006 – 2020',
      details: 'Grade: Excellent',
    },
  ],

  // Portfolio Projects (live / demo projects)
  portfolioProjects: [
    {
      title: 'Finance Tracker',
      description: 'Full-stack business finance management platform for freelancers and small businesses. Features client management, project tracking, payment recording, interactive timeline, and real-time dashboard analytics with visual charts.',
      tech: ['React', 'Node.js', 'Express.js', 'MySQL', 'Tailwind CSS'],
      github: 'https://github.com/kirollosR',
      live: 'https://projects-finance-tracker.vercel.app/',
      featured: true,
    },
    {
      title: 'Nile Logistics',
      description: 'Corporate website for a leading Egyptian logistics company with 16+ years of experience, 100+ employees, and 200+ clients. Features services showcase including customs clearance, warehousing (9,000m²), and freight solutions.',
      tech: ['React', 'Tailwind CSS', 'Node.js', 'ImageKit'],
      github: 'https://github.com/kirollosR',
      live: 'https://www.nilelogistics.com/',
      featured: true,
    },
    {
      title: 'Creo — Creative Studio Platform',
      description: 'Booking and showcase platform for a premium creative studio in New Cairo offering professional podcast studios, photography studios, coworking spaces, and meeting rooms for creators and businesses.',
      tech: ['React', 'Vite', 'Tailwind CSS'],
      github: 'https://github.com/kirollosR',
      live: 'https://creospot.vercel.app/',
      featured: true,
    },
    {
      title: 'Keen & Care — Cosmetics E-Commerce',
      description: 'Full-featured e-commerce platform for a cosmetics brand (Keen And Clean Cosmetics). Includes product catalog, category browsing, featured products, shopping experience, and admin management.',
      tech: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
      github: 'https://github.com/kirollosR',
      live: 'https://keen-and-care.vercel.app/',
      featured: false,
    },
    {
      title: 'Lucent — Streetwear Brand',
      description: 'E-commerce platform for an Egyptian contemporary streetwear clothing brand known for its signature fluorescent printing technique. Features product catalog, brand story, and online shop.',
      tech: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'ImageKit'],
      github: 'https://github.com/kirollosR',
      live: 'https://lucent-eg.vercel.app/',
      featured: true,
    },
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack E-Commerce application with admin dashboard for efficient product management. Built with microservices architecture using Docker, supporting both SQL and NoSQL databases.',
      tech: ['Node.js', 'Express.js', 'React', 'MySQL', 'MongoDB', 'Docker', 'Tailwind CSS'],
      github: 'https://github.com/kirollosR',
      live: null,
      featured: false,
    },
    {
      title: 'MRI Sequence Synthesis (GAN)',
      description: 'Deep learning solution to synthesize missing MRI sequences using a GAN and Squeeze Attention U-Net model. Trained on BraTS 2023 dataset to generate T1, T2, T1ce, and FLAIR sequences from a single input, reducing scanning time in clinical workflows.',
      tech: ['Python', 'TensorFlow', 'GANs', 'U-Net', 'FastAPI', 'BraTS 2023'],
      github: 'https://github.com/kirollosR/Synthesising_Missing_MRI_Sequences',
      live: null,
      featured: false,
    },
    {
      title: 'Kids Doctor System',
      description: 'Healthcare management system for pediatricians that automatically sends vaccination appointment reminders to parents.',
      tech: ['Python', 'FastAPI', 'MongoDB'],
      github: null,
      live: null,
      featured: false,
    },
    {
      title: 'Bus Subscription & Financial Management',
      description: 'Excel-based system to manage student bus subscriptions, track payments and outstanding balances, generate driver salary sheets with deductions, and monitor yearly net profit through an interactive financial dashboard.',
      tech: ['Excel', 'VBA', 'Data Analysis'],
      github: null,
      live: null,
      featured: false,
    },
    {
      title: 'Hotel Reservation System',
      description: 'Complete hotel reservation system featuring booking management and a comprehensive admin dashboard for staff.',
      tech: ['React', 'Node.js', 'MySQL'],
      github: null,
      live: null,
      featured: false,
    },
  ],

  // Projects (kept for backward compat)
  projects: [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack E-Commerce application with admin dashboard for product management and seamless user experience. Built with microservices architecture using Docker.',
      tech: ['Node.js', 'Express.js', 'React', 'MySQL', 'MongoDB', 'Docker', 'Tailwind CSS'],
      github: 'https://github.com/kirollosR/e-commerce',
      live: null,
      featured: true,
    },
    {
      title: 'Vodafone Learning Hub',
      description: 'E-learning platform built through rotational approach across documentation, backend development, testing, and implementation. Features comprehensive API documentation with OpenAPI.',
      tech: ['Java Spring Boot', 'Node.js', 'Express.js', 'SQLite', 'Hibernate', 'JUnit', 'Docker'],
      github: 'https://github.com/kirollosR/VodaLearningPlatform',
      live: null,
      featured: true,
    },
    {
      title: 'Kids Doctor System',
      description: 'Healthcare management system for pediatricians that automatically sends vaccination appointment reminders to parents.',
      tech: ['Python', 'FastAPI', 'MongoDB'],
      github: 'https://github.com/kirollosR',
      live: null,
      featured: false,
    },
    {
      title: 'Hotel Reservation System',
      description: 'Complete hotel reservation system featuring booking management and a comprehensive admin dashboard for staff.',
      tech: ['React', 'Node.js', 'MySQL'],
      github: 'https://github.com/kirollosR',
      live: null,
      featured: false,
    },
  ],

  // Terminal commands for the hero section
  terminalCommands: [
    { command: 'whoami', output: 'Kirollos Rafik' },
    { command: 'cat role.txt', output: 'Software Engineer | Backend Developer' },
    { command: 'cat location.txt', output: 'Cairo, Egypt' },
    { command: 'ls skills/', output: 'Python  Java  JavaScript  React  Docker  Spring-Boot  FastAPI  ...' },
  ],

  // EmailJS Config - Replace with your actual EmailJS credentials
  emailjs: {
    serviceId: 'service_ca7tmjb',
    templateId: 'template_u9epaji',
    publicKey: 'ITiXWTeFkGWsWcqwL',
  },
};

export default portfolioData;
