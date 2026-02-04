import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer
      className="py-16 border-t border-[#e5e7eb] bg-white"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link
              to="/"
              className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7c3aed] focus-visible:ring-offset-2 rounded-lg"
              aria-label="G-Rump Home"
            >
              <Logo size={32} />
              <span className="text-h3 font-semibold text-[#1a1a2e]">G-Rump</span>
            </Link>
            <p className="text-body-sm text-[#6b7280]">Turn product ideas into working code.</p>
          </div>
          <div className="flex items-center gap-6 text-body-sm text-[#4a4a5a] min-h-[44px]">
            <a href="#" className="hover:text-[#7c3aed] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7c3aed] rounded">
              Twitter
            </a>
            <a href="#" className="hover:text-[#7c3aed] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7c3aed] rounded">
              GitHub
            </a>
            <a href="#" className="hover:text-[#7c3aed] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7c3aed] rounded">
              Discord
            </a>
            <Link to="/docs" className="hover:text-[#7c3aed] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7c3aed] rounded">
              Docs
            </Link>
          </div>
          <p className="text-[#6b7280] text-caption">© 2026 G-Rump. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
