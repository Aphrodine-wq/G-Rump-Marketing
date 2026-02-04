import React from 'react';
import { motion } from 'framer-motion';
import ModesAndFlows from '../components/ModesAndFlows';

const WorkflowPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white via-white to-purple-50/40 text-[#1a1a2e]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="relative overflow-hidden py-28 border-b border-purple-100/70">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,#ede9fe,transparent_65%)]" aria-hidden="true" />
          <div className="max-w-6xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-200 bg-purple-50 text-xs font-semibold uppercase tracking-[0.2em] text-purple-600 shadow-sm mb-6"
            >
              <span className="pulse-dot"></span>
              How It Works
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[2.75rem] md:text-[3.5rem] font-bold tracking-tight text-[#1a1a2e] mb-6"
            >
              Three Powerful Workflows
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-[#4a4a5a] max-w-2xl mx-auto leading-relaxed mb-4"
            >
              From idea to deployment in three flexible modes. No complexity, just results.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-base text-[#6b7280] max-w-3xl mx-auto"
            >
              <strong className="text-[#1a1a2e]">Chat</strong> is conversational AI with tools; <strong className="text-[#1a1a2e]">Ship</strong> takes you from describe → design → spec → code; <strong className="text-[#1a1a2e]">Codegen</strong> turns PRD + architecture into multi-agent code. Use the flow that fits your task.
            </motion.p>
          </div>
        </div>
        
        {/* Clean Workflow Section */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <ModesAndFlows />
        </div>
      </motion.div>
    </div>
  );
};

export default WorkflowPage;