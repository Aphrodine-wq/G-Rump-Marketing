import React from 'react';
import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';

const HomeDownloads: React.FC = () => {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 sm:py-28">
        <motion.div
          className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl rounded-2xl sm:px-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="mx-auto max-w-2xl type-h2 font-bold tracking-tight text-white">
            Start Building Your Future, Today.
          </h2>
          <p className="mx-auto mt-6 max-w-xl type-body-lg text-gray-300">
            Download the G-Rump beta for Windows and experience the next generation of software development.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/downloads"
              className="btn-primary flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base"
            >
              <Download size={20} />
              Download for Windows
            </Link>
          </div>

          {/* Decorative elements */}
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
            aria-hidden="true"
          >
            <circle cx={512} cy={512} r={512} fill="url(#gradient-purple)" fillOpacity="0.7" />
            <defs>
              <radialGradient id="gradient-purple">
                <stop stopColor="#7c3aed" />
                <stop offset={1} stopColor="#4c1d95" />
              </radialGradient>
            </defs>
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeDownloads;
