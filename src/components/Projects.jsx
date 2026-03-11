import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiExternalLink, FiFolder, FiGitCommit } from 'react-icons/fi';
import portfolioData from '../data/portfolioData';

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const authHeaders = GITHUB_TOKEN
  ? { Authorization: `Bearer ${GITHUB_TOKEN}` }
  : {};

const Projects = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [githubRepos, setGithubRepos] = useState([]);
  const { portfolioProjects, personal } = portfolioData;

  // Fetch GitHub repos with commit counts
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${personal.githubUsername}/repos?sort=updated&per_page=6`,
          { headers: authHeaders }
        );
        const repos = await res.json();
        if (!Array.isArray(repos)) return;

        // Fetch commit count for each repo (only commits by the current user)
        const reposWithCommits = await Promise.all(
          repos.map(async (repo) => {
            try {
              const commitsRes = await fetch(
                `https://api.github.com/repos/${repo.full_name}/commits?author=${personal.githubUsername}&per_page=1`,
                { headers: authHeaders }
              );
              // GitHub returns total count in Link header for paginated results
              const linkHeader = commitsRes.headers.get('link');
              let totalCommits = 0;
              
              if (linkHeader) {
                // Parse the link header to get the last page number
                const lastMatch = linkHeader.match(/&page=(\d+)>; rel="last"/);
                totalCommits = lastMatch ? parseInt(lastMatch[1], 10) : 0;
              } else {
                // If no link header, check if there's at least one commit
                const commits = await commitsRes.json();
                totalCommits = Array.isArray(commits) && commits.length > 0 ? 1 : 0;
              }
              
              return { ...repo, commitCount: totalCommits };
            } catch {
              return { ...repo, commitCount: 0 };
            }
          })
        );
        setGithubRepos(reposWithCommits);
      } catch {
        // silently fail
      }
    };
    fetchRepos();
  }, [personal.githubUsername]);

  const featured = portfolioProjects.filter((p) => p.featured);
  const other = portfolioProjects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-20 sm:py-28 px-4">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Section Heading */}
        <motion.div
          className="section-heading text-xl sm:text-2xl mb-8 sm:mb-12"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="line-number">04</span>
          <span className="keyword">function</span>
          <span className="function-name">projects</span>
          <span className="bracket">{'() {'}</span>
        </motion.div>

        {/* ===== Portfolio Projects ===== */}
        <motion.h3
          className="font-mono text-sm text-[#8899a6] mb-6"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1 }}
        >
          <span className="text-accent">{'// '}</span>
          Featured Projects
        </motion.h3>

        {/* Featured Projects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featured.map((project, i) => (
            <motion.div
              key={project.title}
              className="project-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.2 }}
            >
              <div className="terminal-header">
                <div className="terminal-dot red" />
                <div className="terminal-dot yellow" />
                <div className="terminal-dot green" />
                <span className="terminal-title">
                  {project.title.toLowerCase().replace(/\s+/g, '_')}.js
                </span>
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <FiFolder className="text-primary" />
                    <h3 className="text-white font-semibold text-base sm:text-lg">
                      {project.title}
                    </h3>
                  </div>
                  <div className="flex gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#8899a6] hover:text-primary transition-colors"
                        aria-label="View source"
                      >
                        <FiGithub size={18} />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#8899a6] hover:text-primary transition-colors"
                        aria-label="View live"
                      >
                        <FiExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-[#94a3b8] text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-2 py-1 rounded bg-azure/30 text-accent border border-azure/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Portfolio Projects */}
        {other.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h3 className="font-mono text-sm text-[#8899a6] mb-4">
              <span className="text-accent">{'// '}</span>
              Other Projects
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {other.map((project, i) => (
                <motion.div
                  key={project.title}
                  className="glass rounded-lg p-4 sm:p-5 hover:border-primary/30 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <FiFolder className="text-secondary" />
                    <div className="flex gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#8899a6] hover:text-primary transition-colors"
                          aria-label="View source"
                        >
                          <FiGithub size={16} />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#8899a6] hover:text-primary transition-colors"
                          aria-label="View live"
                        >
                          <FiExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                  <h4 className="text-white font-medium text-sm mb-2">{project.title}</h4>
                  <p className="text-[#94a3b8] text-xs leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {project.tech.slice(0, 4).map((tech) => (
                      <span key={tech} className="text-[10px] font-mono text-accent">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ===== GitHub Repositories ===== */}
        {githubRepos.length > 0 && (
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
          >
            <h3 className="font-mono text-sm text-[#8899a6] mb-4">
              <span className="text-accent">{'// '}</span>
              Repositories
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {githubRepos.map((repo, i) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass rounded-lg p-4 hover:border-primary/30 transition-all no-underline"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-start gap-2 mb-2">
                    <FiGithub className="text-[#8899a6] mt-0.5 flex-shrink-0" size={14} />
                    <span className="text-primary text-sm font-mono truncate">
                      {repo.name}
                    </span>
                  </div>
                  <p className="text-[#94a3b8] text-xs leading-relaxed mb-3 line-clamp-2">
                    {repo.description || 'No description'}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-[#8899a6]">
                    {repo.language && (
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-secondary" />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <FiGitCommit size={12} /> {repo.commitCount || 0} commits
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}

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

export default Projects;
