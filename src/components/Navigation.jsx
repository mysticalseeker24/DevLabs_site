import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import theme from '../styles/theme';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll event to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        staggerChildren: 0.1 
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
        backgroundColor: isScrolled ? theme.colors.background : 'transparent',
        boxShadow: isScrolled ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none',
        backdropFilter: isScrolled ? 'blur(8px)' : 'none',
        transition: 'all 0.3s ease'
      }}
    >
      <motion.div variants={itemVariants} className="logo">
        <Link to="/" style={{ 
          fontSize: '1.5rem', 
          fontWeight: 'bold',
          color: theme.colors.text,
          fontFamily: theme.fonts.secondary
        }}>
          DevLabs
        </Link>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        style={{ 
          display: 'flex', 
          gap: '2rem' 
        }}
      >
        <NavLink to="/" isActive={location.pathname === '/'}>Home</NavLink>
        <NavLink to="/events" isActive={location.pathname === '/events'}>Events</NavLink>
        <NavLink to="/about" isActive={location.pathname === '/about'}>About</NavLink>
      </motion.div>
    </motion.nav>
  );
};

// Custom NavLink component with animations
const NavLink = ({ to, children, isActive }) => {
  return (
    <Link to={to}>
      <motion.span
        style={{
          position: 'relative',
          color: theme.colors.text,
          fontWeight: isActive ? '600' : '400',
        }}
        whileHover={{
          color: theme.colors.accent,
          transition: { duration: 0.3 }
        }}
      >
        {children}
        {isActive && (
          <motion.div
            layoutId="underline"
            style={{
              position: 'absolute',
              width: '100%',
              height: '2px',
              bottom: '-5px',
              backgroundColor: theme.colors.accent,
            }}
          />
        )}
      </motion.span>
    </Link>
  );
};

export default Navigation;
