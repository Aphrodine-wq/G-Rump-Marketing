import React from 'react';
import { motion } from 'framer-motion';

const logos = [
  { name: 'InnovateCorp', svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 4L4 24L24 44L44 24L24 4Z" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/><path d="M24 4L4 24L24 44L44 24L24 4Z" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/></svg>` },
  { name: 'QuantumLeap', svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="20" stroke="currentColor" stroke-width="4"/><circle cx="24" cy="24" r="10" stroke="currentColor" stroke-width="4"/></svg>` },
  { name: 'ApexIndustries', svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 44H44L24 4L4 44Z" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/></svg>` },
  { name: 'StellarSolutions', svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 4L30 18L44 20L34 30L36 44L24 38L12 44L14 30L4 20L18 18L24 4Z" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/></svg>` },
  { name: 'NexusEnterprises', svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="40" height="40" rx="8" stroke="currentColor" stroke-width="4"/><path d="M4 24H44" stroke="currentColor" stroke-width="4"/><path d="M24 4V44" stroke="currentColor" stroke-width="4"/></svg>` },
  { name: 'VisionaryLabs', svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 30C30.6274 30 36 24.6274 36 18C36 11.3726 30.6274 6 24 6C17.3726 6 12 11.3726 12 18C12 24.6274 17.3726 30 24 30Z" stroke="currentColor" stroke-width="4"/><path d="M12 30V42H36V30" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>` }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  },
};

const TrustedBy: React.FC = () => {
  return (
    <section className="bg-transparent py-16 sm:py-20">
      <div className="mx-auto max-w-6xl rounded-3xl border border-purple-100/70 bg-white/80 px-6 py-12 shadow-sm backdrop-blur-sm sm:px-10 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={itemVariants}
        >
          <h2 className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-purple-500">
            Trusted by innovators
          </h2>
          <p className="mt-3 text-center text-lg font-medium text-gray-500">
            Teams building the future with AI-native tooling
          </p>
        </motion.div>
        <motion.div
          className="mx-auto mt-10 grid max-w-3xl grid-cols-2 items-center gap-x-6 gap-y-8 sm:grid-cols-3 lg:max-w-4xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {logos.map((logo) => (
            <motion.div key={logo.name} className="flex justify-center" variants={itemVariants}>
              <div
                className="flex h-16 w-36 items-center justify-center rounded-2xl border border-purple-100 bg-white/90 text-gray-400 transition-all hover:border-purple-200 hover:text-purple-500"
                dangerouslySetInnerHTML={{ __html: logo.svg }}
                aria-label={logo.name}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBy;
