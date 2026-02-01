import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Server, Shield, Globe } from 'lucide-react';
import { MicrosoftLogo } from './ui/Icons';

const MicrosoftSection: React.FC = () => {
  return (
    <div className="py-24 md:py-32 bg-[#000000] relative overflow-hidden">
      {/* Microsoft Blue/Cyan Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00a4ef] opacity-10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#7fba00] opacity-5 blur-[120px] rounded-full pointer-events-none"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00a4ef10_1px,transparent_1px),linear-gradient(to_bottom,#00a4ef10_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Content */}
          <div className="lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00a4ef]/10 border border-[#00a4ef]/20 text-[#00a4ef] text-xs font-bold uppercase tracking-widest mb-6"
            >
              <MicrosoftLogo className="w-3 h-3" />
              Microsoft Azure AI
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight"
            >
              Infrastructure: <span className="text-[#00a4ef]">Agent Lightning</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-lg mb-8 leading-relaxed font-light"
            >
              Powered by Microsoft's cutting-edge Agent Lightning framework. G-Agent leverages Azure's global infrastructure for sub-millisecond latency and enterprise-grade security compliance.
            </motion.p>

            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'Throughput', value: '100K+', sub: 'Req/sec', icon: Zap },
                { label: 'Uptime', value: '99.99%', sub: 'SLA Guaranteed', icon: Server },
                { label: 'Security', value: 'SOC2', sub: 'Type II Compliant', icon: Shield },
                { label: 'Network', value: 'Global', sub: '60+ Regions', icon: Globe },
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-[#00a4ef]/50 transition-colors group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <stat.icon size={18} className="text-[#00a4ef]" />
                    <span className="text-gray-400 text-xs uppercase tracking-wide">{stat.label}</span>
                  </div>
                  <div className="text-2xl font-bold text-white group-hover:text-[#00a4ef] transition-colors">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.sub}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Graphic / Visualization */}
          <div className="lg:w-1/2 w-full flex justify-center">
             <div className="relative w-full max-w-md aspect-square">
                {/* Windows/Azure Graphic */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 bg-[#00a4ef]/5 rounded-[2rem] border border-[#00a4ef]/20 backdrop-blur-sm flex items-center justify-center overflow-hidden"
                >
                   {/* Animated Window Panes */}
                   <div className="grid grid-cols-2 gap-4 p-8 w-full h-full relative z-10">
                      {[0, 1, 2, 3].map((i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, scale: 0.5 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.2, duration: 0.5 }}
                          className={`rounded-xl border border-white/10 relative overflow-hidden group
                            ${i === 0 ? 'bg-[#f25022]/20 border-[#f25022]/30' : ''}
                            ${i === 1 ? 'bg-[#7fba00]/20 border-[#7fba00]/30' : ''}
                            ${i === 2 ? 'bg-[#00a4ef]/20 border-[#00a4ef]/30' : ''}
                            ${i === 3 ? 'bg-[#ffb900]/20 border-[#ffb900]/30' : ''}
                          `}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          {/* Inner content simulation */}
                          <div className="absolute bottom-3 left-3 right-3 h-1 bg-white/20 rounded-full"></div>
                          <div className="absolute bottom-6 left-3 w-1/2 h-1 bg-white/10 rounded-full"></div>
                        </motion.div>
                      ))}
                   </div>

                   {/* Background Glow */}
                   <div className="absolute inset-0 bg-gradient-to-br from-[#00a4ef]/20 via-transparent to-[#7fba00]/20 opacity-50 blur-2xl"></div>
                </motion.div>
                
                {/* Floating Elements */}
                <motion.div 
                   animate={{ y: [0, -10, 0] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute -top-6 -right-6 bg-gray-900 border border-gray-700 p-4 rounded-xl shadow-2xl"
                >
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#00a4ef] flex items-center justify-center">
                        <Zap size={16} className="text-white" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 font-mono">Agent Status</div>
                        <div className="text-sm font-bold text-white">Lightning Fast</div>
                      </div>
                   </div>
                </motion.div>

                <motion.div 
                   animate={{ y: [0, 10, 0] }}
                   transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                   className="absolute -bottom-6 -left-6 bg-gray-900 border border-gray-700 p-4 rounded-xl shadow-2xl"
                >
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#7fba00] flex items-center justify-center">
                        <Shield size={16} className="text-white" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 font-mono">Security</div>
                        <div className="text-sm font-bold text-white">Enterprise Ready</div>
                      </div>
                   </div>
                </motion.div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MicrosoftSection;