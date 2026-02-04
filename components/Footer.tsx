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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              to="/"
              className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7c3aed] focus-visible:ring-offset-2 rounded-lg mb-4"
              aria-label="G-Rump Home"
            >
              <Logo size={32} />
              <span className="text-h3 font-semibold text-[#1a1a2e]">G-Rump</span>
            </Link>
            <p className="text-body-sm text-[#6b7280]">Turn product ideas into working code.</p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-body-sm font-semibold text-[#1a1a2e] mb-4">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/#how-it-works" className="text-body-sm text-[#6b7280] hover:text-[#7c3aed] transition-colors">
                  How it Works
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-body-sm text-[#6b7280] hover:text-[#7c3aed] transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/downloads" className="text-body-sm text-[#6b7280] hover:text-[#7c3aed] transition-colors">
                  Downloads
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-body-sm font-semibold text-[#1a1a2e] mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/docs" className="text-body-sm text-[#6b7280] hover:text-[#7c3aed] transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-body-sm text-[#6b7280] hover:text-[#7c3aed] transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-body-sm text-[#6b7280] hover:text-[#7c3aed] transition-colors">
                  Discord
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-body-sm font-semibold text-[#1a1a2e] mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-body-sm text-[#6b7280] hover:text-[#7c3aed] transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <Link to="/terms" className="text-body-sm text-[#6b7280] hover:text-[#7c3aed] transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-body-sm text-[#6b7280] hover:text-[#7c3aed] transition-colors">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-[#e5e7eb] text-center">
          <p className="text-[#6b7280] text-caption">© 2026 G-Rump. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
