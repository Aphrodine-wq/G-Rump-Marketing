import React from 'react';
import { NavLink } from 'react-router-dom';
import { Book, Layers, Terminal, Code, Activity, Shield, FileText, ChevronDown } from 'lucide-react';

interface DocsSidebarProps {
  onCloseMobile?: () => void;
}

const DocsSidebar: React.FC<DocsSidebarProps> = ({ onCloseMobile }) => {
  const sections = [
    {
      title: 'Getting Started',
      icon: Book,
      items: [
        { label: 'Introduction', to: '/docs/README' },
        { label: 'Quick Start', to: '/docs/GETTING_STARTED' },
        { label: 'Installation', to: '/docs/SETUP' },
        { label: 'For New Developers', to: '/docs/ONBOARDING' },
      ]
    },
    {
      title: 'Core Concepts',
      icon: Layers,
      items: [
        { label: 'Overview', to: '/docs/OVERVIEW' },
        { label: 'How It Works', to: '/docs/HOW_IT_WORKS' },
        { label: 'Architecture', to: '/docs/ARCHITECTURE' },
        { label: 'Intent Compiler', to: '/docs/INTENT_COMPILER' },
      ]
    },
    {
      title: 'Features',
      icon: Terminal,
      items: [
        { label: 'Capabilities', to: '/docs/CAPABILITIES' },
        { label: 'Agent System', to: '/docs/AGENT_SYSTEM' },
        { label: 'AI Workflows', to: '/docs/AI_WORKFLOWS' },
        { label: 'Backends', to: '/docs/BACKENDS' },
      ]
    },
    {
      title: 'Reference',
      icon: Code,
      items: [
        { label: 'API Reference', to: '/docs/API' },
        { label: 'CLI Reference', to: '/docs/QUICK_REFERENCE' },
        { label: 'Integrations', to: '/docs/INTEGRATIONS' },
        { label: 'Known Issues', to: '/docs/KNOWN_ISSUES' },
      ]
    },
    {
      title: 'Operations',
      icon: Activity,
      items: [
        { label: 'Production Checklist', to: '/docs/PRODUCTION_CHECKLIST' },
        { label: 'Runbook', to: '/docs/RUNBOOK' },
        { label: 'Observability', to: '/docs/OBSERVABILITY' },
        { label: 'Performance', to: '/docs/PERFORMANCE_GUIDE' },
      ]
    },
    {
      title: 'Legal',
      icon: Shield,
      items: [
        { label: 'Terms of Service', to: '/docs/legal/TERMS_OF_SERVICE' },
        { label: 'Privacy Policy', to: '/docs/legal/PRIVACY_POLICY' },
        { label: 'Acceptable Use', to: '/docs/legal/ACCEPTABLE_USE_POLICY' },
      ]
    }
  ];

  return (
    <nav className="space-y-8 pb-10">
      {sections.map((section) => (
        <div key={section.title}>
          <div className="flex items-center justify-between gap-2 px-3 mb-3 text-xs font-bold text-gray-900 uppercase tracking-widest opacity-80">
            <div className="flex items-center gap-2">
               <section.icon size={14} className="text-purple-600" />
               {section.title}
            </div>
          </div>
          <ul className="space-y-0.5 border-l border-gray-100 ml-2 pl-2">
            {section.items.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={onCloseMobile}
                  className={({ isActive }) => `
                    block px-3 py-1.5 text-sm rounded-md transition-all duration-200 border border-transparent
                    ${isActive 
                      ? 'bg-purple-50 text-purple-700 font-bold border-purple-100 shadow-sm translate-x-1' 
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                    }
                  `}
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
