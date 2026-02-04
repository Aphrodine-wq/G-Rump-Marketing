import React from 'react';
import { NavLink } from 'react-router-dom';
import { Book, Layers, Terminal, Code, Activity, Shield, FileText } from 'lucide-react';

interface SectionItem {
  label: string;
  to: string;
}

interface Section {
  title: string;
  icon: React.ElementType;
  items: SectionItem[];
}

const DocsSidebar: React.FC<{ onCloseMobile?: () => void }> = ({ onCloseMobile }) => {
  const sections: Section[] = [
    {
      title: 'Quick Start',
      icon: Book,
      items: [
        { label: 'Introduction', to: '/docs/README' },
        { label: 'Getting Started', to: '/docs/GETTING_STARTED' },
        { label: 'FAQ', to: '/docs/FAQ' },
      ],
    },
    {
      title: 'For Users',
      icon: FileText,
      items: [
        { label: 'Getting Started', to: '/docs/GETTING_STARTED' },
        { label: 'How It Works', to: '/docs/HOW_IT_WORKS' },
        { label: 'CLI', to: '/docs/CLI' },
        { label: 'FAQ', to: '/docs/FAQ' },
        { label: 'Troubleshooting', to: '/docs/TROUBLESHOOTING' },
      ],
    },
    {
      title: 'For Developers',
      icon: Layers,
      items: [
        { label: 'Architecture', to: '/docs/ARCHITECTURE' },
        { label: 'API Reference', to: '/docs/API' },
        { label: 'Agent System (G-Agent)', to: '/docs/AGENT_SYSTEM' },
        { label: 'Development', to: '/docs/DEVELOPMENT' },
        { label: 'Testing', to: '/docs/TESTING' },
        { label: 'Contributing', to: '/docs/legal/CONTRIBUTING' },
      ],
    },
    {
      title: 'For Operators',
      icon: Activity,
      items: [
        { label: 'Production', to: '/docs/PRODUCTION' },
        { label: 'Security', to: '/docs/SECURITY' },
        { label: 'GPU Deployment', to: '/docs/GPU_DEPLOYMENT' },
        { label: 'NVIDIA Golden Developer', to: '/docs/NVIDIA_GOLDEN_DEVELOPER' },
        { label: 'NVIDIA Observability', to: '/docs/NVIDIA_OBSERVABILITY' },
      ],
    },
    {
      title: 'Reference',
      icon: Code,
      items: [
        { label: 'API', to: '/docs/API' },
        { label: 'CLI', to: '/docs/CLI' },
        { label: 'Integrations', to: '/docs/INTEGRATIONS' },
        { label: 'Backends', to: '/docs/BACKENDS' },
        { label: 'Intent RAG Fusion', to: '/docs/INTENT_RAG_FUSION' },
      ],
    },
    {
      title: 'Planning & Roadmap',
      icon: FileText,
      items: [
        { label: 'Roadmap', to: '/docs/ROADMAP' },
      ],
    },
    {
      title: 'Legal',
      icon: Shield,
      items: [
        { label: 'Terms of Service', to: '/docs/legal/TERMS_OF_SERVICE' },
        { label: 'Privacy Policy', to: '/docs/legal/PRIVACY_POLICY' },
        { label: 'Acceptable Use', to: '/docs/legal/ACCEPTABLE_USE_POLICY' },
        { label: 'Code of Conduct', to: '/docs/legal/CODE_OF_CONDUCT' },
      ],
    },
  ];

  return (
    <nav className="space-y-8 pb-10">
      <p className="text-[#6b7280] text-xs font-medium mb-4">Version 2.1.0 · February 2026</p>
      {sections.map((section) => (
        <div key={section.title}>
          <div className="flex items-center gap-2 px-3 mb-3 text-xs font-bold text-[#1a1a2e] uppercase tracking-widest opacity-80">
            <section.icon size={14} className="text-[#7c3aed]" />
            {section.title}
          </div>
          <ul className="space-y-0.5 border-l border-[#e5e7eb] ml-2 pl-2">
            {section.items.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    `block px-3 py-1.5 text-sm rounded-md transition-all duration-200 border border-transparent ${
                      isActive
                        ? 'bg-[rgba(124,58,237,0.1)] text-[#7c3aed] font-semibold border-[rgba(124,58,237,0.2)]'
                        : 'text-[#4a4a5a] hover:text-[#1a1a2e] hover:bg-[#f5f5f7]'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
};

export default DocsSidebar;
