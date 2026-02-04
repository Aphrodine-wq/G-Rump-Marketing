import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Rocket, Code, CheckCircle } from 'lucide-react';

const flows = [
  {
    icon: MessageSquare,
    title: 'Conversational Development',
    subtitle: 'Use the chat-based workflow to ask questions, iterate on ideas, and generate code snippets. Perfect for quick tasks and exploration.',
    features: ['Code generation', 'Architectural advice', 'Project bootstrapping', 'Debugging assistance'],
    visual: (
      <div className="p-4 bg-gray-800 rounded-lg text-left text-sm font-mono">
        <p className="text-gray-400">&gt; g-rump: bootstrap a react app with vite and tailwind</p>
        <p className="text-green-400">...
        <br />Done. Project 'my-app' created.
        <br />Happy hacking!</p>
      </div>
    ),
  },
  {
    icon: Rocket,
    title: 'End-to-End Product Shipment',
    subtitle: 'Describe your vision in a single, comprehensive prompt. G-Rump will generate the full PRD, system architecture, and production-ready codebase.',
    features: ['Single-prompt completion', 'Multi-agent collaboration', 'Automated PRD generation', 'Full-stack code output'],
    visual: (
       <div className="p-4 bg-gray-100 rounded-lg text-center">
        <Rocket className="mx-auto h-12 w-12 text-purple-500" />
        <p className="mt-2 font-semibold">Project "Apollo" is building...</p>
        <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden"><div className="h-2 w-3/4 bg-purple-500"></div></div>
      </div>
    ),
  },
  {
    icon: Code,
    title: 'Targeted Code Generation',
    subtitle: 'Bring your own architecture and specifications. G-Rump’s hyper-compiler will generate high-quality, production-ready code for any platform.',
    features: ['BYO architecture', 'High-quality code', 'Multi-platform support', 'PR reviews & feedback'],
    visual: (
       <div className="p-4 bg-gray-800 rounded-lg text-left text-sm font-mono">
        <p className="text-gray-400"># Generating code from spec_v2.json...</p>
        <p><span className="text-green-400">[✓]</span> Generated api/routes.ts</p>
        <p><span className="text-green-400">[✓]</span> Generated web/components/Button.tsx</p>
        <p><span className="text-green-400">[✓]</span> Generated tests/api.test.ts</p>
      </div>
    ),
  },
];

const FlowSection: React.FC<{ flow: typeof flows[0]; index: number }> = ({ flow, index }) => {
  const isReversed = index % 2 !== 0;

  return (
    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <motion.div
        className={`lg:col-start-${isReversed ? 2 : 1}`}
        initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
      >
        <div className="relative aspect-[4/3] bg-white rounded-2xl shadow-2xl p-2 border border-gray-200/60">
          <div className="w-full h-full rounded-lg flex items-center justify-center">
            {flow.visual}
          </div>
        </div>
      </motion.div>
      
      <motion.div
        className={`lg:col-start-${isReversed ? 1 : 2} row-start-1`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
            <flow.icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">{flow.title}</h3>
        </div>
        <p className="text-gray-600 type-body-lg">{flow.subtitle}</p>
        <ul className="mt-6 space-y-3">
          {flow.features.map(feature => (
            <li key={feature} className="flex items-center gap-3 text-gray-700">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

const ModesAndFlows: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="max-w-3xl mx-auto lg:text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-base font-semibold leading-7 text-purple-600">Advanced Capabilities</h2>
          <p className="mt-2 type-h2 font-bold tracking-tight text-gray-900">
            Flexible & Powerful Workflows
          </p>
          <p className="mt-6 type-body-lg text-gray-600">
            Whether you're brainstorming, building, or refactoring, G-Rump adapts to your needs with three powerful modes of operation.
          </p>
        </motion.div>

        <div className="mt-20 space-y-20 lg:space-y-28">
          {flows.map((flow, index) => (
            <FlowSection key={flow.title} flow={flow} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModesAndFlows;
