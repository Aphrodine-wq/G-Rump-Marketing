import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Users, Database, Terminal, Code, Cpu, Globe } from 'lucide-react';

const FeaturesPage: React.FC = () => {
  const features = [
    {
      icon: Zap,
      title: 'Rust-Powered Compilation',
      description: 'Our core engine is written in Rust, delivering 18x faster build times than Webpack or Vite. It parses natural language intent into executable ASTs in milliseconds.',
      color: 'text-orange-500',
      bg: 'bg-orange-50'
    },
    {
      icon: Users,
      title: 'Swarm Intelligence',
      description: 'Deploy a squad of 12 specialized AI agents. The Architect plans, the Frontend Dev codes Svelte, and the QA Bot runs Cypress tests in parallel.',
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      icon: Shield,
      title: 'Enterprise Guardrails',
      description: 'SOC2 Type II compliant out of the box. Automated PII redaction, secret scanning, and role-based access control (RBAC) for every generated service.',
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      icon: Database,
      title: 'Smart Persistence',
      description: 'Auto-provisioned PostgreSQL and Redis clusters. G-Rump handles migrations, backups, and connection pooling so you never touch a config file.',
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      icon: Terminal,
      title: 'CLI First',
      description: 'Love the terminal? So do we. Control your entire infrastructure with the `g-rump` CLI. Pipe outputs, script workflows, and integrate with CI/CD.',
      color: 'text-gray-800',
      bg: 'bg-gray-100'
    },
    {
      icon: Globe,
      title: 'Global Edge Network',
      description: 'Deploy to 35 regions instantly. Your app logic runs close to your users with automatic failover and anycast routing.',
      color: 'text-pink-600',
      bg: 'bg-pink-50'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-app min-h-screen"
    >
      <div className="text-center mb-20">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#1a1a2e] mb-6">
          Under the Hood
        </h1>
        <p className="text-xl text-[#4a4a5a] max-w-3xl mx-auto leading-relaxed">
          G-Rump isn&apos;t just a wrapper. It&apos;s a complete reimagining of the software development lifecycle, powered by bare-metal performance and agentic AI.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="feature-card p-8 rounded-2xl"
          >
            <div className="icon-box w-14 h-14 bg-[#7c3aed] rounded-xl flex items-center justify-center mb-6">
              <f.icon size={28} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-[#1a1a2e] mb-4">{f.title}</h3>
            <p className="text-[#4a4a5a] leading-relaxed">
              {f.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Deep Dive Section */}
      <div className="mt-32">
        <div className="bg-gray-900 rounded-[3rem] p-12 md:p-24 relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-8">The Compiler Pipeline</h2>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 font-bold shrink-0">1</div>
                            <div>
                                <h4 className="font-bold text-xl mb-1">Intent Parsing</h4>
                                <p className="text-gray-400">LLMs extract semantic meaning from your prompt, converting "build a blog" into a formal dependency graph.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold shrink-0">2</div>
                            <div>
                                <h4 className="font-bold text-xl mb-1">AST Generation</h4>
                                <p className="text-gray-400">Our Rust engine generates abstract syntax trees for React, Node, and SQL schemas in parallel.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold shrink-0">3</div>
                            <div>
                                <h4 className="font-bold text-xl mb-1">Atomic Deployment</h4>
                                <p className="text-gray-400">Code is compiled to Wasm and distributed to edge nodes globally. Zero cold starts.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-black/50 rounded-2xl p-6 border border-gray-700 font-mono text-sm overflow-hidden shadow-2xl">
                    <div className="flex gap-2 mb-4">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="space-y-2 opacity-90">
                        <p className="text-green-400">➜ g-rump analyze --deep</p>
                        <p className="text-gray-500">[INFO] Loading core engine v2.4.0</p>
                        <p className="text-blue-400">[PIPELINE] Stage 1: Tokenization (0.002s)</p>
                        <p className="text-blue-400">[PIPELINE] Stage 2: Intent Graph (0.015s)</p>
                        <p className="text-blue-400">[PIPELINE] Stage 3: Rust Codegen (0.042s)</p>
                        <p className="text-purple-400">[SUCCESS] Generated 14 files in 0.08s</p>
                        <p className="text-gray-500 mt-4"> // Generated /src/services/auth.rs</p>
                        <p className="text-orange-300"> fn authenticate_user(creds: Credentials) -{'>'} Result{'<'}Session{'>'} {'{'}</p>
                        <p className="text-orange-300 pl-4">     let user = db.find_by_email(creds.email)?;</p>
                        <p className="text-orange-300 pl-4">     verify_hash(creds.password, user.hash)?;</p>
                        <p className="text-orange-300 pl-4">     Ok(Session::new(user))</p>
                        <p className="text-orange-300"> {'}'}</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturesPage;
