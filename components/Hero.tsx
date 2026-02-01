import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Terminal, Copy, Check, Bot, Apple, Command } from 'lucide-react';
import { Button } from './ui/Button';
import ScrambleText from './ui/ScrambleText';
import Logo from './Logo';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'npm' | 'curl' | 'docker'>('npm');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      setMousePos({
        x: Math.max(-1, Math.min(1, (e.clientX - centerX) / (window.innerWidth / 2))) * 8,
        y: Math.max(-1, Math.min(1, (e.clientY - centerY) / (window.innerHeight / 2))) * 8
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getCommand = () => {
    switch (activeTab) {
      case 'curl': return 'curl -fsSL https://get.g-rump.com | sh';
      case 'docker': return 'docker run -it g-rump/cli';
      default: return 'npm install -g @g-rump/cli';
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCommand());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative pt-48 pb-32 md:pt-52 md:pb-48 min-h-screen flex flex-col justify-center bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left Column */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left animate-fade-in-up order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full border border-purple-200 bg-purple-50 text-xs font-mono font-medium text-purple-600 shadow-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
              <span className="tracking-widest uppercase">v2.1.0 LIVE</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-gray-900 leading-[0.9] mb-6 relative">
              Meet<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 pb-4 inline-block">
                <ScrambleText
                  text="G-Agent."
                  className="text-transparent"
                  scrambleSpeed={50}
                  revealSpeed={120}
                />
              </span>
            </h1>

            <p className="max-w-lg text-xl text-gray-500 leading-relaxed font-light mb-10">
              He controls your whole pc or docker instance.
            </p>

            <div className="flex flex-col w-full sm:w-auto mb-12">
              <div className="flex gap-6 mb-3 px-1">
                <button
                  onClick={() => setActiveTab('npm')}
                  className={`text-xs font-bold uppercase tracking-wider transition-colors ${activeTab === 'npm' ? 'text-purple-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  NPM
                </button>
                <button
                  onClick={() => setActiveTab('curl')}
                  className={`text-xs font-bold uppercase tracking-wider transition-colors ${activeTab === 'curl' ? 'text-purple-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  Linux / Mac
                </button>
                <button
                  onClick={() => setActiveTab('docker')}
                  className={`text-xs font-bold uppercase tracking-wider transition-colors ${activeTab === 'docker' ? 'text-purple-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  Docker
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button
                  size="lg"
                  className="w-full sm:w-auto group bg-purple-600 text-white hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-500/25 border-none transition-all"
                  onClick={() => navigate('/downloads')}
                >
                  Start Building
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>

                <button
                  onClick={handleCopy}
                  className="group h-14 px-6 rounded-full bg-white/50 backdrop-blur-sm border border-gray-200/50 text-gray-600 font-medium hover:border-purple-300 hover:text-gray-900 hover:bg-white hover:shadow-lg hover:shadow-purple-500/5 transition-all flex items-center justify-between sm:justify-start gap-3 active:scale-95 relative overflow-hidden w-full sm:w-auto"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/80 flex items-center justify-center text-gray-400 group-hover:text-purple-600 transition-colors shadow-sm">
                    <Terminal size={14} />
                  </div>
                  <span className="font-mono text-sm tracking-wide">
                    {activeTab === 'npm' && 'npm install -g @g-rump/cli'}
                    {activeTab === 'curl' && 'curl -fsSL https://get.g-rump.com | sh'}
                    {activeTab === 'docker' && 'docker run -it g-rump/cli'}
                  </span>

                  <div className="w-6 flex justify-end">
                    {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} className="text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />}
                  </div>
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-8">
              <span>Powered by</span>
              <div className="flex gap-4 flex-wrap justify-center sm:justify-start">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 hover:bg-white hover:shadow-sm transition-all cursor-default group">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.5 2H4.5C3.11929 2 2 3.11929 2 4.5V19.5C2 20.8807 3.11929 22 4.5 22H19.5C20.8807 22 22 20.8807 22 19.5V4.5C22 3.11929 20.8807 2 19.5 2Z" fill="#D97757" />
                    <path d="M16.5 7H14.5L12 11L9.5 7H7.5L11 12.5L7 18H9L12 13.5L15 18H17L13 12.5L16.5 7Z" fill="white" />
                  </svg>
                  <span className="text-gray-600 group-hover:text-gray-900 transition-colors">Claude</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 hover:bg-white hover:shadow-sm transition-all cursor-default group">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="#2D2D2D" />
                    <path d="M7 12L10 15L17 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-gray-600 group-hover:text-gray-900 transition-colors">Kimi K2.5</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 hover:bg-white hover:shadow-sm transition-all cursor-default group">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21.05 15.65v-2.14l-4.57 2.15v2.33l4.57-2.34zm-9.35 4.88l-4.7-2.42v-4.7l4.7 2.42v4.7zm-4.9-9.98l-4.7 2.4v4.9l4.7-2.4v-4.9zm5.1-5.13l-4.58 2.34v2.34l4.57-2.34v-2.34zm9.35 4.9l-4.57 2.34v4.9l4.57-2.34v-4.9zm-9.35 1.54l-1.93-.98v-2.33l4.7-2.4v2.34l-2.77 1.4v1.97z" fill="#76b900" />
                  </svg>
                  <span className="text-gray-600 group-hover:text-gray-900 transition-colors">NVIDIA</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 hover:bg-white hover:shadow-sm transition-all cursor-default group">
                  <svg className="w-4 h-4" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0H10.8415V10.8415H0V0Z" fill="#F25022" />
                    <path d="M12.1584 0H23V10.8415H12.1584V0Z" fill="#7FBA00" />
                    <path d="M0 12.1584H10.8415V22.9999H0V12.1584Z" fill="#00A4EF" />
                    <path d="M12.1584 12.1584H23V22.9999H12.1584V12.1584Z" fill="#FFB900" />
                  </svg>
                  <span className="text-gray-600 group-hover:text-gray-900 transition-colors">Microsoft</span>
                </div>
              </div>
            </div>

            {/* G-Agent Feature Highlight Removed */}

            {copied && (
              <div className="mt-4 text-xs font-bold text-green-600 bg-green-50 border border-green-200 px-4 py-2 rounded-full animate-fade-in-up shadow-sm">
                Copied to clipboard
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2 lg:pr-16" ref={containerRef}>
            <div className="relative w-64 h-64 md:w-96 md:h-96 group cursor-default">
              <div className="relative z-10 w-full h-full drop-shadow-xl transition-transform duration-500 hover:scale-105 hover:rotate-3">
                <Logo size="100%" interactive={true} mousePos={mousePos} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background - No Blue */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]"></div>
        <div className="absolute left-0 top-0 -z-10 h-[800px] w-[800px] rounded-full bg-purple-100/40 blur-[120px] animate-blob mix-blend-multiply"></div>
        <div className="absolute right-0 bottom-0 -z-10 h-[600px] w-[600px] rounded-full bg-indigo-100/40 blur-[120px] animate-blob animation-delay-2000 mix-blend-multiply"></div>
        <div className="absolute left-1/2 top-1/2 -ml-[400px] -mt-[300px] -z-10 h-[600px] w-[600px] rounded-full bg-pink-100/30 blur-[120px] animate-blob animation-delay-4000 mix-blend-multiply opacity-70"></div>
      </div>
    </div>
  );
};

export default Hero;
