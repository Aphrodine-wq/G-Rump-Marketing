import React from 'react';

const TrustedBy: React.FC = () => {
  const integrations = [
    "React", "Vue", "Svelte", "Node.js", "Go", "Rust", "Python", "Postgres", "Redis", "Mongo", "Stripe", "Twilio"
  ];

  return (
    <div className="py-12 border-b border-gray-100 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-8 flex items-center justify-center gap-2">
           <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
           Active Integrations
        </p>
        
        <div className="relative flex overflow-hidden mask-linear-fade">
          <div className="flex animate-marquee whitespace-nowrap gap-8 items-center">
            {/* Double the list for seamless loop */}
            {[...integrations, ...integrations].map((tech, index) => (
              <div 
                key={`${tech}-${index}`} 
                className="flex items-center gap-3 px-4 py-2 rounded-lg border border-gray-100 bg-gray-50 hover:border-purple-200 hover:bg-purple-50 transition-colors group cursor-default"
              >
                <div className="w-2 h-2 rounded-full bg-gray-300 group-hover:bg-purple-500 transition-colors"></div>
                <span className="text-sm font-mono font-bold text-gray-500 group-hover:text-purple-700 transition-colors">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .mask-linear-fade {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
    </div>
  );
};

export default TrustedBy;
