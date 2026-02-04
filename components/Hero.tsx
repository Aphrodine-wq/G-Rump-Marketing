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

      <div className="relative mx-auto flex max-w-[90rem] flex-col items-center px-6 pb-20 pt-32 text-center sm:px-8 sm:pb-24 lg:px-10 lg:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-purple-200/60 bg-purple-50/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-purple-600 shadow-sm backdrop-blur-sm"
        >
          <span className="pulse-dot" />
          Beta access now open
        </motion.div>

        <motion.div
          className="relative mt-12 flex flex-col items-center"
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
          className="mt-12 max-w-5xl text-balance text-[3rem] font-bold leading-tight text-[#1a1a2e] sm:text-[3.5rem] md:text-[4.5rem]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Your Vision. <span className="text-gradient">Instantly Executed.</span>
        </motion.h1>

        <motion.p
          className="mt-8 max-w-3xl text-lg text-gray-600 sm:text-xl md:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          Describe the product you want. G-Rump compiles it into working code, architecture, and documentation—ready for your team to ship.
        </motion.p>

        <motion.div
          className="mt-12 flex flex-col gap-6 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <Link
            to="/downloads"
            className="btn-primary flex min-h-[56px] min-w-[240px] items-center justify-center gap-2 rounded-xl px-8 py-3 text-base font-semibold shadow-xl shadow-purple-200/50 hover:shadow-2xl hover:shadow-purple-200/60"
          >
            <Download size={20} />
            Download G-Rump
          </Link>
          <Link
            to="/#how-it-works"
            className="btn-secondary flex min-h-[56px] min-w-[240px] items-center justify-center gap-2 rounded-xl px-8 py-3 text-base font-semibold"
          >
            Learn how it works
            <ArrowRight size={20} />
          </Link>
        </motion.div>

        <motion.p
          className="mt-8 text-sm font-medium text-gray-500"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          Free during beta · No credit card required · G-Agent CLI included
        </motion.p>

        <motion.div
          className="mt-16 inline-flex flex-col gap-6 rounded-3xl border border-purple-100/50 bg-white/50 px-8 py-6 text-left shadow-lg backdrop-blur-md sm:flex-row sm:items-center sm:gap-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.55, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-purple-500">
              End-to-end creation
            </p>
            <p className="mt-2 text-lg font-medium text-[#1a1a2e]">
              Prompt → Architecture → Code → Documentation → Deployment.
            </p>
          </div>
          <div
            className="hidden h-12 w-px bg-gradient-to-b from-purple-100/20 via-purple-300/40 to-purple-100/20 sm:block"
            aria-hidden="true"
          />
          <ul className="space-y-2 text-sm font-medium text-gray-500">
            <li className="flex items-center gap-2">
               <span className="h-1.5 w-1.5 rounded-full bg-purple-400" /> Multi-agent orchestration for complex builds
            </li>
            <li className="flex items-center gap-2">
               <span className="h-1.5 w-1.5 rounded-full bg-purple-400" /> Production-ready code reviews baked in
            </li>
            <li className="flex items-center gap-2">
               <span className="h-1.5 w-1.5 rounded-full bg-purple-400" /> Export to GitHub, Docker, and your cloud of choice
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
