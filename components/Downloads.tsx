import React from 'react';
import { motion } from 'framer-motion';
import { Download, Terminal, Apple, Monitor, Smartphone, Command } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

const DownloadCard = ({ icon: Icon, os, version, arch, delay }: { icon: any, os: string, version: string, arch: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="flex-1"
  >
    <Card className="p-6 flex flex-col items-center text-center border-gray-200 hover:border-purple-200 hover:shadow-lg transition-all cursor-pointer group bg-white">
        <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-purple-50 transition-colors">
            <Icon size={24} className="text-gray-600 group-hover:text-purple-600 transition-colors" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">{os}</h3>
        <p className="text-sm text-gray-500 mb-4">{version} • {arch}</p>
        <Button variant="secondary" size="sm" className="w-full bg-gray-50 hover:bg-gray-100 text-gray-900 border border-gray-200 group-hover:border-purple-200">
            <Download size={14} className="mr-2" /> Download
        </Button>
    </Card>
  </motion.div>
);

const Downloads: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'npm' | 'sh'>('npm');

  return (
    <div className="min-h-screen bg-white text-gray-900 pt-20">
      
      {/* Hero Section */}
      <div className="relative pt-20 pb-16 overflow-hidden">
         <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-purple-400 opacity-20 blur-[100px]"></div>
         </div>
         
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5 }}
            >
               <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full border border-purple-200 bg-purple-50 text-xs font-mono font-medium text-purple-600 mb-6">
                  <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                  LATEST RELEASE: v2.4.0
               </div>
               <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-gray-900 mb-6">
                  Get <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-400">G-Agent</span>
               </h1>
               <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
                  Native binaries for every platform. Single binary, zero dependencies. 
                  <br className="hidden md:block"/> Scale your infrastructure in minutes.
               </p>
               <p className="text-gray-500 text-sm mt-3 max-w-xl mx-auto">Choose your platform or install via CLI below.</p>
            </motion.div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="flex flex-col lg:flex-row gap-6 items-stretch justify-center max-w-5xl mx-auto mb-20">
            <DownloadCard icon={Apple} os="macOS" version="v2.4.0" arch="Universal" delay={0.1} />
            <DownloadCard icon={Monitor} os="Windows" version="v2.4.0" arch="x64 / ARM64" delay={0.2} />
            <DownloadCard icon={Smartphone} os="Linux" version="v2.4.0" arch="x64 / ARM64" delay={0.3} />
        </div>

        {/* CLI Install */}
        <div className="max-w-3xl mx-auto">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-[#1a1b26] rounded-2xl p-8 shadow-2xl flex flex-col md:flex-row items-center gap-8 border border-gray-800 relative overflow-hidden group"
            >
                {/* Terminal Window Controls */}
                <div className="absolute top-4 left-4 flex gap-2 z-20">
                   <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                   <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                   <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
                </div>

                {/* Tabs */}
                <div className="absolute top-0 left-0 right-0 h-12 border-b border-gray-800 flex items-center justify-center gap-6 pt-1">
                   <div 
                     onClick={() => setActiveTab('npm')}
                     className={`text-xs font-bold uppercase tracking-widest flex items-center gap-2 cursor-pointer transition-colors ${activeTab === 'npm' ? 'text-white' : 'text-gray-600 hover:text-gray-400'}`}
                   >
                      <Terminal size={12} /> NPM
                   </div>
                   <div 
                     onClick={() => setActiveTab('sh')}
                     className={`text-xs font-bold uppercase tracking-widest flex items-center gap-2 cursor-pointer transition-colors ${activeTab === 'sh' ? 'text-white' : 'text-gray-600 hover:text-gray-400'}`}
                   >
                      <Apple size={12} /> MacOS / Linux
                   </div>
                </div>

                <div className="flex-1 w-full pt-16 md:pt-12">
                    <div className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2 pl-1">
                        <Terminal size={14} /> {activeTab === 'npm' ? 'NPM Install' : 'Shell Install'}
                    </div>
                    <div className="bg-black/30 rounded-xl p-5 border border-white/10 flex items-center justify-between font-mono text-sm text-gray-300 group-hover:border-purple-500/30 transition-colors relative">
                        <span className="flex items-center gap-3">
                            <span className="text-green-400 font-bold">➜</span>
                            <span className="text-gray-100">
                              {activeTab === 'npm' ? 'npm install -g @g-rump/cli' : 'curl -fsSL https://get.g-rump.com | sh'}
                            </span>
                        </span>
                        <button 
                          className="text-gray-500 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-md"
                          onClick={() => navigator.clipboard.writeText(activeTab === 'npm' ? 'npm install -g @g-rump/cli' : 'curl -fsSL https://get.g-rump.com | sh')}
                        >
                            <CopyIcon />
                        </button>
                    </div>
                </div>
                <div className="flex-shrink-0 text-center md:text-left border-t md:border-t-0 md:border-l border-gray-800 pt-6 md:pt-0 md:pl-8 w-full md:w-auto">
                    <p className="text-gray-400 text-sm mb-3 font-medium">Requirements</p>
                    <div className="flex flex-col gap-2">
                       <div className="flex items-center gap-2 text-xs text-gray-500">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> Node.js 18+
                       </div>
                       <div className="flex items-center gap-2 text-xs text-gray-500">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Docker (Optional)
                       </div>
                    </div>
                </div>
            </motion.div>
        </div>
      </div>
    </div>
  );
};

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
);

export default Downloads;
