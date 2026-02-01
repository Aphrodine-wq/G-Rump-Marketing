import React from 'react';
import { motion } from 'framer-motion';
import { Moon, FileText, Zap, Globe } from 'lucide-react';
import { KimiLogo } from './ui/Icons';

const KimiSection: React.FC = () => {
  return (
    <div className="py-24 md:py-32 bg-[#050505] relative overflow-hidden">
      {/* Kimi Blue/Moon Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#60a5fa] opacity-10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#60a5fa] opacity-5 blur-[120px] rounded-full pointer-events-none"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#60a5fa10_1px,transparent_1px),linear-gradient(to_bottom,#60a5fa10_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Content */}
          <div className="lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#60a5fa]/10 border border-[#60a5fa]/20 text-[#60a5fa] text-xs font-bold uppercase tracking-widest mb-6"
            >
              <KimiLogo className="w-3 h-3" />
              Moonshot AI
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight"
            >
              Long-Context Mastery: <span className="text-[#60a5fa]">Kimi K2.5</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-lg mb-8 leading-relaxed font-light"
            >
              For massive documentation analysis and codebase refactoring, G-Agent taps into Kimi K2.5. Its ability to process millions of tokens losslessly ensures no detail is ever missed.
            </motion.p>

            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'Context Length', value: '2M+', sub: 'Lossless Tokens', icon: FileText },
                { label: 'Retrieval', value: '100%', sub: 'Needle in Haystack', icon: Zap },
                { label: 'Language', value: 'Multi', sub: 'Native CN/EN', icon: Globe },
                { label: 'Latency', value: 'Low', sub: 'Optimized Cache', icon: Moon },
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-[#60a5fa]/50 transition-colors group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <stat.icon size={18} className="text-[#60a5fa]" />
                    <span className="text-gray-400 text-xs uppercase tracking-wide">{stat.label}</span>
                  </div>
                  <div className="text-2xl font-bold text-white group-hover:text-[#60a5fa] transition-colors">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.sub}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Graphic / Visualization */}
          <div className="lg:w-1/2 w-full flex justify-center">
             <div className="relative w-full max-w-md aspect-square">
                {/* Book/Docs Graphic */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 bg-[#60a5fa]/5 rounded-[3rem] border border-[#60a5fa]/20 backdrop-blur-sm flex items-center justify-center"
                >
                   <div className="w-3/4 h-3/4 bg-black rounded-3xl border border-[#60a5fa]/30 relative overflow-hidden shadow-[0_0_50px_rgba(96,165,250,0.2)]">
                      {/* Scrolling Text Lines */}
                      <div className="absolute inset-4 flex flex-col gap-2 opacity-30">
                         {Array.from({ length: 15 }).map((_, i) => (
                           <motion.div 
                             key={i}
                             initial={{ x: -100 }}
                             animate={{ x: 0 }}
                             transition={{ duration: 2, delay: i * 0.1, repeat: Infinity, repeatDelay: 1 }}
                             className="h-2 bg-[#60a5fa] rounded-full w-full"
                             style={{ width: `${Math.random() * 50 + 50}%`, opacity: Math.random() * 0.5 + 0.5 }}
                           />
                         ))}
                      </div>
                      
                      {/* Scanning Beam */}
                      <motion.div 
                        animate={{ top: ['0%', '100%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 right-0 h-8 bg-gradient-to-b from-[#60a5fa]/50 to-transparent blur-sm"
                      />
                   </div>
                </motion.div>
                
                {/* Floating Elements */}
                <motion.div 
                   animate={{ y: [0, -10, 0] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute -top-4 -right-4 bg-gray-900 border border-gray-700 p-3 rounded-lg shadow-xl"
                >
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#60a5fa]"></div>
                      <span className="text-xs font-mono text-gray-300">Reading 2M+ Tokens</span>
                   </div>
                </motion.div>

                <motion.div 
                   animate={{ y: [0, 10, 0] }}
                   transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                   className="absolute -bottom-4 -left-4 bg-gray-900 border border-gray-700 p-3 rounded-lg shadow-xl"
                >
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                      <span className="text-xs font-mono text-gray-300">Kimi K2.5</span>
                   </div>
                </motion.div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default KimiSection;
