import React, { useState } from 'react';
import { Github, Twitter, MessageCircle, ArrowRight, Activity, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter submission logic would go here
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10 text-sm text-gray-600" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

          {/* Brand Column */}
          <div className="md:col-span-4">
            <Link
              to="/"
              className="flex items-center gap-2 mb-6 group w-fit focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 rounded-lg"
              aria-label="G-Rump Home"
            >
              <div className="transform transition-transform group-hover:rotate-6 bg-white rounded-lg p-2 border border-gray-200">
                <Logo size={32} />
              </div>
              <span className="font-bold text-xl text-gray-900 group-hover:text-purple-600 transition-colors tracking-tight">
                G-Rump
              </span>
            </Link>
            <p className="text-gray-500 mb-8 max-w-sm leading-relaxed">
              Intent-based architecture. Natural language to production.
            </p>
            <nav aria-label="Social media links">
              <div className="flex space-x-4">
                <SocialLink icon={Github} href="https://github.com" label="GitHub" />
                <SocialLink icon={Twitter} href="https://twitter.com" label="Twitter" />
                <SocialLink icon={MessageCircle} href="#" label="Discord" />
              </div>
            </nav>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-2">
            <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-xs">Product</h4>
            <nav aria-label="Product links">
              <ul className="space-y-4 text-gray-500" role="list">
                <li><FooterLink to="/features">CLI Tool</FooterLink></li>
                <li><FooterLink to="/features">Extension</FooterLink></li>
                <li><FooterLink to="/pricing">Pricing</FooterLink></li>
                <li><FooterLink to="/docs/changelog">Changelog</FooterLink></li>
                <li><span className="text-purple-600 text-xs px-2 py-0.5 bg-purple-50 rounded border border-purple-100 cursor-default" aria-label="Currently hiring">Hiring</span></li>
              </ul>
            </nav>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-xs">Resources</h4>
            <nav aria-label="Resources links">
              <ul className="space-y-4 text-gray-500" role="list">
                <li><FooterLink to="/docs">Docs</FooterLink></li>
                <li><FooterLink to="/docs/API">API</FooterLink></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded">Community</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded">Blog</a></li>
              </ul>
            </nav>
          </div>

          {/* Status & Newsletter Column */}
          <div className="md:col-span-4 bg-gradient-to-br from-gray-50 to-purple-50/50 rounded-2xl p-6 border border-gray-100/80">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Activity size={16} className="text-green-500" aria-hidden="true" />
              System Status
            </h4>

            <div className="space-y-3 mb-8" role="list" aria-label="System status">
              <StatusRow label="API Gateway" status="Operational" color="bg-green-500" />
              <StatusRow label="NIM Inference" status="Operational" color="bg-green-500" />
              <StatusRow label="Vector DB" status="Operational" color="bg-green-500" />
            </div>

            <h4 className="font-bold text-gray-900 mb-4 text-xs uppercase tracking-wider">Updates</h4>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border border-gray-200 rounded-lg px-4 py-2 w-full text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                aria-label="Email address for newsletter"
                required
              />
              <button
                type="submit"
                className="bg-gray-900 text-white rounded-lg px-3 py-2 hover:bg-gray-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                aria-label="Subscribe to newsletter"
              >
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {currentYear} G-Rump Inc.</p>
          <nav aria-label="Legal links" className="flex items-center gap-6 mt-4 md:mt-0">
            <Link to="/docs/legal/PRIVACY_POLICY" className="hover:text-gray-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded">Privacy</Link>
            <Link to="/docs/legal/TERMS_OF_SERVICE" className="hover:text-gray-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded">Terms</Link>
            <Link to="/docs/security" className="hover:text-gray-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded">Security</Link>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-50 border border-green-100" aria-label="System status: All systems normal">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" aria-hidden="true"></div>
              <span className="text-green-700 font-medium">All systems normal</span>
            </div>
          </nav>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ icon: Icon, href, label }: { icon: any, href: string, label: string }) => (
  <a
    href={href}
    className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 hover:text-purple-600 hover:bg-white hover:border-purple-200 hover:shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
    aria-label={label}
    target="_blank"
    rel="noopener noreferrer"
  >
    <Icon size={18} />
  </a>
);

const FooterLink = ({ to, children }: { to: string, children: React.ReactNode }) => (
  <Link to={to} className="hover:text-purple-600 transition-colors block w-fit focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded">
    {children}
  </Link>
);

const StatusRow = ({ label, status, color }: { label: string, status: string, color: string }) => (
  <div className="flex items-center justify-between text-xs" role="listitem">
    <span className="text-gray-500">{label}</span>
    <div className="flex items-center gap-2">
      <span className={`w-1.5 h-1.5 rounded-full ${color} animate-pulse`} aria-hidden="true"></span>
      <span className="text-gray-700 font-mono">{status}</span>
    </div>
  </div>
);

export default Footer;
