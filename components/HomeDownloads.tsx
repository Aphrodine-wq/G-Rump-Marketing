import React from 'react';
import { Link } from 'react-router-dom';
import { Download, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';

const HomeDownloads: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-white via-white to-purple-50/40">
      <div className="mx-auto max-w-[90rem] px-6 py-12 sm:py-20 lg:py-28 sm:px-8 lg:px-10">
        <motion.div
          className="relative overflow-hidden rounded-3xl border border-purple-100 bg-white/80 px-6 py-16 text-center shadow-lg backdrop-blur-sm sm:px-12 sm:py-20"
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_#ede9fe_0%,_transparent_55%)]"
            aria-hidden="true"
          />
          <div className="mx-auto max-w-2xl">
            <h2 className="type-h2 font-bold tracking-tight text-gray-900 sm:text-[2.5rem]">
              Start Building in Minutes.
            </h2>
            <p className="mt-6 text-lg text-gray-600 sm:text-xl">
              Download G-Agent, ship G-Rump. The entire workflow—from prompt to production-ready code—is just one click away.
            </p>
          </div>

          <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Button asChild className="min-w-[220px]">
              <Link to="/downloads">
                <Download size={18} />
                Download G-Agent
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="min-w-[220px] border-purple-200 text-purple-600 hover:bg-purple-50"
            >
              <a href="https://github.com/Aphrodine-wq/g-rump.com" target="_blank" rel="noopener noreferrer">
                <ExternalLink size={18} />
                View source on GitHub
              </a>
            </Button>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 text-sm text-gray-500 sm:flex-row">
            <span>Free during beta · No credit card required</span>
            <span className="hidden h-3 w-px bg-gray-200 sm:block" aria-hidden="true" />
            <span>Includes CLI + desktop builds for every platform</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeDownloads;
