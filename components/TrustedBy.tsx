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
    <div className="bg-white py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={itemVariants}
        >
          <h2 className="text-center text-lg font-semibold leading-8 text-gray-600">
            Trusted by the world's most innovative companies
          </h2>
        </motion.div>
        <motion.div 
          className="mx-auto mt-10 grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-3 lg:mx-0 lg:max-w-none"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {logos.map((logo) => (
            <motion.div
              key={logo.name}
              className="col-span-1 flex justify-center"
              variants={itemVariants}
            >
              <div
                className="w-32 h-16 text-gray-400 hover:text-gray-800 transition-colors duration-300"
                dangerouslySetInnerHTML={{ __html: logo.svg }}
                aria-label={logo.name}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TrustedBy;
