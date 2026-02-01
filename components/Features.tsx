import React from 'react';
import { Zap, Shield, Users, Database } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from './ui/Card';

const Features: React.FC = () => {
   return (
      <div className="py-32 bg-white border-t border-gray-100 relative overflow-hidden text-gray-900">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="mb-20 text-center md:text-left">
               <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 mb-6"
               >
                  System Capabilities
               </motion.h2>
               <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-xl text-gray-500 max-w-2xl font-light leading-relaxed"
               >
                  Full-system control with local Rust compilation and autonomous docker management.
               </motion.p>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 min-h-[640px]">

               {/* Card 1: Main Feature - Rust Compiler */}
               <Card className="md:col-span-2 md:row-span-2 p-10 flex flex-col justify-between group relative overflow-hidden bg-white border border-gray-200 shadow-xl hover:shadow-2xl hover:shadow-purple-500/10 hover:border-purple-200 transition-all duration-300">
                  <div className="relative z-10">
                     <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-8 shadow-sm border border-purple-100 group-hover:scale-110 transition-transform duration-500 group-hover:bg-purple-100">
                        <Zap size={28} className="text-purple-600" />
                     </div>
                     <h3 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">18x Faster Builds</h3>
                     <p className="text-gray-500 leading-relaxed max-w-sm mb-8 text-lg">
                        Rust-based SWC pipeline. Compiles intent to Wasm in 2.5s.
                     </p>
                  </div>

                  {/* Scrolling Terminal Visual - Dark Mode for contrast */}
                  <div className="mt-auto relative h-48 w-full bg-[#1e1e1e] rounded-xl border border-gray-800 overflow-hidden shadow-inner group-hover:scale-[1.02] transition-transform duration-500">
                     <div className="absolute top-0 left-0 right-0 h-8 bg-[#252526] flex items-center px-4 gap-2 border-b border-gray-800 z-10">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
                     </div>
                     <div className="p-5 pt-12 font-mono text-xs text-gray-400 leading-relaxed opacity-90">
                        <div className="animate-scroll">
                           <p className="text-green-400 font-bold">➜ g-rump system --init</p>
                           <p>[0.001s] Analyzing Docker daemon... <span className="text-gray-500">Connected</span></p>
                           <p>[0.045s] Optimizing container runtime... <span className="text-gray-500">Done</span></p>
                           <p className="text-blue-400 font-bold">[0.102s] System Control Active.</p>
                           <p className="mt-4 text-green-400 font-bold">➜ g-rump deploy</p>
                           <p className="text-purple-400 font-bold">Orchestrating containers...</p>
                           {/* Repeat for continuous scroll illusion */}
                           <p className="mt-6 text-green-400 font-bold">➜ g-rump system --init</p>
                           <p>[0.001s] Analyzing Docker daemon...</p>
                        </div>
                     </div>
                     <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#1e1e1e] to-transparent pointer-events-none"></div>
                  </div>
               </Card>

               {/* Card 2: Cost */}
               <Card className="md:col-span-1 md:row-span-1 bg-white border border-gray-200 shadow-lg text-gray-900 flex flex-col justify-between group relative overflow-hidden hover:border-green-200 transition-all p-6">
                  <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-green-50 to-transparent"></div>
                  <div className="flex justify-between items-start relative z-10">
                     <div className="p-3 bg-green-50 rounded-xl border border-green-100 group-hover:bg-green-100 transition-colors"><Database size={24} className="text-green-600" /></div>
                     <span className="text-green-700 font-mono text-xs border border-green-200 bg-green-50 px-3 py-1.5 rounded-full font-bold shadow-sm">-60% Cost</span>
                  </div>
                  <div className="relative z-10">
                     <h3 className="text-xl font-bold mb-2 group-hover:text-green-600 transition-colors">Smart Routing</h3>
                     <p className="text-gray-500 text-sm leading-relaxed">NVIDIA NIM optimized. Minimal token usage.</p>
                  </div>

                  {/* Animated Ticker */}
                  <div className="absolute bottom-4 right-4 text-[10px] font-mono text-green-600/70 flex flex-col items-end opacity-0 group-hover:opacity-100 transition-opacity">
                     <span>TOKENS_SAVED: 4,021</span>
                     <span>$0.42 / req</span>
                  </div>
               </Card>

               {/* Card 3: Security */}
               <Card className="md:col-span-1 md:row-span-1 flex flex-col justify-between group bg-white border border-gray-200 shadow-lg hover:border-blue-200 transition-all p-6">
                  <div className="p-3 bg-blue-50 w-fit rounded-xl border border-blue-100 relative mb-4">
                     <Shield size={24} className="text-blue-600" />
                     <div className="absolute inset-0 bg-blue-400/20 blur-lg rounded-full opacity-0 group-hover:opacity-50 animate-pulse transition-opacity"></div>
                  </div>
                  <div>
                     <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Enterprise Ready</h3>
                     <p className="text-gray-500 text-sm leading-relaxed">PII filtering, SBOMs, and strict guardrails.</p>
                  </div>
               </Card>

               {/* Card 4: Agents */}
               <Card className="md:col-span-2 md:row-span-1 bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-purple-200 transition-all relative overflow-hidden">
                  {/* Radar Scan Effect */}
                  <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_300deg,rgba(168,85,247,0.05)_360deg)] animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl"></div>

                  <div className="flex-1 text-center md:text-left relative z-10 p-6">
                     <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
                        <Users size={20} className="text-purple-600" />
                        <span className="text-purple-600 font-bold text-xs uppercase tracking-widest">Command Center</span>
                     </div>
                     <h3 className="text-2xl font-bold text-gray-900 mb-3">System-Wide Control</h3>
                     <p className="text-gray-500 text-sm max-w-md mx-auto md:mx-0 leading-relaxed">
                        Autonomous agents that manage your Docker containers, file systems, and deployments.
                     </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 p-6 relative z-10 pr-8">
                     <div className="bg-green-50 text-green-700 text-xs font-mono py-2 px-3 rounded-lg border border-green-200 flex items-center gap-2 shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> DOCKER
                     </div>
                     <div className="bg-purple-50 text-purple-700 text-xs font-mono py-2 px-3 rounded-lg border border-purple-200 flex items-center gap-2 shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div> FILES
                     </div>
                     <div className="bg-blue-50 text-blue-700 text-xs font-mono py-2 px-3 rounded-lg border border-blue-200 flex items-center gap-2 shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div> NET
                     </div>
                     <div className="bg-orange-50 text-orange-700 text-xs font-mono py-2 px-3 rounded-lg border border-orange-200 flex items-center gap-2 shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div> SHELL
                     </div>
                  </div>
               </Card>
            </div>
         </div>
      </div>
   );
};

export default Features;
