import React, { useEffect, useRef } from 'react';

const providers = [
  {
    name: 'Claude',
    description: 'Deep reasoning for architecture decisions',
    detail: 'Powers intelligent system design and complex problem-solving.',
  },
  {
    name: 'Kimi',
    description: 'Long-context processing for large codebases',
    detail: 'Handles massive documents and multi-file analysis with ease.',
  },
  {
    name: 'NVIDIA NIM',
    description: 'GPU-accelerated inference',
    detail: 'Lightning-fast code generation powered by Nemotron.',
  },
];

const AIProviders: React.FC = () => {
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
    <section id="ai-providers" ref={sectionRef} className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <h2 className="text-h2 md:text-h2-lg font-bold text-[#1a1a2e] mb-4">
            Powered by the Best AI Models
          </h2>
          <p className="text-[#4a4a5a] text-body-lg max-w-2xl mx-auto">
            Intelligently routes to the right model for each task
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {providers.map((p, i) => (
            <div
              key={p.name}
              className={`text-center p-8 rounded-2xl bg-subtle reveal ${i === 1 ? 'stagger-1' : ''} ${i === 2 ? 'stagger-2' : ''}`}
            >
              <h3 className="text-h3 font-semibold text-[#1a1a2e] mb-2">{p.name}</h3>
              <p className="text-[#7c3aed] text-body font-medium mb-3">{p.description}</p>
              <p className="text-[#6b7280] text-body-sm">{p.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIProviders;
