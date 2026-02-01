import React, { useState, useEffect } from 'react';
import { 
  Terminal, GitBranch, Globe, CheckCircle, 
  ArrowRight, Database, Server, Cloud, Code,
  Cpu, Layers, Zap, Activity, Lock, Share2, HardDrive
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

type WorkflowStep = 'intent' | 'architect' | 'deploy';

const ModesAndFlows: React.FC = () => {
  const [step, setStep] = useState<WorkflowStep>('intent');
  const [terminalText, setTerminalText] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const fullCommand = 'g-agent open vscode --file "modes_and_flows.tsx" --edit';

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep('architect'), 4500),
      setTimeout(() => setStep('deploy'), 10000),
      setTimeout(() => setShowSuccess(true), 15000)
    ];
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  useEffect(() => {
    if (step === 'intent') {
      let index = 0;
      const interval = setInterval(() => {
        if (index <= fullCommand.length) {
          setTerminalText(fullCommand.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [step]);

  const steps = [
    { id: 'intent', label: '1. INTENT', icon: Terminal },
    { id: 'architect', label: '2. ARCHITECTURE', icon: GitBranch },
    { id: 'deploy', label: '3. DEPLOY', icon: Globe }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto font-sans">
      {/* Premium Step Indicators */}
      <div className="flex items-center justify-center gap-6 mb-16">
        {steps.map((item, index) => (
          <div key={item.id} className="flex items-center gap-4">
            <div className={`flex items-center gap-3 px-5 py-2.5 rounded-full border transition-all duration-500 ${
              step === item.id 
                ? 'bg-black text-white border-black shadow-lg scale-105' 
                : 'bg-white text-gray-400 border-gray-200'
            }`}>
              <item.icon size={16} strokeWidth={2.5} />
              <span className="text-xs font-bold tracking-widest uppercase">{item.label}</span>
            </div>
            {index < 2 && (
              <div className="h-px w-12 bg-gray-200"></div>
            )}
          </div>
        ))}
      </div>

      {/* Main Stage */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] min-h-[600px] relative overflow-hidden">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none"></div>

        <AnimatePresence mode="wait">
          {/* === STEP 1: INTENT (Modern Terminal) === */}
          {step === 'intent' && (
            <motion.div 
              key="intent"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="absolute inset-0 flex items-center justify-center p-12"
            >
              <div className="w-full max-w-3xl">
                <div className="bg-[#1e1e1e] rounded-xl shadow-2xl overflow-hidden ring-1 ring-white/10">
                  <div className="bg-[#2d2d2d] px-4 py-3 flex items-center gap-2 border-b border-white/5">
                    <div className="flex gap-2 mr-4">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                    </div>
                    <span className="text-xs text-gray-400 font-mono flex items-center gap-2">
                      <Terminal size={12} />
                      g-agent-cli — 80x24
                    </span>
                  </div>
                  <div className="p-8 font-mono text-base leading-relaxed text-gray-300 min-h-[240px]">
                    <div className="flex gap-3">
                      <span className="text-[#27c93f] font-bold">➜</span>
                      <span className="text-purple-400 font-bold">~</span>
                      <span>{terminalText}<span className="animate-pulse inline-block w-2.5 h-5 bg-gray-400 align-middle ml-1"></span></span>
                    </div>
                    {terminalText === fullCommand && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-4 space-y-2 text-sm text-gray-400"
                      >
                        <div>[info] G-Agent taking control...</div>
                        <div className="text-purple-400">[exec] Opening VS Code...</div>
                        <div className="text-purple-400">[exec] Reading file system...</div>
                        <div className="pl-4 text-gray-500">├─ /src/components/Modes.tsx</div>
                        <div className="pl-4 text-gray-500">└─ /src/utils/api.ts</div>
                        <div className="text-green-400 mt-2">[ok] Environment ready. Initiating workflow.</div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* === STEP 2: ARCHITECT (Expanded Premium Diagram) === */}
          {step === 'architect' && (
            <motion.div 
              key="architect"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="relative w-full max-w-6xl h-[500px]">
                {/* Connecting Curves (Animated) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                  <defs>
                    <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#9333ea" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#22c55e" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                  
                  {/* Paths */}
                  {/* G-Agent -> Gateway */}
                  <motion.path d="M 150 250 C 250 250, 250 250, 350 250" stroke="url(#flowGradient)" strokeWidth="3" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
                  
                  {/* Gateway -> Auth */}
                  <motion.path d="M 450 250 C 500 250, 500 150, 550 150" stroke="url(#flowGradient)" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.2 }} />
                  
                  {/* Gateway -> Service */}
                  <motion.path d="M 450 250 C 500 250, 500 250, 650 250" stroke="url(#flowGradient)" strokeWidth="3" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.4 }} />
                  
                  {/* Service -> Redis */}
                  <motion.path d="M 750 250 C 800 250, 800 150, 850 150" stroke="url(#flowGradient)" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.6 }} />
                  
                  {/* Service -> DB */}
                  <motion.path d="M 750 250 C 800 250, 800 350, 850 350" stroke="url(#flowGradient)" strokeWidth="3" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.6 }} />

                  {/* Animated Particles - HIGH TRAFFIC */}
                  {[
                    { path: "M 150 250 C 250 250, 250 250, 350 250", delay: 0, color: "#9333ea" },
                    { path: "M 150 250 C 250 250, 250 250, 350 250", delay: 1, color: "#9333ea" }, // Parallel
                    { path: "M 450 250 C 500 250, 500 150, 550 150", delay: 0.2, color: "#22c55e" },
                    { path: "M 450 250 C 500 250, 500 250, 650 250", delay: 0.4, color: "#9333ea" },
                    { path: "M 450 250 C 500 250, 500 250, 650 250", delay: 1.4, color: "#9333ea" }, // Parallel
                    { path: "M 750 250 C 800 250, 800 150, 850 150", delay: 0.6, color: "#22c55e" },
                    { path: "M 750 250 C 800 250, 800 350, 850 350", delay: 0.6, color: "#22c55e" },
                    { path: "M 750 250 C 800 250, 800 350, 850 350", delay: 1.6, color: "#22c55e" }, // Parallel
                  ].map((p, i) => (
                    <circle key={i} r="3" fill={p.color} className="drop-shadow-[0_0_2px_rgba(255,255,255,0.8)]">
                      <animateMotion dur="1.5s" begin={`${p.delay}s`} repeatCount="indefinite" path={p.path} />
                    </circle>
                  ))}
                </svg>

                {/* Nodes */}
                
                {/* 1. G-Agent */}
                <motion.div className="absolute top-1/2 left-[50px] -translate-y-1/2 w-24 h-24 bg-white rounded-2xl shadow-xl border border-purple-100 flex flex-col items-center justify-center z-10" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <div className="w-12 h-12 mb-1 animate-pulse"><Logo size="100%" /></div>
                  <span className="text-xs font-bold text-purple-900">G-Agent</span>
                </motion.div>

                {/* 2. OS / Terminal */}
                <motion.div 
                  className="absolute top-1/2 left-[350px] -translate-y-1/2 w-32 h-32 bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col items-center justify-center z-10" 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1, boxShadow: ["0px 10px 15px -3px rgba(0,0,0,0.1)", "0px 0px 20px rgba(34,197,94,0.3)", "0px 10px 15px -3px rgba(0,0,0,0.1)"] }} 
                  transition={{ delay: 0.2, boxShadow: { duration: 2, repeat: Infinity } }}
                >
                  <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center mb-2"><Terminal size={20} className="text-green-400" /></div>
                  <span className="text-xs font-bold text-gray-800">Terminal</span>
                  <span className="text-[9px] text-gray-400 font-mono mt-1">zsh / bash</span>
                </motion.div>

                {/* 3. Browser (Top) */}
                <motion.div 
                  className="absolute top-[100px] left-[550px] w-32 h-20 bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col items-center justify-center z-10" 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1, y: [0, -5, 0] }} 
                  transition={{ delay: 0.4, y: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center"><Globe size={12} className="text-blue-500" /></div>
                    <span className="text-xs font-bold text-gray-700">Browser</span>
                  </div>
                  <span className="text-[9px] text-gray-400">Chrome / Edge</span>
                </motion.div>

                {/* 4. VS Code (Center) */}
                <motion.div 
                  className="absolute top-1/2 left-[650px] -translate-y-1/2 w-40 h-28 bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col items-center justify-center z-10" 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1, borderColor: ["#e5e7eb", "#3b82f6", "#e5e7eb"] }} 
                  transition={{ delay: 0.5, borderColor: { duration: 2, repeat: Infinity } }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center"><Code size={16} className="text-white" /></div>
                  </div>
                  <span className="text-sm font-bold text-gray-800">VS Code</span>
                  <div className="flex gap-1 mt-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span><span className="text-[10px] text-gray-400">Editing</span></div>
                </motion.div>

                {/* 5. File System (Top Right) */}
                <motion.div className="absolute top-[100px] left-[850px] w-32 h-20 bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col items-center justify-center z-10" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.7 }}>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-full bg-yellow-50 flex items-center justify-center"><HardDrive size={12} className="text-yellow-600" /></div>
                    <span className="text-xs font-bold text-gray-700">File Sys</span>
                  </div>
                  <span className="text-[9px] text-gray-400">Read / Write</span>
                </motion.div>

                {/* 6. Localhost (Bottom Right) */}
                <motion.div className="absolute top-[350px] left-[850px] w-32 h-24 bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col items-center justify-center z-10" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.7 }}>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center"><Server size={16} className="text-green-600" /></div>
                  </div>
                  <span className="text-xs font-bold text-gray-700">Localhost</span>
                  <div className="flex gap-1 mt-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span><span className="text-[10px] text-gray-400">Running</span></div>
                </motion.div>

              </div>
            </motion.div>
          )}

          {/* === STEP 3: DEPLOY (Expanded Pipeline) === */}
          {step === 'deploy' && (
            <motion.div 
              key="deploy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-12"
            >
              <div className="w-full max-w-5xl">
                <div className="grid grid-cols-6 gap-4 relative">
                  {/* Connecting Line */}
                  <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -z-10 rounded-full"></div>
                  <motion.div 
                    className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-purple-500 to-green-500 -z-10 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 3, ease: "linear" }}
                  />

                  {[
                    { label: 'LINT', icon: Code, color: 'text-gray-500', bg: 'bg-gray-50' },
                    { label: 'TEST', icon: Activity, color: 'text-orange-500', bg: 'bg-orange-50' },
                    { label: 'BUILD', icon: Layers, color: 'text-blue-500', bg: 'bg-blue-50' },
                    { label: 'SCAN', icon: Lock, color: 'text-red-500', bg: 'bg-red-50' },
                    { label: 'DEPLOY', icon: Share2, color: 'text-purple-500', bg: 'bg-purple-50' },
                    { label: 'VERIFY', icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' }
                  ].map((stage, i) => (
                    <motion.div 
                      key={stage.label}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: i * 0.5 }}
                      className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center group hover:-translate-y-1 transition-transform"
                    >
                      <div className={`w-10 h-10 rounded-full ${stage.bg} flex items-center justify-center mb-3 ring-4 ring-white shadow-sm`}>
                        <stage.icon className={stage.color} size={18} />
                      </div>
                      <div className="text-[10px] font-bold text-gray-400 tracking-wider mb-1">{stage.label}</div>
                      <div className="flex items-center gap-1 text-green-600 font-bold text-xs">
                        <CheckCircle size={10} />
                        <span>OK</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Success Message */}
                {showSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-16 text-center"
                  >
                    <div className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 rounded-full shadow-2xl hover:scale-105 transition-transform cursor-pointer">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-white font-medium text-sm">System Operational</span>
                      <span className="text-gray-500 text-sm pl-2 border-l border-gray-700">6 Nodes Active</span>
                      <ArrowRight className="text-white ml-2" size={16} />
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ModesAndFlows;