import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Code, MessageSquare, Zap } from 'lucide-react';
import { ClaudeLogo } from './ui/Icons';

const ClaudeSection: React.FC = () => {
  return (
    <div className="py-24 md:py-32 bg-[#0f0e0e] relative overflow-hidden">
      {/* Claude Orange/Warm Glows */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#d97757] opacity-10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#d97757] opacity-5 blur-[120px] rounded-full pointer-events-none"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#d9775710_1px,transparent_1px),linear-gradient(to_bottom,#d9775710_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
          
          {/* Content */}
          <div className="lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d97757]/10 border border-[#d97757]/20 text-[#d97757] text-xs font-bold uppercase tracking-widest mb-6"
            >
              <ClaudeLogo className="w-3 h-3" />
              Powered by Claude Opus 4.5
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight"
            >
              Reasoning Engine: <span className="text-[#d97757]">Claude Opus 4.5</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-lg mb-8 leading-relaxed font-light"
            >
              When complex architectural decisions need to be made, G-Agent consults Claude Opus 4.5. Its superior reasoning capabilities allow for deep understanding of system design patterns and edge cases.
            </motion.p>

            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'Reasoning Score', value: '96.8', sub: 'MMLU-Pro', icon: Brain },
                { label: 'Context Window', value: '500K', sub: 'Tokens', icon: MessageSquare },
                { label: 'Code Gen', value: 'SOTA', sub: 'SWE-Bench', icon: Code },
                { label: 'Safety', value: 'RLAIF', sub: 'Constitutional', icon: Zap },
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-[#d97757]/50 transition-colors group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <stat.icon size={18} className="text-[#d97757]" />
                    <span className="text-gray-400 text-xs uppercase tracking-wide">{stat.label}</span>
                  </div>
                  <div className="text-2xl font-bold text-white group-hover:text-[#d97757] transition-colors">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.sub}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Graphic / Visualization */}
          <div className="lg:w-1/2 w-full flex justify-center">
             <div className="relative w-full max-w-md aspect-square">
                {/* Neural Network Graphic */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 bg-[#d97757]/5 rounded-[3rem] border border-[#d97757]/20 backdrop-blur-sm flex items-center justify-center"
                >
                   <div className="w-3/4 h-3/4 bg-black rounded-3xl border border-[#d97757]/30 relative overflow-hidden shadow-[0_0_50px_rgba(217,119,87,0.2)]">
                      <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 100 100">
                         {/* Network connections */}
                         <line x1="20" y1="20" x2="50" y2="50" stroke="#d97757" strokeWidth="0.5" />
                         <line x1="80" y1="20" x2="50" y2="50" stroke="#d97757" strokeWidth="0.5" />
                         <line x1="20" y1="80" x2="50" y2="50" stroke="#d97757" strokeWidth="0.5" />
                         <line x1="80" y1="80" x2="50" y2="50" stroke="#d97757" strokeWidth="0.5" />
                         
                         <line x1="50" y1="50" x2="50" y2="20" stroke="#d97757" strokeWidth="0.5" />
                         <line x1="50" y1="50" x2="50" y2="80" stroke="#d97757" strokeWidth="0.5" />
                         <line x1="50" y1="50" x2="20" y2="50" stroke="#d97757" strokeWidth="0.5" />
                         <line x1="50" y1="50" x2="80" y2="50" stroke="#d97757" strokeWidth="0.5" />

                         {/* Nodes */}
                         <circle cx="50" cy="50" r="8" fill="#d97757" fillOpacity="0.2" stroke="#d97757" />
                         <circle cx="50" cy="50" r="4" fill="#d97757" className="animate-pulse" />
                         
                         <circle cx="20" cy="20" r="3" fill="#d97757" />
                         <circle cx="80" cy="20" r="3" fill="#d97757" />
                         <circle cx="20" cy="80" r="3" fill="#d97757" />
                         <circle cx="80" cy="80" r="3" fill="#d97757" />
                      </svg>
                   </div>
                </motion.div>
                
                {/* Floating Elements */}
                <motion.div 
                   animate={{ y: [0, -10, 0] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute top-0 left-0 bg-gray-900 border border-gray-700 p-3 rounded-lg shadow-xl"
                >
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#d97757]"></div>
                      <span className="text-xs font-mono text-gray-300">Reasoning...</span>
                   </div>
                </motion.div>

                <motion.div 
                   animate={{ y: [0, 10, 0] }}
                   transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                   className="absolute bottom-4 right-4 bg-gray-900 border border-gray-700 p-3 rounded-lg shadow-xl"
                >
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                      <span className="text-xs font-mono text-gray-300">Opus 4.5</span>
                   </div>
                </motion.div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ClaudeSection;
