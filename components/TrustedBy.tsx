import React from 'react';

const TrustedBy: React.FC = () => {
  const items = ['NVIDIA', 'NIM', 'Kimi K2.5', 'Rust', 'TypeScript'];

  return (
    <section className="border-y border-[#e5e7eb] py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="text-center text-[#6b7280] text-caption uppercase tracking-widest mb-2">Backed By</p>
        <p className="text-center text-[#4a4a5a] text-body-sm mb-6">Powered by the same stack that runs G-Rump.</p>
        <div className="flex flex-wrap justify-center items-center gap-12">
          {items.map((name) => (
            <span
              key={name}
              className="text-body-lg font-semibold text-[#1a1a2e] opacity-60 hover:opacity-100 transition"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
