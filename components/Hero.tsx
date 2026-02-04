import React from 'react';
import { Link } from 'react-router-dom';
import { Download, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Logo from './Logo';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-white to-purple-50/40">
      <div className="absolute inset-x-0 top-0 -z-10 flex justify-center">
        <motion.div
          className="hero-glow"
          aria-hidden="true"
          animate={{
            rotate: [0, 6, -6, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <motion.div
        className="absolute left-1/2 top-20 -z-10 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-gradient-to-br from-purple-200/40 via-purple-300/30 to-purple-100/20 blur-3xl"
        aria-hidden="true"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 pb-32 pt-36 text-center sm:px-8 lg:pt-44">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-purple-600 shadow-sm"
        >
          <span className="pulse-dot" />
          Beta access now open
        </motion.div>

        <motion.div
          className="relative mt-10 flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <motion.div
            className="frowny-hero-ring"
            aria-hidden="true"
            animate={{
              rotate: [0, 360],
            }}
            transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
          />
          <Logo interactive size={200} className="frowny-hero-icon" />
        </motion.div>

        <motion.h1
          className="mt-10 max-w-4xl text-balance text-[2.75rem] font-bold leading-tight text-[#1a1a2e] sm:text-[3.25rem] md:text-[3.75rem]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Your Vision. <span className="text-gradient">Instantly Executed.</span>
        </motion.h1>

        <motion.p
          className="mt-6 max-w-3xl text-lg text-gray-600 sm:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          Describe the product you want. G-Rump compiles it into working code, architecture, and documentation—ready for your team to ship.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <Link
            to="/downloads"
            className="btn-primary flex min-h-[52px] min-w-[220px] items-center justify-center gap-2 rounded-xl px-8 py-3 text-base font-semibold shadow-lg shadow-purple-200/60"
          >
            <Download size={18} />
            Download G-Rump
          </Link>
          <Link
            to="/#how-it-works"
            className="btn-secondary flex min-h-[52px] min-w-[220px] items-center justify-center gap-2 rounded-xl px-8 py-3 text-base font-semibold"
          >
            Learn how it works
            <ArrowRight size={18} />
          </Link>
        </motion.div>

        <motion.p
          className="mt-6 text-sm font-medium text-gray-500"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          Free during beta · No credit card required · G-Agent CLI included
        </motion.p>

        <motion.div
          className="mt-14 inline-flex flex-col gap-4 rounded-2xl border border-purple-100/70 bg-white/70 px-6 py-5 text-left shadow-lg backdrop-blur-sm sm:flex-row sm:items-center sm:gap-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.55, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-purple-500">
              End-to-end creation
            </p>
            <p className="mt-1 text-base text-[#1a1a2e]">
              Prompt → Architecture → Code → Documentation → Deployment.
            </p>
          </div>
          <div
            className="hidden h-10 w-px bg-gradient-to-b from-purple-100 via-purple-300/60 to-purple-100 sm:block"
            aria-hidden="true"
          />
          <ul className="space-y-2 text-sm text-gray-500">
            <li>• Multi-agent orchestration for complex builds</li>
            <li>• Production-ready code reviews baked in</li>
            <li>• Export to GitHub, Docker, and your cloud of choice</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
