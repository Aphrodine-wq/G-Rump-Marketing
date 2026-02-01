import React from 'react';

// Official NVIDIA "Eye/Spiral" Abstract
export const NvidiaLogo = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M21.1 11.2c.4-1.7.3-3.4-.2-5.1-.1-.3-.3-.5-.6-.5-.3 0-.5.2-.6.5-.5 1.7-.4 3.4-.2 5.1 0 .3.2.5.5.5.3 0 .5-.2.5-.5H21.1zM17.6 12c.1-1.3 0-2.6-.4-3.8-.1-.3-.3-.4-.6-.4-.3 0-.5.2-.4.4.4 1.2.5 2.5.4 3.8 0 .3.2.5.5.5.3 0 .5-.2.5-.5zM14.1 12.8c.1-1 0-2-.3-2.9-.1-.3-.3-.4-.6-.4-.3 0-.5.2-.4.4.2.9.3 1.9.3 2.9 0 .3.2.5.5.5.3 0 .5-.2.5-.5z" opacity="0.6"/>
    <path d="M22 10.6c-2.7-5.9-9.1-8.5-14.2-5.8C3.8 6.9 1.7 12.1 3 17.2c.1.3.3.5.6.5.3 0 .5-.2.5-.5-1.1-4.7.8-9.4 4.3-11.3 4.7-2.5 10.6-.1 13.1 4.6.1.3.4.4.7.2.2-.2.3-.5.1-.7z"/>
    <path d="M19 12c-1.8-3.9-6-5.6-9.4-3.8-2.6 1.4-4 4.8-3.1 8.2.1.3.3.5.6.5.3 0 .5-.2.5-.5-.8-3.1.5-6.2 2.8-7.5 3.1-1.7 6.9-.2 8.5 3.4.1.3.4.4.7.2.2-.2.4-.5.2-.7z"/>
    <path d="M16 13.3c-1-2-3.1-2.9-4.8-1.9-1.4.8-2.1 2.5-1.6 4.3.1.3.3.5.6.4.3-.1.5-.3.4-.6-.4-1.5.2-2.9 1.4-3.6 1.5-.9 3.3-.1 4.1 1.7.1.3.4.4.7.2.3-.2.4-.5.2-.7z"/>
  </svg>
);

// Claude "Spark" / "Astroid" (Official Anthropic Icon Shape)
export const ClaudeLogo = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z" />
  </svg>
);

// Kimi / Moonshot AI (Stylized Moon)
export const KimiLogo = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
     <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
     <circle cx="16" cy="8" r="2" className="text-white mix-blend-screen" fill="white" />
  </svg>
);

// Microsoft Logo (Four Squares)
export const MicrosoftLogo = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="10" height="10" />
    <rect x="13" y="1" width="10" height="10" />
    <rect x="1" y="13" width="10" height="10" />
    <rect x="13" y="13" width="10" height="10" />
  </svg>
);
