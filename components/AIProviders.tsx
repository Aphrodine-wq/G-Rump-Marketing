import React from 'react';
import { motion } from 'framer-motion';

const providers = [
  { name: 'Claude', logo: () => <p className="text-2xl font-bold tracking-tighter">Anthropic</p> },
  { name: 'Kimi', logo: () => <p className="text-2xl font-bold tracking-tighter">Moonshot AI</p> },
  { name: 'NVIDIA NIM', logo: () => <p className="text-2xl font-bold tracking-tighter">NVIDIA</p> },
  { name: 'Google', logo: () => <p className="text-2xl font-bold tracking-tighter">Google</p> },
  { name: 'OpenAI', logo: () => <p className="text-2xl font-bold tracking-tighter">OpenAI</p> },
  { name: 'Microsoft', logo: () => <p className="text-2xl font-bold tracking-tighter">Microsoft</p> },
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

const AIProviders: React.FC = () => {
  return (
    <section id="ai-providers" className="bg-white py-20 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[90rem] px-6 sm:px-8 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={itemVariants}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-purple-200/60 bg-purple-50/50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-purple-600 backdrop-blur-sm">
            Multi-provider coverage
          </span>
          <h2 className="mt-8 text-[2.5rem] font-bold tracking-tight text-[#1a1a2e] sm:text-[3rem]">
            Powered by the world’s best AI foundation models.
          </h2>
          <p className="mt-6 text-xl text-gray-600 sm:text-2xl">
            Mix and match providers per workload—pricing, latency, or capability. G-Rump orchestrates them seamlessly.
          </p>
        </motion.div>

        <motion.div
          className="mx-auto mt-24 grid max-w-5xl grid-cols-2 gap-8 sm:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {providers.map((provider) => (
            <motion.div
              key={provider.name}
              className="flex items-center justify-center rounded-3xl border border-purple-100/60 bg-white/80 px-8 py-10 text-center shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-200 hover:bg-white hover:shadow-xl"
              variants={itemVariants}
            >
              <div className="text-base font-semibold tracking-tight text-gray-600 hover:text-purple-500">
                <provider.logo />
                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-purple-400">{provider.name}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AIProviders;
