import React, { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'How it Works', href: '/#how-it-works', path: '/' },
    { name: 'Pricing', href: '/pricing', path: '/pricing' },
    { name: 'Docs', href: '/docs', path: '/docs' },
    { name: 'Downloads', href: '/downloads', path: '/downloads' },
  ];

  return (
    <>
      <nav
        className={`fixed w-full nav-glass z-50 transition-shadow duration-300 ${scrolled ? 'scrolled' : ''}`}
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
                  className="nav-link text-body-sm font-medium py-2 min-h-[44px] flex items-center"
                  aria-current={location.pathname === link.path ? 'page' : undefined}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/downloads"
                className="btn-primary px-5 py-2.5 rounded-xl text-body-sm font-semibold min-h-[44px] flex items-center gap-2"
              >
                <Download size={16} />
                Download
              </Link>
            </div>

            <button
              type="button"
              className="md:hidden min-w-[44px] min-h-[44px] p-2 flex items-center justify-center text-[#4a4a5a] hover:text-[#7c3aed] rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7c3aed] focus-visible:ring-offset-2"
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
            role="dialog"
            aria-label="Mobile menu"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="nav-link text-body-sm font-medium min-h-[44px] flex items-center px-2 rounded-lg"
                  aria-current={location.pathname === link.path ? 'page' : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/downloads"
                className="btn-primary px-6 py-3 rounded-xl text-body-sm font-semibold text-center min-h-[44px] flex items-center justify-center mt-2 gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Download size={16} />
                Download
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
