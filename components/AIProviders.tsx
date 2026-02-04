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
    <section id="ai-providers" className="py-20 sm:py-28 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={itemVariants}
        >
          <h2 className="text-center text-lg font-semibold leading-8 text-gray-700">
            Powered by world-class, multi-provider AI
          </h2>
        </motion.div>
        <motion.div 
          className="mx-auto mt-10 grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-3 lg:mx-0 lg:max-w-none"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {providers.map((provider) => (
            <motion.div
              key={provider.name}
              className="col-span-1 flex justify-center"
              variants={itemVariants}
            >
              <div
                className="text-gray-400 hover:text-gray-800 transition-colors duration-300"
                aria-label={provider.name}
              >
                <provider.logo />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AIProviders;
