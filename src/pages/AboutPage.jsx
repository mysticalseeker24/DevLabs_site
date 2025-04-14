import React, { useRef, useEffect, useState } from 'react';
import {
  motion,
  useScroll,
  useInView,
  useAnimation,
  AnimatePresence,
  MotionConfig
} from 'framer-motion';
// Navbar is already included in App.jsx
import theme from '../styles/theme';

// Icon components
const EmailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21C16.971 21 21 16.971 21 12C21 7.029 16.971 3 12 3C7.029 3 3 7.029 3 12C3 13.488 3.36 14.891 4 16.13L3 21L7.87 20C9.109 20.64 10.512 21 12 21Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 10C9 9.44772 9.44772 9 10 9H10.01C10.5623 9 11.01 9.44772 11.01 10C11.01 10.5523 10.5623 11 10.01 11H10C9.44772 11 9 10.5523 9 10Z" fill="currentColor"/>
    <path d="M13 10C13 9.44772 13.4477 9 14 9H14.01C14.5623 9 15.01 9.44772 15.01 10C15.01 10.5523 14.5623 11 14.01 11H14C13.4477 11 13 10.5523 13 10Z" fill="currentColor"/>
    <path d="M15 14C15 14 14 16 12 16C10 16 9 14 9 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Custom cursor follower component
const CursorFollower = ({ mousePosition }) => {
  return (
    <motion.div
      className="cursor-follower"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        background: `radial-gradient(circle at center, ${theme.colors.accent}55, ${theme.colors.accent}00)`,
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'difference',
        x: mousePosition.x,
        y: mousePosition.y,
      }}
      transition={{
        type: 'spring',
        damping: 20,
        stiffness: 300,
        mass: 0.5,
      }}
    />
  );
};

