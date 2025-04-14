import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import theme from '../styles/theme';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Check if viewport is mobile-sized
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  // Handle scroll events for changing navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Animation variants
  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: 'easeInOut' 
      } 
    }
  };

  const linkVariants = {
    hover: { 
      scale: 1.1,
      color: theme.colors.accent,
      transition: { duration: 0.2 }
    }
  };

  const mobileMenuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const mobileItemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 }
  };

  // Hamburger button animation
  const Path = props => (
    <motion.path
      fill="transparent"
      strokeWidth="3"
      stroke={theme.colors.text}
      strokeLinecap="round"
      {...props}
    />
  );

  return (
    <motion.nav
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: theme.colors.navbarBg,
        backdropFilter: 'blur(8px)',
        boxShadow: isScrolled ? '0 2px 10px rgba(0, 0, 0, 0.2)' : 'none',
        padding: `${theme.spacing.md} ${theme.spacing.lg}`,
        transition: 'all 0.3s ease-in-out'
      }}
    >
      <div 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%'
        }}
      >
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <NavLink 
            to="/" 
            style={{
              color: theme.colors.accent,
              fontFamily: theme.fonts.secondary,
              fontSize: '1.8rem',
              fontWeight: '700',
              textDecoration: 'none',
              letterSpacing: '1px'
            }}
          >
            DevLabs
          </NavLink>
        </motion.div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <NavLink to="/">
              {({ isActive }) => (
                <motion.span
                  variants={linkVariants}
                  whileHover="hover"
                  style={{
                    color: isActive ? theme.colors.accent : theme.colors.text,
                    textDecoration: 'none',
                    fontWeight: isActive ? '600' : '400',
                    position: 'relative',
                    paddingBottom: '4px'
                  }}
                >
                  Home
                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '2px',
                        background: theme.colors.accent,
                        bottom: 0,
                        left: 0
                      }}
                    />
                  )}
                </motion.span>
              )}
            </NavLink>

            <NavLink to="/events">
              {({ isActive }) => (
                <motion.span
                  variants={linkVariants}
                  whileHover="hover"
                  style={{
                    color: isActive ? theme.colors.accent : theme.colors.text,
                    textDecoration: 'none',
                    fontWeight: isActive ? '600' : '400',
                    position: 'relative',
                    paddingBottom: '4px'
                  }}
                >
                  Events
                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '2px',
                        background: theme.colors.accent,
                        bottom: 0,
                        left: 0
                      }}
                    />
                  )}
                </motion.span>
              )}
            </NavLink>

            <NavLink to="/about">
              {({ isActive }) => (
                <motion.span
                  variants={linkVariants}
                  whileHover="hover"
                  style={{
                    color: isActive ? theme.colors.accent : theme.colors.text,
                    textDecoration: 'none',
                    fontWeight: isActive ? '600' : '400',
                    position: 'relative',
                    paddingBottom: '4px'
                  }}
                >
                  About
                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '2px',
                        background: theme.colors.accent,
                        bottom: 0,
                        left: 0
                      }}
                    />
                  )}
                </motion.span>
              )}
            </NavLink>
            
            <motion.a
              href="https://chat.whatsapp.com/FQz7lIkcfFPEqQxwrZTKiA"
              target="_blank"
              rel="noreferrer noopener"
              initial={{ scale: 1 }}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: theme.colors.primary,
                color: theme.colors.background,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '0.6rem 1.2rem',
                backgroundColor: 'transparent',
                color: theme.colors.primary,
                border: `1px solid ${theme.colors.primary}`,
                borderRadius: '30px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Join Now
            </motion.a>
          </div>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            style={{ 
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: theme.spacing.sm,
              zIndex: 101
            }}
            whileTap={{ scale: 0.9 }}
          >
            <svg width="24" height="24" viewBox="0 0 23 23">
              <Path
                variants={{
                  closed: { d: "M 2 2.5 L 20 2.5" },
                  open: { d: "M 3 16.5 L 17 2.5" }
                }}
                animate={isOpen ? "open" : "closed"}
              />
              <Path
                d="M 2 9.423 L 20 9.423"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
                transition={{ duration: 0.1 }}
                animate={isOpen ? "open" : "closed"}
              />
              <Path
                variants={{
                  closed: { d: "M 2 16.346 L 20 16.346" },
                  open: { d: "M 3 2.5 L 17 16.346" }
                }}
                animate={isOpen ? "open" : "closed"}
              />
            </svg>
          </motion.button>
        )}

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobile && isOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: '70%',
                backgroundColor: theme.colors.background,
                boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.2)',
                padding: `${theme.spacing.xl} ${theme.spacing.lg}`,
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                zIndex: 100,
                paddingTop: '80px'
              }}
            >
              <motion.div variants={mobileItemVariants}>
                <NavLink 
                  to="/" 
                  onClick={() => setIsOpen(false)}
                  style={({ isActive }) => ({
                    color: isActive ? theme.colors.accent : theme.colors.text,
                    textDecoration: 'none',
                    fontWeight: isActive ? '600' : '400',
                    fontSize: '1.5rem',
                    display: 'block',
                    padding: '10px 0'
                  })}
                >
                  Home
                </NavLink>
              </motion.div>
              
              <motion.div variants={mobileItemVariants}>
                <NavLink 
                  to="/events" 
                  onClick={() => setIsOpen(false)}
                  style={({ isActive }) => ({
                    color: isActive ? theme.colors.accent : theme.colors.text,
                    textDecoration: 'none',
                    fontWeight: isActive ? '600' : '400',
                    fontSize: '1.5rem',
                    display: 'block',
                    padding: '10px 0'
                  })}
                >
                  Events
                </NavLink>
              </motion.div>
              
              <motion.div variants={mobileItemVariants}>
                <NavLink 
                  to="/about" 
                  onClick={() => setIsOpen(false)}
                  style={({ isActive }) => ({
                    color: isActive ? theme.colors.accent : theme.colors.text,
                    textDecoration: 'none',
                    fontWeight: isActive ? '600' : '400',
                    fontSize: '1.5rem',
                    display: 'block',
                    padding: '10px 0'
                  })}
                >
                  About
                </NavLink>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
