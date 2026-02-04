import React from 'react';
import { PenLine, Layers, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: PenLine,
    title: 'Describe',
    description: 'Start with a prompt. Describe your idea in plain English, and let G-Rump handle the translation to code.',
  },
  {
    icon: Layers,
    title: 'Design',
    description: 'Instantly generate system architecture, user flows, and even product requirement documents.',
  },
  {
    icon: Zap,
    title: 'Ship',
    description: 'Get production-ready code for your entire stack. Deploy with confidence and iterate in minutes, not weeks.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  },
};

const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 sm:py-28 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          className="max-w-2xl mx-auto lg:text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-base font-semibold leading-7 text-purple-600">How G-Rump Works</h2>
          <p className="mt-2 type-h2 font-bold tracking-tight text-gray-900">
            Everything you need to ship, faster.
          </p>
          <p className="mt-6 type-body-lg text-gray-600">
            A new standard for software development. Go from concept to production-ready code with a workflow that’s up to 10x faster.
          </p>
        </motion.div>
        
        <motion.div 
          className="mx-auto mt-16 max-w-2xl lg:mt-20 lg:max-w-none"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                className="flex flex-col p-8 bg-white rounded-2xl shadow-lg border border-gray-200/80"
                variants={itemVariants}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{feature.title}</h3>
                </div>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
