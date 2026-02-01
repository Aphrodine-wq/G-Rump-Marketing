import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal, Monitor, Globe, Server, Cpu, Database,
  Cloud, Zap, Activity, Lock, GitBranch, Code2, Layers
} from 'lucide-react';
import { Card } from './ui/Card';

// --- Types ---
type NodeStatus = 'idle' | 'active' | 'processing' | 'success';

interface ArchNode {
  id: string;
  label: string;
  icon: React.ElementType;
  layer: 'interface' | 'intelligence' | 'infrastructure';
  description: string;
  metrics?: { label: string; value: string }[];
}

// --- Data ---
const NODES: ArchNode[] = [
  // Interface Layer
  {
    id: 'cli',
    label: 'G-Rump CLI',
    icon: Terminal,
    layer: 'interface',
    description: 'Developer terminal interface for rapid intent definition.',
    metrics: [{ label: 'Version', value: 'v2.4.0' }]
  },
  {
    id: 'vscode',
    label: 'VS Code',
    icon: Code2,
    layer: 'interface',
    description: 'IDE extension with real-time LSP support.',
    metrics: [{ label: 'Latency', value: '< 2ms' }]
  },
  {
    id: 'web',
    label: 'Console',
    icon: Globe,
    layer: 'interface',
    description: 'Web-based visual architecting dashboard.',
    metrics: [{ label: 'Users', value: 'Active' }]
  },

  // Intelligence Layer
  {
    id: 'gateway',
    label: 'API Gateway',
    icon: Server,
    layer: 'intelligence',
    description: 'High-performance edge router and load balancer.',
    metrics: [{ label: 'Req/s', value: '14.2k' }]
  },
  {
    id: 'compiler',
    label: 'Rust Compiler',
    icon: Cpu,
    layer: 'intelligence',
    description: 'Core logic engine. Compiles natural language to IaC.',
    metrics: [{ label: 'Build', value: '12ms' }]
  },
  {
    id: 'llm',
    label: 'NemoTRON',
    icon: Activity, // specific icon for AI
    layer: 'intelligence',
    description: 'Inference engine for intent understanding.',
    metrics: [{ label: 'Ctx', value: '128k' }]
  },

  // Infrastructure Layer
  {
    id: 'k8s',
    label: 'Kubernetes',
    icon: Layers,
    layer: 'infrastructure',
    description: 'Auto-scaling container orchestration.',
    metrics: [{ label: 'Pods', value: '24/24' }]
  },
  {
    id: 'db',
    label: 'Persistence',
    icon: Database,
    layer: 'infrastructure',
    description: 'Distributed data layer with geo-replication.',
    metrics: [{ label: 'Sync', value: '0ms' }]
  },
  {
    id: 'edge',
    label: 'Global Edge',
    icon: Cloud,
    layer: 'infrastructure',
    description: 'CDN and Edge Compute locations.',
    metrics: [{ label: 'Regions', value: '35' }]
  },
];

const CONNECTIONS = [
  { from: 'cli', to: 'gateway' },
  { from: 'vscode', to: 'gateway' },
  { from: 'web', to: 'gateway' },
  { from: 'gateway', to: 'compiler' },
  { from: 'gateway', to: 'llm' },
  { from: 'compiler', to: 'k8s' },
  { from: 'compiler', to: 'db' },
  { from: 'k8s', to: 'edge' },
];

// --- Components ---

const StatusBadge = ({ status }: { status: NodeStatus }) => {
  const colors = {
    idle: 'bg-gray-800 text-gray-500 border-gray-700',
    active: 'bg-purple-900/30 text-purple-400 border-purple-500/50',
    processing: 'bg-amber-900/30 text-amber-400 border-amber-500/50',
    success: 'bg-green-900/30 text-green-400 border-green-500/50',
  };

  return (
    <div className={`text-[10px] px-1.5 py-0.5 rounded border ${colors[status]} uppercase tracking-wider font-mono transition-colors duration-300`}>
      {status}
    </div>
  );
};

