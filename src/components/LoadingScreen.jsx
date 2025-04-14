import React, { useEffect, useMemo } from 'react';
// motion is used in JSX elements like motion.div, so it's required
import { motion } from 'framer-motion';
import theme from '../styles/theme';

const LoadingScreen = ({ onComplete }) => {
  const text = 'Welcome to DevLabs';
  
  // Use useEffect to ensure the animation completes even if the user switches tabs
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, text.length * 0.05 * 1000 + 1500); // Total animation time + extra delay
    
    return () => clearTimeout(timer);
  }, [onComplete, text.length]);

  // Container variants
  const containerVariants = {
    initial: { opacity: 1 },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.8,
        ease: 'easeInOut',
        delay: text.length * 0.05 + 1 
      }
    }
  };

  // Container for the text variants
  const textContainerVariants = {
    initial: { opacity: 1 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  };

  // Character variants
  const characterVariants = {
    initial: { 
      opacity: 0,
      y: 20 
    },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        damping: 10,
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: theme.colors.background,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        overflow: 'hidden'
      }}
    >
      {/* Tech-inspired animation elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: [0, 0.4, 0],
          scale: [0, 2, 4]
        }}
        transition={{ 
          duration: 4, 
          ease: 'easeInOut',
          times: [0, 0.5, 1],
          repeat: Infinity,
          repeatDelay: 0.5
        }}
        style={{
          position: 'absolute',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.colors.accent}40 0%, ${theme.colors.accent}00 70%)`,
          filter: 'blur(20px)'
        }}
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: [0, 0.3, 0],
          scale: [0, 1.5, 3]
        }}
        transition={{ 
          duration: 3, 
          ease: 'easeInOut',
          times: [0, 0.5, 1],
          repeat: Infinity,
          repeatDelay: 1,
          delay: 0.5
        }}
        style={{
          position: 'absolute',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.colors.secondary}40 0%, ${theme.colors.secondary}00 70%)`,
          filter: 'blur(20px)'
        }}
      />

      {/* Floating code particles */}
      {useMemo(() => {
        // Code snippets that will float around
        const codeSnippets = [
          'const DevLabs = () => { ... }',
          'import React from "react";',
          'function learnTech() { ... }',
          '<CodeComponent />',
          'npm install',
          'git commit -m "init"',
          'const [state, setState] = useState();',
          'useEffect(() => { ... }, [])',
          '@keyframes float { ... }',
          'docker-compose up',
          'function handleAPI() { ... }',
          'addEventListener("click", () => {})',
          'async/await',
          '.then(() => {})',
          '<motion.div>',
          'export default DevLabs;'
        ];
        
        return codeSnippets.map((snippet, index) => {
          // Random positioning and animation properties
          const x = Math.random() * 100 - 50; // -50 to 50 vw
          const y = Math.random() * 100 - 50; // -50 to 50 vh
          const size = Math.random() * 0.5 + 0.6; // 0.6 to 1.1 for scale
          const opacity = Math.random() * 0.3 + 0.1; // 0.1 to 0.4 opacity
          const duration = Math.random() * 50 + 30; // 30-80s for full animation
          const delay = Math.random() * 2; // 0-2s delay
          
          return (
            <motion.div
              key={index}
              initial={{ 
                x: `${x}vw`, 
                y: `${y}vh`,
                opacity: 0,
                scale: 0
              }}
              animate={{ 
                x: [`${x}vw`, `${x + (Math.random() * 40 - 20)}vw`],
                y: [`${y}vh`, `${y + (Math.random() * 40 - 20)}vh`],
                opacity: [0, opacity, opacity, 0],
                rotate: [0, Math.random() * 40 - 20],
                scale: [0, size, size, 0]
              }}
              transition={{ 
                duration: duration,
                times: [0, 0.1, 0.9, 1],
                delay: delay,
                repeat: Infinity,
                repeatType: 'loop',
                repeatDelay: Math.random() * 2
              }}
              style={{
                position: 'absolute',
                color: index % 2 === 0 ? theme.colors.accent : theme.colors.secondary,
                fontSize: `${Math.random() * 0.5 + 0.6}rem`,
                fontFamily: 'monospace',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                fontWeight: 400,
                opacity: opacity,
                filter: `blur(${Math.random() * 0.5}px)`,
                textShadow: `0 0 5px ${theme.colors.accent}40`
              }}
            >
              {snippet}
            </motion.div>
          );
        });
      }, [])}

      {/* Grid lines for tech effect */}
      <motion.div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundImage: `
            linear-gradient(to right, ${theme.colors.accent}10 1px, transparent 1px),
            linear-gradient(to bottom, ${theme.colors.accent}10 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          opacity: 0.2
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1, delay: 0.5 }}
      />

      {/* Main text animation */}
      <motion.div
        variants={textContainerVariants}
        initial="initial"
        animate="animate"
        style={{
          display: 'flex',
          position: 'relative',
          zIndex: 10
        }}
      >
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            variants={characterVariants}
            style={{
              color: theme.colors.accent,
              fontFamily: theme.fonts.secondary,
              fontSize: 'clamp(1.5rem, 5vw, 3.5rem)',
              fontWeight: '600',
              display: 'inline-block',
              whiteSpace: 'pre',
              textShadow: `0 0 10px ${theme.colors.accent}40`
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>

      {/* Loading indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: text.length * 0.05 + 0.5, duration: 0.5 }}
        style={{
          marginTop: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <motion.span
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5] 
          }}
          transition={{ 
            duration: 1.2, 
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: theme.colors.accent,
            display: 'inline-block'
          }}
        />
        <motion.span
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5] 
          }}
          transition={{ 
            duration: 1.2, 
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.2
          }}
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: theme.colors.accent,
            display: 'inline-block'
          }}
        />
        <motion.span
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5] 
          }}
          transition={{ 
            duration: 1.2, 
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.4
          }}
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: theme.colors.accent,
            display: 'inline-block'
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
