import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiPhone, FiMail, FiHeart, FiArrowUp, FiActivity } from 'react-icons/fi';
import portfolioData from '../data/portfolioData';

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const authHeaders = GITHUB_TOKEN
  ? { Authorization: `Bearer ${GITHUB_TOKEN}` }
  : {};

const FOOTER_CONTRIBUTIONS_QUERY = `
  query($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

const Footer = () => {
  const [githubData, setGithubData] = useState(null);
  const [commitActivity, setCommitActivity] = useState([]);
  const { personal } = portfolioData;

  useEffect(() => {
    // Fetch GitHub user data
    fetch(`https://api.github.com/users/${personal.githubUsername}`, {
      headers: authHeaders,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.login) setGithubData(data);
      })
      .catch(() => {});

    // Fetch contribution data via GraphQL (includes private repos)
    if (!GITHUB_TOKEN) return;
    const to = new Date();
    const from = new Date();
    from.setDate(from.getDate() - 30);

    fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: FOOTER_CONTRIBUTIONS_QUERY,
        variables: {
          username: personal.githubUsername,
          from: from.toISOString(),
          to: to.toISOString(),
        },
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        const weeks = res?.data?.user?.contributionsCollection?.contributionCalendar?.weeks;
        if (!weeks) return;
        // Flatten all days from the weeks
        const allDays = weeks.flatMap((w) =>
          w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount }))
        );
        // Take last 30 days
        setCommitActivity(allDays.slice(-30));
      })
      .catch(() => {});
  }, [personal.githubUsername]);

  const getActivityColor = (count) => {
    if (count === 0) return 'bg-azure/30';
    if (count <= 2) return 'bg-primary/30';
    if (count <= 4) return 'bg-primary/60';
    return 'bg-primary';
  };

  return (
    <footer className="border-t border-azure/30 pt-12 pb-24 sm:pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* GitHub Activity */}
        {commitActivity.length > 0 && (
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <FiActivity className="text-primary" size={16} />
              <span className="font-mono text-sm text-[#8899a6]">
                <span className="text-accent">{'// '}</span>
                Recent Activity
              </span>
            </div>
            <div className="flex gap-1 flex-wrap">
              {commitActivity.map((day) => (
                <motion.div
                  key={day.date}
                  className={`w-3 h-3 sm:w-4 sm:h-4 rounded-sm ${getActivityColor(day.count)}`}
                  title={`${day.date}: ${day.count} events`}
                  whileHover={{ scale: 1.5 }}
                />
              ))}
            </div>
          </motion.div>
        )}

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Left - Terminal style info */}
          <div className="font-mono text-sm">
            <div className="mb-3">
              <span className="terminal-prompt">$ </span>
              <span className="terminal-command">cat about.txt</span>
            </div>
            <div className="text-[#94a3b8] space-y-1">
              <p>Designed & Built by</p>
              <p className="text-primary font-medium">{personal.name}</p>
              <p className="text-xs text-[#8899a6] mt-3">
                Built with React, Tailwind CSS & Framer Motion
              </p>
            </div>
          </div>

          {/* Center - GitHub Stats */}
          {githubData && (
            <div className="font-mono text-sm">
              <div className="mb-3">
                <span className="terminal-prompt">$ </span>
                <span className="terminal-command">gh api user</span>
              </div>
              <div className="space-y-2 text-[#94a3b8]">
                <div className="flex items-center gap-2">
                  <FiGithub className="text-[#8899a6]" size={14} />
                  <a
                    href={githubData.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-primary transition-colors no-underline"
                  >
                    {githubData.login}
                  </a>
                </div>
                <p className="text-xs">
                  <span className="text-secondary">{githubData.public_repos}</span> repos •{' '}
                  <span className="text-secondary">{githubData.followers}</span> followers •{' '}
                  <span className="text-secondary">{githubData.following}</span> following
                </p>
                {githubData.bio && (
                  <p className="text-xs text-[#8899a6] italic">{githubData.bio}</p>
                )}
              </div>
            </div>
          )}

          {/* Right - Links */}
          <div>
            <div className="flex gap-3 mb-4">
              {[
                { icon: FiGithub, href: personal.github, label: 'GitHub' },
                { icon: FiLinkedin, href: personal.linkedin, label: 'LinkedIn' },
                { icon: FiPhone, href: `tel:${personal.phone}`, label: 'Phone' },
                { icon: FiMail, href: `mailto:${personal.email}`, label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={label === 'Phone' || label === 'Email' ? undefined : '_blank'}
                  rel={label === 'Phone' || label === 'Email' ? undefined : 'noopener noreferrer'}
                  className="w-9 h-9 rounded-lg flex items-center justify-center border border-azure text-[#8899a6] hover:text-primary hover:border-primary transition-all no-underline"
                  whileHover={{ y: -2 }}
                  aria-label={label}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-10 pt-6 border-t border-azure/20 gap-4">
          <p className="text-xs text-[#8899a6] font-mono flex items-center gap-1">
            Made with <FiHeart className="text-primary" size={12} /> and lots of coffee
          </p>

          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-xs font-mono text-[#8899a6] hover:text-primary transition-colors cursor-pointer bg-transparent border-none"
            whileHover={{ y: -2 }}
          >
            <FiArrowUp size={14} />
            scroll_to_top()
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
