import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Brain, Activity } from 'lucide-react';
import { NvidiaLogo } from './ui/Icons';

const NvidiaSection: React.FC = () => {
  return (
    <div className="py-24 md:py-32 bg-subtle relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#e5e7eb_1px,transparent_0)] bg-[size:40px_40px] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Content */}
          <div className="lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge text-xs font-bold uppercase tracking-widest mb-6"
            >
              <NvidiaLogo className="w-3 h-3" />
              Powered by NVIDIA AI
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-[#1a1a2e] mb-6 tracking-tight leading-tight"
            >
              Next-Gen Inference with <span className="text-[#7c3aed]">NemoTRON</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[#4a4a5a] text-lg mb-3 leading-relaxed font-light"
            >
              G-Rump leverages the massive parallelism of NVIDIA GPUs and the cutting-edge NemoTRON-4 340B model to parse architectural intent with unprecedented accuracy and speed.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-[#6b7280] text-body-sm mb-8"
            >
              Used in G-Rump for high-throughput intent parsing and codegen on GPU.
            </motion.p>

            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'Inference Speed', value: '8ms', sub: 'Per Token', icon: Zap },
                { label: 'Model Accuracy', value: '98.4%', sub: 'HumanEval', icon: Brain },
                { label: 'Context Window', value: '128K', sub: 'Tokens', icon: Activity },
                { label: 'Throughput', value: '450', sub: 'Req/Sec', icon: Cpu },
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                  className="feature-card rounded-xl p-4 group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <stat.icon size={18} className="text-[#7c3aed]" />
                    <span className="text-[#6b7280] text-xs uppercase tracking-wide">{stat.label}</span>
                  </div>
                  <div className="text-2xl font-bold text-[#1a1a2e] group-hover:text-[#7c3aed] transition-colors">{stat.value}</div>
                  <div className="text-xs text-[#6b7280]">{stat.sub}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Graphic / Visualization */}
          <div className="lg:w-1/2 w-full flex justify-center">
             <div className="relative w-full max-w-md aspect-square">
                {/* Chip Graphic */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 bg-[#76b900]/5 rounded-[3rem] border border-[#76b900]/20 backdrop-blur-sm flex items-center justify-center"
                >
                   <div className="w-3/4 h-3/4 bg-black rounded-3xl border border-[#76b900]/30 relative overflow-hidden shadow-[0_0_50px_rgba(118,185,0,0.2)]">
                      {/* Inner Circuit Lines */}
                      <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100">
                         <path d="M 10 10 L 30 30 L 30 70 L 10 90" stroke="#76b900" strokeWidth="0.5" fill="none" />
                         <path d="M 90 10 L 70 30 L 70 70 L 90 90" stroke="#76b900" strokeWidth="0.5" fill="none" />
                         <path d="M 30 30 L 70 30" stroke="#76b900" strokeWidth="0.5" fill="none" />
                         <path d="M 30 70 L 70 70" stroke="#76b900" strokeWidth="0.5" fill="none" />
                         <rect x="40" y="40" width="20" height="20" stroke="#76b900" strokeWidth="1" fill="none" />
                         <circle cx="50" cy="50" r="5" fill="#76b900" className="animate-pulse" />
                      </svg>
                      
                      {/* Animated Particles */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                         <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-[#76b900] rounded-full shadow-[0_0_10px_#76b900] animate-ping"></div>
                         <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-[#76b900] rounded-full shadow-[0_0_10px_#76b900] animate-ping delay-300"></div>
                      </div>
                   </div>
                </motion.div>
                
                {/* Floating Elements */}
                <motion.div 
                   animate={{ y: [0, -10, 0] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute -top-4 -right-4 bg-gray-900 border border-gray-700 p-3 rounded-lg shadow-xl"
                >
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-xs font-mono text-gray-300">GPU: Active</span>
                   </div>
                </motion.div>

                <motion.div 
                   animate={{ y: [0, 10, 0] }}
                   transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                   className="absolute -bottom-4 -left-4 bg-gray-900 border border-gray-700 p-3 rounded-lg shadow-xl"
                >
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#76b900]"></div>
                      <span className="text-xs font-mono text-gray-300">NemoTRON-4</span>
                   </div>
                </motion.div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NvidiaSection;
