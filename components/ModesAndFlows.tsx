import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Rocket, Code, CheckCircle } from 'lucide-react';

const flows = [
  {
    icon: MessageSquare,
    title: 'Conversational Development',
    subtitle:
      'Ask questions, refine requirements, and generate targeted snippets with a conversational AI partner that understands your stack.',
    features: ['Code generation', 'Architectural guidance', 'Project bootstrapping', 'Debugging assistance'],
    visual: (
      <div className="relative h-full w-full rounded-2xl border border-white/10 bg-gradient-to-br from-[#0f172a] via-[#111c32] to-[#1e293b] p-6 text-left text-sm font-mono text-slate-200 shadow-xl">
        <div className="mb-4 flex gap-2 text-xs text-slate-500">
          <span className="rounded-full border border-slate-700/80 px-3 py-1 uppercase tracking-[0.18em]">chat</span>
          <span className="rounded-full border border-slate-700/80 px-3 py-1 uppercase tracking-[0.18em]">assist</span>
        </div>
        <p className="text-slate-400">&gt; g-rump bootstrap react-app --with tailwind</p>
        <div className="mt-4 space-y-2 text-emerald-400">
          <p>✔ Creating project skeleton…</p>
          <p>✔ Installing dependencies…</p>
          <p>✔ Wiring auth, data, and UI layers…</p>
        </div>
        <p className="mt-6 text-slate-300">
          Project <span className="text-purple-300">'launchpad'</span> ready in <span className="text-emerald-300">57s</span>.
        </p>
      </div>
    ),
  },
  {
    icon: Rocket,
    title: 'End-to-End Product Shipment',
    subtitle:
      'Describe your product vision once. G-Rump assembles PRDs, architecture, code, and deployment workflows in a single run.',
    features: ['Single-prompt completion', 'Multi-agent orchestration', 'Automated PRDs', 'Production-ready code'],
    visual: (
      <div className="flex h-full w-full flex-col justify-between rounded-2xl border border-purple-100 bg-white p-6 text-center shadow-xl">
        <Rocket className="mx-auto h-12 w-12 text-purple-500" />
        <div>
          <p className="text-sm font-semibold text-gray-700">Compiling project “Apollo”</p>
          <div className="mt-4 h-2 w-full rounded-full bg-purple-100">
            <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-purple-500 to-purple-400" />
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-2 text-left text-xs text-gray-500">
          <div className="rounded-lg border border-purple-100/70 bg-purple-50/70 px-3 py-2">Architecture</div>
          <div className="rounded-lg border border-purple-100/70 bg-purple-50/70 px-3 py-2">Docs</div>
          <div className="rounded-lg border border-purple-100/70 bg-purple-50/70 px-3 py-2">Frontend</div>
          <div className="rounded-lg border border-purple-100/70 bg-purple-50/70 px-3 py-2">Backend</div>
        </div>
      </div>
    ),
  },
  {
    icon: Code,
    title: 'Targeted Code Generation',
    subtitle:
      'Bring your own specs. G-Rump’s hyper-compiler produces precise modules, tests, and PR-ready diffs tailored to your architecture.',
    features: ['BYO architecture', 'High-quality code', 'Multi-platform support', 'In-line PR reviews'],
    visual: (
      <div className="relative h-full w-full rounded-2xl border border-white/10 bg-gradient-to-br from-[#0c1a2a] via-[#0f2538] to-[#14324d] p-6 font-mono text-sm text-sky-100 shadow-xl">
        <p className="text-sky-300"># compiling spec_v2.json</p>
        <div className="mt-4 space-y-2">
          <p>
            <span className="text-emerald-400">[✔]</span> api/routes.ts
          </p>
          <p>
            <span className="text-emerald-400">[✔]</span> web/components/Hero.tsx
          </p>
          <p>
            <span className="text-emerald-400">[✔]</span> infra/deploy.yml
          </p>
        </div>
        <div className="mt-6 rounded-xl border border-sky-300/30 bg-sky-300/10 px-4 py-3 text-xs text-sky-100">
          PR feedback: <span className="font-semibold text-white">3 suggestions auto-applied</span>
        </div>
      </div>
    ),
  },
];

const FlowSection: React.FC<{ flow: typeof flows[0]; index: number }> = ({ flow, index }) => {
  const isReversed = index % 2 !== 0;

  return (
    <motion.div
      className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] as const }}
    >
      <motion.div
        className={`order-2 overflow-hidden rounded-3xl border border-purple-100 bg-white/80 shadow-xl backdrop-blur-sm lg:order-${isReversed ? 2 : 1}`}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <div className="h-full w-full p-6">{flow.visual}</div>
      </motion.div>

      <div className={`order-1 flex flex-col justify-center lg:order-${isReversed ? 1 : 2}`}>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-purple-100 bg-purple-50/80 text-purple-600 shadow-inner">
            <flow.icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-500">
              Mode {index + 1}
            </p>
            <h3 className="mt-1 text-2xl font-semibold text-[#1a1a2e] sm:text-[1.75rem]">{flow.title}</h3>
          </div>
        </div>
        <p className="mt-4 text-base text-gray-600 sm:text-lg">{flow.subtitle}</p>
        <ul className="mt-6 space-y-3 text-sm text-gray-600 sm:text-base">
          {flow.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <CheckCircle className="mt-0.5 h-5 w-5 flex-none text-emerald-400" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const ModesAndFlows: React.FC = () => {
  return (
    <section id="how-it-works" className="overflow-hidden bg-white py-20 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[90rem] px-6 sm:px-8 lg:px-10">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-purple-200/60 bg-purple-50/50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-purple-600 backdrop-blur-sm">
            Advanced capabilities
          </span>
          <h2 className="mt-8 text-[2.75rem] font-bold tracking-tight text-[#1a1a2e] sm:text-[3.25rem]">
            Flexible flows for every stage of building.
          </h2>
          <p className="mt-6 text-xl text-gray-600 sm:text-2xl">
            Whether you are ideating, compiling, or refining, G-Rump adapts with dedicated modes that feel custom-built for your team.
          </p>
        </motion.div>

        <div className="mt-24 space-y-24 lg:space-y-32">
          {flows.map((flow, index) => (
            <FlowSection key={flow.title} flow={flow} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModesAndFlows;