const NodeCard = ({ node, status, isActiveFlow }: { node: ArchNode; status: NodeStatus; isActiveFlow: boolean }) => {
  const isActive = status !== 'idle';

  return (
    <motion.div
      layout
      className={`
        relative p-4 rounded-xl border backdrop-blur-sm transition-all duration-500
        flex flex-col gap-3 min-w-[140px] z-10
        ${isActive
          ? 'bg-gray-900/80 border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.15)]'
          : 'bg-gray-900/40 border-gray-800/50 hover:border-gray-700'}
      `}
    >
      {/* Glow Effect */}
      {isActive && (
        <motion.div
          layoutId="glow"
          className="absolute inset-0 rounded-xl bg-purple-500/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className={`p-2 rounded-lg ${isActive ? 'bg-purple-500/20 text-purple-400' : 'bg-gray-800 text-gray-500'}`}>
          <node.icon size={16} />
        </div>
        <StatusBadge status={status} />
      </div>

      {/* Content */}
      <div>
        <div className={`text-sm font-bold mb-1 ${isActive ? 'text-white' : 'text-gray-400'}`}>
          {node.label}
        </div>
        <div className="text-[10px] text-gray-500 leading-tight">
          {node.description}
        </div>
      </div>

      {/* Metrics (Only show when somewhat active to reduce noise, or always?) */}
      {node.metrics && (
        <div className="pt-3 mt-auto border-t border-gray-800/50 flex justify-between items-center">
          <span className="text-[10px] text-gray-600 font-mono uppercase">{node.metrics[0].label}</span>
          <span className={`text-[10px] font-mono font-bold ${isActive ? 'text-purple-400' : 'text-gray-500'}`}>
            {node.metrics[0].value}
          </span>
        </div>
      )}

      {/* Active Particle (Processing indicator) */}
      {status === 'processing' && (
        <motion.div
          className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full shadow-[0_0_10px_#f59e0b]"
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
        />
      )}
    </motion.div>
  );
};

const TelemetryPanel = ({ activeNode }: { activeNode: string | null }) => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    if (!activeNode) return;

    const timestamp = new Date().toISOString().split('T')[1].slice(0, 8);
    const newLog = `[${timestamp}] ACCESS_NODE: ${activeNode.toUpperCase()} - OK`;

    setLogs(prev => [newLog, ...prev].slice(0, 8));
  }, [activeNode]);

  return (
    <div className="w-full lg:w-72 bg-black/40 border-l border-gray-800 p-6 flex flex-col font-mono text-xs">
      <div className="flex items-center gap-2 mb-6 text-gray-400 uppercase tracking-widest font-bold">
        <Activity size={14} className="text-green-500" />
        Live Telemetry
      </div>

      <div className="space-y-6 mb-8">
        <div>
          <div className="text-gray-500 mb-1">System Load</div>
          <div className="flex items-end gap-2">
            <div className="text-2xl font-bold text-white">42%</div>
            <div className="mb-1 h-1 w-20 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 w-[42%]"></div>
            </div>
          </div>
        </div>

        <div>
          <div className="text-gray-500 mb-1">Active Threads</div>
          <div className="text-2xl font-bold text-white">1,024</div>
        </div>

        <div>
          <div className="text-gray-500 mb-1">Global Latency</div>
          <div className="text-2xl font-bold text-purple-400">24ms</div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none" />
        <div className="space-y-2">
          {logs.map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1 - (i * 0.15), x: 0 }}
              className="text-green-500/80 truncate"
            >
              <span className="text-gray-600 mr-2">{'>'}</span>
              {log}
            </motion.div>
          ))}
          <motion.div
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-2 h-4 bg-green-500/50"
          />
        </div>
      </div>
    </div>
  );
};

