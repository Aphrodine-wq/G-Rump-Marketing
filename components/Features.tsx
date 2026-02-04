import React from 'react';
import { PenLine, Layers, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const featureCards = [
  {
    icon: PenLine,
    title: 'Describe',
    subtitle: 'From prompt to PRD',
    description:
      'Tell G-Rump what you want in natural language. It refines your idea into a structured product spec automatically.',
    bullets: [
      'Conversational prompting with follow-up questions',
      'Auto-generated PRDs, user stories, and acceptance criteria',
      'Instant scope alignment across stakeholders',
    ],
  },
  {
    icon: Layers,
    title: 'Design',
    subtitle: 'Architect with confidence',
    description:
      'Generate architecture diagrams, data contracts, and interface flows that stay in sync with your evolving product vision.',
    bullets: [
      'Visual system diagrams and sequence flows',
      'API and data layer definitions with version control',
      'Compliance-ready documentation out of the box',
    ],
  },
  {
    icon: Zap,
    title: 'Ship',
    subtitle: 'Production-ready code, instantly',
    description:
      'Compile entire applications with best-practice patterns, linted code, tests, and deployment scripts—ready for your repo.',
    bullets: [
      'Full-stack scaffolding for web, mobile, and backend',
      'Inline code reviews and refactors powered by multi-agent checks',
      'One-click export to GitHub, Docker, or your cloud',
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const Features: React.FC = () => {
  return (
    <section id="features" className="bg-gradient-to-b from-white to-purple-50/40 py-20 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[90rem] px-6 sm:px-8 lg:px-10">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-purple-200/60 bg-purple-50/50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-purple-600 backdrop-blur-sm">
            End-to-end workflow
          </span>
          <h2 className="mt-8 text-[2.75rem] font-bold tracking-tight text-[#1a1a2e] sm:text-[3.25rem]">
            Everything you need to ship—faster than ever.
          </h2>
          <p className="mt-6 text-xl text-gray-600 sm:text-2xl">
            G-Rump is the AI operating system for product builders. Align your teams, architect with clarity, and deploy production-ready code in minutes.
          </p>
        </motion.div>

        <motion.div
          className="mx-auto mt-24 grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {featureCards.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="relative flex h-full flex-col gap-6 rounded-3xl border border-purple-100/60 bg-white/60 p-8 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-purple-200 hover:bg-white/80 hover:shadow-2xl sm:p-10"
            >
              <div className="w-fit rounded-2xl border border-purple-100 bg-purple-50/80 p-3 text-purple-600 shadow-inner">
                <feature.icon size={24} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-500">
                  {feature.subtitle}
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-[#1a1a2e]">{feature.title}</h3>
                <p className="mt-4 text-base text-gray-600 sm:text-lg">{feature.description}</p>
              </div>
              <ul className="mt-4 space-y-3 text-sm font-medium text-gray-500">
                {feature.bullets.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-purple-400" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
