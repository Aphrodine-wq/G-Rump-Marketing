import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const SOCIAL_LINKS = {
  github: 'https://github.com/Aphrodine-wq/g-rump.com',
  // TODO: Replace with your live community links once they are ready.
  discord: '',
  twitter: '',
};

const renderSocialLink = (
  label: string,
  href: string,
  fallback: string = 'Coming soon',
) => {
  if (!href) {
    return <span className="text-body-sm text-[#9ca3af]">{fallback}</span>;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-body-sm text-[#6b7280] transition-colors hover:text-[#7c3aed]"
    >
      {label}
    </a>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#e5e7eb] bg-white py-16" role="contentinfo">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              to="/"
              className="mb-4 flex items-center gap-3 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7c3aed] focus-visible:ring-offset-2"
              aria-label="G-Rump Home"
            >
              <Logo size={36} />
              <span className="text-h3 font-semibold text-[#1a1a2e]">G-Rump</span>
            </Link>
            <p className="text-body-sm text-[#6b7280]">Turn product ideas into working code.</p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-body-sm font-semibold text-[#1a1a2e]">Product</h4>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  to="/#how-it-works"
                  className="text-body-sm text-[#6b7280] transition-colors hover:text-[#7c3aed]"
                >
                  How it Works
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-body-sm text-[#6b7280] transition-colors hover:text-[#7c3aed]"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/downloads"
                  className="text-body-sm text-[#6b7280] transition-colors hover:text-[#7c3aed]"
                >
                  Downloads
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-body-sm font-semibold text-[#1a1a2e]">Resources</h4>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  to="/docs"
                  className="text-body-sm text-[#6b7280] transition-colors hover:text-[#7c3aed]"
                >
                  Documentation
                </Link>
              </li>
              <li>{renderSocialLink('GitHub', SOCIAL_LINKS.github)}</li>
              <li>{renderSocialLink('Discord', SOCIAL_LINKS.discord)}</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-body-sm font-semibold text-[#1a1a2e]">Company</h4>
            <ul className="mt-4 space-y-3">
              <li>{renderSocialLink('Twitter / X', SOCIAL_LINKS.twitter)}</li>
              <li>
                <Link
                  to="/terms"
                  className="text-body-sm text-[#6b7280] transition-colors hover:text-[#7c3aed]"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-body-sm text-[#6b7280] transition-colors hover:text-[#7c3aed]"
                >
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#e5e7eb] pt-8 text-center">
          <p className="text-caption text-[#6b7280]">© 2026 G-Rump. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
