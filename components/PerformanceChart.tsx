import React, { useEffect, useRef, useState } from 'react';
import { Zap, Timer, Server, Package, Cpu, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from './ui/Card';

const ComparisonBar = ({ label, traditional, grump, factor, icon: Icon, isVisible }: { label: string, traditional: string, grump: string, factor: string, icon: any, isVisible: boolean }) => (
  <div className="mb-10 last:mb-0 group">
    <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-purple-900/30 text-purple-400 border border-purple-500/30">
            <Icon size={18} />
        </div>
        <span className="font-bold text-gray-200 text-sm">{label}</span>
        <span className="ml-auto text-xs font-bold text-green-400 bg-green-900/30 border border-green-500/30 px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <Zap size={12} fill="currentColor" />
          {factor}x Faster
        </span>
    </div>
    
    {/* Comparison Visual */}
    <div className="space-y-3">
       {/* Traditional */}
       <div className="flex items-center gap-4">
          <div className="w-24 text-xs text-gray-500 font-mono text-right uppercase tracking-wider">Legacy</div>
          <div className="flex-1 h-10 bg-gray-800 rounded-lg relative overflow-hidden group-hover:bg-gray-700 transition-colors border border-gray-700">
             <div className={`absolute inset-0 flex items-center px-4 transition-all duration-1000 ease-out ${isVisible ? 'w-full' : 'w-0'}`}>
                <span className="text-xs text-gray-400 font-mono whitespace-nowrap font-medium">{traditional}</span>
             </div>
             {/* Striped Pattern */}
             <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 50%, #000 50%, #000 75%, transparent 75%, transparent)', backgroundSize: '10px 10px'}}></div>
          </div>
       </div>

       {/* G-Rump */}
       <div className="flex items-center gap-4">
          <div className="w-24 text-xs text-purple-400 font-bold font-mono text-right uppercase tracking-wider">G-Rump</div>
          <div className="flex-1 h-10 relative">
             <div 
                className={`absolute left-0 top-0 bottom-0 bg-gradient-to-r from-purple-600 to-purple-500 rounded-lg shadow-lg shadow-purple-500/20 flex items-center px-4 transition-all duration-1000 ease-out delay-200 overflow-hidden border border-purple-400/50`} 
                style={{ width: isVisible ? '8%' : '0%', minWidth: isVisible ? '70px' : '0px' }}
             >
                <span className="text-xs text-white font-mono font-bold whitespace-nowrap">{grump}</span>
             </div>
             <div className={`absolute left-0 top-0 bottom-0 bg-white opacity-20 animate-pulse rounded-lg transition-all duration-1000 ease-out delay-200`} style={{ width: isVisible ? '8%' : '0%', minWidth: isVisible ? '70px' : '0px' }}></div>
          </div>
       </div>
    </div>
  </div>
);

const SpecRow = ({ label, value, detail }: { label: string, value: string, detail: string }) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-800 last:border-0 hover:bg-white/5 transition-colors px-4 -mx-4 rounded-lg group cursor-default">
        <div className="text-sm font-medium text-gray-400 group-hover:text-gray-200 transition-colors">{label}</div>
        <div className="text-right">
            <div className="text-sm font-bold text-gray-200 font-mono group-hover:text-purple-400 transition-colors">{value}</div>
            <div className="text-[10px] text-gray-500">{detail}</div>
        </div>
    </div>
);

