import React, { useEffect, useRef } from 'react';
import { PenLine, Layers, Zap } from 'lucide-react';

const features = [
  {
    icon: PenLine,
    title: '1. Describe',
    description: 'Type what you want in plain English. No code required.',
  },
  {
    icon: Layers,
    title: '2. Design',
    description: 'Get auto-generated architecture, PRDs, and diagrams.',
  },
  {
    icon: Zap,
    title: '3. Ship',
    description: 'Generate production-ready code for your entire stack.',
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
          <p className="text-[#4a4a5a] text-body-lg">Three simple steps to ship faster than ever</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`feature-card rounded-2xl p-8 text-center reveal ${i === 1 ? 'stagger-1' : ''} ${i === 2 ? 'stagger-2' : ''}`}
            >
              <div className="icon-box w-14 h-14 bg-[#7c3aed] rounded-xl flex items-center justify-center mb-6 mx-auto">
                <f.icon className="w-7 h-7 text-white" strokeWidth={2} />
              </div>
              <h3 className="text-h3 font-semibold text-[#1a1a2e] mb-3">{f.title}</h3>
              <p className="text-[#4a4a5a] text-body">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
