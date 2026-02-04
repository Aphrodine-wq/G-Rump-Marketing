import React from 'react';
import { motion } from 'framer-motion';
import { Download, Terminal, Apple, Monitor, Smartphone, Command, ExternalLink } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

const GITHUB_REPO_URL = 'https://github.com/Aphrodine-wq/g-rump.com';

interface DownloadCardProps {
  icon: React.ComponentType<{ size?: number }>;
  os: string;
  version: string;
  arch: string;
  delay: number;
}

const DownloadCard: React.FC<DownloadCardProps> = ({ icon: Icon, os, version, arch, delay }) => (
  <motion.a
    href={GITHUB_REPO_URL}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="flex-1"
  >
    <Card className="group h-full border-gray-200 bg-white p-6 text-center transition-all hover:-translate-y-1 hover:border-purple-300 hover:shadow-xl">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-50 text-purple-500 transition-colors group-hover:bg-purple-100 group-hover:text-purple-600">
        <Icon size={24} />
      </div>
      <h3 className="text-lg font-bold text-gray-900">{os}</h3>
      <p className="mt-2 text-sm text-gray-500">
        {version} • {arch}
      </p>
      <Button
        asChild
        variant="secondary"
        size="sm"
        className="mt-6 w-full border border-gray-200 bg-gray-50 text-gray-900 transition-colors group-hover:border-purple-200 group-hover:bg-gray-100"
      >
        <span>
          <Download size={14} className="mr-2 inline-block" />
          View on GitHub
        </span>
      </Button>
    </Card>
  </motion.a>
);

const Downloads: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'npm' | 'sh'>('npm');

  return (
    <div className="min-h-screen bg-white pt-24 text-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden pb-16 pt-10">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,#ede9fe,transparent_65%)]" aria-hidden="true" />
        <div className="max-w-5xl mx-auto px-6 text-center sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-mono font-medium uppercase tracking-[0.18em] text-purple-600">
              <span className="pulse-dot" />
              Latest build · v2.4.0
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Download <span className="text-gradient">G-Agent</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 sm:text-xl">
              G-Agent packages ship alongside G-Rump. Grab the source on GitHub or install via CLI for the fastest setup.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 text-sm text-gray-500 sm:flex-row">
              <span className="flex items-center gap-2">
                <Command size={14} /> Single binary, zero dependencies.
              </span>
              <span className="hidden h-3 w-px bg-gray-200 sm:block" aria-hidden="true" />
              <span>Signed builds for macOS, Windows, and Linux.</span>
            </div>
            <div className="mt-10 inline-flex flex-wrap justify-center gap-4">
              <Button asChild className="min-w-[220px]">
                <a href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={16} />
                  View Source on GitHub
                </a>
              </Button>
              <Button asChild variant="outline" className="min-w-[220px] border-purple-200 text-purple-600 hover:bg-purple-50">
                <a href="#cli-install">
                  <Terminal size={16} />
                  Install via CLI
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-[90rem] px-6 pb-32 sm:px-8 lg:px-10">
        <div className="mx-auto flex flex-col gap-6 pb-20 lg:max-w-5xl lg:flex-row">
          <DownloadCard icon={Apple} os="macOS" version="v2.4.0" arch="Universal" delay={0.1} />
          <DownloadCard icon={Monitor} os="Windows" version="v2.4.0" arch="x64 / ARM64" delay={0.2} />
          <DownloadCard icon={Smartphone} os="Linux" version="v2.4.0" arch="x64 / ARM64" delay={0.3} />
        </div>

        {/* CLI Install */}
        <div id="cli-install" className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-gray-900/5 bg-[#111827] p-8 shadow-2xl"
          >
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="absolute right-[-30%] top-[-30%] h-64 w-64 rounded-full bg-purple-500/40 blur-[120px]" />
              <div className="absolute bottom-[-40%] left-[-20%] h-72 w-72 rounded-full bg-blue-500/20 blur-[140px]" />
            </motion.div>

            <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-purple-300">
                  <Terminal size={14} />
                  {activeTab === 'npm' ? 'Install via npm' : 'Install via curl'}
                </div>

                <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-5 font-mono text-sm text-gray-100 shadow-inner">
                  <div className="mb-4 flex gap-2 text-gray-400">
                    <span className={`cursor-pointer rounded-full px-3 py-1 text-xs font-semibold transition ${activeTab === 'npm' ? 'bg-purple-500/30 text-white' : 'hover:bg-white/10'}`} onClick={() => setActiveTab('npm')}>
                      npm
                    </span>
                    <span className={`cursor-pointer rounded-full px-3 py-1 text-xs font-semibold transition ${activeTab === 'sh' ? 'bg-purple-500/30 text-white' : 'hover:bg-white/10'}`} onClick={() => setActiveTab('sh')}>
                      shell
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-black/40 px-5 py-4">
                    <span className="inline-flex items-center gap-3">
                      <span className="text-green-400">➜</span>
                      {activeTab === 'npm' ? 'npm install -g @g-rump/cli' : 'curl -fsSL https://get.g-rump.com | sh'}
                    </span>
                    <button
                      className="rounded-md p-2 text-gray-400 transition hover:bg-white/10 hover:text-white"
                      onClick={() =>
                        navigator.clipboard.writeText(
                          activeTab === 'npm' ? 'npm install -g @g-rump/cli' : 'curl -fsSL https://get.g-rump.com | sh',
                        )
                      }
                      aria-label="Copy installation command"
                    >
                      <CopyIcon />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex w-full flex-col gap-4 rounded-2xl border border-white/10 bg-black/20 p-6 text-sm text-gray-300 md:max-w-xs">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-200">
                  Requirements
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-300">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Node.js 18+
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <span className="h-2 w-2 rounded-full bg-sky-400" />
                    Docker (optional)
                  </div>
                  <div className="flex items-start gap-2 text-gray-400">
                    <span className="h-2 w-2 rounded-full bg-purple-400" />
                    Verified signatures for every build.
                  </div>
                </div>
                <a
                  href={GITHUB_REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-purple-300 transition hover:text-purple-100"
                >
                  <ExternalLink size={14} />
                  Release notes on GitHub
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const CopyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-copy"
  >
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

export default Downloads;
