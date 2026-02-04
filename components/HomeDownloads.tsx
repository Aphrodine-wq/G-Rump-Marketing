import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';

const HomeDownloads: React.FC = () => {
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
    <section id="downloads" ref={sectionRef} className="py-20 bg-white border-t border-[#e5e7eb]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center reveal">
        <div className="w-14 h-14 bg-[#7c3aed]/10 rounded-xl flex items-center justify-center mx-auto mb-6">
          <Download className="w-7 h-7 text-[#7c3aed]" strokeWidth={2} />
        </div>
        <h2 className="text-h2 font-bold text-[#1a1a2e] mb-4">
          Ready to get started?
        </h2>
        <p className="text-[#4a4a5a] text-body-lg mb-8 max-w-md mx-auto">
          Download G-Rump for your platform and start shipping faster today.
        </p>
        <Link
          to="/downloads"
          className="btn-secondary px-8 py-4 rounded-xl font-semibold text-base inline-flex items-center gap-2"
        >
          <Download className="w-5 h-5" />
          View Downloads
        </Link>
      </div>
    </section>
  );
};

export default HomeDownloads;
