import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const SOCIAL_LINKS = {
  github: 'https://github.com/Aphrodine-wq/g-rump.com',
  discord: 'https://discord.gg/pPJeWGyf',
  twitter: 'https://x.com/grump_co',
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
    <footer className="border-t border-[#e5e7eb] bg-white py-20 lg:py-24" role="contentinfo">
      <div className="mx-auto max-w-[90rem] px-6 sm:px-8 lg:px-10">
        <div className="mb-16 grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-12">
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
            <ul className="mt-6 space-y-4">
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
            <ul className="mt-6 space-y-4">
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
            <ul className="mt-6 space-y-4">
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
        <div className="border-t border-[#e5e7eb] pt-10">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-caption text-[#6b7280]">© 2026 G-Rump. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/Aphrodine-wq/g-rump.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-600 transition-all hover:border-purple-300 hover:bg-purple-100"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
                Open Source
              </a>
              <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-600">
                v2.4.0
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
