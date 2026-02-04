import React, { useEffect, useRef } from 'react';

const AppPreview: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((t) => t.classList.add('active'));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="demo" className="py-12 px-6" ref={sectionRef}>
      <div className="max-w-5xl mx-auto reveal">
        <div className="code-window">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            <div className="flex-1 text-center text-xs text-gray-400">G-Rump — AI Product OS</div>
          </div>
          <div className="p-6 grid md:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="text-xs text-gray-400 mb-2">Input</div>
              <div className="text-sm text-gray-300">&quot;Build a subscription analytics dashboard...&quot;</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="text-xs text-gray-400 mb-2">Architecture</div>
              <div className="text-xs text-green-400">✓ Generated</div>
              <div className="text-xs text-green-400">✓ PRD Created</div>
              <div className="text-xs text-green-400">✓ Diagrams Ready</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 border border-[#7c3aed]/50">
              <div className="text-xs text-[#a78bfa] mb-2">Code</div>
              <div className="text-xs text-gray-300">React + Node.js + PostgreSQL</div>
              <div className="mt-2 text-[10px] text-gray-500 font-mono">Ready to deploy →</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppPreview;
