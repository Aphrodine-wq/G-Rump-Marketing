import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface ScrambleTextProps {
  text: string;
  className?: string;
  scrambleSpeed?: number; // ms per character shuffle
  revealSpeed?: number;   // ms per character reveal
  delay?: number;         // ms before starting
}

const CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const ScrambleText: React.FC<ScrambleTextProps> = ({ 
  text, 
  className = '', 
  scrambleSpeed = 50, 
  revealSpeed = 100,
  delay = 500
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const revealIndexRef = useRef(0);
  
  const startAnimation = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    revealIndexRef.current = 0;
    let iteration = 0;
    
    intervalRef.current = setInterval(() => {
      setDisplayText(prev => {
        return text
          .split('')
          .map((char, index) => {
            if (index < revealIndexRef.current) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('');
      });

      // Reveal characters over time
      if (iteration > 0 && iteration % 2 === 0) { // Slow down the reveal slightly relative to scramble
        revealIndexRef.current += 1;
      }
      
      iteration++;

      if (revealIndexRef.current >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text); // Ensure final state is clean
      }
    }, scrambleSpeed);
  };

  useEffect(() => {
    const timer = setTimeout(startAnimation, delay);
    return () => {
      clearTimeout(timer);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, delay]);

  const handleMouseEnter = () => {
    if (!isHovered) {
      setIsHovered(true);
      startAnimation();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <motion.span
      className={`inline-block font-mono cursor-default ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayText || text.split('').map(() => CHARS[Math.floor(Math.random() * CHARS.length)]).join('')}
      <span className="animate-pulse text-purple-400">_</span>
    </motion.span>
  );
};

export default ScrambleText;
