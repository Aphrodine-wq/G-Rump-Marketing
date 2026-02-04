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

  return (
    <section
      ref={sectionRef}
      className="relative pt-32 pb-28 lg:pt-44 lg:pb-36 overflow-hidden bg-app"
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #e5e7eb 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-10">
            <Logo size={100} className="frowny-logo" />
          </div>
          <h1 className="text-display md:text-display-lg font-bold tracking-tight mb-6 text-[#1a1a2e] reveal">
            Ship products faster
            <span className="text-gradient block">with AI</span>
          </h1>
          <p className="text-body-lg md:text-xl text-[#4a4a5a] max-w-xl mx-auto mb-10 reveal stagger-1">
            Describe what you want. Get production-ready code, architecture, and PRDs in minutes.
          </p>
          <div className="flex justify-center reveal stagger-2">
            <Link to="/#waitlist" className="btn-primary px-10 py-4 rounded-xl font-semibold text-base text-center">
              Join the Waitlist
            </Link>
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
