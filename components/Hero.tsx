import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Hero: React.FC = () => {
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

  const demoUrl = typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_DEMO_VIDEO_URL;

  return (
    <section
      ref={sectionRef}
      className="relative pt-32 pb-28 lg:pt-40 lg:pb-32 overflow-hidden bg-app"
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #e5e7eb 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8 float">
            <Logo size={120} className="frowny-logo" />
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full badge text-sm font-medium mb-6 reveal">
            <span className="pulse-dot" />
            Now in Beta — Join 500+ Product Builders
          </div>
          <h1 className="text-display md:text-display-lg font-bold tracking-tight mb-6 text-[#1a1a2e] reveal">
            The AI Product
            <span className="text-gradient block">Operating System</span>
          </h1>
          <p className="text-body-lg md:text-xl text-[#4a4a5a] max-w-2xl mx-auto mb-3 reveal stagger-1">
            Turn product ideas into working code. Built for product managers, founders, and teams who ship.
          </p>
          <p className="text-body text-[#6b7280] max-w-2xl mx-auto mb-10 reveal stagger-1">
            Chat, Ship, and Codegen — one platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center reveal stagger-2">
            <Link to="/#waitlist" className="btn-primary px-8 py-4 rounded-xl font-semibold text-base text-center">
              Join the Waitlist
            </Link>
            {demoUrl ? (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary px-8 py-4 rounded-xl font-semibold text-base text-center"
              >
                Watch Demo
              </a>
            ) : (
              <a href="#demo" className="btn-secondary px-8 py-4 rounded-xl font-semibold text-base text-center">
                Watch Demo
              </a>
            )}
          </div>
          <p className="mt-6 text-[#6b7280] text-body-sm reveal stagger-3">
            Free during beta · No credit card required
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