const AboutPage = () => {
  // State for cursor position
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  // We'll keep this import for potential future animation use
  useScroll(); // Call without assignment to avoid lint errors
  
  // Animation controls for sections
  const missionControls = useAnimation();
  const foundersControls = useAnimation();
  const contactControls = useAnimation();
  
  // Refs for intersection observation
  const missionRef = useRef(null);
  const foundersRef = useRef(null);
  const contactRef = useRef(null);
  
  // Set up intersection observers for each section
  const isMissionInView = useInView(missionRef, { threshold: 0.3 });
  const isFoundersInView = useInView(foundersRef, { threshold: 0.2 });
  const isContactInView = useInView(contactRef, { threshold: 0.2 });
  
  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Control animations based on scroll position
  useEffect(() => {
    if (isMissionInView) missionControls.start('visible');
    else missionControls.start('hidden');
    

    if (isFoundersInView) foundersControls.start('visible');
    else foundersControls.start('hidden');
    
    if (isContactInView) contactControls.start('visible');
    else contactControls.start('hidden');
  }, [
    isMissionInView,

    isFoundersInView, 
    isContactInView, 
    missionControls,

    foundersControls, 
    contactControls
  ]);

  // Animation variants
  const fadeInUp = {
    hidden: { y: 60, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        type: 'spring', 
        stiffness: 100, 
        damping: 15 
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };

  const lineDrawing = {
    hidden: { width: 0 },
    visible: { 
      width: '100%',
      transition: { 
        duration: 0.8,
        ease: 'easeInOut'
      }
    }
  };

  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: 'spring',
        stiffness: 80,
        delay: 0.2
      }
    }
  };

  // Configure global animation settings
  const spring = {
    type: 'spring',
    damping: 15,
    stiffness: 120,
    mass: 0.5
  };
  
  return (
    <MotionConfig transition={spring}>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
        style={{ 
          background: `linear-gradient(to bottom, ${theme.colors.background}, ${theme.colors.cardBg})`, 
          minHeight: '100vh',
          color: theme.colors.text,
          overflowX: 'hidden',
          position: 'relative'
        }}
      >
        {/* Cursor follower */}
        <CursorFollower mousePosition={mousePos} />

        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0 20px'
        }}>
          {/* Mission Section */}
          <motion.section 
            ref={missionRef}
            initial="hidden"
            animate={missionControls}
            variants={staggerContainer}
            style={{ 
              minHeight: '80vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              padding: '50px 0'
            }}
          >
            <motion.h1 
              variants={fadeInUp}
              style={{ 
                fontSize: '3.5rem',
                fontWeight: 700,
                marginBottom: '0.5rem',
                textAlign: 'center',
                background: `linear-gradient(135deg, ${theme.colors.text}, ${theme.colors.accent})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Our Mission
            </motion.h1>
            
            <motion.div 
              variants={lineDrawing}
              style={{
                height: '4px',
                background: theme.colors.accent,
                marginBottom: '1.2rem',
                borderRadius: '2px',
                width: '80px'
              }}
            />
            
            <motion.p 
              variants={fadeInUp}
              style={{ 
                fontSize: '1.5rem', 
                maxWidth: '800px',
                textAlign: 'center',
                marginBottom: '1.2rem',
                lineHeight: 1.6
              }}
            >
              <span style={{ fontWeight: 600, color: theme.colors.accent }}>
                Empowering Developers to shape the future
              </span>{' '}
              through collaborative learning, innovation, and hands-on experience.
            </motion.p>
            
            <motion.p 
              variants={fadeInUp}
              style={{ 
                fontSize: '1.1rem', 
                maxWidth: '700px',
                textAlign: 'center',
                marginBottom: '2rem',
                opacity: 0.9,
                lineHeight: 1.6
              }}
            >
              DevLabs is a college tech community where students can explore, learn, and build
              projects across Web Development, Mobile Development, Cloud & DevOps, Machine Learning, 
              and IoT/Electronics.
            </motion.p>
            
            <motion.div 
              variants={scaleIn}
              style={{ 
                width: '100%', 
                height: '200px',
                position: 'relative',
                marginTop: '2rem',
                borderRadius: '15px',
                overflow: 'hidden',
                boxShadow: `0 15px 35px ${theme.colors.shadow}`,
                background: `linear-gradient(135deg, ${theme.colors.cardBg}, ${theme.colors.background})`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{ 
                  fontSize: '2rem',
                  color: theme.colors.accent,
                  textAlign: 'center'
                }}
              >
                Building the future of tech education
              </motion.h3>
            </motion.div>
          </motion.section>

         
          
          {/* Founders Section */}
          <motion.section
            ref={foundersRef}
            initial="hidden"
            animate={foundersControls}
            variants={staggerContainer}
            style={{ 
              minHeight: '70vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '40px 0',
              borderTop: `1px solid ${theme.colors.border}`
            }}
          >
            <motion.h2 
              variants={fadeInUp}
              style={{ 
                fontSize: '3rem',
                fontWeight: 700,
                marginBottom: '0.5rem',
                textAlign: 'center'
              }}
            >
              Meet Our Founders
            </motion.h2>
            
            <motion.div 
              variants={lineDrawing}
              style={{
                height: '4px',
                background: theme.colors.accent,
                marginBottom: '1.5rem',
                borderRadius: '2px',
                width: '80px'
              }}
            />
            
            <motion.div 
              variants={staggerContainer}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '15px',
                width: '100%'
              }}
            >
              {/* Founder Card - Saksham Mishra */}
              <motion.div 
                variants={fadeInUp}
                whileHover={{ 
                  y: -10, 
                  boxShadow: `0 25px 50px ${theme.colors.shadow}`,
                  transition: { duration: 0.3 }
                }}
                style={{
                  width: '500px',
                  background: `linear-gradient(135deg, ${theme.colors.cardBg}, ${theme.colors.background})`,
                  borderRadius: '15px',
                  padding: '30px',
                  boxShadow: `0 10px 30px ${theme.colors.shadow}`,
                  border: `1px solid ${theme.colors.border}`
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                  <div 
                    style={{ 
                      width: '100px', 
                      height: '100px', 
                      borderRadius: '50%', 
                      overflow: 'hidden',
                      border: `2px solid ${theme.colors.accent}`,
                      flexShrink: 0
                    }}
                  >
                    <img 
                      src="/Founder/Saksham Mishra.jpg" 
                      alt="Saksham Mishra" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ marginLeft: '20px' }}>
                    <h3 style={{ 
                      fontSize: '1.6rem', 
                      fontWeight: 600, 
                      marginBottom: '15px',
                      color: theme.colors.accent
                    }}>
                      Saksham Mishra
                    </h3>
                    <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
                      Full Stack ML/AI Engineer
                    </p>
                    <a 
                      href="https://linkedin.com/in/saksham-mishra" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        color: theme.colors.text,
                        textDecoration: 'none',
                        marginTop: '10px'
                      }}
                    >
                      <span style={{ marginRight: '8px', display: 'flex' }}>
                        <LinkedInIcon />
                      </span>
                      <span>Connect on LinkedIn</span>
                    </a>
                  </div>
                </div>
                <p style={{ lineHeight: 1.6, fontSize: '1rem' }}>
                  AI Researcher with multiple hackathon wins and expertise in AI, blockchain (Solidity, Rust), 
                  and scalable application development (React, Node.js, Kubernetes). Passionate about building 
                  innovative solutions across finance, healthcare, and retail domains, with a strong foundation 
                  in machine learning, deep learning, and blockchain technologies.
                </p>
              </motion.div>
              
              {/* Founder Card - Sandeep Singh */}
              <motion.div 
                variants={fadeInUp}
                whileHover={{ 
                  y: -10, 
                  boxShadow: `0 25px 50px ${theme.colors.shadow}`,
                  transition: { duration: 0.3 }
                }}
                style={{
                  width: '500px',
                  background: `linear-gradient(135deg, ${theme.colors.cardBg}, ${theme.colors.background})`,
                  borderRadius: '15px',
                  padding: '30px',
                  boxShadow: `0 10px 30px ${theme.colors.shadow}`,
                  border: `1px solid ${theme.colors.border}`
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                  <div 
                    style={{ 
                      width: '100px', 
                      height: '100px', 
                      borderRadius: '50%', 
                      overflow: 'hidden',
                      border: `2px solid ${theme.colors.accent}`,
                      flexShrink: 0
                    }}
                  >
                    <img 
                      src="/Founder/Sandeep Singh.jpg" 
                      alt="Sandeep Singh" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ marginLeft: '20px' }}>
                    <h3 style={{ 
                      fontSize: '1.6rem', 
                      fontWeight: 600, 
                      marginBottom: '15px',
                      color: theme.colors.accent
                    }}>
                      Sandeep Singh
                    </h3>
                    <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
                      Systems Architect
                    </p>
                    <a 
                      href="https://linkedin.com/in/sandeep-singh" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        color: theme.colors.text,
                        textDecoration: 'none',
                        marginTop: '10px'
                      }}
                    >
                      <span style={{ marginRight: '8px', display: 'flex' }}>
                        <LinkedInIcon />
                      </span>
                      <span>Connect on LinkedIn</span>
                    </a>
                  </div>
                </div>
                <p style={{ lineHeight: 1.6, fontSize: '1rem' }}>
                  Building scalable, high-performance applications. Architected 99.9% uptime systems with 
                  React, Node.js, and Kubernetes. Drove 40% user growth through AI-driven health tech 
                  (HIPAA-compliant). Expert in distributed systems and cloud architecture with a focus 
                  on performance optimization and reliability.
                </p>
              </motion.div>
            </motion.div>
          </motion.section>
          
          {/* Contact Section */}
          <motion.section
            ref={contactRef}
            initial="hidden"
            animate={contactControls}
            variants={staggerContainer}
            style={{ 
              minHeight: '40vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '40px 0',
              borderTop: `1px solid ${theme.colors.border}`
            }}
          >
            <motion.h2 
              variants={fadeInUp}
              style={{ 
                fontSize: '3rem',
                fontWeight: 700,
                marginBottom: '0.5rem',
                textAlign: 'center'
              }}
            >
              Get in Touch
            </motion.h2>
            
            <motion.div 
              variants={lineDrawing}
              style={{
                height: '4px',
                background: theme.colors.accent,
                marginBottom: '1.5rem',
                borderRadius: '2px',
                width: '80px'
              }}
            />
            
            <motion.div
              variants={staggerContainer}
              style={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '15px'
              }}
            >
              <motion.a
                variants={fadeInUp}
                href="mailto:contact@devlabs.com"
                whileHover={{ color: theme.colors.accent }}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  fontSize: '1.3rem',
                  textDecoration: 'none',
                  color: theme.colors.text,
                  padding: '15px',
                  borderRadius: '10px',
                  transition: 'all 0.3s ease'
                }}
              >
                <span style={{ marginRight: '15px', display: 'flex' }}>
                  <EmailIcon />
                </span>
                <span>contact@devlabs.com</span>
              </motion.a>
              
              <motion.a
                variants={fadeInUp}
                href="https://chat.whatsapp.com/DevLabsCommunity"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ color: theme.colors.accent }}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  fontSize: '1.3rem',
                  textDecoration: 'none',
                  color: theme.colors.text,
                  padding: '15px',
                  borderRadius: '10px',
                  transition: 'all 0.3s ease'
                }}
              >
                <span style={{ marginRight: '15px', display: 'flex' }}>
                  <WhatsAppIcon />
                </span>
                <span>Join our WhatsApp Community</span>
              </motion.a>
              
              <motion.p
                variants={fadeInUp}
                style={{ 
                  maxWidth: '600px',
                  textAlign: 'center',
                  marginTop: '10px',
                  fontSize: '1.1rem',
                  lineHeight: 1.6,
                  opacity: 0.9
                }}
              >
                Have a project idea or want to collaborate? We're always open to new partnerships 
                and opportunities to make something amazing together!
              </motion.p>
            </motion.div>
          </motion.section>
        </div>
      </motion.div>
    </MotionConfig>
  );
};

export default AboutPage;