const PerformanceChart: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="py-32 bg-[#050505] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-900 to-transparent"></div>
      
      <div className="max-w-[90rem] mx-auto px-6 sm:px-8 lg:px-10">
        
        {/* Header */}
        <div className="text-center mb-24">
           <p className="text-gray-500 text-sm mb-4">How G-Rump stacks up on latency, throughput, and cold start.</p>
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/20 border border-purple-500/30 text-purple-400 text-xs font-bold uppercase tracking-widest mb-6"
           >
             <Cpu size={14} />
             Engineering Metrics
           </motion.div>
           <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6"
           >
             Specs & Performance
           </motion.h2>
           <motion.p 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="text-xl text-gray-400 max-w-2xl mx-auto font-light"
           >
             Engineering-grade metrics for mission-critical workloads. Optimized for the edge.
           </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-start mb-24">
          
          {/* Text Content */}
          <div className="lg:w-1/3 pt-8">
            <h3 className="text-3xl font-bold tracking-tight text-white mb-6">
              Built for <span className="text-purple-500">Speed</span>.
            </h3>
            <p className="text-gray-400 mb-10 leading-relaxed text-lg font-light">
              We rewrote the core orchestration layer in Rust. By optimizing compilation, parsing, and containerization, G-Rump eliminates the "waiting for localhost" downtime.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
               <Card className="p-6 border-gray-800 hover:border-purple-500/50 transition-colors bg-white/5" hoverEffect={true}>
                  <div className="text-4xl font-bold text-white mb-2">0.8s</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide font-bold">Cold Start</div>
               </Card>
               <Card className="p-6 border-gray-800 hover:border-purple-500/50 transition-colors bg-white/5" hoverEffect={true}>
                  <div className="text-4xl font-bold text-purple-500 mb-2">Rust</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide font-bold">Core Engine</div>
               </Card>
            </div>
          </div>
          
          {/* Custom Chart Card */}
          <div ref={chartRef} className="lg:w-2/3 w-full">
             <Card className="p-8 md:p-10 relative overflow-visible border-gray-800 bg-gray-900/50 shadow-xl shadow-purple-900/10">
                <div className="absolute -top-10 -right-10 p-6 opacity-[0.03] pointer-events-none transform rotate-12">
                   <Zap size={200} className="text-white" />
                </div>
                
                <ComparisonBar 
                   label="Backend Build Time" 
                   traditional="45.0s (Webpack)" 
                   grump="2.5s" 
                   factor="18"
                   icon={Server} 
                   isVisible={isVisible}
                />
                <ComparisonBar 
                   label="Intent Parsing" 
                   traditional="120ms (Python)" 
                   grump="8ms" 
                   factor="15"
                   icon={Timer} 
                   isVisible={isVisible}
                />
                <ComparisonBar 
                   label="Container Build" 
                   traditional="180s (Standard)" 
                   grump="25s" 
                   factor="7"
                   icon={Package} 
                   isVisible={isVisible}
                />
             </Card>
          </div>

        </div>

        {/* Detailed Specs Table */}
        <Card className="bg-white/5 border-gray-800 p-8 md:p-12 hover:bg-white/10 hover:border-purple-500/30 hover:shadow-xl transition-all duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
               <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                  <Cpu size={28} className="text-purple-500"/>
                  System Specifications
               </h3>
               <button className="text-sm font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1 group">
                  View Full Datasheet <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
               </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
               <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                     <div className="w-8 h-px bg-gray-700"></div> Runtime Environment
                  </h4>
                  <div className="space-y-1">
                      <SpecRow label="Core Engine" value="Rust 1.79" detail="Actix-Web / Tokio" />
                      <SpecRow label="JS Runtime" value="V8 Isolate" detail="Zero-copy serialization" />
                      <SpecRow label="WASM Support" value="WasmEdge" detail="Sandboxed execution" />
                      <SpecRow label="Cold Start" value="< 10ms" detail="Snapshot restoration" />
                  </div>
               </div>
               
               <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                     <div className="w-8 h-px bg-gray-700"></div> Infrastructure & Security
                  </h4>
                   <div className="space-y-1">
                      <SpecRow label="Encryption" value="AES-256-GCM" detail="At rest & in transit" />
                      <SpecRow label="Compliance" value="SOC2 Type II" detail="HIPAA Ready" />
                      <SpecRow label="Global Edge" value="35 Regions" detail="Anycast routing" />
                      <SpecRow label="SLA" value="99.99%" detail="Enterprise tier" />
                   </div>
               </div>
            </div>
        </Card>

      </div>
    </div>
  );
};

export default PerformanceChart;
