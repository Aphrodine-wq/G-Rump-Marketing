import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const bullets = [
  {
    title: 'Natural Language Input',
    text: "No coding required. Describe your product like you're talking to a colleague.",
  },
  {
    title: 'Intent-Driven Architecture',
    text: 'Our Rust-powered intent compiler extracts requirements and generates optimal system designs.',
  },
  {
    title: 'Multi-Provider AI Router',
    text: 'Intelligently routes between NVIDIA NIM/Nemotron, OpenRouter, Groq, and Ollama.',
  },
  {
    title: 'Production-Ready Code',
    text: 'Not prototypes. Real, tested code with error handling and best practices.',
  },
];

const ModesAndFlows: React.FC = () => {
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
    <section id="how-it-works" ref={sectionRef} className="py-24 bg-app">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a2e] mb-6">
              Built for Product Managers,
              <br />
              Not Just Engineers
            </h2>
            <p className="text-[#4a4a5a] mb-6 text-sm">
              Three flows: <strong className="text-[#1a1a2e]">Chat</strong> (conversational AI with tools), <strong className="text-[#1a1a2e]">Ship</strong> (describe → design → spec → code), and <strong className="text-[#1a1a2e]">Codegen</strong> (PRD + architecture → multi-agent code). See <Link to="/docs/HOW_IT_WORKS" className="text-[#7c3aed] hover:underline">How It Works</Link> in the docs.
            </p>
            <div className="space-y-5">
              {bullets.map((b) => (
                <div key={b.title} className="flex gap-4 group">
                  <div className="w-2 h-2 rounded-full bg-[#7c3aed] flex-shrink-0 mt-2 group-hover:scale-150 transition-transform" />
                  <div>
                    <h4 className="font-semibold text-[#1a1a2e] mb-1">{b.title}</h4>
                    <p className="text-[#4a4a5a] text-sm">{b.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal">
            <div className="code-window">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <pre className="p-6 text-sm overflow-x-auto">
                <code>
                  <span style={{ color: '#ff7eb6' }}>const</span>{' '}
                  <span style={{ color: '#a9dc76' }}>generateProduct</span> ={' '}
                  <span style={{ color: '#ff7eb6' }}>async</span> () =&gt; {'{'}
                  {'\n'}{'  '}
                  <span style={{ color: '#727297' }}>// Describe your idea</span>
                  {'\n'}{'  '}
                  <span style={{ color: '#ff7eb6' }}>const</span> intent ={' '}
                  <span style={{ color: '#78dce8' }}>
                    &quot;Build a task management{'\n'}  app with team collaboration&quot;
                  </span>
                  ;
                  {'\n\n'}{'  '}
                  <span style={{ color: '#727297' }}>// G-Rump handles the rest</span>
                  {'\n'}{'  '}
                  <span style={{ color: '#ff7eb6' }}>const</span> architecture ={' '}
                  <span style={{ color: '#ff7eb6' }}>await</span>
                  {'\n'}    gRump.<span style={{ color: '#a9dc76' }}>designArchitecture</span>(intent);
                  {'\n\n'}{'  '}
                  <span style={{ color: '#ff7eb6' }}>const</span> prd ={' '}
                  <span style={{ color: '#ff7eb6' }}>await</span>{' '}
                  gRump.<span style={{ color: '#a9dc76' }}>generatePRD</span>(architecture);
                  {'\n\n'}{'  '}
                  <span style={{ color: '#ff7eb6' }}>const</span> code ={' '}
                  <span style={{ color: '#ff7eb6' }}>await</span>{' '}
                  gRump.<span style={{ color: '#a9dc76' }}>implement</span>(prd);
                  {'\n\n'}{'  '}
                  <span style={{ color: '#ff7eb6' }}>return</span> code;{' '}
                  <span style={{ color: '#727297' }}>// Production ready 🚀</span>
                  {'\n'}
                  {'}'};
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModesAndFlows;
