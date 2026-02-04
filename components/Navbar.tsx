import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Features', href: '/#features' },
    { name: 'How it Works', href: '/#how-it-works' },
    { name: 'Docs', href: '/docs' },
    { name: 'Workflow', href: '/workflow' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Downloads', href: '/downloads' },
  ];

  return (
    <>
      <nav
        className="fixed w-full nav-glass z-50"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              to="/"
              className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7c3aed] focus-visible:ring-offset-2 rounded-lg"
              aria-label="G-Rump Home"
              onClick={() => window.scrollTo(0, 0)}
            >
              <Logo size={32} />
              <span className="text-xl font-semibold text-[#1a1a2e] tracking-tight">G-Rump</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="nav-link text-sm font-medium"
                  aria-current={location.pathname === link.href ? 'page' : undefined}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/#waitlist"
                className="btn-primary px-5 py-2 rounded-lg text-sm font-medium"
              >
                Join Waitlist
              </Link>
            </div>

            <button
              type="button"
              className="md:hidden p-2 text-[#4a4a5a] hover:text-[#7c3aed] rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7c3aed]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-[#e5e7eb] shadow-lg py-4 px-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="nav-link text-sm font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/#waitlist"
                className="btn-primary px-5 py-3 rounded-lg text-sm font-medium text-center mt-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Join Waitlist
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
