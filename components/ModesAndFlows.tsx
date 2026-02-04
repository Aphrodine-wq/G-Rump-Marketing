import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Rocket, Code } from 'lucide-react';

const flows = [
  {
    icon: MessageSquare,
    title: 'Chat',
    description: 'Conversational AI with tools. Ask questions, get answers, iterate on ideas.',
  },
  {
    icon: Rocket,
    title: 'Ship',
    description: 'Describe → Design → Spec → Code. Full product generation from a single prompt.',
  },
  {
    icon: Code,
    title: 'Codegen',
    description: 'PRD + architecture → multi-agent code generation. Production-ready output.',
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
    <section id="how-it-works" ref={sectionRef} className="py-28 bg-app">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <h2 className="text-h2 md:text-h2-lg font-bold text-[#1a1a2e] mb-4">
            Three Ways to Build
          </h2>
          <p className="text-[#4a4a5a] text-body-lg max-w-2xl mx-auto">
            Choose the workflow that fits your needs. All powered by intelligent AI routing.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto reveal">
          {flows.map((f, i) => (
            <div
              key={f.title}
              className={`p-8 rounded-2xl bg-white border border-[#e5e7eb] hover:border-[#7c3aed]/30 hover:shadow-lg transition-all ${i === 1 ? 'stagger-1' : ''} ${i === 2 ? 'stagger-2' : ''}`}
            >
              <div className="w-12 h-12 bg-[#7c3aed]/10 rounded-xl flex items-center justify-center mb-5">
                <f.icon className="w-6 h-6 text-[#7c3aed]" strokeWidth={2} />
              </div>
              <h3 className="text-h3 font-semibold text-[#1a1a2e] mb-3">{f.title}</h3>
              <p className="text-[#4a4a5a] text-body-sm">{f.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10 reveal">
          <Link
            to="/docs/HOW_IT_WORKS"
            className="text-[#7c3aed] text-body-sm font-medium hover:underline"
          >
            Learn more in the docs →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ModesAndFlows;
