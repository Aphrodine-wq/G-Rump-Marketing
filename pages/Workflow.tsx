import React from 'react';
import { motion } from 'framer-motion';
import ModesAndFlows from '../components/ModesAndFlows';

const WorkflowPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen w-full bg-app text-[#1a1a2e]"
    >
      <div className="bg-subtle py-16 border-b border-[#e5e7eb]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full badge text-sm font-medium mb-6">
            <span className="pulse-dot"></span>
            How It Works
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-[#1a1a2e] mb-6">
            Simple Workflow
          </h1>
          <p className="text-xl text-[#4a4a5a] max-w-2xl mx-auto leading-relaxed">
            From idea to deployment in three easy steps. No complexity, just results.
          </p>
        </div>
      </div>
      
      {/* Clean Workflow Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <ModesAndFlows />
      </div>
    </motion.div>
  );
};

export default WorkflowPage;