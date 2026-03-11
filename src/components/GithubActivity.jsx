import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiGitCommit, FiGitPullRequest, FiStar, FiCode, FiAlertCircle } from 'react-icons/fi';
import portfolioData from '../data/portfolioData';

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const CONTRIBUTIONS_QUERY = `
  query($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        totalCommitContributions
        totalPullRequestContributions
        totalIssueContributions
        totalRepositoriesWithContributedCommits
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
      publicRepos: repositories(privacy: PUBLIC) {
        totalCount
      }
    }
  }
`;

const GithubActivity = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [calendarData, setCalendarData] = useState(null);
  const [summaryStats, setSummaryStats] = useState(null);
  const [contributions, setContributions] = useState([]);
  const [noToken, setNoToken] = useState(false);
  const { personal } = portfolioData;

  useEffect(() => {
    if (!GITHUB_TOKEN) {
      setNoToken(true);
      return;
    }

    const to = new Date();
    const from = new Date();
    from.setFullYear(from.getFullYear() - 1);

    fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: CONTRIBUTIONS_QUERY,
        variables: {
          username: personal.githubUsername,
          from: from.toISOString(),
          to: to.toISOString(),
        },
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        const collection = res?.data?.user?.contributionsCollection;
        const publicRepoCount = res?.data?.user?.publicRepos?.totalCount ?? 0;
        if (!collection) return;

        setSummaryStats({
          commits: collection.totalCommitContributions,
          prs: collection.totalPullRequestContributions,
          issues: collection.totalIssueContributions,
          repos: collection.totalRepositoriesWithContributedCommits,
          publicRepos: publicRepoCount,
          total: collection.contributionCalendar.totalContributions,
        });

        // Build contribution weeks for the calendar grid
        const weeks = collection.contributionCalendar.weeks.map((w) =>
          w.contributionDays.map((d) => ({
            date: d.date,
            count: d.contributionCount,
          }))
        );
        setContributions(weeks);
      })
      .catch(() => {});
  }, [personal.githubUsername]);

  const getActivityColor = (count) => {
    if (count === 0) return 'bg-azure/20';
    if (count <= 2) return 'bg-primary/30';
    if (count <= 5) return 'bg-primary/50';
    if (count <= 9) return 'bg-primary/70';
    return 'bg-primary';
  };

  return (
    <section className="py-16 sm:py-20 px-4">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Section Heading */}
        <motion.div
          className="section-heading text-xl sm:text-2xl mb-8 sm:mb-10"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="line-number">03.5</span>
          <span className="keyword">const</span>
          <span className="function-name">githubAnalytics</span>
          <span className="bracket">{' = {'}</span>
        </motion.div>

        {/* No token warning */}
        {noToken && (
          <motion.div
            className="glass rounded-lg p-4 mb-6 flex items-center gap-3 border-secondary/40"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            <FiAlertCircle className="text-secondary flex-shrink-0" size={18} />
            <span className="font-mono text-sm text-[#94a3b8]">
              Add <span className="text-secondary">VITE_GITHUB_TOKEN</span> to{' '}
              <span className="text-primary">.env</span> to display contribution data
              (including private repos)
            </span>
          </motion.div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              icon: FiGitCommit,
              label: 'Commits',
              value: summaryStats?.commits ?? '—',
              color: 'text-primary',
            },
            {
              icon: FiGitPullRequest,
              label: 'Pull Requests',
              value: summaryStats?.prs ?? '—',
              color: 'text-secondary',
            },
            {
              icon: FiCode,
              label: 'Repos Contributed',
              value: summaryStats?.repos ?? '—',
              color: 'text-accent',
            },
            {
              icon: FiStar,
              label: 'Total Contributions',
              value: summaryStats?.total ?? '—',
              color: 'text-primary',
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="glass rounded-lg p-5 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <stat.icon className={`${stat.color} mx-auto mb-2`} size={24} />
              <div className={`text-2xl font-bold font-mono ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-xs text-[#8899a6] font-mono mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contribution Calendar */}
        {contributions.length > 0 && (
          <motion.div
            className="glass rounded-lg p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <FiGithub className="text-[#8899a6]" size={16} />
                <span className="font-mono text-sm text-[#8899a6]">
                  <span className="text-accent">{'// '}</span>
                  Contribution Calendar — last 12 months
                  {summaryStats && (
                    <span className="text-primary ml-2">
                      ({summaryStats.total} total)
                    </span>
                  )}
                </span>
              </div>
            </div>

            {/* Month labels */}
            <div className="overflow-x-auto pb-2">
              <div className="flex gap-[3px] min-w-fit">
                {contributions.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-[3px]">
                    {week.map((day) => (
                      <motion.div
                        key={day.date}
                        className={`w-[10px] h-[10px] sm:w-[13px] sm:h-[13px] rounded-sm ${getActivityColor(day.count)}`}
                        title={`${day.date}: ${day.count} contribution${day.count !== 1 ? 's' : ''}`}
                        whileHover={{ scale: 2, zIndex: 10, position: 'relative' }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-end gap-[3px] mt-3">
              <span className="text-[10px] text-[#8899a6] font-mono mr-1">Less</span>
              {[0, 1, 4, 7, 12].map((c) => (
                <div key={c} className={`w-[10px] h-[10px] rounded-sm ${getActivityColor(c)}`} />
              ))}
              <span className="text-[10px] text-[#8899a6] font-mono ml-1">More</span>
            </div>
          </motion.div>
        )}

        {/* Closing bracket */}
        <motion.div
          className="section-heading text-xl sm:text-2xl mt-8"
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

export default GithubActivity;
