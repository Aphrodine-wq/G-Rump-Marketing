import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PenLine, Layers, Zap } from 'lucide-react';

const features = [
  {
    icon: PenLine,
    title: '1. Describe',
    description:
      'Type what you want in plain English. "Build a subscription analytics dashboard for SaaS companies."',
    sub: 'Plain English only. No code. Works for PMs and founders.',
  },
  {
    icon: Layers,
    title: '2. Design',
    description:
      'Get auto-generated system architecture, detailed PRDs, and Mermaid diagrams. Everything your team needs.',
    sub: 'Architecture-as-code, PRDs, and Mermaid diagrams in minutes.',
  },
  {
    icon: Zap,
    title: '3. Ship',
    description:
      'Generate production-ready code. React, Node.js, databases, APIs — a complete working MVP.',
    sub: 'Real code, not prototypes. Error handling and best practices included.',
  },
];

const Features: React.FC = () => {
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
    <section id="features" ref={sectionRef} className="py-28 bg-subtle">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <h2 className="text-h2 md:text-h2-lg font-bold text-[#1a1a2e] mb-4">
            From Idea to Product in Minutes
          </h2>
          <p className="text-[#4a4a5a] text-body-lg">Three simple steps to ship faster than ever before</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`feature-card rounded-2xl p-8 reveal ${i === 1 ? 'stagger-1' : ''} ${i === 2 ? 'stagger-2' : ''}`}
            >
              <div className="icon-box w-14 h-14 bg-[#7c3aed] rounded-xl flex items-center justify-center mb-6">
                <f.icon className="w-7 h-7 text-white" strokeWidth={2} />
              </div>
              <h3 className="text-h3 font-semibold text-[#1a1a2e] mb-3">{f.title}</h3>
              <p className="text-[#4a4a5a] text-body mb-3">{f.description}</p>
              <p className="text-[#6b7280] text-body-sm">{f.sub}</p>
              <Link to="/docs/GETTING_STARTED" className="text-[#7c3aed] text-body-sm font-medium mt-4 inline-flex hover:underline focus-visible:ring-2 focus-visible:ring-[#7c3aed] focus-visible:ring-offset-2 rounded">
                Learn more →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