const SystemArchitecture: React.FC = () => {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [simulationStep, setSimulationStep] = useState(0);

  // Simulation Loop
  useEffect(() => {
    const sequence = [
      { id: 'cli', duration: 1000 },
      { id: 'gateway', duration: 800 },
      { id: 'llm', duration: 1200 },
      { id: 'compiler', duration: 1000 },
      { id: 'k8s', duration: 1000 },
      { id: 'edge', duration: 2000 }, // Wait a bit at the end
    ];

    let currentIndex = 0;

    const runStep = () => {
      const step = sequence[currentIndex];
      setActiveNodeId(step.id);

      setTimeout(() => {
        currentIndex = (currentIndex + 1) % sequence.length;
        runStep();
      }, step.duration);
    };

    runStep();

    return () => { }; // Cleanup not strictly necessary for this simple loop
  }, []);

  return (
    <div className="bg-[#050505] text-white py-24 relative overflow-hidden border-t border-gray-900">

      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/20 border border-purple-500/30 text-purple-400 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <GitBranch size={14} />
            System Internals
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Platform</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Architecture</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            A real-time visualization of how G-Rump compiles intent into infrastructure.
          </motion.p>
        </div>

        {/* Main Architecture Interface */}
        <div className="rounded-2xl border border-gray-800 bg-[#0a0a0b] overflow-hidden shadow-2xl shadow-black flex flex-col lg:flex-row min-h-[900px]">

          {/* Visual Canvas */}
          <div className="flex-1 relative p-8 md:p-12 flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#0a0a0b] to-[#111113]">

            {/* Connecting Lines (SVG Layer) - Enhanced with animated gradients */}
            <div className="absolute inset-0 pointer-events-none">
              <svg className="w-full h-full">
                <defs>
                  <linearGradient id="line-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
                    <stop offset="50%" stopColor="#a855f7" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                {/* Simplified connections matching the grid layout below */}
                <path d="M 50% 15% L 50% 45%" stroke="url(#line-gradient)" strokeWidth="2" fill="none" />
                <path d="M 50% 55% L 50% 85%" stroke="url(#line-gradient)" strokeWidth="2" fill="none" />
                <path d="M 30% 50% L 70% 50%" stroke="url(#line-gradient)" strokeWidth="2" fill="none" />
              </svg>
            </div>


            {/* Layer 1: Interface */}
            <div className="relative z-10">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]"></div>
                <span className="text-blue-400/80">Interface Layer</span>
                <div className="h-px bg-gradient-to-r from-blue-500/20 to-transparent flex-1"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {NODES.filter(n => n.layer === 'interface').map(node => (
                  <NodeCard
                    key={node.id}
                    node={node}
                    status={activeNodeId === node.id ? 'active' : 'idle'}
                    isActiveFlow={false}
                  />
                ))}
              </div>
            </div>

            {/* Layer 2: Intelligence */}
            <div className="relative z-10 my-8">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7]"></div>
                <span className="text-purple-400/80">Intelligence Core</span>
                <div className="h-px bg-gradient-to-r from-purple-500/20 to-transparent flex-1"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {NODES.filter(n => n.layer === 'intelligence').map(node => (
                  <NodeCard
                    key={node.id}
                    node={node}
                    status={activeNodeId === node.id ? 'processing' : 'idle'}
                    isActiveFlow={false}
                  />
                ))}
              </div>
            </div>

            {/* Layer 3: Infrastructure */}
            <div className="relative z-10">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"></div>
                <span className="text-green-400/80">Infrastructure</span>
                <div className="h-px bg-gradient-to-r from-green-500/20 to-transparent flex-1"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {NODES.filter(n => n.layer === 'infrastructure').map(node => (
                  <NodeCard
                    key={node.id}
                    node={node}
                    status={activeNodeId === node.id ? 'success' : 'idle'}
                    isActiveFlow={false}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* Telemetry Panel */}
          <TelemetryPanel activeNode={activeNodeId} />

        </div>
      </div>
    </div>
  );
};

export default SystemArchitecture;
