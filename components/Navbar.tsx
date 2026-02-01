import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from './ui/Button';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const navLinks = [
    { name: 'Features', href: '/features' },
    { name: 'Workflow', href: '/workflow' },
    { name: 'Docs', href: '/docs' },
    { name: 'Pricing', href: '/pricing' },
  ];

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav
        className={`fixed top-6 left-0 right-0 z-50 transition-all duration-300 flex justify-center px-4`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className={`
          relative flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300
          ${scrolled || isOpen ? 'bg-white/70 backdrop-blur-2xl shadow-xl shadow-purple-900/5 border border-white/40 w-full max-w-5xl' : 'bg-transparent w-full max-w-7xl'}
        `}>

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 rounded-lg"
            onClick={() => window.scrollTo(0, 0)}
            aria-label="G-Rump Home"
          >
            <div className="transform transition-transform group-hover:rotate-6 duration-500">
              <Logo size={36} />
            </div>
            <span className="font-bold text-lg tracking-tight text-gray-900 group-hover:text-purple-900 transition-colors">
              G-Rump
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1" role="menubar" aria-label="Desktop navigation">
            <div className={`flex items-center gap-1 px-2 py-1.5 rounded-full ${scrolled ? 'bg-gray-100/50' : 'bg-white/30 backdrop-blur-sm'}`}>
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    role="menuitem"
                    className={`px-5 py-2 text-sm font-medium transition-colors rounded-full hover:bg-white hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${isActive ? 'text-purple-900 bg-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/docs"
              className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-lg px-2 py-1"
              aria-label="API Reference Documentation"
            >
              API Reference
            </Link>
            <Button variant="default" size="sm">Get Started</Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 transition-colors"
            onClick={toggleMobileMenu}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Close mobile menu' : 'Open mobile menu'}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl pt-32 px-6"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <div className="flex flex-col space-y-6 text-center max-w-sm mx-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-3xl font-bold text-gray-900 hover:text-purple-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-lg px-4 py-2"
                  role="menuitem"
                  aria-current={location.pathname === link.href ? 'page' : undefined}
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-gray-200 my-8" />
              <Button variant="secondary" size="lg" className="w-full">Get Started</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
