import React, { useRef, useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface LogoProps {
  className?: string;
  size?: number | string;
  interactive?: boolean;
  mousePos?: { x: number; y: number }; // Optional override
}

const Logo: React.FC<LogoProps> = ({ 
  className, 
  size = "100%", 
  interactive = false,
  mousePos: externalMousePos
}) => {
  const [internalMousePos, setInternalMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const [isHappy, setIsHappy] = useState(false);

  // If interactive and no external mouse pos provided, track it locally relative to window/container
  useEffect(() => {
    if (!interactive || externalMousePos) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      // Calculate normalized position (-1 to 1)
      const normX = (e.clientX - centerX) / (window.innerWidth / 2);
      const normY = (e.clientY - centerY) / (window.innerHeight / 2);
      
      // Limit the movement range
      setInternalMousePos({ 
        x: Math.max(-1, Math.min(1, normX)) * 6, 
        y: Math.max(-1, Math.min(1, normY)) * 6
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [interactive, externalMousePos]);

  const currentMousePos = externalMousePos || internalMousePos;
  const eyeTransform = interactive 
    ? `translate(${currentMousePos.x}px, ${currentMousePos.y}px)` 
    : 'none';

  return (
    <div 
      ref={containerRef} 
      className={twMerge("relative inline-block cursor-pointer transition-transform active:scale-95", className)}
      style={{ width: size, height: size }}
      onClick={() => setIsHappy(!isHappy)}
    >
      <svg viewBox="-10 -10 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="50" cy="50" r="45" stroke={isHappy ? "#22c55e" : "#7c3aed"} strokeWidth="6" fill="white" className="transition-colors duration-300" />
        
        <g style={{ transform: eyeTransform, transition: 'transform 0.1s ease-out' }}>
          <circle cx="32" cy="38" r="6" fill={isHappy ? "#22c55e" : "#7c3aed"} className="transition-colors duration-300" />
          <circle cx="68" cy="38" r="6" fill={isHappy ? "#22c55e" : "#7c3aed"} className="transition-colors duration-300" />
        </g>
        
        {/* Mouth transitions between Frown and Smile */}
        <path 
          d={isHappy ? "M 32 72 Q 50 90 68 72" : "M 32 72 Q 50 55 68 72"} 
          stroke={isHappy ? "#22c55e" : "#7c3aed"} 
          strokeWidth="6" 
          strokeLinecap="round" 
          className="transition-all duration-300 ease-spring"
        />
      </svg>
    </div>
  );
};

export default Logo;
